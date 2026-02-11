"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Zap, CheckCircle2 } from "lucide-react"

interface BoostModalProps {
    isOpen: boolean
    onClose: () => void
    project?: { name: string; imageUrl?: string }
}

const presets = [
    { amount: 1, label: "1 Day Exposure", value: "1 Day" },
    { amount: 5, label: "1 Week Exposure", value: "1 Week", badge: "Best Value" },
    { amount: 15, label: "1 Month Exposure", value: "1 Month" }
]

export function BoostModal({ isOpen, onClose, project }: BoostModalProps) {
    const [selectedAmount, setSelectedAmount] = useState<number | "custom">(5)
    const [customAmount, setCustomAmount] = useState<string>("")

    const handleConfirm = () => {
        // Logic to process boost would go here
        console.log("Boosting project:", project?.name, "Amount:", selectedAmount === "custom" ? customAmount : selectedAmount)
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-x-4 bottom-4 md:top-auto md:bottom-auto md:my-auto md:inset-0 md:max-w-md md:h-fit bg-[#0F1729] border border-gray-800 rounded-3xl p-6 z-[90] shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Zap className="w-6 h-6 text-[#FFD600] fill-current" />
                                <h2 className="text-xl font-bold text-white">
                                    Boost {project?.name ? project.name : "Project"}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {project?.imageUrl && (
                            <div className="mb-6 rounded-xl overflow-hidden h-32 relative">
                                <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1729] to-transparent"></div>
                                <p className="absolute bottom-2 left-4 text-gray-300 text-sm">Boosting:</p>
                            </div>
                        )}
                        {!project?.imageUrl && <p className="text-gray-400 mb-4 text-sm">Boosting: <span className="text-white font-bold">{project?.name}</span></p>}


                        {/* Content */}
                        <div className="space-y-6">
                            <p className="text-gray-400 text-sm">Select boost amount:</p>

                            {/* Presets Row */}
                            <div className="grid grid-cols-3 gap-3">
                                {presets.map((preset) => (
                                    <button
                                        key={preset.amount}
                                        onClick={() => setSelectedAmount(preset.amount)}
                                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${selectedAmount === preset.amount
                                                ? "bg-slate-800 border-white/20 ring-2 ring-[#FFD600]"
                                                : "bg-slate-800/50 border-slate-700 hover:bg-slate-800"
                                            }`}
                                    >
                                        {preset.badge && (
                                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#FFD600] text-black text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                                {preset.badge}
                                            </span>
                                        )}
                                        <span className="text-2xl font-bold text-white mb-1">${preset.amount}</span>
                                        {/* <span className="text-[10px] text-gray-400 text-center leading-tight">{preset.label}</span> */}
                                        {/* The visual reference only showed just the amount inside the box initially, 
                                            but let's respect the "Option 1: $1 | 1 Day Exposure" requirement. 
                                            However, the provided image shows just "$ 1" large inside. 
                                            I'll stick to the provided visual reference of the boxes. 
                                            Wait, the text says "Option 1: ... (Large Yellow text) | ... (Grey text)".
                                            Let's put the info below or inside nicely. 
                                        */}
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount */}
                            <button
                                onClick={() => setSelectedAmount("custom")}
                                className={`w-full py-4 rounded-xl border transition-all text-center font-medium ${selectedAmount === "custom"
                                        ? "bg-slate-800 border-white/20 ring-2 ring-[#FFD600] text-white"
                                        : "bg-slate-800/50 border-slate-700 text-gray-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                Custom Amount
                            </button>

                            {selectedAmount === "custom" && (
                                <div className="mt-2">
                                    <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Enter Amount ($)</label>
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        placeholder="25"
                                        className="w-full bg-zinc-800 border border-[#FFD600] rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-[#FFD600]"
                                        autoFocus
                                    />
                                </div>
                            )}

                        </div>

                        {/* Footer Action */}
                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-2xl transition-all shadow-lg shadow-indigo-900/40 flex items-center justify-center gap-2"
                            >
                                <Zap className="w-5 h-5 fill-current text-[#FFD600]" />
                                Boost Project
                            </button>
                        </div>

                        <p className="text-center text-xs text-gray-500 mt-4">
                            Boosted projects get higher visibility in the feed
                        </p>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
