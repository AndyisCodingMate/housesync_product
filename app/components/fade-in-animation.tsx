"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInAnimationProps {
  children: ReactNode
  duration?: number
}

export function FadeInAnimation({ children, duration = 0.5 }: FadeInAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: duration }}
    >
      {children}
    </motion.div>
  )
}

export function SlowFadeInAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 1.5 }} // Slower duration for text elements
    >
      {children}
    </motion.div>
  )
}

