'use client'

import {
    ComputerDesktopIcon,
    CubeTransparentIcon,
    DevicePhoneMobileIcon,
    ServerIcon
} from '@heroicons/react/24/outline'
import { animated, useTrail } from '@react-spring/web'

const services = [
    {
        icon: ComputerDesktopIcon,
        title: 'Web Development',
        description: 'Custom web applications built with modern technologies like Next.js, React, and Laravel.',
        color: 'bg-blue-500'
    },
    {
        icon: DevicePhoneMobileIcon,
        title: 'Mobile Apps',
        description: 'Cross-platform mobile applications using React Native and Flutter.',
        color: 'bg-purple-500'
    },
    {
        icon: ServerIcon,
        title: 'API Development',
        description: 'RESTful and GraphQL APIs with proper authentication and documentation.',
        color: 'bg-green-500'
    },
    {
        icon: CubeTransparentIcon,
        title: 'UI/UX Design',
        description: 'Beautiful, intuitive interfaces that users love with Figma and modern CSS.',
        color: 'bg-orange-500'
    }
]

export function ServicesSection() {
    const trail = useTrail(services.length, {
        from: { opacity: 0, y: 40, rotateY: -20 },
        to: { opacity: 1, y: 0, rotateY: 0 },
        delay: 200,
        config: { tension: 200, friction: 25 }
    })

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-primary-950 mb-4">
                    Services
                </h2>
                <p className="text-lg text-primary-800 max-w-2xl mx-auto">
                    What I can help you with
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {trail.map((style, index) => {
                    const service = services[index]
                    const Icon = service.icon

                    return (
                        <animated.div
                            key={service.title}
                            style={style}
                            className="group bg-white rounded-3xl p-8 shadow-lg border border-primary-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="flex items-start gap-6">
                                {/* Icon */}
                                <div className={`${service.color} p-4 rounded-2xl text-white group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-8 h-8" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-primary-950 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-primary-700 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </animated.div>
                    )
                })}
            </div>
        </div>
    )
}
