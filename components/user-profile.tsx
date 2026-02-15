"use client"

import { useState } from "react"
import { Badge, Award, Bookmark, ArrowLeft, PlusCircle, Shield, Briefcase, Heart, Trophy, Zap } from "lucide-react"
import { projects } from "@/lib/data"
import { Press_Start_2P } from "next/font/google"
import { motion } from "framer-motion"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface UserProfileProps {
  stats: {
    totalDonations: number
    categoriesSupported: Set<string>
    streak: number
    lastDonation: Date | null
  }
  onBack: () => void
}

export function UserProfile({ stats, onBack }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<"stats" | "badges" | "saved" | "submit">("stats")

  // Mock data for saved projects
  const savedProjects = projects.slice(0, 3)

  // Mock data for badges
  const userBadges = [
    {
      id: "first-swipe",
      name: "First Swipe",
      description: "Made your first donation",
      earned: stats.totalDonations > 0,
    },
    { id: "streak-5", name: "5-Day Streak", description: "Donated for 5 days in a row", earned: stats.streak >= 5 },
    {
      id: "category-champion",
      name: "Category Champion",
      description: "Supported 3+ different categories",
      earned: stats.categoriesSupported.size >= 3,
    },
    {
      id: "top-swiper",
      name: "Top Swiper",
      description: "Among top donors this week",
      earned: stats.totalDonations > 10,
    },
  ]

  const tabs = [
    { id: "stats", label: "Stats", icon: <Trophy className="w-3 h-3" /> },
    { id: "badges", label: "Badges", icon: <Award className="w-3 h-3" /> },
    { id: "saved", label: "Saved", icon: <Bookmark className="w-3 h-3" /> },
    { id: "submit", label: "Submit", icon: <PlusCircle className="w-3 h-3" /> },
  ]

  return (
    <div className="bg-[#0D0D0D] h-full overflow-y-auto custom-scrollbar p-6 pb-24 text-white font-sans">
      {/* Header */}
      <div className="flex items-center mb-8 border-b border-white/10 pb-4 sticky top-0 bg-[#0D0D0D]/95 backdrop-blur z-20">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className={`text-xl font-bold text-[#F9DE4B] flex items-center gap-2 ${pixelFont.className}`}>
          YOUR PROFILE
        </h2>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center justify-center mb-8 relative">
        <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center border-4 border-[#F9DE4B]/20 relative group overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <span className="text-4xl relative z-10">👤</span>
        </div>
        <div className="mt-4 text-center">
          <h3 className={`text-sm text-white font-bold mb-1 ${pixelFont.className}`}>USER 01</h3>
          <p className="text-xs text-[#F9DE4B] font-mono border border-[#F9DE4B]/30 px-2 py-0.5 rounded bg-[#F9DE4B]/5 inline-block">LVL {Math.floor(stats.totalDonations / 10) + 1}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center group hover:border-[#F9DE4B]/30 transition-colors">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Donations</p>
          <p className={`text-lg text-white ${pixelFont.className}`}>{stats.totalDonations > 0 ? stats.totalDonations : "0"}</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center group hover:border-[#F9DE4B]/30 transition-colors">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Streak</p>
          <p className={`text-lg text-white ${pixelFont.className}`}>{stats.streak > 0 ? stats.streak : "0"}</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center group hover:border-[#F9DE4B]/30 transition-colors">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Cats</p>
          <p className={`text-lg text-white ${pixelFont.className}`}>{stats.categoriesSupported.size}</p>
        </div>
        <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center group hover:border-[#F9DE4B]/30 transition-colors">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Badges</p>
          <p className={`text-lg text-white ${pixelFont.className}`}>
            {userBadges.filter((b) => b.earned).length}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 p-1 bg-[#1A1A1A] rounded-xl border border-white/5">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${activeTab === tab.id
                ? "bg-[#F9DE4B] text-black shadow-lg"
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Container */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="min-h-[200px]"
      >
        {activeTab === "stats" && (
          <div>
            <h3 className={`text-sm text-[#F9DE4B] mb-4 uppercase tracking-widest ${pixelFont.className}`}>Impact Log</h3>
            <div className="space-y-3">
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold uppercase">Categories</span>
                <span className="text-sm font-bold text-white font-mono">{Array.from(stats.categoriesSupported).join(", ") || "None"}</span>
              </div>
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold uppercase">Last Donation</span>
                <span className="text-sm font-bold text-white font-mono">
                  {stats.lastDonation ? new Date(stats.lastDonation).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold uppercase">Active Streak</span>
                <div className="flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${stats.streak > 0 ? "text-[#F9DE4B] fill-current" : "text-gray-600"}`} />
                  <span className="text-sm font-bold text-white font-mono">{stats.streak} Days</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-1 gap-3">
            {userBadges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${badge.earned
                  ? "bg-[#1A1A1A] border-[#F9DE4B]/30 shadow-[0_0_10px_rgba(249,222,75,0.05)]"
                  : "bg-[#0A0A0A] border-white/5 opacity-60"}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${badge.earned ? "bg-[#F9DE4B]/10 text-[#F9DE4B]" : "bg-white/5 text-gray-600"}`}
                >
                  <Award className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold mb-1 ${badge.earned ? "text-white" : "text-gray-500"} ${pixelFont.className}`}>{badge.name}</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed">{badge.description}</p>
                </div>
                {badge.earned && <div className="text-[#F9DE4B] text-[10px] font-bold border border-[#F9DE4B]/30 px-2 py-1 rounded bg-[#F9DE4B]/5">UNLOCKED</div>}
              </div>
            ))}
          </div>
        )}

        {activeTab === "saved" && (
          <div>
            <h3 className={`text-sm text-[#F9DE4B] mb-4 uppercase tracking-widest ${pixelFont.className}`}>Saved Projects</h3>
            {savedProjects.length > 0 ? (
              <div className="space-y-3">
                {savedProjects.map((project) => (
                  <div key={project.id} className="bg-[#1A1A1A] p-3 rounded-xl border border-white/5 flex items-center gap-3">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.name}
                      className="w-12 h-12 object-cover rounded-lg border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white truncate">{project.name}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{project.category}</p>
                    </div>
                    <button className="bg-[#F9DE4B] hover:bg-[#E6C200] text-black text-[10px] font-bold py-2 px-3 rounded-lg uppercase tracking-wide">
                      Donate
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed border-white/10 rounded-xl bg-[#1A1A1A]/50">
                <Bookmark className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                <p className="text-xs text-gray-500 font-bold uppercase">No saved projects</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "submit" && (
          <div>
            <h3 className={`text-sm text-[#F9DE4B] mb-4 uppercase tracking-widest ${pixelFont.className}`}>New Submission</h3>
            <div className="bg-[#1A1A1A] p-5 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Launch your project on SwipePad. All submissions undergo verification.
              </p>

              <form className="space-y-4">
                <div>
                  <label className={`text-[10px] text-[#F9DE4B] block mb-1 uppercase tracking-wider ${pixelFont.className}`}>Project Name</label>
                  <input
                    type="text"
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#F9DE4B] text-sm transition-colors font-mono"
                    placeholder="Enter name..."
                  />
                </div>

                <div>
                  <label className={`text-[10px] text-[#F9DE4B] block mb-1 uppercase tracking-wider ${pixelFont.className}`}>Category</label>
                  <select className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#F9DE4B] text-sm font-mono appearance-none">
                    <option value="">Select Category...</option>
                    <option value="Education">Education</option>
                    <option value="Open Source">Open Source</option>
                    <option value="Climate Action">Climate Action</option>
                  </select>
                </div>

                <div>
                  <label className={`text-[10px] text-[#F9DE4B] block mb-1 uppercase tracking-wider ${pixelFont.className}`}>Description</label>
                  <textarea
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#F9DE4B] text-sm transition-colors font-mono resize-none"
                    placeholder="Project details..."
                    rows={3}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 bg-[#F9DE4B] hover:bg-[#E6C200] text-black font-bold text-xs rounded-xl transition-all shadow-[0_4px_0_#B58D00] hover:shadow-[0_2px_0_#B58D00] hover:translate-y-[2px] mt-4 flex items-center justify-center gap-2 uppercase tracking-widest ${pixelFont.className}`}
                >
                  <PlusCircle className="w-4 h-4" /> SUBMIT DATA
                </button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

