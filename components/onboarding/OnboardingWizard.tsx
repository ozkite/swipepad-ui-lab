"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import confetti from "canvas-confetti"
import { ArrowRight } from "lucide-react"
import { Press_Start_2P } from "next/font/google"

// Brand Font for Slide 1 Logo
const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

import { SlideToApprove } from "./SlideToApprove"

interface OnboardingWizardProps {
    onComplete: () => void
}

const steps = [
    {
        title: "Welcome to SwipePad",
        description: "Easy Login to explore vetted projects.",
    },
    {
        title: "Swipe and Discover",
        description: "Borderless reach at your fingertips.\nSwipe right to support, left to Skip.",
    },
    {
        title: "Global Leaderboard",
        description: "Climb the rankings to win amazing prizes.\nBoost your favourite projects.",
    },
]

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [touchEnd, setTouchEnd] = useState<number | null>(null)

    // Fan Animation Logic
    const [cardIndex, setCardIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCardIndex((prev) => (prev + 1) % 3)
        }, 2200)
        return () => clearInterval(timer)
    }, [])

    const fanCards = [
        { id: 0, src: "/assets/card-left.png", alt: "Project A" },
        { id: 1, src: "/assets/card-right.png", alt: "Project B" },
        { id: 2, src: "/assets/card-center.png", alt: "Project C" },
    ]

    // Touch Logic
    const minSwipeDistance = 50

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null)
        setTouchStart(e.targetTouches[0].clientX)
    }

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return
        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > minSwipeDistance
        const isRightSwipe = distance < -minSwipeDistance

        if (isLeftSwipe) {
            handleNext()
        } else if (isRightSwipe) {
            handlePrev()
        }
    }

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    return (
        <div
            className="fixed inset-0 z-[100] h-[100dvh] flex flex-col items-center justify-between bg-zinc-950 overflow-hidden select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* 1. FLEXIBLE HERO SECTION */}
            {/* Using flex-1 to allow it to shrink/grow but capped max-height on mobile to ensure space for bottom */}
            <div className="w-full flex-1 flex flex-col items-center justify-center relative pointer-events-none min-h-0 pt-safe-top">
                <div className="relative w-full h-full max-h-[55vh] flex justify-center items-center">
                    {fanCards.map((card, i) => {
                        const offset = (i - cardIndex + 3) % 3
                        const isFront = offset === 0
                        const isMiddle = offset === 1 // Left

                        // Dynamic Styles based on position
                        let zIndex = 10
                        let x = "-40%" // Back (Right)
                        let rotate = 12
                        let top = 16 // top-4 
                        let scale: any = 0.9

                        if (isFront) {
                            zIndex = 30
                            x = "-50%"
                            rotate = 0
                            top = 32 // top-8
                            scale = [0.9, 1.05, 1]
                        } else if (isMiddle) {
                            zIndex = 20
                            x = "-60%"
                            rotate = -12
                            top = 16
                        }

                        // Wobble rotation for front card only
                        const animateRotate = isFront ? [i % 2 === 0 ? -12 : 12, -2, 2, 0] : rotate

                        return (
                            <motion.div
                                key={card.id}
                                className="absolute left-1/2"
                                animate={{
                                    zIndex,
                                    x,
                                    top,
                                    rotate: isFront ? 0 : rotate,
                                    scale,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "backOut",
                                    scale: { duration: 0.4, ease: "easeOut" }
                                }}
                            >
                                {/* Adjusted Image Size for better Mobile Fit */}
                                <div className="animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={card.src}
                                        alt={card.alt}
                                        className="w-48 h-[290px] xs:w-56 xs:h-[340px] md:w-72 md:h-[420px] object-cover rounded-2xl border-4 border-zinc-800 shadow-xl"
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* 2. FIXED BOTTOM SECTION (Text + Dots + Button) */}
            {/* This ensures the button is always at the same height from the bottom */}
            <div className="flex-none w-full px-8 pb-8 pt-4 text-center z-50 flex flex-col items-center justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-transparent">
                <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-300 w-full">
                    <h2 className={`text-xl xs:text-2xl font-bold text-white mb-2 ${currentStep === 0 ? pixelFont.className + " tracking-widest leading-relaxed" : ""}`}>
                        {steps[currentStep].title}
                    </h2>
                    <p className={`text-zinc-400 leading-relaxed mx-auto min-h-[3rem] flex items-center justify-center text-xs xs:text-sm tracking-tight whitespace-pre-wrap ${currentStep === 0
                        ? "whitespace-nowrap max-w-none"
                        : "max-w-[320px]"
                        }`}>
                        {steps[currentStep].description}
                    </p>
                </div>

                {/* 3. DOTS INDICATOR */}
                <div className="flex justify-center gap-2 mt-4 mb-6">
                    {steps.map((_, idx) => (
                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-6 bg-[#F9DE4B]' : 'w-1.5 bg-zinc-700'}`} />
                    ))}
                </div>

                {/* ACTION AREA - Fixed Height Container */}
                <div className="flex justify-center items-center h-16 w-full">
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="bg-zinc-800/80 border border-zinc-700 hover:bg-zinc-700 text-white font-bold py-3 px-10 rounded-full transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm"
                        >
                            <span>Next</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <SlideToApprove onComplete={onComplete} />
                    )}
                </div>
            </div>

        </div>
    )
}
