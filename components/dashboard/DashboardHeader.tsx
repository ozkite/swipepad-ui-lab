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
        <div className="flex flex-col w-full bg-[#0F1729] pb-2 pt-2">

            {/* Zone 1: Header Row */}
            <div className="flex items-center justify-between px-4 mb-4">
                {/* Left: Logo */}
                <h1 className={`${pixelFont.className} text-white text-base tracking-widest`}>
                    SwipePad
                </h1>

                {/* Center: Live Donation Pill */}
                <div className="hidden md:flex items-center pl-3 pr-4 py-1.5 bg-gray-800 rounded-full border border-gray-700/50">
                    {/* Hidden on small screens if we want to prioritize logo and icons, 
                        or we can keep it if space permits. 
                        The prompt asks to "Add Logo... Center: Keep Pill... Right: Icons". 
                        On mobile, space is tight. 
                        Let's try to keep all 3. 
                        Maybe make the pill smaller or reduce text? 
                        Actually, let's keep it visible. */}
                    <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-gray-200 text-xs font-bold tracking-wide">
                        {donationAmount} {currency}
                    </span>
                </div>
                {/* Mobile visible version of pill? 
                   If the user wants proper 3-column layout on mobile, 
                   Logo | Pill | Icons might be too crowded.
                   However, the reference image shows Pill on left, Icons on right, NO Logo? 
                   The USER REQUEST says "Missing Brand: The SwipePad logo is completely missing... Add SwipePad Logo... Center: Keep Pill".
                   I will assume the Pill should be there.
                */}
                <div className="md:hidden flex items-center pl-2 pr-3 py-1 bg-gray-800 rounded-full border border-gray-700/50 mx-2">
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
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700/30"
                    >
                        <Bell className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    {/* Cart History */}
                    <button
                        onClick={onOpenCart}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors border border-gray-700/30"
                    >
                        <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    </button>

                    {/* Leaderboard Ribbon */}
                    <button
                        onClick={onOpenLeaderboard}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-[#F9DE4B] hover:bg-gray-700 transition-colors border border-gray-700/30"
                    >
                        <Award className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>

            {/* Zone 2: Filter Row */}
            <div className="w-full flex flex-nowrap overflow-x-auto scrollbar-hide mb-6 no-scrollbar touch-pan-x">
                <div className="flex items-center gap-3 px-4 pr-6 min-w-max">
                    {categories.map((category) => {
                        const isSelected = (category === "See All" && selectedCategory === "Regeneration" || selectedCategory === "All") || category === selectedCategory

                        return (
                            <button
                                key={category}
                                onClick={() => onSelectCategory(category === "See All" ? "All" : category)}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border shrink-0 ${isSelected
                                    ? "bg-[#F9DE4B] text-black border-[#F9DE4B]"
                                    : "bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700"
                                    }`}
                            >
                                {category}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Zone 3: Level Tracker */}
            <div className="px-4 space-y-2">
                {/* Row A: Level Info */}
                <div className="flex items-center gap-3">
                    <span className="bg-[#F9DE4B] text-black text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                        LVL 1
                    </span>
                    <span className="text-gray-400 text-xs font-medium">
                        <span className="text-gray-200 font-bold">{remaining}</span> swipes to next level
                    </span>
                </div>

                {/* Row B: Progress Bar */}
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#F9DE4B] transition-all duration-300 ease-out rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Row C: Settings Footer */}
                <div className="flex items-center justify-between pt-1">
                    <span className="text-gray-500 text-xs font-medium">
                        Donating <span className="text-[#F9DE4B] font-bold">{donationAmount} {currency}</span>
                    </span>

                    <button
                        onClick={onEditAmount}
                        className="text-indigo-400 text-[10px] font-bold hover:text-indigo-300 transition-colors uppercase tracking-wide"
                    >
                        Edit Amount
                    </button>
                </div>
            </div>

        </div>
    )
}
