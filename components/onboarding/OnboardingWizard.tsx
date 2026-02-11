"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion"
import confetti from "canvas-confetti"
import { ArrowRight } from "lucide-react"
import { Press_Start_2P } from "next/font/google"
import { FloatingHero } from "./FloatingHero"
import { SwipeDemo } from "./SwipeDemo"
import { LeaderboardGraphic } from "./LeaderboardGraphic"

// Brand Font for Slide 1 Logo
const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface OnboardingWizardProps {
    onComplete: () => void
}

const slides = [
    {
        title: "Welcome to SwipePad",
        subtext: "Easy Login to explore vetted projects.",
        component: <FloatingHero />,
    },
    {
        title: "Swipe and Discover",
        subtext: "Borderless reach at your fingertips, Swipe right to support, left to Skip.",
        component: <SwipeDemo />,
    },
    {
        title: "Global Leaderboard",
        subtext: "Climb the rankings to win prizes, boost your favorite projects.",
        component: <LeaderboardGraphic />,
    },
]

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const [currentStep, setCurrentStep] = useState(0)

    // -- Slide Transition Logic --
    const handleNext = () => {
        if (currentStep < slides.length - 1) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    // Animation variants for slide content
    const slideVariants = {
        enter: { x: 50, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -50, opacity: 0 },
    }

    return (
        <div className="fixed inset-0 z-[100] bg-[#0F1729] text-white flex flex-col items-center justify-between p-6 overflow-hidden">

            {/* Main Content Area */}
            <div className="flex-1 w-full max-w-sm flex flex-col items-center pt-16 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full flex flex-col items-center text-center space-y-8"
                    >
                        {/* Text Content - Positioned ABOVE Visual for Slide 1 as requested, applied globally for consistency */}
                        <div className="space-y-4 max-w-[320px] px-6">
                            <h2 className={`${currentStep === 0 ? "text-xl tracking-widest " + pixelFont.className : "text-3xl font-bold tracking-tight"} text-white leading-tight`}>
                                {slides[currentStep].title}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {slides[currentStep].subtext}
                            </p>
                        </div>

                        {/* Visual Component */}
                        <div className={`relative flex-1 flex items-center justify-center w-full ${currentStep === 0 ? "scale-100 mt-8" : "scale-100"}`}>
                            {slides[currentStep].component}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Action Area */}

            {/* Bottom Action Area */}
            <div className="w-full max-w-sm mb-8 flex flex-col items-center space-y-8">

                {/* Pagination Dots (Gold/Grey) */}
                <div className="flex space-x-3">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-300 ${index === currentStep
                                ? "w-8 h-2 bg-[#FFD600] rounded-full"
                                : "w-2 h-2 bg-gray-600 rounded-full"
                                }`}
                        />
                    ))}
                </div>

                {/* Action Buttons: Next for Slide 1&2, Slider for Slide 3 */}
                {currentStep < slides.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-[#FFD600] rounded-2xl hover:bg-[#F7CE00] active:scale-95 w-full shadow-lg shadow-yellow-900/20"
                    >
                        <span>Next</span>
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                ) : (
                    <SlideToEnter onConfirm={onComplete} />
                )}
            </div>
        </div >
    )
}

// -- Slide To Enter Component --
// (kept largely the same but updated style to match gold theme if needed)

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
        <div className="relative w-[280px] h-16 bg-gray-800/80 rounded-full border border-gray-700/50 backdrop-blur-sm overflow-hidden select-none">
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
                <span className="text-gray-400 font-medium text-sm tracking-wider uppercase animate-pulse">
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
                className="absolute top-1 left-1 w-14 h-14 bg-[#F9DE4B] rounded-full shadow-[0_0_20px_rgba(249,222,75,0.3)] flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
            >
                <ArrowRight className="w-6 h-6 text-black" />
            </motion.div>
        </div>
    )
}
