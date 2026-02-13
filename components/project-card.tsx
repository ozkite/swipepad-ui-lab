"use client"

import type React from "react"
import { Heart, MessageCircle, Flag, Zap, RotateCcw, ThumbsUp, X, Share2, MoreVertical, Rocket } from "lucide-react"
import { motion } from "framer-motion"

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
  categoryType?: 'builders' | 'eco' | 'dapps'
  socials: {
    github?: string
    farcaster?: string
    twitter?: string // X
    website?: string
    linkedin?: string
  }
  verified?: boolean
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
      case 'dapps':
        return { text: "DAPP", className: "bg-purple-600/90" }
      default:
        return { text: "VERIFIED", className: "bg-slate-600/90" }
    }
  }

  const badgeStyle = getCategoryStyles(project.categoryType)

  return (
    <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl bg-[#0F1729] flex flex-col disable-touch-callout select-none border border-gray-800">

      {/* 1. Full Bleed Image (Top ~60%) */}
      {/* Adjusted height to make room for larger chin with boost button */}
      <div className="absolute top-0 left-0 w-full h-[60%] z-0 bg-slate-900">
        <img
          src={project.image && project.image !== "NA" ? project.image : `/placeholder.svg?height=600&width=400&text=${project.name}`}
          alt={project.name}
          className="w-full h-full object-cover absolute inset-0"
          draggable={false}
        />

        {/* Category Badge */}
        <div className={`absolute top-4 left-4 z-10 ${badgeStyle.className} text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 shadow-sm rounded-full`}>
          <span>
            {badgeStyle.text}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0F1729] to-transparent z-10" />
      </div>

      {/* 2. Info Chin (Bottom ~40%) */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-slate-900/95 backdrop-blur-sm rounded-t-[32px] z-20 flex flex-col px-5 pt-4 pb-4 border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] justify-between">

        <div className="flex-1 flex flex-col gap-1 min-h-0">
          {/* Header: Name + Verification */}
          <div className="flex items-center gap-2 mb-0.5 shrink-0">
            <h2 className="text-lg font-bold text-white tracking-wide truncate leading-tight">{project.name}</h2>
            {project.verified && <Zap className="w-4 h-4 text-[#FFD600] fill-current shrink-0" />}
          </div>

          {/* Description (Truncated) - Allows slight variable height but constrained */}
          <div className="relative overflow-hidden">
            <p className="text-xs text-gray-400 font-normal leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>
        </div>

        {/* Meta Row: Socials + Boost Button - Pinned via justify-between structure */}
        <div className="flex items-center justify-between mb-3 mt-1 shrink-0">
          {/* Left: Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ key, icon: Icon, url }) => (
              url && url !== "NA" && (
                <button
                  key={key}
                  onClick={(e) => handleExternalLink(e, url)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </button>
              )
            ))}
          </div>

          {/* Right: New Small Boost Button */}
          <button
            onClick={(e) => handleAction(e, onBoost)}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/50 animate-pulse border border-indigo-400/30"
          >
            <span className="drop-shadow-[0_0_4px_rgba(250,204,21,0.8)] text-sm">🚀</span>
            Boost
          </button>
        </div>

        {/* Action Area (New 3-Button Layout) */}
        {/* Action Area (Pill-shaped 3-Button Layout) */}
        <div className="flex items-center justify-between gap-4 pb-4 mt-2 px-2">
          {/* Skip (Left) */}
          <button
            onClick={(e) => handleAction(e, onSwipeLeft)}
            className="flex-1 h-14 bg-zinc-800 hover:bg-zinc-700 text-white rounded-[32px] flex items-center justify-center gap-2 transition-all active:scale-95 border border-zinc-700/50 shadow-lg"
          >
            <X className="w-6 h-6" />
            <span className="text-lg font-medium">Skip</span>
          </button>

          {/* Revert (Center) */}
          <button
            onClick={(e) => handleAction(e, onRewind)}
            className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 text-blue-400 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0 border border-zinc-700/50 shadow-md"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Like (Right) */}
          <button
            onClick={(e) => handleAction(e, onSwipeRight)}
            className="flex-1 h-14 bg-[#F9DE4B] hover:bg-[#F7CE00] text-black rounded-[32px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-yellow-900/10"
          >
            <ThumbsUp className="w-6 h-6 stroke-[2.5px]" />
            <span className="text-lg font-medium">Like</span>
          </button>
        </div>

      </div>

    </div>
  )
}
