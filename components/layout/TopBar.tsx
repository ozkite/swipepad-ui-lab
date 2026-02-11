"use client"

import { Trophy, ShoppingCart, User } from "lucide-react"
import { Press_Start_2P } from "next/font/google"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface TopBarProps {
    userProfile: any
    onRegisterProject: () => void
    onProfileClick: () => void
    onSettingsClick: () => void
}

export function TopBar({ userProfile, onRegisterProject, onProfileClick, onSettingsClick }: TopBarProps) {
    return (
        <div className="fixed top-0 left-0 right-0 h-16 bg-[#0F1729]/90 backdrop-blur-md border-b border-gray-800 z-50 flex items-center justify-between px-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
                {/* We can re-add the settings trigger here only if requested, 
            but the prompt specifically says: "Logo: 'SwipePad' in White... Right Icons: Trophy, Cart, Profile".
            It doesn't explicitly mention the Settings Trigger on the Left anymore in Zone 1 description.
            However, the Donation Tracker has an "Edit Amount" button which opens settings.
            Wait, the Prompt says in Part 2A: "Trigger: This is a Popup Modal that only appears when clicking the 'Sliders Icon' (Top-Left of Header)."
            BUT Zone 1 description says "Logo: SwipePad... Layout: Space-between".
            I will keep the Logo on the left. The "Sliders Icon" might correspond to the "Edit Amount" in the tracker zone now, 
            OR I should keep the logic of settings being accessible. 
            Let's stick to Zone 1 specific description: "Logo... Right Icons".
            If the "Sliders Icon" is required from Part 2A instructions, I'll add it. 
            Actually, let's read carefully: "Zone 1: The Header... Logo... Right Icons...". 
            I will prioritize Zone 1 description for visual layout.
            The "Edit Amount" in Zone 3 opens Settings Modal.
        */}
                <h1 className={`${pixelFont.className} text-white text-lg tracking-widest`}>
                    SwipePad
                </h1>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-4">
                {/* Leaderboard Trophy */}
                <button className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-[#F9DE4B] hover:bg-gray-800 transition-colors">
                    <Trophy className="w-5 h-5" />
                </button>

                {/* Cart/History */}
                <button className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-blue-400 hover:bg-gray-800 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                </button>

                {/* User Profile */}
                <button
                    onClick={onProfileClick}
                    className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors"
                >
                    <img
                        src={userProfile.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </button>
            </div>
        </div>
    )
}
