"use client"

import React, { useState, useEffect } from "react"
import { Heart, MessageCircle, Flag, Zap, RotateCcw, ThumbsUp, X, Share2, MoreVertical, Rocket, Flame } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// -- Turbo Components --
function ParticleBurst({ onComplete }: { onComplete: () => void }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; scale: number; rotation: number; color: string }>>([])

  useEffect(() => {
    const colors = ["#E2FF3B", "#FF00E5", "#00FFF0"]
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 150, // spread X
      y: (Math.random() - 0.5) * 150, // spread Y
      scale: Math.random() * 0.8 + 0.4,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setParticles(newParticles)

    const timer = setTimeout(onComplete, 800)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-visible flex items-center justify-center">
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{ x: p.x, y: p.y, scale: p.scale, opacity: 0, rotate: p.rotation }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: p.color, boxShadow: `0 0 8px ${p.color}` }}
        />
      ))}
    </div>
  )
}

// -- Icon Components reused --
// Note: XIcon here is the Twitter/X logo, not the close button.
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function WebsiteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function FarcasterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.24 4.32h-3.12v13.44h3.12V4.32zM8.88 4.32H5.76v13.44h3.12V4.32zM2.4 19.68h19.2v-1.92H2.4v1.92zM2.4 2.4v1.92h19.2V2.4H2.4z" />
    </svg>
  )
}

// -- Main Component --

export interface ProjectCardData {
  id: string
  name: string
  image: string
  description: string
  category: string
  categoryType?: 'builders' | 'eco' | 'apps' | 'agents' | 'dapps'
  socials: {
    github?: string
    farcaster?: string
    twitter?: string // X
    website?: string
    linkedin?: string
  }
  verified?: boolean
  boostAmount?: number
}

interface ProjectCardProps {
  project: ProjectCardData
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onRewind?: () => void
  onBoost?: () => void
  onShare?: () => void
  onReport?: () => void
}

