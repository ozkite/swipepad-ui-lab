"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingCart, Sliders, User, Settings } from "lucide-react"
import { Press_Start_2P } from "next/font/google"
import { motion } from "framer-motion"

const pixelFont = Press_Start_2P({ weight: "400", subsets: ["latin"] })

interface SettingsHubProps {
    onBack: () => void
    onOpenCart: () => void
    onOpenPresets: () => void
    onOpenProfile: () => void
}

export function SettingsHub({ onBack, onOpenCart, onOpenPresets, onOpenProfile }: SettingsHubProps) {
    return (
        <div className="bg-[#0D0D0D] h-full overflow-y-auto custom-scrollbar p-6 pb-32 text-white font-sans">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4 sticky top-0 bg-[#0D0D0D]/95 backdrop-blur z-20">
                <div className="flex items-center gap-4">
                    <Settings className="w-6 h-6 text-[#F9DE4B]" />
                    <h2 className={`text-xl font-bold text-[#F9DE4B] ${pixelFont.className}`}>
                        SETTINGS
                    </h2>
                </div>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-2 gap-4">
                {/* Cart/History Box (Full width) */}
                <button
                    onClick={onOpenCart}
                    className="col-span-2 bg-[#1A1A1A] p-5 rounded-xl border border-white/5 flex items-center justify-between group hover:border-[#F9DE4B]/30 hover:bg-[#202020] transition-colors text-left"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingCart className="w-5 h-5 text-[#F9DE4B]" />
                            <h3 className={`text-sm text-white ${pixelFont.className} leading-loose`}>SWIPED CARDS</h3>
                        </div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Donation Cart & History</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F9DE4B]/10 group-hover:text-[#F9DE4B] transition-colors">
                        <span className="text-xl">→</span>
                    </div>
                </button>

                {/* Presets Box */}
                <button
                    onClick={onOpenPresets}
                    className="col-span-1 bg-[#1A1A1A] p-5 rounded-xl border border-white/5 flex flex-col items-start justify-center group hover:border-[#F9DE4B]/30 hover:bg-[#202020] transition-colors text-left"
                >
                    <Sliders className="w-6 h-6 text-[#F9DE4B] mb-4" />
                    <h3 className={`text-xs text-white ${pixelFont.className} mb-2 leading-loose`}>PRESETS</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Edit amounts</p>
                </button>

                {/* Profile Box */}
                <button
                    onClick={onOpenProfile}
                    className="col-span-1 bg-[#1A1A1A] p-5 rounded-xl border border-white/5 flex flex-col items-start justify-center group hover:border-[#F9DE4B]/30 hover:bg-[#202020] transition-colors text-left"
                >
                    <User className="w-6 h-6 text-[#F9DE4B] mb-4" />
                    <h3 className={`text-xs text-white ${pixelFont.className} mb-2 leading-loose`}>PROFILE</h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Edit details</p>
                </button>
            </div>

            <div className="mt-8 text-center opacity-30">
                <p className={`text-[8px] text-white ${pixelFont.className} tracking-widest leading-loose`}>
                    SWIPEPAD VAULT OS v1.0 <br />
                    ALL SYSTEMS NOMINAL
                </p>
            </div>
        </div>
    )
}
