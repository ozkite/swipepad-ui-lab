"use client"

import { motion } from "framer-motion"

export function FloatingHero() {
    const cards = [
        { color: "bg-blue-500", rotation: -6, x: -60, y: -20, delay: 0 },
        { color: "bg-purple-500", rotation: 4, x: 60, y: -10, delay: 0.1 },
        { color: "bg-[#FFD600]", rotation: -2, x: 0, y: 10, delay: 0.2 }, // Center card (Gold)
    ]

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                    animate={{
                        opacity: 1,
                        y: card.y,
                        x: card.x,
                        rotate: card.rotation
                    }}
                    transition={{
                        delay: card.delay,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    className={`absolute w-32 h-44 rounded-2xl shadow-2xl border-2 border-white/20 ${card.color}`}
                >
                    {/* Mock Content */}
                    <div className="w-full h-full p-3 flex flex-col justify-end">
                        <div className="w-full h-2 bg-white/30 rounded-full mb-2" />
                        <div className="w-2/3 h-2 bg-white/30 rounded-full" />
                    </div>
                </motion.div>
            ))}

            {/* Floating Elements (Orbs/Stars) */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 text-4xl"
            >
                ✨
            </motion.div>
        </div>
    )
}
