"use client"

import type React from "react"

import { useState, useRef } from "react"
import { X, Camera, CheckCircle, Twitter, Globe, MessageSquare, AtSign, Fingerprint, Sparkles } from "lucide-react"
import { Press_Start_2P } from "next/font/google"
import { motion, AnimatePresence } from "framer-motion"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface EditProfileProps {
  isOpen: boolean
  onClose: () => void
  onSave: (profileData: any) => void
  currentProfile: {
    name: string
    image: string
    farcaster?: string
    twitter?: string
    zora?: string
    discord?: string
    lens?: string
    ens?: string
    poaps: number
    lilNounsHeld: number
    nounsHeld: number
    paragraphs: number
    totalSwipes: number
    projectsReported: number
    totalDonated: number
  }
}

export function EditProfile({ isOpen, onClose, onSave, currentProfile }: EditProfileProps) {
  const [formData, setFormData] = useState({
    name: currentProfile.name || "MiniPay User",
    image: currentProfile.image || "/images/lena-profile.jpg",
    bio: "",
    farcaster: currentProfile.farcaster || "",
    twitter: currentProfile.twitter || "",
    zora: currentProfile.zora || "",
    discord: currentProfile.discord || "",
    lens: currentProfile.lens || "",
    ens: currentProfile.ens || "",
    passport: "",
  })

  // State definitions
  const [imagePreview, setImagePreview] = useState(formData.image)
  const [showSuccess, setShowSuccess] = useState(false)

  const defaultAvatars = [
    "/images/lena-profile.jpg",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Zack",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Molly",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, image: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onSave(formData)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#0D0D0D] rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
      >
        <div className="sticky top-0 bg-[#0D0D0D]/95 backdrop-blur z-10 p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className={`text-lg font-bold text-[#F9DE4B] flex items-center gap-2 ${pixelFont.className}`}>
            CHARACTER SHEET
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Success Overlay */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center"
              >
                <Sparkles className="w-12 h-12 text-[#F9DE4B] mb-4 animate-spin-slow" />
                <h3 className={`text-xl text-white ${pixelFont.className}`}>PROFILE SAVED!</h3>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Task 1: Identity Block */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => document.getElementById('avatar-upload')?.click()}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-[#F9DE4B] p-1">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Camera className="w-6 h-6 text-[#F9DE4B]" />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#F9DE4B] p-1.5 rounded-full border-2 border-black">
                <Camera className="w-3 h-3 text-black" />
              </div>
              <input id="avatar-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            {/* Default Avatars Scroll */}
            <div className="w-full overflow-x-auto no-scrollbar pb-2">
              <div className="flex justify-center gap-3">
                {defaultAvatars.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImagePreview(url)
                      handleInputChange("image", url)
                    }}
                    className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/10 hover:border-[#F9DE4B] transition-colors overflow-hidden shrink-0"
                  >
                    <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full">
              <label className={`block text-[10px] text-[#F9DE4B] mb-1 uppercase tracking-wider ${pixelFont.className}`}>Codename</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg py-2.5 px-3 text-white focus:border-[#F9DE4B] focus:outline-none focus:ring-1 focus:ring-[#F9DE4B]/50 font-bold transition-all placeholder-zinc-600"
                placeholder="ENTER NAME"
              />
            </div>

            <div className="w-full">
              <label className={`block text-[10px] text-gray-500 mb-1 uppercase tracking-wider ${pixelFont.className}`}>Bio Data</label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                className="w-full bg-[#1A1A1A] border border-zinc-800 rounded-lg py-2 px-3 text-white text-sm focus:border-[#F9DE4B] focus:outline-none focus:ring-1 focus:ring-[#F9DE4B]/50 transition-all placeholder-zinc-600 resize-none"
                placeholder="Origin story..."
                rows={2}
              />
            </div>
          </div>

          {/* Task 2: Web3 & Social Integration (Connect List) */}
          <div>
            <h3 className={`text-sm text-gray-400 mb-3 border-b border-white/10 pb-2 ${pixelFont.className}`}>CONNECT LIST</h3>
            <div className="space-y-3">

              {/* Twitter / X */}
              <div className="group">
                <div className="flex items-center gap-3 bg-[#111] border border-zinc-800 p-2 rounded-lg focus-within:border-[#F9DE4B] focus-within:bg-[#000] transition-colors">
                  <div className="w-8 h-8 rounded bg-black border border-zinc-700 flex items-center justify-center text-white shrink-0">
                    <Twitter className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[8px] text-gray-500 font-bold uppercase tracking-wider">X (Twitter)</label>
                    <div className="flex items-center text-sm text-zinc-400 font-mono">
                      <span>x.com/</span>
                      <input
                        type="text"
                        value={formData.twitter}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                        className="bg-transparent border-none outline-none text-white w-full placeholder-zinc-700 ml-0.5"
                        placeholder="handle"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Farcaster */}
              <div className="group">
                <div className="flex items-center gap-3 bg-[#111] border border-zinc-800 p-2 rounded-lg focus-within:border-[#855DCD] focus-within:bg-[#000] transition-colors">
                  <div className="w-8 h-8 rounded bg-[#855DCD]/20 border border-[#855DCD]/50 flex items-center justify-center text-[#855DCD] shrink-0">
                    <div className="w-4 h-4 bg-current rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[8px] text-gray-500 font-bold uppercase tracking-wider">Farcaster</label>
                    <input
                      type="text"
                      value={formData.farcaster}
                      onChange={(e) => handleInputChange("farcaster", e.target.value)}
                      className="bg-transparent border-none outline-none text-white w-full placeholder-zinc-700 text-sm font-mono mt-0.5"
                      placeholder="@username or fid"
                    />
                  </div>
                </div>
              </div>

              {/* Zora */}
              <div className="group">
                <div className="flex items-center gap-3 bg-[#111] border border-zinc-800 p-2 rounded-lg focus-within:border-blue-500 focus-within:bg-[#000] transition-colors">
                  <div className="w-8 h-8 rounded bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-500 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[8px] text-gray-500 font-bold uppercase tracking-wider">Zora</label>
                    <input
                      type="text"
                      value={formData.zora}
                      onChange={(e) => handleInputChange("zora", e.target.value)}
                      className="bg-transparent border-none outline-none text-white w-full placeholder-zinc-700 text-sm font-mono mt-0.5"
                      placeholder="zora.co/..."
                    />
                  </div>
                </div>
              </div>

              {/* ENS */}
              <div className="group">
                <div className="flex items-center gap-3 bg-[#111] border border-zinc-800 p-2 rounded-lg focus-within:border-sky-400 focus-within:bg-[#000] transition-colors">
                  <div className="w-8 h-8 rounded bg-sky-400/20 border border-sky-400/50 flex items-center justify-center text-sky-400 shrink-0">
                    <AtSign className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[8px] text-gray-500 font-bold uppercase tracking-wider">ENS</label>
                    <input
                      type="text"
                      value={formData.ens}
                      onChange={(e) => handleInputChange("ens", e.target.value)}
                      className="bg-transparent border-none outline-none text-white w-full placeholder-zinc-700 text-sm font-mono mt-0.5"
                      placeholder="name.eth"
                    />
                  </div>
                </div>
              </div>

              {/* Celo Passport */}
              <div className="group">
                <div className="flex items-center gap-3 bg-[#111] border border-zinc-800 p-2 rounded-lg focus-within:border-green-400 focus-within:bg-[#000] transition-colors">
                  <div className="w-8 h-8 rounded bg-green-400/20 border border-green-400/50 flex items-center justify-center text-green-400 shrink-0">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <label className="block text-[8px] text-gray-500 font-bold uppercase tracking-wider">Celo Passport</label>
                    <input
                      type="text"
                      value={formData.passport}
                      onChange={(e) => handleInputChange("passport", e.target.value)}
                      className="bg-transparent border-none outline-none text-white w-full placeholder-zinc-700 text-sm font-mono mt-0.5"
                      placeholder="Passport ID / Address"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              className={`w-full py-4 bg-[#F9DE4B] hover:bg-[#E6C200] active:scale-95 text-black font-bold text-sm tracking-widest rounded-xl transition-all shadow-[0_4px_0_#B58D00] hover:shadow-[0_2px_0_#B58D00] hover:translate-y-[2px] ${pixelFont.className}`}
            >
              UPDATE CHARACTER
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
