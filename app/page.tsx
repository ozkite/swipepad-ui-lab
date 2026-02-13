"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SwipeDeck } from "@/components/swipe/SwipeDeck"
import { TopBar } from "@/components/layout/TopBar"
import { BottomNav } from "@/components/layout/BottomNav"
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard"
import { SuccessScreen } from "@/components/success-screen"
import { WalletConnect } from "@/components/wallet-connect"
import { AmountSelector, type DonationAmount, type StableCoin, type ConfirmSwipes } from "@/components/amount-selector"
import { projects as allProjects, categories, type Project } from "@/lib/data"
import { UserProfile } from "@/components/user-profile"
import { TrendingSection } from "@/components/trending-section"
import { StarryBackground } from "@/components/starry-background"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { MobileMockup } from "@/components/mobile-mockup"
import { useMobile } from "@/hooks/use-mobile"
import { ProjectRegistrationForm } from "@/components/project-registration-form"
import { EditProfile } from "@/components/edit-profile"
import { SettingsModal } from "@/components/modals/SettingsModal"
import { BoostModal } from "@/components/modals/BoostModal"
import { bCardsData, eCardsData, kCardsData } from "@/lib/real_data"
import { shuffleArray } from "@/lib/utils"
// Helper to normalize Builder data
const normalizeBuilders = (data: any[]): Project[] => data.map((item, i) => ({
  id: `builder-${i}`,
  name: item.Name,
  description: item.Description,
  category: "Social Impact",
  categoryType: "builders",
  imageUrl: item["Profile Image URL"],
  website: undefined,
  twitter: item.Twitter || undefined,
  github: item.GitHub || undefined,
  farcaster: item.Farcaster || undefined,
  linkedin: item.LinkedIn || undefined,
  fundingGoal: 0,
  fundingCurrent: 0,
  likes: 0,
  comments: 0,
  walletAddress: item["Wallet Address"],
  isBookmarked: false,
  userHasLiked: false,
  userHasCommented: false,
  reportCount: 0,
  boostAmount: 0,
  verified: false,
}))

// Helper to normalize Eco data
const normalizeEco = (data: any[]): Project[] => data.map((item, i) => ({
  id: `eco-${i}`,
  name: item["Project Name"],
  description: item.Description,
  category: "Eco",
  categoryType: "eco",
  imageUrl: item["Image url"],
  website: item.Website || undefined,
  twitter: undefined,
  github: undefined,
  farcaster: undefined,
  linkedin: undefined,
  fundingGoal: 0,
  fundingCurrent: 0,
  likes: 0,
  comments: 0,
  walletAddress: item.Wallet,
  isBookmarked: false,
  userHasLiked: false,
  userHasCommented: false,
  reportCount: 0,
  boostAmount: 0,
  verified: false,
}))

// Helper to normalize DApps/Projects data
const normalizeDapps = (data: any[]): Project[] => data.map((item, i) => ({
  id: `dapp-${i}`,
  name: item.project_name,
  description: item.Description,
  category: "DApps",
  categoryType: "dapps",
  imageUrl: item.project_image,
  website: item.website || item.project_url || undefined,
  twitter: item.twitter || undefined,
  github: item.github || undefined,
  farcaster: item.farcaster || undefined,
  linkedin: item.linkedin || undefined,
  fundingGoal: 0,
  fundingCurrent: 0,
  likes: 0,
  comments: 0,
  walletAddress: item.wallet_address,
  isBookmarked: false,
  userHasLiked: false,
  userHasCommented: false,
  reportCount: 0,
  boostAmount: 0,
  verified: false,
}))

