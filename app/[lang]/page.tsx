"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"
import VideoEmbed from "../video-embed"

// Define translations
const translations = {
  en: {
    tagline: "Adaptive AR for Concerts",
    slogan: "Your concert, your way",
    button: "Get started",
    nowPlaying: "Now Playing",
    lyrics: "And here we are together",
  },
  fr: {
    tagline: "RA adaptative pour concerts",
    slogan: "Votre concert, à votre façon",
    button: "Commencer",
    nowPlaying: "En lecture",
    lyrics: "Et nous voilà ensemble",
  },
  es: {
    tagline: "RA adaptativa para conciertos",
    slogan: "Tu concierto, a tu manera",
    button: "Comenzar",
    nowPlaying: "Reproduciendo",
    lyrics: "Y aquí estamos juntos",
  },
}

export default function LangPage({ params }: { params: { lang: string } }) {
  // Validate language parameter
  const lang = params.lang
  if (!["en", "fr", "es"].includes(lang)) {
    notFound()
  }

  const t = translations[lang as keyof typeof translations]

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
              className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="none" fill="#0a0e1a" />
                <path d="M7 14.5C8.5 16.5 15.5 16.5 17 14.5" stroke="#0a0e1a" strokeWidth="2" strokeLinecap="round" />
                <circle cx="8.5" cy="9.5" r="1.5" fill="#0a0e1a" />
                <path
                  d="M15.5 9.5C15.5 10.3284 14.8284 11 14 11C13.1716 11 12.5 10.3284 12.5 9.5C12.5 8.67157 13.1716 8 14 8C14.8284 8 15.5 8.67157 15.5 9.5Z"
                  fill="#0a0e1a"
                />
              </svg>
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <VideoEmbed nowPlaying={t.nowPlaying} lyrics={t.lyrics} />
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

