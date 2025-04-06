"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <motion.h1
        className="text-6xl font-bold mb-20 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Choose language
      </motion.h1>
      <div className="flex flex-col md:flex-row gap-6">
        {["fr", "en", "es"].map((lang, index) => (
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <Link href={`/${lang}`} className="language-button inline-block">
              {lang === "fr" ? "Français" : lang === "en" ? "English" : "Español"}
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}

