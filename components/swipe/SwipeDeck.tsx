"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ProjectCard, type ProjectCardData } from "@/components/project-card"
import type { Project } from "@/lib/data"

interface SwipeDeckProps {
    projects: Project[]
    onSwipeLeft: (index: number) => void
    onSwipeRight: (index: number) => void
    onRewind: () => void
    onBoost: () => void
    activeIndex: number
}

export function SwipeDeck({ projects, onSwipeLeft, onSwipeRight, onRewind, onBoost, activeIndex }: SwipeDeckProps) {
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
                : 'dapps'),
        socials: {
            github: activeProject.github,
            farcaster: activeProject.farcaster,
            twitter: activeProject.twitter,
            website: activeProject.website,
            linkedin: activeProject.linkedin
        }
    } : null

    // Framer Motion Swipe Logic
    const x = useMotionValue(0)
    const rotate = useTransform(x, [-200, 200], [-10, 10])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

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

    if (!mappedProject) return <div className="text-center text-gray-500 py-10">No more projects!</div>

    return (
        <div className="relative w-full max-w-sm mx-auto h-full flex items-center justify-center">
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
                    key={mappedProject.id || activeIndex} // Use ID if available, else index
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
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
