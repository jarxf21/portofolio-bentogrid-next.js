'use client'

import { urlForImage } from '@/sanity/lib/image'
import { animated, useSpring, useTrail } from '@react-spring/web'
import Image from 'next/image'

interface TechItem {
    name: string
    slug: { current: string }
    icon?: any
}

interface TechSectionProps {
    technologies: TechItem[]
}

export function TechSection({ technologies }: TechSectionProps) {
    // Animated title
    const titleSpring = useSpring({
        from: { opacity: 0, y: -30 },
        to: { opacity: 1, y: 0 },
        delay: 200,
        config: { tension: 200, friction: 20 }
    })

    // Staggered tech items
    const trail = useTrail(technologies.length, {
        from: { opacity: 0, scale: 0.8, y: 20 },
        to: { opacity: 1, scale: 1, y: 0 },
        delay: 300,
        config: { tension: 280, friction: 20 }
    })

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <animated.div style={titleSpring} className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-primary-950 mb-4">
                    Tech Stack
                </h2>
                <p className="text-lg text-primary-800 max-w-2xl mx-auto">
                    Technologies I work with daily
                </p>
            </animated.div>

            {/* Tech Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {trail.map((style, index) => (
                    <animated.div
                        key={technologies[index]?.slug?.current || index}
                        style={style}
                        className="group bg-white rounded-2xl p-6 shadow-lg border border-primary-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex flex-col items-center gap-4">
                            {technologies[index]?.icon ? (
                                <div className="relative w-16 h-16 bg-primary-100 rounded-xl p-3 group-hover:bg-primary-200 transition-colors">
                                    <Image
                                        src={urlForImage(technologies[index].icon).width(80).url()}
                                        alt={technologies[index].name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl group-hover:bg-primary-500 transition-colors">
                                    {technologies[index]?.name?.charAt(0) || '?'}
                                </div>
                            )}
                            <span className="text-lg font-semibold text-primary-950 text-center">
                                {technologies[index]?.name || 'Unknown'}
                            </span>
                        </div>
                    </animated.div>
                ))}
            </div>
        </div>
    )
}
