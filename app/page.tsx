"use client"

import { motion } from "framer-motion"
import ARExperience from "./ar-experience"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ARExperience />
      </motion.div>
    </main>
  )
}

