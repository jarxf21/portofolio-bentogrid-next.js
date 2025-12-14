'use client'

import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useRef } from 'react'
import { AboutSection } from './sections/about-parallax'
import { CTASection } from './sections/cta-parallax'
import { HeroSection } from './sections/hero-parallax'
import { ProjectsSection } from './sections/projects-parallax'
import { ServicesSection } from './sections/services-parallax'
import { TechSection } from './sections/tech-parallax'

interface ParallaxHomeProps {
    profile: any
    projects: any[]
    allTech: any[]
    githubUsername?: string
}

export function ParallaxHome({ profile, projects, allTech, githubUsername }: ParallaxHomeProps) {
    const parallaxRef = useRef<IParallax>(null)

    const scrollTo = (page: number) => {
        parallaxRef.current?.scrollTo(page)
    }

    return (
        <Parallax
            ref={parallaxRef}
            pages={6}
            className="bg-primary-100"
        >
            {/* ========== PAGE 0: HERO ========== */}
            {/* Background decorations */}
            <ParallaxLayer offset={0} speed={0.1}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-primary-400/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
                </div>
            </ParallaxLayer>

            {/* Hero content */}
            <ParallaxLayer
                offset={0}
                speed={0.5}
                className="flex items-center justify-center"
            >
                <HeroSection profile={profile} onScrollDown={() => scrollTo(1)} />
            </ParallaxLayer>

            {/* ========== PAGE 1: TECH STACK ========== */}
            <ParallaxLayer offset={1} speed={0.3}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-100 to-primary-50" />
            </ParallaxLayer>

            <ParallaxLayer
                offset={1}
                speed={0.8}
                className="flex items-center justify-center"
            >
                <TechSection technologies={allTech} />
            </ParallaxLayer>

            {/* ========== PAGE 2: ABOUT ========== */}
            <ParallaxLayer offset={2} speed={0.2}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/3 right-20 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
                </div>
            </ParallaxLayer>

            <ParallaxLayer
                offset={2}
                speed={0.6}
                className="flex items-center justify-center"
            >
                <AboutSection profile={profile} />
            </ParallaxLayer>

            {/* ========== PAGE 3: PROJECTS ========== */}
            <ParallaxLayer offset={3} speed={0.1}>
                <div className="absolute inset-0 bg-primary-50" />
            </ParallaxLayer>

            <ParallaxLayer
                offset={3}
                speed={0.7}
                className="flex items-center justify-center"
            >
                <ProjectsSection projects={projects} />
            </ParallaxLayer>

            {/* ========== PAGE 4: SERVICES ========== */}
            <ParallaxLayer offset={4} speed={0.2}>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-50 to-primary-100" />
            </ParallaxLayer>

            <ParallaxLayer
                offset={4}
                speed={0.5}
                className="flex items-center justify-center"
            >
                <ServicesSection />
            </ParallaxLayer>

            {/* ========== PAGE 5: CTA ========== */}
            <ParallaxLayer offset={5} speed={0.3}>
                <div className="absolute inset-0 bg-primary-600" />
            </ParallaxLayer>

            <ParallaxLayer
                offset={5}
                speed={0.9}
                className="flex items-center justify-center"
            >
                <CTASection />
            </ParallaxLayer>
        </Parallax>
    )
}
