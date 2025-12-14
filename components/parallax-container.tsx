'use client'

import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax'
import { ReactNode, useRef } from 'react'

interface ParallaxPageProps {
    children: ReactNode
    pages?: number
}

// Hook untuk akses parallax scroll dari child components
export function useParallaxScroll() {
    return useRef<IParallax>(null)
}

export function ParallaxPage({ children, pages = 6 }: ParallaxPageProps) {
    const parallaxRef = useRef<IParallax>(null)

    return (
        <Parallax
            ref={parallaxRef}
            pages={pages}
            className="bg-primary-100"
        >
            {children}
        </Parallax>
    )
}

// Pre-built parallax layers with common effects
interface ParallaxSectionProps {
    children: ReactNode
    offset: number
    speed?: number
    factor?: number
    className?: string
}

export function ParallaxSection({
    children,
    offset,
    speed = 1,
    factor = 1,
    className = ""
}: ParallaxSectionProps) {
    return (
        <ParallaxLayer
            offset={offset}
            speed={speed}
            factor={factor}
            className={className}
        >
            {children}
        </ParallaxLayer>
    )
}

// Background layer (moves slower for depth effect)
interface BackgroundLayerProps {
    children: ReactNode
    offset: number
    speed?: number
}

export function BackgroundLayer({
    children,
    offset,
    speed = 0.2
}: BackgroundLayerProps) {
    return (
        <ParallaxLayer
            offset={offset}
            speed={speed}
            className="pointer-events-none"
        >
            {children}
        </ParallaxLayer>
    )
}

// Foreground layer (moves faster)
export function ForegroundLayer({
    children,
    offset,
    speed = 1.5
}: BackgroundLayerProps) {
    return (
        <ParallaxLayer
            offset={offset}
            speed={speed}
        >
            {children}
        </ParallaxLayer>
    )
}

// Floating element with custom speed
interface FloatingElementProps {
    children: ReactNode
    offset: number
    speed?: number
    horizontal?: boolean
    sticky?: { start: number; end: number }
}

export function FloatingElement({
    children,
    offset,
    speed = 0.5,
    horizontal = false,
    sticky
}: FloatingElementProps) {
    return (
        <ParallaxLayer
            offset={offset}
            speed={speed}
            horizontal={horizontal}
            sticky={sticky}
            className="pointer-events-none"
        >
            {children}
        </ParallaxLayer>
    )
}