export default function Home() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [viewMode, setViewMode] = useState<"swipe" | "trending" | "list" | "profile" | "wallet">("swipe")
  const [showSettings, setShowSettings] = useState(false)
  const [showBoostModal, setShowBoostModal] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  // Cart & checkout state
  const [cart, setCart] = useState<Array<{ project: any; amount: number; currency: StableCoin; message?: string }>>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [donationAmount, setDonationAmount] = useState<DonationAmount>("0.01¢")
  const [donationCurrency, setDonationCurrency] = useState<StableCoin>("cUSD")
  const [confirmSwipes, setConfirmSwipes] = useState<ConfirmSwipes>(20)
  const [swipeCount, setSwipeCount] = useState(0)

  // Data Fetching State
  const [loading, setLoading] = useState(true)

  // Profile Stats
  const [userStats, setUserStats] = useState({
    totalDonations: 0,
    categoriesSupported: new Set<string>(),
    streak: 0,
    lastDonation: null as Date | null,
  })

  const [userProfile, setUserProfile] = useState({
    name: "Crypto Philanthropist",
    handle: "@regendegen",
    avatar: "/placeholder.svg?height=100&width=100",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Supporting regenerative projects one swipe at a time. 🌱",
    totalSwipes: 47,
    projectsReported: 3,
    totalDonated: 125.75,
    poaps: 12,
    paragraphs: 5,
    farcaster: "ozkite",
    twitter: "ozkite",
    zora: "ozkite",
    lens: "ozkite",
    discord: "ozkite",
    ens: "ozkite.eth",
    nounsHeld: 2,
    lilNounsHeld: 5,
  })

  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState("See All")

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])

  // FETCH DATA ON MOUNT
  useEffect(() => {
    // Instead of fetch, we just simulate a brief load and use imported data
    const prepareData = async () => {
      // Initial Shuffle of All
      const allProjects = [
        ...normalizeBuilders(bCardsData),
        ...normalizeEco(eCardsData),
        ...normalizeDapps(kCardsData)
      ]
      setFilteredProjects(shuffleArray(allProjects))
      setLoading(false)
    }
    prepareData()
  }, [])

  // SHUFFLE & FILTER EFFECT
  useEffect(() => {
    if (loading) return

    let filtered: Project[] = []

    // Normalize and Combine based on Category
    if (selectedCategory === "See All" || selectedCategory === "All") {
      filtered = [
        ...normalizeBuilders(bCardsData),
        ...normalizeEco(eCardsData),
        ...normalizeDapps(kCardsData)
      ]
    } else if (selectedCategory === "Builders") {
      filtered = normalizeBuilders(bCardsData)
    } else if (selectedCategory === "Eco Projects") {
      filtered = normalizeEco(eCardsData)
    } else if (selectedCategory === "DApps") {
      filtered = normalizeDapps(kCardsData)
    }

    // ALWAYS SHUFFLE on category change
    setFilteredProjects(shuffleArray(filtered))
    setCurrentProjectIndex(0)
  }, [selectedCategory, loading])

  const hasLoaded = useRef(false)

  // Load user profile from local storage on mount
  useEffect(() => {
    if (hasLoaded.current) return
    hasLoaded.current = true

    // Simulate loading user profile
    // In a real app, this would be an API call
  }, [])

  // -- Handlers --

  const handleSettingsSave = (amount: DonationAmount, currency: StableCoin, swipes: ConfirmSwipes) => {
    setDonationAmount(amount)
    setDonationCurrency(currency)
    setConfirmSwipes(swipes)
    // Optional: Reset swipe count or show toast
  }

  // Renamed to avoid confusion, this opens the form
  const handleOpenRegistration = () => setShowRegistrationForm(true)

  // This handles the form submission
  const handleRegistrationSubmit = (formData: any) => {
    console.log("Registered:", formData)
    alert("Project submitted!")
    setShowRegistrationForm(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleSwipeRight = (index: number) => {
    const project = filteredProjects[index]
    if (!project) return;

    // Optimistic UI updates
    setUserProfile((prev) => ({
      ...prev,
      totalSwipes: prev.totalSwipes + 1,
      totalDonated: prev.totalDonated + (parseFloat(donationAmount || "0") || 0),
    }))

    setUserStats((prev) => {
      const categoriesSupported = new Set(prev.categoriesSupported)
      categoriesSupported.add(project.category)
      return {
        totalDonations: prev.totalDonations + 1,
        categoriesSupported: prev.categoriesSupported, // Type fix if Set vs Array matches
        streak: prev.lastDonation ? prev.streak + 1 : 1,
        lastDonation: new Date(),
      }
    })

    // Add to cart logic
    if (donationAmount) {
      const numericAmount = parseFloat(donationAmount) || 0
      const newCart = [...cart, { project, amount: numericAmount, currency: donationCurrency }]
      setCart(newCart)
    }

    const newSwipeCount = swipeCount + 1
    setSwipeCount(newSwipeCount)

    if (donationAmount && newSwipeCount >= confirmSwipes) {
      setShowSuccess(true)
      setSwipeCount(0)
    }

    // Advance index
    if (currentProjectIndex < filteredProjects.length - 1) {
      setCurrentProjectIndex(prev => prev + 1)
    } else {
      setCurrentProjectIndex(0) // Loop back
    }
  }

  const handleSwipeLeft = (index: number) => {
    setUserProfile((prev) => ({
      ...prev,
      totalSwipes: prev.totalSwipes + 1,
    }))

    if (currentProjectIndex < filteredProjects.length - 1) {
      setCurrentProjectIndex(prev => prev + 1)
    } else {
      setCurrentProjectIndex(0)
    }
  }

  const handleRewind = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex(prev => prev - 1)
    }
  }

  const handleAmountSelect = (amount: DonationAmount, currency: StableCoin, swipes: ConfirmSwipes) => {
    setDonationAmount(amount)
    setDonationCurrency(currency)
    setConfirmSwipes(swipes)
    setSwipeCount(0)
  }

  const AppContent = () => (
    <div className="w-full h-full flex flex-col bg-transparent relative">
      {/* Onboarding Wizard Overlay */}
      {!hasCompletedOnboarding && (
        <OnboardingWizard onComplete={() => {
          setHasCompletedOnboarding(true)
          setWalletConnected(true)
        }} />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={handleSettingsSave}
        initialAmount={donationAmount || "0.01¢"}
        initialCurrency={donationCurrency}
        initialSwipes={confirmSwipes}
      />

      {/* Main Content Area - Scrollable or Swipable */}
      <div className="flex-1 overflow-hidden relative flex flex-col min-h-0">
        {!walletConnected ? (
          <div className="h-full flex items-center justify-center p-6">
            <WalletConnect onConnect={() => setWalletConnected(true)} />
          </div>
        ) : (
          <>
            {viewMode === "swipe" && (
              <div className="h-full flex flex-col">

                {/* NEW Dashboard Header (Zones 1, 2, 3) */}
                <DashboardHeader
                  donationAmount={donationAmount || "0.01¢"}
                  currency={donationCurrency}
                  currentSwipes={swipeCount}
                  targetSwipes={confirmSwipes}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => setSelectedCategory(cat)}
                  onEditAmount={() => setShowSettings(true)}
                  onOpenNotifications={() => console.log("Notifications")}
                  onOpenCart={() => console.log("Cart")}
                  onOpenLeaderboard={() => console.log("Leaderboard")}
                />

                <div className="flex-1 relative flex flex-col px-4 pt-1">

                  {/* Zone 4: The Swipe Deck (Fixed Spacing, Top Anchored) */}
                  <div className="flex-1 flex justify-center pt-4">
                    <SwipeDeck
                      projects={filteredProjects}
                      activeIndex={currentProjectIndex}
                      onSwipeLeft={handleSwipeLeft}
                      onSwipeRight={handleSwipeRight}
                      onRewind={handleRewind}
                      onBoost={() => setShowBoostModal(true)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Boost Modal */}
            <BoostModal
              isOpen={showBoostModal}
              onClose={() => setShowBoostModal(false)}
              project={filteredProjects[currentProjectIndex]}
            />

            {viewMode === "trending" && (
              <div className="h-full overflow-y-auto px-6 py-6">
                <TrendingSection onDonate={() => { }} />
              </div>
            )}

            {viewMode === "profile" && (
              <div className="h-full overflow-y-auto">
                <UserProfile stats={userStats} onBack={() => setViewMode("swipe")} />
              </div>
            )}

            {viewMode === "wallet" && (
              <div className="h-full flex items-center justify-center text-gray-500">
                Wallet View Coming Soon
              </div>
            )}
          </>
        )}
      </div>

      {/* Green Zone: Bottom Nav */}
      <BottomNav currentView={viewMode} onChangeView={(v) => setViewMode(v as any)} />

      {/* Modals */}
      {showSuccess && (
        <SuccessScreen onClose={() => setShowSuccess(false)} categories={[]} />
      )}

      <EditProfile
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSave={(data: any) => setUserProfile(prev => ({ ...prev, ...data }))}
        currentProfile={userProfile}
      />

      <ProjectRegistrationForm
        isOpen={showRegistrationForm}
        onClose={() => setShowRegistrationForm(false)}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#0F1729] text-white relative overflow-hidden font-sans">
      <StarryBackground />
      {useMobile() ? (
        <div className="relative z-10 w-full h-screen">
          <AppContent />
        </div>
      ) : (
        <MobileMockup>
          <AppContent />
        </MobileMockup>
      )}
    </main>
  )
}
