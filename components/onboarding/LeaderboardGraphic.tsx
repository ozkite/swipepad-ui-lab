"use client"

import { motion } from "framer-motion"
import { Crown, Trophy, Medal } from "lucide-react"

export function LeaderboardGraphic() {
    const ranks = [
        { rank: 2, height: 100, color: "bg-slate-700", icon: <Medal className="w-6 h-6 text-gray-300" />, delay: 0.2 },
        { rank: 1, height: 140, color: "bg-[#FFD600]", icon: <Crown className="w-8 h-8 text-black fill-current" />, delay: 0 },
        { rank: 3, height: 80, color: "bg-amber-700", icon: <Trophy className="w-5 h-5 text-amber-200" />, delay: 0.4 },
    ]

    return (
        <div className="relative w-64 h-64 flex items-end justify-center gap-3 pb-4">
            {ranks.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: item.height, opacity: 1 }}
                    transition={{
                        delay: item.delay,
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                    }}
                    className={`w-16 rounded-t-lg relative flex flex-col items-center justify-start pt-4 shadow-lg ${item.color}`}
                >
                    {item.icon}
                    <div className={`mt-2 font-bold ${item.rank === 1 ? 'text-black text-xl' : 'text-white/80'}`}>
                        #{item.rank}
                    </div>
                </motion.div>
            ))}

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], y: -100, x: (Math.random() - 0.5) * 50 }}
                    transition={{
                        repeat: Infinity,
                        duration: 2 + Math.random(),
                        delay: Math.random() * 2,
                        ease: "easeOut"
                    }}
                    className="absolute bottom-10 w-2 h-2 bg-[#FFD600] rounded-full"
                    style={{ left: '50%' }}
                />
            ))}
        </div>
    )
}
