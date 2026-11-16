import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import BackgroundEffects from './BackgroundEffects'
import CONFIG from '../config'

function grandFinale() {
  const end = Date.now() + 3000
  ;(function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 }, colors: ['#D4AF37', '#C94F6D', '#AEE1F9', '#D9CFF0'] })
    confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 }, colors: ['#D4AF37', '#C94F6D', '#AEE1F9', '#D9CFF0'] })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  confetti({ particleCount: 250, spread: 160, origin: { y: 0.4 }, colors: ['#D4AF37', '#800020', '#F7D9DD', '#FFFFFF', '#AEE1F9'] })
}

export default function FinalCelebration() {
  useEffect(() => {
    grandFinale()
  }, [])

  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-rose via-baby-pink to-sky-blue bg-wave px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16 text-center">
      <BackgroundEffects
        items={['🎉', '❤️', '✨', '🎈', '🌸', '💫']}
        count={26}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="glass-card relative z-10 flex w-full max-w-[95vw] sm:max-w-md lg:max-w-2xl flex-col items-center gap-6 rounded-3xl px-6 sm:px-8 lg:px-14 py-10 sm:py-12 shadow-card"
      >
        <motion.h1
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="font-display font-extrabold text-burgundy text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          🎉 HAPPY BIRTHDAY 🎉
        </motion.h1>
        <h2 className="font-script text-rose-red text-4xl sm:text-5xl md:text-6xl lg:text-7xl">{CONFIG.name}</h2>

        <p className="whitespace-pre-line font-body leading-relaxed text-burgundy/80 text-sm sm:text-base lg:text-lg break-words">
          {CONFIG.finalMessage}
        </p>

        <span className="mt-2 rounded-full bg-white/60 px-4 py-1 font-body text-xs text-burgundy/60">
          {today}
        </span>
      </motion.div>
    </section>
  )
}
