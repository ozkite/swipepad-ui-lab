"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, DollarSign } from "lucide-react"
import { type DonationAmount, type StableCoin, type ConfirmSwipes } from "@/components/amount-selector"

interface SettingsModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (amount: DonationAmount, currency: StableCoin, swipes: ConfirmSwipes) => void
    initialAmount?: DonationAmount
    initialCurrency?: StableCoin
    initialSwipes?: ConfirmSwipes
}

export function SettingsModal({
    isOpen,
    onClose,
    onSave,
    initialAmount = "0.01\u00A2",
    initialCurrency = "cUSD",
    initialSwipes = 20
}: SettingsModalProps) {

    const [amount, setAmount] = useState<DonationAmount>(initialAmount)
    const [currency, setCurrency] = useState<StableCoin>(initialCurrency)
    const [swipes, setSwipes] = useState<ConfirmSwipes>(initialSwipes)

    useEffect(() => {
        if (isOpen) {
            setAmount(initialAmount)
            setCurrency(initialCurrency)
            setSwipes(initialSwipes)
        }
    }, [isOpen, initialAmount, initialCurrency, initialSwipes])

    // Section 1 Options (Updated to exact requested labels)
    const amounts: DonationAmount[] = ["0.01\u00A2", "10\u00A2", "0.50\u00A2", "1 $ Stable"]

    // Section 2 Options (Expanded to 3 options)
    const currencyOptions = [
        {
            id: "cUSD" as StableCoin,
            label: "cUSD",
            color: "text-yellow-400",
            iconBg: "bg-yellow-400/20"
        },
        {
            id: "USDC" as StableCoin,
            label: "USDC",
            color: "text-blue-400",
            iconBg: "bg-blue-400/20"
        },
        {
            id: "USDT" as StableCoin,
            label: "USDT",
            color: "text-teal-400",
            iconBg: "bg-teal-400/20"
        }
    ]

    // Section 3 Options
    const swipeOptions: ConfirmSwipes[] = [20, 30, 50]

    const handleSave = () => {
        onSave(amount, currency, swipes)
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Content Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-x-4 bottom-4 md:top-auto md:bottom-auto md:my-auto md:inset-0 md:max-w-md md:h-fit bg-zinc-900 border border-gray-800 rounded-3xl p-6 z-[70] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white">Donation Settings</h2>
                            <button
                                onClick={onClose}
                                className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-8">
                            {/* Section 1: Donation Amount */}
                            <div>
                                <label className="text-sm font-medium text-gray-400 mb-3 block">
                                    Donation Amount
                                </label>
                                <div className="flex items-center gap-2">
                                    {amounts.map((a) => (
                                        <button
                                            key={a}
                                            onClick={() => setAmount(a)}
                                            className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${amount === a
                                                ? "bg-[#F9DE4B] text-black shadow-lg shadow-yellow-900/20"
                                                : "bg-zinc-800 text-white hover:bg-zinc-700"
                                                }`}
                                        >
                                            {a}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Section 2: Stablecoin Selector (Grid) */}
                            <div>
                                <label className="text-sm font-medium text-gray-400 mb-3 block">
                                    Stablecoin
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {currencyOptions.map((c) => {
                                        const isSelected = currency === c.id
                                        return (
                                            <button
                                                key={c.id}
                                                onClick={() => setCurrency(c.id)}
                                                className={`flex items-center justify-between p-3 rounded-xl bg-zinc-800 border-2 transition-all group ${isSelected
                                                    ? "border-[#F9DE4B] bg-zinc-800"
                                                    : "border-transparent hover:border-zinc-700"
                                                    }`}
                                            >
                                                {/* Left Side Content: Icon + Name */}
                                                <div className="flex items-center gap-2 overflow-hidden">
                                                    <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${c.iconBg} ${c.color}`}>
                                                        <DollarSign className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-white font-bold text-sm truncate">{c.label}</span>
                                                </div>

                                                {/* Right Side Content: Radio Button */}
                                                <div className={`h-5 w-5 rounded-full border-2 shrink-0 grid place-items-center ${isSelected ? "border-[#F9DE4B]" : "border-zinc-600"
                                                    }`}>
                                                    {isSelected && (
                                                        <div className="h-2.5 w-2.5 bg-[#F9DE4B] rounded-full" />
                                                    )}
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Section 3: Swipe Confirmation */}
                            <div>
                                <label className="text-sm font-medium text-gray-400 mb-3 block">
                                    Confirm after (swipes):
                                </label>
                                <div className="flex items-center gap-2">
                                    {swipeOptions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setSwipes(s)}
                                            className={`flex-1 py-3 rounded-full text-sm font-bold transition-all ${swipes === s
                                                ? "bg-[#F9DE4B] text-black shadow-lg shadow-yellow-900/20"
                                                : "bg-zinc-800 text-white hover:bg-zinc-700"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer Action */}
                        <div className="mt-8">
                            <button
                                onClick={handleSave}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-indigo-900/40"
                            >
                                Save Settings
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
