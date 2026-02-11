"use client"

import { Edit2 } from "lucide-react"

interface DonationTrackerProps {
    currentSwipes: number
    targetSwipes: number
    donationAmount: string
    currency: string
    onEditAmount: () => void
}

export function DonationTracker({
    currentSwipes,
    targetSwipes,
    donationAmount,
    currency,
    onEditAmount
}: DonationTrackerProps) {
    const progress = Math.min((currentSwipes / targetSwipes) * 100, 100)
    const remaining = targetSwipes - currentSwipes

    return (
        <div className="px-4 py-2">
            {/* Top Row */}
            <div className="flex items-center justify-between mb-2">
                {/* Level Badge + Text */}
                <div className="flex items-center gap-2">
                    <span className="bg-[#F9DE4B] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">LVL 1</span>
                    <span className="text-gray-400 text-xs font-medium">
                        <span className="text-white font-bold">{remaining}</span> swipes to next level
                    </span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full mb-2 overflow-hidden">
                <div
                    className="h-full bg-[#F9DE4B] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">
                    Donating <span className="text-[#F9DE4B] font-bold">{donationAmount} {currency}</span>
                </span>

                <button
                    onClick={onEditAmount}
                    className="text-indigo-400 text-xs font-bold hover:text-indigo-300 transition-colors"
                >
                    Edit Amount
                </button>
            </div>
        </div>
    )
}
