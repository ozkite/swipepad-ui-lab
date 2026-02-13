"use client"

import { Home, Search, Wallet, User as UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
    currentView: string
    onChangeView: (view: string) => void
}

export function BottomNav({ currentView, onChangeView }: BottomNavProps) {
    const navItems = [
        { id: "swipe", icon: Home, label: "Home" },
        { id: "trending", icon: Search, label: "Discover" },
        { id: "wallet", icon: Wallet, label: "Wallet" },
        { id: "profile", icon: UserIcon, label: "Profile" },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F1729]/95 backdrop-blur-xl border-t border-white/5 pb-3 pt-2 safe-area-bottom">
            <div className="max-w-md mx-auto flex justify-around items-center px-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onChangeView(item.id)}
                        className={cn(
                            "flex flex-col items-center justify-center w-14 h-10 space-y-0.5 transition-all duration-200",
                            currentView === item.id
                                ? "text-[#FFD600]"
                                : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        <item.icon className={cn("w-5 h-5", currentView === item.id ? "stroke-[2.5px]" : "stroke-2")} />
                        {currentView === item.id && (
                            <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
