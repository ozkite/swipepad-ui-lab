"use client"

import { useState } from "react"
import { Press_Start_2P } from "next/font/google"
import { X, Trophy, Shield, Zap, Award, Star, Crown, Medal, Lock, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface SocialHubProps {
    isOpen: boolean
    onClose: () => void
    userStats: {
        totalDonations: number
        level: number
        totalXP: number
    }
}

// Mock Leaderboard Data
const leaderboardData = [
    { rank: 1, name: "RegenWhale.eth", avatar: "🐋", level: 9, xp: 125000 },
    { rank: 2, name: "GreenGuardian", avatar: "🌳", level: 8, xp: 98000 },
    { rank: 3, name: "SolarPunk_01", avatar: "☀️", level: 8, xp: 95400 },
    { rank: 4, name: "EcoWarrior", avatar: "🛡️", level: 7, xp: 75000 },
    { rank: 5, name: "CarbonSlayer", avatar: "⚔️", level: 7, xp: 72100 },
    { rank: 6, name: "ForestSpirit", avatar: "👻", level: 6, xp: 58000 },
    { rank: 7, name: "OceanSavior", avatar: "🌊", level: 6, xp: 55000 },
    { rank: 8, name: "CryptoPhilanthropist", avatar: "💎", level: 5, xp: 42000 },
    { rank: 9, name: "ReFi_Maxi", avatar: "📈", level: 5, xp: 39000 },
    { rank: 10, name: "ImpactBuilder", avatar: "🧱", level: 4, xp: 28000 },
]

// Mock Badges Data
const badgesData = [
    { id: "early-adopter", name: "Early Adopter", icon: <Star className="w-6 h-6" />, description: "Joined during beta", requirement: "Sign up before Launch Day", type: "unlocked" },
    { id: "regen-hero", name: "Regen Hero", icon: <Shield className="w-6 h-6" />, description: "Donated $100+ to eco-projects", requirement: "Donate $100 total to Ecological projects", type: "unlocked" },
    { id: "whale", name: "Whale", icon: <Crown className="w-6 h-6" />, description: "Top 1% donor", requirement: "Be in the top 1% of donors this month", type: "locked" },
    { id: "streak-master", name: "Streak Master", icon: <Zap className="w-6 h-6" />, description: "7 day active streak", requirement: "Maintain a 7-day login streak", type: "locked" },
    { id: "collector", name: "Collector", icon: <Award className="w-6 h-6" />, description: "Collected 10 POAPs", requirement: "Collect 10 different POAPs", type: "locked" },
    { id: "level-5", name: "High Five", icon: <Medal className="w-6 h-6" />, description: "Reached Level 5", requirement: "Reach User Level 5", type: "unlocked" },
    { id: "mystery-1", name: "???", icon: <HelpCircle className="w-6 h-6" />, description: "Secret Achievement", requirement: "Explore the hidden features...", type: "secret" },
    { id: "mystery-2", name: "???", icon: <HelpCircle className="w-6 h-6" />, description: "Secret Achievement", requirement: "Boost 5 projects in one day", type: "secret" },
]

export function SocialHub({ isOpen, onClose, userStats }: SocialHubProps) {
    const [activeTab, setActiveTab] = useState<"ranking" | "badges">("ranking")
    const [selectedBadge, setSelectedBadge] = useState<typeof badgesData[0] | null>(null)

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-[#0D0D0D] border-l border-white/10 shadow-2xl z-50 flex flex-col font-sans"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-5 border-b border-white/10">
                            <div>
                                <h2 className={`text-xl font-bold text-[#F9DE4B] flex items-center gap-2 ${pixelFont.className}`}>
                                    <Trophy className="w-5 h-5" />
                                    LEADERBOARD
                                </h2>
                                <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wider font-bold">GLOBAL RANKINGS & ACHIEVEMENTS</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="p-4">
                            <div className="flex p-1 bg-zinc-800 rounded-xl">
                                <button
                                    onClick={() => setActiveTab("ranking")}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "ranking"
                                        ? "bg-[#F9DE4B] text-black shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    Global Ranking
                                </button>
                                <button
                                    onClick={() => setActiveTab("badges")}
                                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "badges"
                                        ? "bg-[#F9DE4B] text-black shadow-lg"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    My Badges
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                            {activeTab === "ranking" ? (
                                <div className="p-4 space-y-3">
                                    {/* User's own Rank (Mock) */}
                                    <div className="bg-[#1F2937] border border-[#F9DE4B]/30 rounded-xl p-4 flex items-center gap-4 mb-6 shadow-lg shadow-[#F9DE4B]/5 sticky top-0 z-10">
                                        <div className="w-8 h-8 flex items-center justify-center font-black text-[#F9DE4B]">
                                            #42
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-lg">
                                            👤
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-white">You</h3>
                                            <p className="text-xs text-[#F9DE4B] font-medium">{userStats.totalXP.toLocaleString()} XP</p>
                                        </div>
                                        <div className="bg-[#F9DE4B] text-black text-xs font-black px-2 py-1 rounded">
                                            LVL {userStats.level}
                                        </div>
                                    </div>

                                    {/* Leaderboard List */}
                                    {leaderboardData.map((player) => (
                                        <div key={player.rank} className="bg-zinc-800/50 hover:bg-zinc-800 rounded-xl p-3 flex items-center gap-4 transition-colors">
                                            <div className={`w-8 h-8 flex items-center justify-center font-black ${player.rank === 1 ? "text-yellow-400" :
                                                player.rank === 2 ? "text-gray-300" :
                                                    player.rank === 3 ? "text-amber-700" : "text-gray-500"
                                                }`}>
                                                #{player.rank}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg">
                                                {player.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-200 text-sm">{player.name}</h3>
                                                <p className="text-xs text-gray-500">{player.xp.toLocaleString()} XP</p>
                                            </div>
                                            <div className="bg-zinc-900 text-gray-400 text-[10px] font-bold px-2 py-1 rounded border border-zinc-700">
                                                LVL {player.level}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        {badgesData.map((badge) => (
                                            <motion.button
                                                key={badge.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setSelectedBadge(badge)}
                                                className={`aspect-square rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 border relative overflow-hidden group ${badge.type === "unlocked"
                                                    ? "bg-[#1A1A1A] border-[#F9DE4B]/30 shadow-[0_0_15px_rgba(249,222,75,0.1)]"
                                                    : badge.type === "secret"
                                                        ? "bg-[#0A0A0A] border-red-900/30"
                                                        : "bg-[#0A0A0A] border-white/5 opacity-80"
                                                    }`}
                                            >
                                                {/* Unlocked Glow Effect */}
                                                {badge.type === "unlocked" && (
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#F9DE4B]/5 to-transparent opacity-50 animate-pulse" />
                                                )}

                                                {/* Secret Glitch Effect (Simplistic) */}
                                                {badge.type === "secret" && (
                                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                                                )}

                                                <div className={`p-2 rounded-full relative z-10 ${badge.type === "unlocked" ? "bg-[#F9DE4B]/10 text-[#F9DE4B]" :
                                                    badge.type === "secret" ? "bg-red-500/10 text-red-500 animate-pulse" :
                                                        "bg-white/5 text-gray-600 grayscale"
                                                    }`}>
                                                    {badge.type === "locked" ? <div className="relative">{badge.icon}<Lock className="w-3 h-3 absolute -bottom-1 -right-1 text-white fill-black" /></div> : badge.icon}
                                                </div>

                                                <span className={`text-[8px] font-bold leading-tight ${badge.type === "unlocked" ? "text-white" : "text-gray-600"
                                                    } ${pixelFont.className}`}>
                                                    {badge.name}
                                                </span>
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Badge Details Modal / Tooltip Overlay */}
                                    <AnimatePresence>
                                        {selectedBadge && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="mt-6 p-4 bg-[#111] border border-white/10 rounded-xl relative overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => setSelectedBadge(null)}
                                                    className="absolute top-2 right-2 text-gray-500 hover:text-white"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>

                                                <div className="flex items-start gap-3">
                                                    <div className={`p-3 rounded-lg ${selectedBadge.type === "unlocked" ? "bg-[#F9DE4B]/10 text-[#F9DE4B]" :
                                                        selectedBadge.type === "secret" ? "bg-red-900/20 text-red-500" :
                                                            "bg-white/5 text-gray-500"
                                                        }`}>
                                                        {selectedBadge.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className={`text-sm font-bold text-white mb-1 ${pixelFont.className}`}>
                                                            {selectedBadge.name}
                                                        </h3>
                                                        <p className="text-xs text-gray-400 mb-2 font-medium">
                                                            {selectedBadge.description}
                                                        </p>
                                                        {selectedBadge.type !== "unlocked" && (
                                                            <div className="bg-white/5 p-2 rounded border border-white/5">
                                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Requirement</p>
                                                                <p className="text-xs text-[#F9DE4B] mt-0.5 font-bold">
                                                                    {selectedBadge.requirement}
                                                                </p>
                                                            </div>
                                                        )}
                                                        {selectedBadge.type === "unlocked" && (
                                                            <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold inline-block rounded border border-green-500/30">
                                                                UNLOCKED
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="mt-8 p-4 bg-zinc-900 rounded-xl border border-dashed border-zinc-700">
                                        <p className="text-center text-xs text-gray-500">
                                            More badges revealed as you swipe and boost!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
