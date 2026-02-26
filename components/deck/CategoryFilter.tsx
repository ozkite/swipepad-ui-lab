"use client"

import { motion } from "framer-motion"

interface CategoryFilterProps {
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

const categories = ["See All", "Builders", "Eco Projects", "DApps", "Agents"]

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="w-full flex overflow-x-auto flex-nowrap whitespace-nowrap gap-3 px-4 pr-10 no-scrollbar py-2 scrollbar-hide">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category === "See All" ? "All" : category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${(category === "See All" ? selectedCategory === "All" : category === selectedCategory)
                        ? "bg-[#F9DE4B] text-black shadow-lg shadow-yellow-900/20"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
