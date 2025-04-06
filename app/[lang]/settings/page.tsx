"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

// Define translations
const translations = {
  en: {
    settings: "Settings",
    dyslexiaMode: "Dyslexia-friendly mode",
    showLyrics: "Show lyrics",
    back: "Back",
  },
  fr: {
    settings: "Paramètres",
    dyslexiaMode: "Mode adapté à la dyslexie",
    showLyrics: "Afficher les paroles",
    back: "Retour",
  },
  es: {
    settings: "Ajustes",
    dyslexiaMode: "Modo para dislexia",
    showLyrics: "Mostrar letras",
    back: "Volver",
  },
}

export default function SettingsPage({ params }: { params: { lang: string } }) {
  // Validate language parameter
  const lang = params.lang
  if (!["en", "fr", "es"].includes(lang)) {
    notFound()
  }

  const t = translations[lang as keyof typeof translations]
  const [dyslexiaMode, setDyslexiaMode] = useState(false)
  const [showLyrics, setShowLyrics] = useState(true)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-lg">
        <motion.h1
          className="text-5xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.settings}
        </motion.h1>

        <div className="space-y-12">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-2xl">{t.dyslexiaMode}</span>
            <Switch checked={dyslexiaMode} onCheckedChange={setDyslexiaMode} />
          </motion.div>

          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-2xl">{t.showLyrics}</span>
            <Switch checked={showLyrics} onCheckedChange={setShowLyrics} />
          </motion.div>
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href={`/${lang}`} className="text-white/70 hover:text-white flex items-center transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.back}
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

