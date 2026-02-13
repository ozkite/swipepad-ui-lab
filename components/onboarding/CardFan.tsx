"use client"

import Image from "next/image"

// Using specific local assets as requested
// Using specific local assets as requested
// Mapped for correct visual hierarchy:
const cardLeft = "/assets/card-right.png"   // Left Slot: Steph Card
const cardRight = "/assets/card-center.png" // Right Slot: Agroforest Card
const cardCenter = "/assets/card-left.png"  // Center Slot: WIP Card

export function CardFan() {
    return (
        <div className="relative w-full h-80 flex items-center justify-center pointer-events-none select-none">
            {/* Left Card (Back) 
                Position: left-4, top-8
                Style: -rotate-12, scale-90, z-0
                Animation: animate-float, delay-0s
            */}
            <div
                className="absolute left-4 md:left-8 top-8 z-0 animate-float"
                style={{ animationDelay: "0s" }}
            >
                <div className="relative w-40 h-56 md:w-56 md:h-80 -rotate-12 scale-90 rounded-2xl border-4 border-white/10 shadow-xl overflow-hidden bg-gray-800">
                    <Image
                        src={cardLeft}
                        alt="Left Card"
                        fill
                        className="object-cover opacity-90"
                    />
                </div>
            </div>

            {/* Right Card (Back)
                Position: right-4, top-8
                Style: rotate-12, scale-90, z-0
                Animation: animate-float, delay-1s
            */}
            <div
                className="absolute right-4 md:right-8 top-8 z-0 animate-float"
                style={{ animationDelay: "1s" }}
            >
                <div className="relative w-40 h-56 md:w-56 md:h-80 rotate-12 scale-90 rounded-2xl border-4 border-white/10 shadow-xl overflow-hidden bg-gray-800">
                    <Image
                        src={cardRight}
                        alt="Right Card"
                        fill
                        className="object-cover opacity-90"
                    />
                </div>
            </div>

            {/* Center Card (Front)
                Position: centered (left-1/2 -translate-x-1/2), top-0
                Style: rotate-0, scale-100, z-10, shadow-2xl
                Animation: animate-float, delay-2s
            */}
            <div
                className="absolute left-1/2 -translate-x-1/2 top-0 z-10 animate-float"
                style={{ animationDelay: "2s" }}
            >
                <div className="relative w-48 h-64 md:w-64 md:h-96 rotate-0 scale-100 rounded-2xl border-4 border-white/10 shadow-2xl overflow-hidden bg-gray-900">
                    <Image
                        src={cardCenter}
                        alt="Center Card"
                        fill
                        className="object-cover"
                    />

                    {/* Optional Highlight/Sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 md:right-10 text-4xl animate-bounce delay-700 opacity-80">
                ✨
            </div>
        </div>
    )
}
