"use client"

import { Home, Search, Wallet, User as UserIcon, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
    currentView: string
    onChangeView: (view: string) => void
}

export function BottomNav({ currentView, onChangeView }: BottomNavProps) {
    // Custom Hand component for the middle action emoji
    const HandIcon = ({ className }: { className?: string }) => (
        <span className={cn("text-[26px] leading-none select-none", className)}>👆🏽</span>
    )

    const navItems = [
        { id: "profile", icon: UserIcon, label: "Profile" },
        { id: "trending", icon: TrendingUp, label: "Stats" },
        { id: "swipe", icon: Home, label: "Home" },
        { id: "wallet", icon: Search, label: "Search" },
        { id: "settings", icon: Settings, label: "Settings" },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F1729]/95 backdrop-blur-xl border-t border-white/5 pb-3 pt-2 safe-area-bottom">
            <div className="max-w-md mx-auto flex justify-between items-center px-2 w-full">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onChangeView(item.id)}
                        className={cn(
                            "flex flex-col items-center justify-center flex-1 h-16 space-y-1 transition-all duration-200 relative",
                            currentView === item.id
                                ? "text-[#E5FF53]"
                                : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        <item.icon className={cn("w-[22px] h-[22px]", currentView === item.id ? "stroke-[2.5px] drop-shadow-[0_0_8px_rgba(229,255,83,0.5)] transition-all" : "stroke-2")} />

                        {item.label && (
                            <span className={cn(
                                "text-[9px] font-medium tracking-wide",
                                currentView === item.id ? "font-bold text-[#E5FF53]" : ""
                            )}>
                                {item.label}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}
