"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { Press_Start_2P } from "next/font/google"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface SuccessScreenProps {
  onClose: () => void
  categories?: string[]
}

export function SuccessScreen({ onClose, categories = [] }: SuccessScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Custom confetti burst originating from behind the vault container
    const triggerConfetti = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        // Compute the center of the modal relative to the viewport
        const originX = (rect.left + rect.width / 2) / window.innerWidth
        const originY = (rect.top + rect.height / 2) / window.innerHeight

        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: originX, y: originY },
          colors: ["#E2FF3B", "#FF8A00", "#FFFFFF"], // Neon Yellow, Orange, White
          zIndex: 40, // Ensure it's behind the modal (which is z-50)
          disableForReducedMotion: true
        })
      }
    }

    // Short delay to ensure modal is mounted and layout is complete before firing
    const timeout = setTimeout(triggerConfetti, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-40 p-4">
      <div
        ref={containerRef}
        className="bg-[#0D0D0D] rounded-none border-2 border-[#E2FF3B] w-full max-w-md p-6 shadow-[0_0_30px_rgba(226,255,59,0.2)] text-center relative z-50"
      >
        <div className="mb-8">
          {/* Pixel Coin / Checkmark */}
          <div className="w-16 h-16 bg-[#0D0D0D] border-2 border-[#E2FF3B] rounded-none flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(226,255,59,0.5)] transform hover:scale-105 transition-transform">
            <PixelCheckIcon className="w-8 h-8 text-[#E2FF3B]" />
          </div>

          <h3 className={`${pixelFont.className} text-sm leading-relaxed text-[#E2FF3B] mb-4 uppercase tracking-wider`}>
            Thanks for supporting these projects!
          </h3>
          <p className={`${pixelFont.className} text-[10px] leading-relaxed text-gray-300`}>
            Your donation has been processed successfully.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-8">
            <h4 className={`${pixelFont.className} text-[10px] text-gray-400 mb-4`}>Categories Supported:</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <span key={category} className={`${pixelFont.className} px-3 py-1.5 bg-[#0D0D0D] border border-orange-500 text-orange-400 text-[8px] uppercase tracking-widest`}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={onClose}
            className={`${pixelFont.className} w-full py-4 bg-[#E2FF3B] hover:bg-[#d4f02a] text-black text-[10px] mt-2 transition-all active:scale-95 shadow-[4px_4px_0px_rgba(255,138,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 uppercase tracking-widest`}
          >
            Explore More Projects
          </button>
          <button
            onClick={onClose}
            className={`${pixelFont.className} w-full py-4 bg-transparent hover:bg-[#E2FF3B]/10 text-[#E2FF3B] text-[10px] transition-all border-2 border-[#E2FF3B] hover:shadow-[0_0_15px_rgba(226,255,59,0.3)] active:scale-95 uppercase tracking-widest`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function PixelCheckIcon({ className }: { className?: string }) {
  // A chunky, pixel-art style checkmark using rects
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M4 11h2v2H4zm2 2h2v2H6zm2 2h2v2H8zm2 2h2v2h-2zm2-2h2v2h-2zm2-2h2v2h-2zm2-2h2v2h-2zm2-2h2v2h-2zm2-2h2v2h-2z" />
    </svg>
  )
}
