"use client"

import type React from "react"
import { Heart, MessageCircle, Flag, Zap, RotateCcw, ThumbsUp, X, Share2, MoreVertical, Rocket } from "lucide-react"
import { motion } from "framer-motion"
import type { Project } from "@/lib/data"

// -- Icon Components reused --
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

interface ProjectCardProps {
  project: Project
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

  return (
    <div className="relative w-full h-full rounded-[32px] overflow-hidden shadow-2xl bg-[#0F1729] flex flex-col disable-touch-callout select-none border border-gray-800">

      {/* 1. Full Bleed Image (Top ~60%) */}
      {/* Adjusted height to make room for larger chin with boost button */}
      <div className="absolute top-0 left-0 w-full h-[60%] z-0 bg-black">
        <img
          src={project.imageUrl && project.imageUrl !== "NA" ? project.imageUrl : `/placeholder.svg?height=600&width=400&text=${project.name}`}
          alt={project.name}
          className="w-full h-full object-contain"
          draggable={false}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0F1729] to-transparent z-10" />
      </div>

      {/* 2. Info Chin (Bottom ~40%) */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] bg-slate-900/95 backdrop-blur-sm rounded-t-[32px] z-20 flex flex-col px-5 pt-5 pb-4 border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">

        {/* Header: Name + Verification */}
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-white tracking-wide truncate">{project.name}</h2>
          <Zap className="w-5 h-5 text-[#FFD600] fill-current" />
        </div>

        {/* Subtext: Job/Category */}
        <p className="text-sm text-gray-400 font-medium tracking-wide mb-1 uppercase flex items-center gap-2">
          <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px] text-white/70">{project.category}</span>
          <span>•</span>
          <span>Verified Builder</span>
        </p>

        {/* Meta Row: Socials + Boost Button */}
        <div className="flex items-center justify-between mb-auto mt-2">
          {/* Left: Social Icons */}
          <div className="flex items-center gap-3">
            {project.github && project.github !== "NA" && (
              <button onClick={(e) => handleExternalLink(e, project.github as string)} className="text-gray-400 hover:text-white transition-colors">
                <GitHubIcon className="w-5 h-5" />
              </button>
            )}
            {project.farcaster && project.farcaster !== "NA" && (
              <button onClick={(e) => handleExternalLink(e, project.farcaster as string)} className="text-gray-400 hover:text-white transition-colors">
                <FarcasterIcon className="w-5 h-5" />
              </button>
            )}
            {project.website && project.website !== "NA" && (
              <button onClick={(e) => handleExternalLink(e, project.website as string)} className="text-gray-400 hover:text-white transition-colors">
                <WebsiteIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Right: New Small Boost Button */}
          <button
            onClick={(e) => handleAction(e, onBoost)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-full text-white text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/50 animate-pulse"
          >
            <Rocket className="w-3.5 h-3.5 fill-current" />
            Boost
          </button>
        </div>

        {/* Action Area */}
        <div className="mt-2">
          <div className="flex items-center justify-between gap-3">
            {/* Skip (Left) */}
            <button
              onClick={(e) => handleAction(e, onSwipeLeft)}
              className="flex-1 py-3 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <X className="w-4 h-4" />
              <span className="text-sm font-bold">Skip</span>
            </button>

            {/* Rewind (Center) */}
            <button
              onClick={(e) => handleAction(e, onRewind)}
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 hover:text-blue-300 hover:bg-slate-700 transition-colors border border-slate-700 shrink-0"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            {/* Like (Right) */}
            <button
              onClick={(e) => handleAction(e, onSwipeRight)}
              className="flex-[1.5] py-3 rounded-xl bg-[#FFD600] flex items-center justify-center gap-2 text-black hover:bg-[#F7CE00] transition-colors shadow-lg shadow-yellow-500/10 active:scale-95"
            >
              <ThumbsUp className="w-5 h-5 fill-black" />
              <span className="text-base font-bold">Like</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
