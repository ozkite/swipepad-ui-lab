"use client"

import React, { useState } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { ChevronRight } from "lucide-react"
import confetti from "canvas-confetti"

interface SlideToApproveProps {
    onComplete: () => void
}

export function SlideToApprove({ onComplete }: SlideToApproveProps) {
    const controls = useAnimation()
    const x = useMotionValue(0)
    const [completed, setCompleted] = useState(false)

    // Dimensions
    const trackWidth = 240
    const handleSize = 52 // Height matches the padding logic
    const padding = 4
    const trackHeight = handleSize + padding * 2 // 60px
    const maxDrag = trackWidth - handleSize - padding * 2

    // Calculate width of the yellow fill
    // We want it to start from the left edge and end at the right edge of the handle
    // Initial width = handleSize + padding (left padding) - maybe actually just handleSize if we offset
    // The handle is positioned absolutely with "left: 4px" (top-1 left-1 implies 4px if padding is consistent)
    // Actually the handle is `top-1 left-1` which is 0.25rem = 4px.
    // So Handle's left edge starts at 4px.
    // Handle's right edge is at 4px + x + handleSize.
    // We want the yellow bar to go from left: 0 to correct width.
    // Let's make the fill start at `left: padding` and have width `handleSize + x`.
    // That way it looks like a growing capsule.

    const fillWidth = useTransform(x, (currentX) => currentX + handleSize)

    // Transform logic for text opacity based on handle position
    const textOpacity = useTransform(x, [0, maxDrag * 0.7], [1, 0])

    const handleDragEnd = async () => {
        if (x.get() > maxDrag * 0.9) {
            // Success Trigger
            setCompleted(true)
            await controls.start({ x: maxDrag })

            // Allow animation to settle logic
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.8 },
                colors: ['#F9DE4B', '#ffffff']
            })

            setTimeout(() => {
                onComplete()
            }, 500)
        } else {
            // Reset
            controls.start({ x: 0 })
        }
    }

    return (
        <div
            className="relative bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-full overflow-hidden shadow-2xl"
            style={{ width: trackWidth, height: trackHeight }}
        >
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <motion.span
                    className="text-zinc-500 text-base font-normal tracking-wide"
                    initial={{ opacity: 0.5 }}
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                        opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    style={{ opacity: textOpacity }}
                >
                    Enter SwipePad
                </motion.span>

                {/* Shimmer overlay effect on text */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                    style={{ opacity: textOpacity }}
                />
            </div>

            {/* The Yellow Fill Bar with Revealed Text */}
            <motion.div
                className="absolute top-1 left-1 bg-[#F9DE4B] rounded-full z-10 overflow-hidden"
                style={{
                    height: handleSize,
                    width: fillWidth,
                }}
            >
                <div
                    className="absolute left-0 top-0 h-full flex items-center justify-center pointer-events-none"
                    style={{ width: trackWidth - padding * 2 }}
                >
                    <span className="text-black font-extrabold text-sm whitespace-nowrap tracking-wide">
                        20 Free Swipes!!
                    </span>
                </div>
            </motion.div>

            {/* Draggable Handle */}
            <motion.div
                className="absolute top-1 left-1 bg-[#F9DE4B] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing z-20 shadow-[0_0_20px_rgba(249,222,75,0.3)]"
                style={{
                    width: handleSize,
                    height: handleSize,
                    x
                }}
                drag="x"
                dragConstraints={{ left: 0, right: maxDrag }}
                dragElastic={0.05}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                animate={controls}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronRight className="w-6 h-6 text-black" strokeWidth={2.5} />
            </motion.div>
        </div>
    )
}
