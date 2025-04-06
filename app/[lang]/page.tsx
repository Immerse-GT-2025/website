"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Settings, ZoomIn, Languages, Type, Grid, User, Info } from "lucide-react"
import VideoEmbed from "../video-embed"
import { useState } from "react"

// Define translations
const translations = {
  en: {
    tagline: "Adaptive AR for Concerts",
    slogan: "Your concert, your way",
    button: "Get started",
    nowPlaying: "Now Playing",
    lyrics: "And here we are together",
    info: "Experience concerts in a whole new way with ClarifiAI's AR Glasses",
    featureZoom: "Smart performer tracking",
    featureLanguage: "Multi-language support",
    featureAccess: "Accessibility features",
  },
  fr: {
    tagline: "RA adaptative pour concerts",
    slogan: "Votre concert, à votre façon",
    button: "Commencer",
    nowPlaying: "En lecture",
    lyrics: "Et nous voilà ensemble",
    info: "Vivez les concerts d'une manière totalement nouvelle avec les lunettes RA de ClarifiAI",
    featureZoom: "Suivi intelligent des artistes",
    featureLanguage: "Support multilingue",
    featureAccess: "Fonctionnalités d'accessibilité",
  },
  es: {
    tagline: "RA adaptativa para conciertos",
    slogan: "Tu concierto, a tu manera",
    button: "Comenzar",
    nowPlaying: "Reproduciendo",
    lyrics: "Y aquí estamos juntos",
    info: "Experimenta conciertos de una forma totalmente nueva con las gafas RA de ClarifiAI",
    featureZoom: "Seguimiento inteligente de artistas",
    featureLanguage: "Soporte multilingüe",
    featureAccess: "Características de accesibilidad",
  },
}

export default function LangPage({ params }: { params: { lang: string } }) {
  // Validate language parameter
  const lang = params.lang
  if (!["en", "fr", "es"].includes(lang)) {
    notFound()
  }

  const t = translations[lang as keyof typeof translations]
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(false)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center md:justify-start mb-4">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mr-4 overflow-hidden"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/logo.png" 
                alt="ClarifiAI Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              clarifiAI
            </motion.h1>
          </div>
          <motion.p
            className="text-xl md:text-2xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t.tagline}
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {t.slogan}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href={`/${lang}/video`} className="main-button inline-block">
              {t.button}
            </Link>
          </motion.div>
          
          {/* Feature description based on active control */}
          {activeFeature && (
            <motion.div
              className="mt-8 p-4 bg-black/30 backdrop-blur-sm rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <h3 className="text-xl font-semibold mb-2">
                {activeFeature === 'zoom' && t.featureZoom}
                {activeFeature === 'language' && t.featureLanguage}
                {activeFeature === 'accessibility' && t.featureAccess}
                {activeFeature === 'info' && 'ClarifiAI'}
              </h3>
              <p className="text-white/80">
                {activeFeature === 'zoom' && 'Automatically follows performers on stage, zooming in at key moments.'}
                {activeFeature === 'language' && 'Switch between lyrics in English, Spanish, or French with a simple swipe.'}
                {activeFeature === 'accessibility' && 'Customize text size, enable dyslexia-friendly mode, and high contrast settings.'}
                {activeFeature === 'info' && t.info}
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <div className="relative">
            <VideoEmbed nowPlaying={t.nowPlaying} lyrics={t.lyrics} />
            
            {/* AR Controls - Appear on hover */}
            {showControls && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Left Control */}
                <motion.button 
                  className="spectacles-control-button left-control"
                  onMouseEnter={() => setActiveFeature('language')}
                  onMouseLeave={() => setActiveFeature(null)}
                  onClick={(e) => { e.stopPropagation(); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <Languages className="w-5 h-5" />
                </motion.button>
                
                {/* Top Control */}
                <motion.button 
                  className="spectacles-control-button top-control" 
                  onMouseEnter={() => setActiveFeature('info')}
                  onMouseLeave={() => setActiveFeature(null)}
                  onClick={(e) => { e.stopPropagation(); }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <Info className="w-5 h-5" />
                </motion.button>
                
                {/* Right Control */}
                <motion.button 
                  className="spectacles-control-button right-control" 
                  onMouseEnter={() => setActiveFeature('zoom')}
                  onMouseLeave={() => setActiveFeature(null)}
                  onClick={(e) => { e.stopPropagation(); }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <ZoomIn className="w-5 h-5" />
                </motion.button>
                
                {/* Bottom Control */}
                <motion.button 
                  className="spectacles-control-button bottom-control" 
                  onMouseEnter={() => setActiveFeature('accessibility')}
                  onMouseLeave={() => setActiveFeature(null)}
                  onClick={(e) => { e.stopPropagation(); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ pointerEvents: 'auto' }}
                >
                  <Type className="w-5 h-5" />
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute top-4 right-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Link href={`/${lang}/settings`}>
          <Settings className="w-6 h-6 text-white/70 hover:text-white transition-colors" />
        </Link>
      </motion.div>
    </main>
  )
}

