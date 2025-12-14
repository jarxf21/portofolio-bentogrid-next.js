'use client'

import { ChevronLeftIcon, ChevronRightIcon, CodeBracketIcon, CogIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const services = [
    {
        icon: CodeBracketIcon,
        title: 'Web Development',
        description: 'Full-stack web applications using modern frameworks and best practices',
    },
    {
        icon: CogIcon,
        title: 'API Integration',
        description: 'Seamless integration with third-party APIs and custom backend services',
    },
    {
        icon: RocketLaunchIcon,
        title: 'SaaS MVP Build',
        description: 'From concept to launch, building scalable SaaS minimum viable products',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12
        }
    }
}

const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

// Reusable Service Card
function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
    const Icon = service.icon
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary-600 rounded-2xl p-8 shadow-lg border border-primary-500 cursor-pointer h-full"
        >
            {/* Icon with rotate on hover */}
            <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 bg-[#9EBC8A] rounded-xl flex items-center justify-center mb-5 border border-primary-500"
            >
                <Icon className="w-7 h-7 text-primary-950" />
            </motion.div>
            <h3 className="text-xl font-bold text-primary-950 mb-3">
                {service.title}
            </h3>
            <p className="text-primary-950/70 leading-relaxed">
                {service.description}
            </p>
        </motion.div>
    )
}

export function ServicesSection() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.offsetWidth * 0.85
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -cardWidth : cardWidth,
                behavior: 'smooth'
            })
        }
    }

    return (
        <section className="w-full py-12 bg-primary-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Title with slide down animation */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={titleVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-4">
                        Services
                    </h2>
                    <p className="text-lg text-primary-950/70 max-w-2xl mx-auto">
                        What I can help you build
                    </p>
                </motion.div>

                {/* MOBILE: Horizontal Swipeable Cards */}
                <div className="md:hidden relative">
                    {/* Scroll Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 z-10 -ml-2">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-2 rounded-full bg-white shadow-lg border border-primary-200 ${canScrollLeft ? 'opacity-100' : 'opacity-30'}`}
                        >
                            <ChevronLeftIcon className="w-5 h-5 text-primary-950" />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-0 z-10 -mr-2">
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-2 rounded-full bg-white shadow-lg border border-primary-200 ${canScrollRight ? 'opacity-100' : 'opacity-30'}`}
                        >
                            <ChevronRightIcon className="w-5 h-5 text-primary-950" />
                        </button>
                    </div>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-[85%] snap-center"
                            >
                                <ServiceCard service={service} index={index} />
                            </div>
                        ))}
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {services.map((_, index) => (
                            <div
                                key={index}
                                className="w-2 h-2 rounded-full bg-primary-300"
                            />
                        ))}
                    </div>
                </div>

                {/* DESKTOP: Grid Layout */}
                <motion.div
                    className="hidden md:grid md:grid-cols-3 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {services.map((service, index) => (
                        <motion.div key={index} variants={cardVariants}>
                            <ServiceCard service={service} index={index} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
