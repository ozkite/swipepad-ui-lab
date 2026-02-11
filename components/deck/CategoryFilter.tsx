"use client"

import { motion } from "framer-motion"

interface CategoryFilterProps {
    selectedCategory: string
    onSelectCategory: (category: string) => void
}

const categories = ["See All", "Builders", "Eco Projects", "DApps"]

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="w-full overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center space-x-3 px-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category === "See All" ? "All" : category)} // Map "See All" to a distinct value or keep strings simple
                        className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${(category === "See All" && selectedCategory === "All") || category === selectedCategory
                                ? "bg-[#F9DE4B] text-black shadow-lg shadow-yellow-900/20"
                                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    )
}
