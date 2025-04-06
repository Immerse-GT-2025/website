"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import VideoEmbed from "../../video-embed"

// Define translations
const translations = {
  en: {
    back: "Back",
    nowPlaying: "Now Playing",
    lyrics: "And here we are together",
  },
  fr: {
    back: "Retour",
    nowPlaying: "En lecture",
    lyrics: "Et nous voilà ensemble",
  },
  es: {
    back: "Volver",
    nowPlaying: "Reproduciendo",
    lyrics: "Y aquí estamos juntos",
  },
}

export default function VideoPage({ params }: { params: { lang: string } }) {
  // Validate language parameter
  const lang = params.lang
  if (!["en", "fr", "es"].includes(lang)) {
    notFound()
  }

  const t = translations[lang as keyof typeof translations]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <VideoEmbed nowPlaying={t.nowPlaying} lyrics={t.lyrics} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <Link href={`/${lang}`} className="text-white/70 hover:text-white flex items-center transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t.back}
        </Link>
      </motion.div>
    </main>
  )
}

