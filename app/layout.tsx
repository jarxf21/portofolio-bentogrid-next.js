import { CommandPaletteProvider } from '@/components/command-palette'
import type { Metadata } from 'next'
import { Dancing_Script } from 'next/font/google'
import './globals.css'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-calligraphy',
})

export const metadata: Metadata = {
  title: {
    default: 'Portfolio | Engineering Natural Growth',
    template: '%s | Portfolio',
  },
  description: 'Full Stack Engineer building scalable, user-centric web applications with a focus on natural design and technical precision.',
  keywords: ['portfolio', 'full-stack engineer', 'next.js', 'react', 'typescript', 'sage theme', 'natural design'],
  authors: [{ name: 'Fajar' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio',
    images: [
      {
        url: '/og-image.png', // We should ensure this exists or is generated
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Engineering Natural Growth',
    description: 'Full Stack Engineer building scalable web applications.',
    creator: '@yourusername'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dancingScript.variable} bg-primary-50 text-primary-950 antialiased selection:bg-primary-200 selection:text-primary-900`}>
        <CommandPaletteProvider>
          {children}
        </CommandPaletteProvider>
      </body>
    </html>
  )
}
