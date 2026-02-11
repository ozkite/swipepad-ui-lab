"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SwipeDeck } from "@/components/swipe/SwipeDeck"
import { TopBar } from "@/components/layout/TopBar"
import { BottomNav } from "@/components/layout/BottomNav"
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard" // Import
import { SuccessScreen } from "@/components/success-screen"
import { WalletConnect } from "@/components/wallet-connect"
import { AmountSelector, type DonationAmount, type StableCoin, type ConfirmSwipes } from "@/components/amount-selector"
import { projects, categories, type Project } from "@/lib/data"
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

export default function Home() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false) // New State
  const [viewMode, setViewMode] = useState<"swipe" | "trending" | "list" | "profile" | "wallet">("swipe")
  const [showSettings, setShowSettings] = useState(false)
  const [showBoostModal, setShowBoostModal] = useState(false) // New State
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "Regeneration")
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  // Cart & checkout state
  const [cart, setCart] = useState<Array<{ project: any; amount: number; currency: StableCoin; message?: string }>>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)
  const [donationAmount, setDonationAmount] = useState<DonationAmount>("0.01\u00A2")
  const [donationCurrency, setDonationCurrency] = useState<StableCoin>("cUSD")
  const [confirmSwipes, setConfirmSwipes] = useState<ConfirmSwipes>(20)
  const [swipeCount, setSwipeCount] = useState(0)

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
    image: "/placeholder.svg?height=100&width=100", // Fix for type compatibility
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

  const filteredProjects = projects.filter((project) => project.category === selectedCategory)

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
    // If donation amount is null, maybe just count as a "Like" without adding to cart?
    // Or prompt? For now, let's just log it if null, else add to cart.
    if (donationAmount) {
      const numericAmount = parseFloat(donationAmount) || 0
      // We need to match the cart type structure or update it.
      // The cart state type is { project: any; amount: number; currency: StableCoin; message?: string }
      // This matches numericAmount.
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

  // Handler cleanup: handleRegisterProject and handleRegistrationSubmit were previously duplicated/conflicting.
  // Correct handlers are defined above as handleOpenRegistration and handleRegistrationSubmit.

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
        initialAmount={donationAmount || "0.01\u00A2"}
        initialCurrency={donationCurrency}
        initialSwipes={confirmSwipes}
      />

      {/* Main Content Area - Scrollable or Swipable */}
      <div className="flex-1 overflow-hidden pb-20 relative flex flex-col">
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
                  donationAmount={donationAmount || "0.01\u00A2"}
                  currency={donationCurrency}
                  currentSwipes={swipeCount}
                  targetSwipes={confirmSwipes}
                  selectedCategory={selectedCategory === "Regeneration" ? "See All" : selectedCategory}
                  onSelectCategory={(cat) => setSelectedCategory(cat === "All" ? "Regeneration" : cat)}
                  onEditAmount={() => setShowSettings(true)}
                  onOpenNotifications={() => console.log("Notifications")}
                  onOpenCart={() => console.log("Cart")}
                  onOpenLeaderboard={() => console.log("Leaderboard")}
                />

                <div className="flex-1 relative flex flex-col px-4 pt-1">

                  {/* Zone 4: The Swipe Deck (Card V2) */}
                  <div className="flex-1 flex items-center justify-center">
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

