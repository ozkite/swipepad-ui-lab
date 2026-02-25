"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ProjectCard, type ProjectCardData } from "@/components/project-card"
import type { Project } from "@/lib/data"
import { ThumbsUp, X, Zap } from "lucide-react"

interface SwipeDeckProps {
    projects: Project[]
    onSwipeLeft: (index: number) => void
    onSwipeRight: (index: number) => void
    onRewind: () => void
    onBoost: () => void
    activeIndex: number
    isListMode?: boolean
    onClearSearch?: () => void
}

export function SwipeDeck({ projects, onSwipeLeft, onSwipeRight, onRewind, onBoost, activeIndex, isListMode = false, onClearSearch }: SwipeDeckProps) {
    const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null)

    // We show the active card and the next one for the stack effect
    const activeProject = projects[activeIndex]
    const nextProject = projects[activeIndex + 1]

    // Map Project to ProjectCardData
    const mappedProject: ProjectCardData | null = activeProject ? {
        id: activeProject.id,
        name: activeProject.name,
        image: activeProject.imageUrl,
        description: activeProject.description, // Pass description through
        category: activeProject.category,
        categoryType: activeProject.categoryType || (activeProject.category === "Regeneration" || activeProject.category === "Climate Action" || activeProject.category === "Nature"
            ? 'eco'
            : activeProject.category === "Social Impact" || activeProject.category === "Open Source"
                ? 'builders'
                : 'apps'),
        socials: {
            github: activeProject.github,
            farcaster: activeProject.farcaster,
            twitter: activeProject.twitter,
            website: activeProject.website,
            linkedin: activeProject.linkedin
        },
        boostAmount: activeProject.boostAmount
    } : null

    // Framer Motion Swipe Logic
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-10, 10])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

    // Visual Feedback Transforms
    const likeOpacity = useTransform(x, [20, 100], [0, 1])
    const nopeOpacity = useTransform(x, [-20, -100], [0, 1])
    const bgTint = useTransform(
        x,
        [-200, 0, 200],
        ["rgba(239, 68, 68, 0.1)", "rgba(0,0,0,0)", "rgba(34, 197, 94, 0.1)"]
    )

    const handleDragEnd = (event: any, info: any) => {
        const threshold = 100
        if (info.offset.x > threshold) {
            setExitDirection("right")
            onSwipeRight(activeIndex)
        } else if (info.offset.x < -threshold) {
            setExitDirection("left")
            onSwipeLeft(activeIndex)
        }
    }

    // Variants for animation
    const variants = {
        enter: { scale: 0.95, opacity: 0, y: 20 },
        center: { scale: 1, opacity: 1, y: 0, x: 0, rotate: 0 },
        exit: (direction: "left" | "right") => ({
            x: direction === "left" ? -1000 : 1000,
            opacity: 0,
            rotate: direction === "left" ? -20 : 20,
            transition: { duration: 0.3 }
        }),
    }

    const listContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const listItemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    if (!mappedProject && !isListMode && projects.length === 0) return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-gray-500 mb-4">No projects found</p>
            {onClearSearch && (
                <button
                    onClick={onClearSearch}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    View All Projects
                </button>
            )}
        </div>
    )

    if (isListMode) {
        return (
            <motion.div
                variants={listContainerVariants}
                initial="hidden"
                animate="show"
                className="w-full h-full overflow-y-auto px-4 pb-20 pt-2 space-y-3 no-scrollbar"
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        variants={listItemVariants}
                        className="bg-gray-900/80 border border-gray-800 p-3 rounded-xl flex gap-3 items-center backdrop-blur-sm"
                    >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-800">
                            <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-bold text-sm truncate">{project.name}</h3>
                            <p className="text-gray-400 text-xs truncate">{project.description}</p>
                            <div className="flex gap-2 mt-1">
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300">
                                    {project.category}
                                </span>
                                {project.boostAmount && project.boostAmount > 0 ? (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 flex items-center gap-1">
                                        🔥 Trending
                                    </span>
                                ) : null}
                            </div>
                        </div>

                        {/* Pulse Effect for Top Item */}
                        {index === 0 && project.boostAmount && project.boostAmount > 0 && (
                            <motion.button
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                onClick={onBoost}
                                className="p-2 rounded-full bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors"
                            >
                                <Zap className="w-4 h-4" />
                            </motion.button>
                        )}
                    </motion.div>
                ))}
                {projects.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <p className="text-gray-500 text-sm mb-4">No matching projects found</p>
                        {onClearSearch && (
                            <button
                                onClick={onClearSearch}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                            >
                                View All Projects
                            </button>
                        )}
                    </div>
                )}
            </motion.div>
        )
    }

    return (
        <div className="relative w-full max-w-sm mx-auto h-full flex items-center justify-center">
            {/* Background Tint Overlay */}
            <motion.div style={{ backgroundColor: bgTint }} className="absolute inset-0 pointer-events-none z-0 rounded-3xl" />
            {/* Background Card (Next Project) */}
            {nextProject && (
                <div className="absolute top-0 w-full h-full p-4 scale-95 opacity-50 translate-y-4 -z-10 bg-gray-900 rounded-3xl">
                    {/* We just render a placeholder visual or the simplified card without interaction */}
                    <div className="w-full h-full bg-gray-800 rounded-2xl border border-gray-700 opacity-50"></div>
                </div>
            )}

            {/* Image Preloader */}
            <div className="hidden" aria-hidden="true">
                {projects[activeIndex + 1]?.imageUrl && (
                    <img src={projects[activeIndex + 1].imageUrl} alt="" />
                )}
                {projects[activeIndex + 2]?.imageUrl && (
                    <img src={projects[activeIndex + 2].imageUrl} alt="" />
                )}
            </div>

            <AnimatePresence initial={false} custom={exitDirection}>
                <motion.div
                    key={mappedProject?.id || activeIndex} // Use ID if available, else index
                    custom={exitDirection}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={handleDragEnd}
                    style={{ x, rotate, opacity }}
                    className="absolute w-full h-full z-10 cursor-grab active:cursor-grabbing"
                >
                    {/* Like Overlay */}
                    <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-50 pointer-events-none transform -rotate-12 bg-green-500/90 text-white px-4 py-2 rounded-lg border-4 border-white font-black text-2xl shadow-xl">
                        LIKE
                    </motion.div>

                    {/* Nope Overlay */}
                    <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-50 pointer-events-none transform rotate-12 bg-red-500/90 text-white px-4 py-2 rounded-lg border-4 border-white font-black text-2xl shadow-xl">
                        SKIP
                    </motion.div>
                    {mappedProject && (
                        <ProjectCard
                            project={mappedProject}
                            onSwipeLeft={() => {
                                setExitDirection("left")
                                onSwipeLeft(activeIndex)
                            }}
                            onSwipeRight={() => {
                                setExitDirection("right")
                                onSwipeRight(activeIndex)
                            }}
                            onRewind={onRewind}
                            // Mock Handlers for now
                            onBoost={onBoost}
                            onShare={() => console.log("Share")}
                            onReport={() => console.log("Report")}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
