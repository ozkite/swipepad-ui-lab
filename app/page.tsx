"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SwipeDeck } from "@/components/swipe/SwipeDeck"
import { Press_Start_2P } from "next/font/google"
import { TopBar } from "@/components/layout/TopBar"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })
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
import { Search, Flame, Rocket } from "lucide-react"
import { ProjectRegistrationForm } from "@/components/project-registration-form"
import { SocialHub } from "@/components/profile/SocialHub"
import { EditProfile } from "@/components/edit-profile"
import { SettingsModal } from "@/components/modals/SettingsModal"
import { BoostModal } from "@/components/modals/BoostModal"
import { SettingsHub } from "@/components/settings/SettingsHub"
import { bCardsData, eCardsData, kCardsData } from "@/lib/real_data"
import agentsData from "@/lib/a_cards.json"
import dCardsData from "@/lib/d_cards.json"
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
  boostAmount: Math.random() > 0.8 ? 100 : 0,
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
  boostAmount: Math.random() > 0.8 ? 100 : 0,
  verified: false,
}))

// Helper to normalize DApps/Projects data
const normalizeDapps = (data: any[]): Project[] => data.map((item, i) => ({
  id: `dapp-${i}`,
  name: item.project_name,
  description: item.Description,
  category: "Apps",
  categoryType: "apps",
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
  boostAmount: Math.random() > 0.8 ? 100 : 0,
  verified: false,
}))

// Helper to normalize Agents data
const normalizeAgents = (data: any[]): Project[] => data.map((item, i) => ({
  id: `agent-${i}`,
  name: item.name || "Unknown Agent",
  description: item.description,
  category: "Agents",
  categoryType: "agents",
  imageUrl: item.image_url,
  website: item.website || undefined,
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
  boostAmount: Math.random() > 0.8 ? 100 : 0,
  verified: false,
}))

// Helper to normalize DeScience Category data
const normalizeDeScienceCategory = (data: any[]): Project[] => data.map((item, i) => ({
  id: `descience-${i}`,
  name: item.name || "Unknown DeScience Project",
  description: item.description,
  category: "DeScience",
  categoryType: "descience",
  imageUrl: item.image_url,
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
  boostAmount: Math.random() > 0.8 ? 100 : 0,
  verified: false,
}))

