import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BackgroundEffects from './BackgroundEffects'

const MESSAGES = [
  'Preparing Your Surprise...',
  'Loading Memories...',
  'Wrapping Your Gift...',
  'Adding Happiness...',
]

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 6 + 2
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(onDone, 500)
          return 100
        }
        return next
      })
    }, 90)
    return () => clearInterval(interval)
  }, [onDone])

  useEffect(() => {
    setMessageIndex(Math.min(MESSAGES.length - 1, Math.floor((progress / 100) * MESSAGES.length)))
  }, [progress])

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-x-hidden bg-gradient-to-br from-blush via-cream to-lavender bg-wave px-4 sm:px-6 lg:px-10">
      <BackgroundEffects items={['✨', '💫', '🌟']} count={20} />
      <div className="relative z-10 flex w-[90vw] sm:w-full max-w-md flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-6xl"
        >
          🎁
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-display font-medium tracking-wide text-burgundy text-lg sm:text-xl lg:text-2xl"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/60 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold via-rose-red to-burgundy"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <span className="font-body text-burgundy/70 text-sm sm:text-base lg:text-lg">{Math.floor(progress)}%</span>
      </div>
    </div>
  )
}
