"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import confetti from "canvas-confetti"
import { ArrowRight } from "lucide-react"
import { Press_Start_2P } from "next/font/google"

// Brand Font for Slide 1 Logo
const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

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
        description: "Borderless reach at your fingertips. Swipe right to support, left to Skip.",
    },
    {
        title: "Global Leaderboard",
        description: "Climb the rankings to win prizes, boost your favorite projects.",
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
            className="fixed inset-0 z-[100] min-h-screen flex flex-col items-center justify-start bg-zinc-950 pt-12 pb-8 overflow-hidden select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* 1. FIXED HERO SECTION (Does not unmount/remount) */}
            <div className="w-full flex flex-col items-center justify-start relative pointer-events-none mb-2 pt-4">
                {/* Fixed Fan Stack - Container Height Increased to prevent overlap */}
                {/* Fixed Fan Stack - Animated Shuffle */}
                <div className="relative w-full h-[400px] md:h-[500px] flex justify-center items-center">
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
                            // Juicy "Enter" Animation: Scale up then settle
                            scale = [0.9, 1.05, 1]
                        } else if (isMiddle) {
                            zIndex = 20
                            x = "-60%"
                            rotate = -12
                            top = 16
                        }

                        // Wobble rotation for front card only
                        const animateRotate = isFront ? [offset === 1 ? -12 : 12, -2, 2, 0] : rotate

                        return (
                            <motion.div
                                key={card.id}
                                className="absolute left-1/2"
                                animate={{
                                    zIndex,
                                    x,
                                    top,
                                    rotate: isFront ? 0 : rotate, // Simplified rotation to avoid excessive wobble conflict
                                    scale,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "backOut",
                                    scale: { duration: 0.4, ease: "easeOut" }
                                }}
                            >
                                {/* Inner wrapper for Floating Animation to allow independent composition */}
                                <div className="animate-float" style={{ animationDelay: `${i * 1.5}s` }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={card.src}
                                        alt={card.alt}
                                        className="w-56 h-[340px] md:w-72 md:h-[420px] object-cover rounded-2xl border-4 border-zinc-800 shadow-xl"
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>

            {/* 2. DYNAMIC TEXT SECTION (Changes based on step) */}
            <div className="flex-none w-full px-8 pb-4 text-center transition-opacity duration-300 z-50">
                <div key={currentStep} className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <h2 className={`text-2xl font-bold text-white mb-2 ${currentStep === 0 ? pixelFont.className + " tracking-widest leading-relaxed" : ""}`}>
                        {steps[currentStep].title}
                    </h2>
                    <p className={`text-zinc-400 leading-relaxed mx-auto h-16 flex items-center justify-center ${currentStep === 0
                            ? "text-sm whitespace-nowrap tracking-tight max-w-none"
                            : "text-base max-w-[300px]"
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

                {/* ACTION AREA */}
                <div className="flex justify-center h-16">
                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="bg-zinc-800/80 border border-zinc-700 hover:bg-zinc-700 text-white font-bold py-3 px-10 rounded-full transition-all active:scale-95 flex items-center gap-2 backdrop-blur-sm"
                        >
                            <span>Next</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <SlideToEnter onConfirm={onComplete} />
                    )}
                </div>
            </div>

        </div>
    )
}

// -- Slide To Enter Component --

interface SlideToEnterProps {
    onConfirm: () => void
}

function SlideToEnter({ onConfirm }: SlideToEnterProps) {
    const controls = useAnimation()
    const x = useMotionValue(0)
    const width = 280 // Width of the track
    const handleSize = 56 // Width of the handle (h-14 w-14)
    const maxDrag = width - handleSize - 8 // padding adjustments

    const backgroundOpacity = useTransform(x, [0, maxDrag], [0.5, 1])
    const textOpacity = useTransform(x, [0, maxDrag / 2], [1, 0])

    const handleDragEnd = async () => {
        if (x.get() > maxDrag - 20) {
            // Completed!
            await controls.start({ x: maxDrag })

            // Trigger Confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#F9DE4B', '#ffffff'],
                zIndex: 60
            })

            // Short delay before closing
            setTimeout(() => {
                onConfirm()
            }, 800)
        } else {
            // Snap back
            controls.start({ x: 0 })
        }
    }

    return (
        <div className="relative w-[280px] h-14 bg-zinc-900 border border-zinc-700 rounded-full overflow-hidden select-none shadow-lg">
            {/* Track Fill Animation */}
            <motion.div
                className="absolute inset-y-0 left-0 bg-[#F9DE4B]/20"
                style={{ width: x, opacity: backgroundOpacity }}
            />

            {/* Helper Text */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: textOpacity }}
            >
                <span className="text-zinc-500 font-bold text-xs tracking-widest uppercase animate-pulse">
                    Slide to Enter
                </span>
            </motion.div>

            {/* Draggable Handle */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: maxDrag }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                animate={controls}
                style={{ x }}
                className="absolute top-1 left-1 w-12 h-12 bg-[#F9DE4B] rounded-full shadow-[0_0_15px_rgba(249,222,75,0.4)] flex items-center justify-center cursor-grab active:cursor-grabbing z-20"
            >
                <ArrowRight className="w-5 h-5 text-black stroke-[3]" />
            </motion.div>
        </div>
    )
}
