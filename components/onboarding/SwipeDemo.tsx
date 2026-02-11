"use client"

import { motion } from "framer-motion"
import { Hand } from "lucide-react"

export function SwipeDemo() {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Background Card (Left/Skip) */}
            <motion.div
                animate={{
                    x: [-10, -50, -10],
                    rotate: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0 }}
                className="absolute w-32 h-48 bg-red-500/20 rounded-2xl border-2 border-red-500/50 flex items-center justify-center"
            >
                <span className="text-red-500 font-bold">SKIP</span>
            </motion.div>

            {/* Background Card (Right/Like) */}
            <motion.div
                animate={{
                    x: [10, 50, 10],
                    rotate: [0, 10, 0],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                className="absolute w-32 h-48 bg-green-500/20 rounded-2xl border-2 border-green-500/50 flex items-center justify-center"
            >
                <span className="text-green-500 font-bold">LIKE</span>
            </motion.div>

            {/* Main Card */}
            <div className="relative w-36 h-52 bg-slate-800 rounded-2xl border border-gray-600 shadow-xl overflow-hidden z-10">
                <div className="w-full h-3/5 bg-gray-700" />
                <div className="p-3">
                    <div className="w-3/4 h-3 bg-gray-600 rounded mb-2" />
                    <div className="w-1/2 h-2 bg-gray-600 rounded" />
                </div>

                {/* Hand Cursor Animation */}
                <motion.div
                    animate={{
                        x: [0, 60, 0, -60, 0],
                        y: [0, 10, 0, 10, 0],
                        rotate: [0, 15, 0, -15, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute bottom-4 left-1/2 -ml-6"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150" />
                        <Hand className="w-12 h-12 text-[#FFD600] fill-current stroke-black stroke-2 drop-shadow-lg" />
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