export default function Home() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [viewMode, setViewMode] = useState<"swipe" | "trending" | "list" | "profile" | "wallet" | "action" | "settings">("swipe")
  const [showSettings, setShowSettings] = useState(false)
  const [showBoostModal, setShowBoostModal] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  // Search & Trending State
  const [searchQuery, setSearchQuery] = useState("")
  const [discoveryTab, setDiscoveryTab] = useState<"hidden" | "trending" | "boosted">("hidden")

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

  // Leveling State
  const [level, setLevel] = useState(1)
  const [currentXP, setCurrentXP] = useState(0)
  const [nextLevelXP, setNextLevelXP] = useState(500)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showSocialHub, setShowSocialHub] = useState(false)

  const SWIPE_XP = 5
  const BOOST_XP = 50

  const handleAddXP = (amount: number) => {
    if (level >= 10) return

    let newXP = currentXP + amount
    let nextXP = nextLevelXP
    let newLevel = level

    if (newXP >= nextXP) {
      newXP = newXP - nextXP
      newLevel = level + 1
      nextXP = Math.floor(nextXP * 1.5)
      setShowLevelUp(true)
      setTimeout(() => setShowLevelUp(false), 3000)
    }

    setCurrentXP(newXP)
    setLevel(newLevel)
    setNextLevelXP(nextXP)
  }

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
        ...normalizeDapps(kCardsData),
        ...normalizeAgents(agentsData),
        ...normalizeDeScienceCategory(dCardsData)
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
        ...normalizeDapps(kCardsData),
        ...normalizeAgents(agentsData),
        ...normalizeDeScienceCategory(dCardsData)
      ]
    } else if (selectedCategory === "Builders") {
      filtered = normalizeBuilders(bCardsData)
    } else if (selectedCategory === "Eco Projects") {
      filtered = normalizeEco(eCardsData)
    } else if (selectedCategory === "Apps") {
      filtered = normalizeDapps(kCardsData)
    } else if (selectedCategory === "Agents") {
      filtered = normalizeAgents(agentsData)
    } else if (selectedCategory === "DeScience") {
      filtered = normalizeDeScienceCategory(dCardsData)
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
    // In a real app, this would be an API call
  }, [])

  // Derived Projects for Display (Search/Trending)
  const displayProjects = useMemo(() => {
    if (!searchQuery && discoveryTab === "hidden") return filteredProjects

    let filtered = filteredProjects.filter(p => {
      const matchesSearch = searchQuery
        ? (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
      const matchesTrending = discoveryTab === "trending"
        ? true // Trending shows all (potentially sorted by score later)
        : discoveryTab === "boosted"
          ? (p.boostAmount && p.boostAmount > 0)
          : true
      return matchesSearch && matchesTrending
    })

    // Limit pure discovery lists to 6 items
    if (discoveryTab !== "hidden" && !searchQuery) {
      return filtered.slice(0, 6)
    }

    return filtered
  }, [filteredProjects, searchQuery, discoveryTab])

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
    handleAddXP(SWIPE_XP)
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

  const handleCategorySelect = (cat: string) => {
    if (cat === selectedCategory) {
      // If clicking the same category, force a re-shuffle
      setFilteredProjects(prev => shuffleArray([...prev]))
      setCurrentProjectIndex(0)
    } else {
      setSelectedCategory(cat)
    }
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
                  onSelectCategory={handleCategorySelect}
                  onEditAmount={() => setShowSettings(true)}
                  onOpenNotifications={() => console.log("Notifications")}
                  onOpenLeaderboard={() => setShowSocialHub(true)}
                  isTrending={discoveryTab !== "hidden"}
                  onToggleTrending={() => {
                    if (discoveryTab === "hidden") {
                      setDiscoveryTab("trending")
                      setFilteredProjects(prev => shuffleArray([...prev]))
                    } else {
                      setDiscoveryTab("hidden")
                    }
                  }}
                  level={level}
                  currentXP={currentXP}
                  nextLevelXP={nextLevelXP}
                />

                <div className="flex-1 relative flex flex-col px-4 pt-0">

                  {/* Zone 4: The Swipe Deck (Equally Centered Space) */}
                  <div className="flex-1 flex flex-col py-4 pb-16 justify-center">
                    {/* Segmented Discovery Header */}
                    {discoveryTab !== "hidden" && (
                      <div className="flex p-1 bg-zinc-900 rounded-xl mb-3 shrink-0 mx-auto w-full max-w-sm">
                        <button
                          onClick={() => setDiscoveryTab("trending")}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${discoveryTab === "trending"
                            ? "bg-[#F9DE4B] text-black shadow-lg"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          <span className="flex items-center justify-center w-5 h-5"><Flame className="w-4 h-4 fill-current" /></span> Trending
                        </button>
                        <button
                          onClick={() => setDiscoveryTab("boosted")}
                          className={`flex-1 py-1.5 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${discoveryTab === "boosted"
                            ? "bg-[#F9DE4B] text-black shadow-lg"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          <span className="flex items-center justify-center w-5 h-5"><Rocket className="w-4 h-4 fill-current" /></span> Boosted
                        </button>
                      </div>
                    )}

                    <div className="flex-1 flex justify-center">
                      <SwipeDeck
                        projects={displayProjects}
                        activeIndex={currentProjectIndex}
                        onSwipeLeft={handleSwipeLeft}
                        onSwipeRight={handleSwipeRight}
                        onRewind={handleRewind}
                        onBoost={() => setShowBoostModal(true)}
                        isListMode={!!searchQuery || discoveryTab !== "hidden"}
                        onClearSearch={() => {
                          setSearchQuery("")
                          setDiscoveryTab("hidden")
                        }}
                        discoveryTab={discoveryTab}
                      />
                    </div>
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
              <div className="h-full relative flex flex-col">
                {/* Search Header */}
                <div className="p-4 pb-2 bg-transparent z-10 sticky top-0 backdrop-blur-md">
                  <h2 className={`text-xl text-white mb-4 flex items-center gap-2 ${pixelFont.className}`}>
                    <Search className="w-5 h-5 text-[#F9DE4B]" />
                    DISCOVER
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search projects, tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-900/80 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-[#F9DE4B] placeholder-gray-500 text-sm font-medium"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Results List */}
                <div className="flex-1 overflow-hidden px-4 pb-20">
                  <SwipeDeck
                    projects={displayProjects}
                    activeIndex={0} // List mode renders all, index irrelevant
                    onSwipeLeft={() => { }}
                    onSwipeRight={() => { }}
                    onRewind={() => { }}
                    onBoost={() => setShowBoostModal(true)}
                    isListMode={true}
                    onClearSearch={() => setSearchQuery("")}
                  />
                </div>
              </div>
            )}

            {viewMode === "profile" && (
              <div className="h-full overflow-y-auto">
                <UserProfile stats={userStats} onBack={() => setViewMode("swipe")} />
              </div>
            )}

            {viewMode === "wallet" && (
              <div className="h-full flex items-center justify-center text-gray-500">
                Wallet / Search View Coming Soon
              </div>
            )}

            {viewMode === "settings" && (
              <div className="h-full overflow-y-auto">
                <SettingsHub
                  onBack={() => setViewMode("swipe")}
                  onOpenCart={() => console.log("Cart opened")}
                  onOpenPresets={() => { }} // Ready for a preset modal implementation
                  onOpenProfile={() => setShowEditProfile(true)}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Green Zone: Bottom Nav */}
      <BottomNav
        currentView={viewMode}
        onChangeView={(v) => {
          setViewMode(v as any)
          if (v === "swipe") {
            setSelectedCategory("See All")
            setDiscoveryTab("hidden")
            setSearchQuery("")
          }
        }}
      />

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

      <SocialHub
        isOpen={showSocialHub}
        onClose={() => setShowSocialHub(false)}
        userStats={{
          totalDonations: userProfile.totalDonated,
          level: level,
          totalXP: currentXP // Simplified for now, usually total cumulative XP
        }}
      />

      {/* Level Up Toast */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-2xl z-50 flex flex-col items-center text-center border-4 border-white/20"
          >
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-3xl font-black text-white italic drop-shadow-md">LEVEL UP!</h2>
            <p className="text-white font-bold text-lg mt-1">You reached Level {level}</p>
            <div className="mt-4 bg-white/20 px-4 py-2 rounded-full font-bold text-white text-sm">
              + Rewards Unlocked
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white relative overflow-hidden font-sans">
      <StarryBackground />
      {useMobile() ? (
        <div className="relative z-10 w-full h-[100dvh]">
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
