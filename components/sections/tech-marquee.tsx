'use client'

import { urlForImage } from '@/sanity/lib/image'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TechItem {
    name: string
    slug: { current: string }
    icon?: any
}

interface TechMarqueeProps {
    technologies: TechItem[]
}

export function TechMarquee({ technologies }: TechMarqueeProps) {
    // Duplicate technologies for seamless loop
    const duplicatedTechs = [...technologies, ...technologies]

    return (
        <section className="w-full py-16 bg-primary-50 overflow-hidden relative border-b border-primary-200">
            <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-primary-950">Tech Stack</h2>
            </div>

            <div className="relative">
                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary-50 to-transparent z-10" />

                {/* Scrolling container */}
                <motion.div
                    className="flex gap-8"
                    animate={{
                        x: [0, -1920],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedTechs.map((tech, index) => (
                        <div
                            key={`${tech.slug.current}-${index}`}
                            className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-primary-600 border border-primary-500 rounded-2xl shadow-md"
                        >
                            {tech.icon ? (
                                <div className="relative w-8 h-8">
                                    <Image
                                        src={urlForImage(tech.icon).width(40).url()}
                                        alt={tech.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-primary-950 font-bold text-sm">
                                    {tech.name.charAt(0)}
                                </div>
                            )}
                            <span className="text-lg font-semibold text-primary-950 whitespace-nowrap">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
