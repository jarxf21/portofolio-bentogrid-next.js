'use client'

import { CodeBracketIcon, CogIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

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

export function ServicesSection() {
    return (
        <section className="w-full py-20 bg-primary-50">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-4">
                        Services
                    </h2>
                    <p className="text-lg text-primary-950/70 max-w-2xl mx-auto">
                        What I can help you build
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-primary-600 rounded-2xl p-8 shadow-lg border border-primary-500 hover:shadow-2xl transition-all"
                            >
                                <div className="w-14 h-14 bg-[#9EBC8A] rounded-xl flex items-center justify-center mb-5 border border-primary-500">
                                    <Icon className="w-7 h-7 text-primary-950" />
                                </div>
                                <h3 className="text-xl font-bold text-primary-950 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-primary-950/70 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
