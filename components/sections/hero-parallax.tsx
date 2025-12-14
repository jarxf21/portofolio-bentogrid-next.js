'use client'

import { urlForImage } from '@/sanity/lib/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { animated, useSpring } from '@react-spring/web'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
    profile?: {
        fullName?: string
        headline?: string
        profileImage?: any
    }
    onScrollDown?: () => void
}

export function HeroSection({ profile, onScrollDown }: HeroSectionProps) {
    // Spring animations
    const titleSpring = useSpring({
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
        delay: 300,
        config: { tension: 200, friction: 20 }
    })

    const subtitleSpring = useSpring({
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0 },
        delay: 500,
        config: { tension: 200, friction: 20 }
    })

    const buttonSpring = useSpring({
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1 },
        delay: 700,
        config: { tension: 200, friction: 20 }
    })

    const imageSpring = useSpring({
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
        delay: 400,
        config: { tension: 150, friction: 20 }
    })

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Left - Text Content */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Badge */}
                    <animated.div
                        style={titleSpring}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 border border-primary-500 rounded-full text-sm"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-primary-950 font-medium">Available for work</span>
                    </animated.div>

                    {/* Title */}
                    <animated.h1
                        style={titleSpring}
                        className="text-5xl lg:text-7xl font-bold text-primary-950 leading-tight"
                    >
                        Hey, I'm<br />
                        <span className="text-primary-900">{profile?.fullName || 'Full Stack Engineer'}</span>
                    </animated.h1>

                    {/* Subtitle */}
                    <animated.p
                        style={subtitleSpring}
                        className="text-xl lg:text-2xl text-primary-800 max-w-lg"
                    >
                        {profile?.headline || 'Building scalable web apps with natural UX'}
                    </animated.p>

                    {/* Buttons */}
                    <animated.div style={buttonSpring} className="flex gap-4 pt-4">
                        <Link
                            href="#projects"
                            className="px-8 py-4 bg-primary-900 text-white rounded-2xl font-bold hover:bg-primary-800 transition-all text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
                        >
                            View Projects
                        </Link>
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-transparent text-primary-950 border-2 border-primary-950 rounded-2xl font-bold hover:bg-primary-950 hover:text-white transition-all text-lg"
                        >
                            Contact
                        </Link>
                    </animated.div>
                </div>

                {/* Right - Profile Image */}
                <animated.div
                    style={imageSpring}
                    className="lg:col-span-5"
                >
                    <div className="relative aspect-square max-w-md mx-auto">
                        {/* Decorative background */}
                        <div className="absolute inset-0 bg-primary-600 rounded-3xl rotate-6 scale-95" />
                        <div className="absolute inset-0 bg-primary-500 rounded-3xl -rotate-3 scale-97" />

                        {/* Image */}
                        <div className="relative bg-primary-400 rounded-3xl overflow-hidden shadow-2xl h-full">
                            {profile?.profileImage ? (
                                <Image
                                    src={urlForImage(profile.profileImage).width(500).height(500).url()}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary-200">
                                    <span className="text-9xl">👤</span>
                                </div>
                            )}
                        </div>

                        {/* Experience badge */}
                        <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                            <span className="text-4xl font-extrabold text-primary-950">2+</span>
                            <span className="block text-sm text-primary-800 font-medium">Years Exp.</span>
                        </div>
                    </div>
                </animated.div>
            </div>

            {/* Scroll indicator */}
            <animated.button
                style={buttonSpring}
                onClick={onScrollDown}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-800 hover:text-primary-950 transition-colors cursor-pointer"
            >
                <span className="text-sm font-medium">Scroll Down</span>
                <ChevronDownIcon className="w-6 h-6 animate-bounce" />
            </animated.button>
        </div>
    )
}