export function ProjectCard({
  project,
  onSwipeLeft,
  onSwipeRight,
  onRewind,
  onBoost,
  onShare,
  onReport,
}: ProjectCardProps) {

  const handleAction = (e: React.MouseEvent, action?: () => void) => {
    e.preventDefault()
    e.stopPropagation()
    action?.()
  }

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (url === "NA") return;
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const socialLinks = [
    { key: 'github', icon: GitHubIcon, url: project.socials?.github },
    { key: 'farcaster', icon: FarcasterIcon, url: project.socials?.farcaster },
    { key: 'twitter', icon: XIcon, url: project.socials?.twitter },
    { key: 'website', icon: WebsiteIcon, url: project.socials?.website },
    { key: 'linkedin', icon: LinkedInIcon, url: project.socials?.linkedin },
  ]

  const getCategoryStyles = (type?: string) => {
    switch (type) {
      case 'builders':
        return { text: "BUILDERS", className: "bg-blue-600/90" }
      case 'eco':
        return { text: "ECO PROJECT", className: "bg-emerald-600/90" }
      case 'apps':
        return { text: "APP", className: "bg-purple-600/90" }
      case 'agents':
        return { text: "AGENT", className: "bg-orange-500/90 font-pixel" }
      case 'dapps':
        return { text: "DAPP", className: "bg-cyan-600/90" }
      default:
        return { text: "VERIFIED", className: "bg-slate-600/90" }
    }
  }

  const [isBoosting, setIsBoosting] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [isTurboActive, setIsTurboActive] = useState(project.boostAmount && project.boostAmount > 0 ? true : false)

  const handleTurboBoost = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isBoosting || isTurboActive) return

    // Trigger Haptics: Heavy impact followed by high-frequency vibration pulse
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([50, 20, 10, 20, 10])
    }

    setIsBoosting(true)
    setShowParticles(true)

    // Call original boost handler
    onBoost?.()

    setTimeout(() => {
      setIsBoosting(false)
      setIsTurboActive(true)
    }, 600) // Updated to 600ms matching radial blast
  }

  const badgeStyle = getCategoryStyles(project.categoryType)

  return (
    <motion.div
      animate={isBoosting ? {
        scale: [1, 0.95, 1.05, 1],
        x: [0, -3, 3, -3, 3, 0],
        y: [0, 3, -3, 3, -3, 0]
      } : { scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`relative w-full max-h-[75vh] h-full rounded-[26px] mt-0 mb-0 mx-auto flex flex-col ${isTurboActive ? 'p-[1px] shadow-[0_0_20px_rgba(255,0,229,0.4)]' : 'p-0 shadow-2xl'} transition-all`}
    >
      {/* Turbo Neon Border Background */}
      {isTurboActive && (
        <motion.div
          className="absolute inset-0 rounded-[26px] z-0 overflow-hidden"
          style={{
            background: 'linear-gradient(45deg, #00FFF0, #FF00E5, #E2FF3B, #00FFF0)',
            backgroundSize: '300% 300%'
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Turbo Radial Blast (Behind Card, 600ms) */}
      <AnimatePresence>
        {isBoosting && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-[-50%] z-0 pointer-events-none rounded-full blur-xl"
            style={{
              background: "radial-gradient(circle, rgba(0,255,240,0.8) 0%, rgba(255,0,229,0.6) 40%, rgba(226,255,59,0.3) 70%, transparent 100%)"
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative w-full h-full rounded-[24px] overflow-hidden bg-[#0D0D0D] flex flex-col disable-touch-callout select-none z-10">

        {/* 1. Container-Centric Image (Aspect 4/5) */}
        <div className="w-full aspect-[4/5] min-h-0 shrink relative z-0 bg-black rounded-t-[24px] overflow-hidden flex items-center justify-center">
          <img
            src={project.image && project.image !== "NA" ? project.image : `/placeholder.svg?height=600&width=400&text=${project.name}`}
            alt={project.name}
            className="w-full h-full object-cover object-top absolute inset-0 rounded-t-[24px]"
            draggable={false}
          />

          {/* Category Badge */}
          <div className={`absolute top-4 left-4 z-10 ${badgeStyle.className} text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 shadow-sm rounded-full`}>
            <span>
              {badgeStyle.text}
            </span>
          </div>

          {/* Gamified Boosted Badge */}
          <AnimatePresence>
            {isTurboActive && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute top-4 right-4 z-10"
              >
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-gradient-to-r from-[#7C3AED] to-[#DB2777] text-white font-bold font-pixel text-[9px] uppercase tracking-wider px-2.5 py-1.5 shadow-[0_0_12px_rgba(219,39,119,0.5)] rounded flex items-center gap-1 border border-white/30 backdrop-blur-md"
                >
                  <Rocket className="w-3 h-3 fill-current drop-shadow-md" />
                  <span className="drop-shadow-sm mt-0.5">BOOSTED</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Boost Button over Image */}
          <div className="absolute bottom-3 right-3 z-30">
            <button
              onClick={handleTurboBoost}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-[11px] font-bold transition-all backdrop-blur-md border border-indigo-400/30 ${isBoosting
                ? "bg-indigo-400 scale-90 shadow-[0_0_30px_rgba(255,0,229,0.8)]"
                : "bg-indigo-600/80 hover:bg-indigo-500 shadow-[0_4px_15px_rgba(79,70,229,0.5)] hover:shadow-[0_0_20px_rgba(79,70,229,0.8)] animate-pulse"
                }`}
            >
              <span className="drop-shadow-[0_0_4px_rgba(250,204,21,0.8)] text-xs">✨</span>
              Boost
            </button>
            {showParticles && <ParticleBurst onComplete={() => setShowParticles(false)} />}
          </div>
        </div>

        {/* 2. Info Chin (Bottom) - Flexible Height */}
        <div className="flex-1 flex flex-col px-4 pt-3 pb-2 justify-between z-20 bg-[#0D0D0D]">

          <div className="flex flex-col gap-1 min-h-0 overflow-hidden">
            {/* Header: Name + Verification */}
            <div className="flex items-center gap-1.5 shrink-0">
              <h2 className="text-lg font-bold text-white tracking-wide truncate leading-tight">{project.name}</h2>
              {project.verified && <Zap className="w-4 h-4 text-[#FFD600] fill-current shrink-0" />}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 font-normal leading-snug line-clamp-2">
              {project.description}
            </p>

            {/* Meta Row: Socials */}
            <div className="flex items-center gap-3 shrink-0 mt-0.5">
              {socialLinks.map(({ key, icon: Icon, url }) => (
                url && url !== "NA" && (
                  <button
                    key={key}
                    onClick={(e) => handleExternalLink(e, url)}
                    className="text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Action Area (Pill-shaped 3-Button Layout) */}
          <div className="flex items-center justify-between gap-2 pb-2 mt-0.5 px-1">
            {/* Skip (Left) */}
            <button
              onClick={(e) => handleAction(e, onSwipeLeft)}
              className="flex-1 h-12 bg-zinc-800 hover:bg-zinc-700 text-white rounded-[24px] flex items-center justify-center gap-2 transition-all active:scale-95 border border-zinc-700/50 shadow-lg"
            >
              <X className="w-5 h-5" />
              <span className="text-base font-medium">Skip</span>
            </button>

            {/* Revert (Center) */}
            <button
              onClick={(e) => handleAction(e, onRewind)}
              className="w-11 h-11 bg-zinc-800 hover:bg-zinc-700 text-blue-400 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0 border border-zinc-700/50 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Like (Right) */}
            <button
              onClick={(e) => handleAction(e, onSwipeRight)}
              className="flex-1 h-12 bg-[#F9DE4B] hover:bg-[#F7CE00] text-black rounded-[24px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-yellow-900/10"
            >
              <ThumbsUp className="w-5 h-5 stroke-[2.5px]" />
              <span className="text-base font-medium">Like</span>
            </button>
          </div>

        </div>

      </div>
    </motion.div >
  )
}
