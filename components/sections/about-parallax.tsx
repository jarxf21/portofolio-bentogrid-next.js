'use client'

import { urlForImage } from '@/sanity/lib/image'
import { BriefcaseIcon, CodeBracketIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { animated, useSpring } from '@react-spring/web'
import Image from 'next/image'

interface AboutSectionProps {
    profile?: {
        fullName?: string
        headline?: string
        bio?: any
        skills?: string[]
        profileImage?: any
    }
}

export function AboutSection({ profile }: AboutSectionProps) {
    const contentSpring = useSpring({
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 },
        delay: 200,
        config: { tension: 200, friction: 25 }
    })

    const imageSpring = useSpring({
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
        delay: 300,
        config: { tension: 200, friction: 25 }
    })

    const cardSpring = useSpring({
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0 },
        delay: 500,
        config: { tension: 200, friction: 20 }
    })

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Content */}
                <animated.div style={contentSpring} className="space-y-6">
                    <h2 className="text-4xl lg:text-5xl font-bold text-primary-950">
                        About Me
                    </h2>

                    <p className="text-lg text-primary-800 leading-relaxed">
                        Passionate about building intuitive, high-performance web applications.
                        I specialize in modern JavaScript ecosystems and love turning complex
                        problems into elegant solutions.
                    </p>

                    {/* Info cards */}
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-white rounded-2xl p-4 shadow-md border border-primary-200">
                            <MapPinIcon className="w-8 h-8 text-primary-600 mb-2" />
                            <span className="text-sm text-primary-600 font-medium">Location</span>
                            <p className="text-lg font-bold text-primary-950">Jakarta, Indonesia</p>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-md border border-primary-200">
                            <BriefcaseIcon className="w-8 h-8 text-primary-600 mb-2" />
                            <span className="text-sm text-primary-600 font-medium">Experience</span>
                            <p className="text-lg font-bold text-primary-950">2+ Years</p>
                        </div>
                    </div>

                    {/* Skills */}
                    {profile?.skills && profile.skills.length > 0 && (
                        <animated.div style={cardSpring} className="pt-4">
                            <h3 className="text-xl font-bold text-primary-950 mb-4 flex items-center gap-2">
                                <CodeBracketIcon className="w-6 h-6" />
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.slice(0, 8).map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 bg-primary-600 text-primary-950 rounded-xl text-sm font-medium border border-primary-500"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </animated.div>
                    )}
                </animated.div>

                {/* Right - Visual */}
                <animated.div style={imageSpring} className="relative">
                    <div className="relative aspect-[4/5] max-w-md mx-auto">
                        {/* Background shape */}
                        <div className="absolute inset-0 bg-primary-500 rounded-[3rem] rotate-3" />

                        {/* Image */}
                        <div className="relative bg-primary-600 rounded-[2.5rem] overflow-hidden shadow-2xl h-full">
                            {profile?.profileImage ? (
                                <Image
                                    src={urlForImage(profile.profileImage).width(500).height(600).url()}
                                    alt="About"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
                                    <span className="text-9xl">🧑‍💻</span>
                                </div>
                            )}
                        </div>
                    </div>
                </animated.div>
            </div>
        </div>
    )
}
