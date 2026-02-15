"use client"

import { Bell, ShoppingCart, Award } from "lucide-react"
import { Press_Start_2P } from "next/font/google"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface DashboardHeaderProps {
    donationAmount: string
    currency: string
    currentSwipes: number
    targetSwipes: number
    selectedCategory: string
    onSelectCategory: (category: string) => void
    onEditAmount: () => void
    onOpenNotifications?: () => void
    onOpenCart?: () => void
    onOpenLeaderboard?: () => void
}

const categories = ["See All", "Builders", "Eco Projects", "DApps"]

export function DashboardHeader({
    donationAmount,
    currency,
    currentSwipes,
    targetSwipes,
    selectedCategory,
    onSelectCategory,
    onEditAmount,
    onOpenNotifications,
    onOpenCart,
    onOpenLeaderboard
}: DashboardHeaderProps) {
    const progress = Math.min((currentSwipes / targetSwipes) * 100, 100)
    const remaining = Math.max(0, targetSwipes - currentSwipes)

    return (
        <div className="flex flex-col w-full bg-[#0F1729] pb-0.5 pt-1">

            {/* Zone 1: Header Row */}
            <div className="flex items-center justify-between px-4 mb-2">
                {/* Left: Logo */}
                <h1 className={`${pixelFont.className} text-white text-[10px] tracking-widest`}>
                    SwipePad
                </h1>

                {/* Center: Live Donation Pill */}
                <div className="hidden md:flex items-center pl-3 pr-4 py-1 bg-gray-800 rounded-full border border-gray-700/50">
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-gray-200 text-xs font-bold tracking-wide">
                        {donationAmount} {currency}
                    </span>
                </div>
                {/* Mobile visible version of pill */}
                <div className="md:hidden flex items-center pl-2 pr-3 py-0.5 bg-gray-800 rounded-full border border-gray-700/50 mx-2">
                    <span className="relative flex h-1.5 w-1.5 mr-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                    </span>
                    <span className="text-gray-200 text-[10px] font-bold tracking-wide">
                        {donationAmount}
                    </span>
                </div>


                {/* Right: Icon Group */}
                <div className="flex items-center gap-2">
                    {/* Notification Bell */}
                    <button
                        onClick={onOpenNotifications}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700/30"
                    >
                        <Bell className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>

                    {/* Cart History */}
                    <button
                        onClick={onOpenCart}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700/30"
                    >
                        <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>

                    {/* Leaderboard Ribbon */}
                    <button
                        onClick={onOpenLeaderboard}
                        className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-800 flex items-center justify-center text-[#F9DE4B] hover:bg-gray-700 transition-colors border border-gray-700/30"
                    >
                        <Award className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                </div>
            </div>

            {/* Zone 2: Filter Row */}
            <div className="w-full flex flex-nowrap overflow-x-auto scrollbar-hide mb-0.5 no-scrollbar touch-pan-x">
                <div className="flex items-center gap-2 px-4 pr-6 min-w-max">
                    {categories.map((category) => {
                        const isSelected = category === selectedCategory

                        return (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category)}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border shrink-0 ${isSelected
                                    ? "bg-[#F9DE4B] text-black border-[#F9DE4B]"
                                    : "bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-700"
                                    }`}
                            >
                                {category}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Zone 3: Level Tracker - Compressed Height */}
            <div className="px-4 h-auto flex flex-col justify-end gap-1 mb-0 pb-1">
                {/* Row A: Level Info + Edit Amount */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="bg-[#F9DE4B] text-black text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                            LVL 1
                        </span>
                        <span className="text-gray-400 text-[10px] font-medium">
                            <span className="text-gray-200 font-bold">{remaining}</span> swipes to next level
                        </span>
                    </div>

                    <button
                        onClick={onEditAmount}
                        className="text-indigo-400 text-[9px] font-bold hover:text-indigo-300 transition-colors uppercase tracking-wide"
                    >
                        Edit Amount
                    </button>
                </div>

                {/* Row B: Progress Bar */}
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <div
                        className="h-full bg-[#F9DE4B] transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

        </div>
    )
}
