import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import BackgroundEffects from './BackgroundEffects'
import CONFIG from '../config'

export default function PasswordScreen({ onUnlock }) {
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)
  const [error, setError] = useState(false)
  const [unlocking, setUnlocking] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (unlocking) return

    if (value.trim().toLowerCase() === CONFIG.password.toLowerCase()) {
      setError(false)
      setUnlocking(true)
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#C94F6D', '#F7D9DD', '#800020', '#FFFFFF'],
      })
      setTimeout(onUnlock, 1800)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-gradient-to-br from-baby-pink via-blush to-beige bg-wave px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16">
      <BackgroundEffects items={['❤️', '💗', '💕']} count={16} />

      <AnimatePresence mode="wait">
        {!unlocking ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, x: shake ? [0, -8, 8, -8, 8, 0] : 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="glass-card relative z-10 flex w-full max-w-[95vw] sm:max-w-md lg:max-w-lg flex-col items-center gap-5 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 text-center shadow-card"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              className="text-6xl"
            >
              💌🔒
            </motion.div>

            <h1 className="font-display font-semibold text-burgundy text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              This Surprise Is Made Just For You
            </h1>
            <p className="font-body text-burgundy/70 text-sm sm:text-base lg:text-lg">
              Enter the secret password to unlock your birthday gift.
            </p>

            <input
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter Password"
              className="w-full rounded-full border border-rose/50 bg-white/70 px-5 py-3 text-center font-body text-burgundy placeholder:text-burgundy/40 outline-none ring-gold/40 transition focus:ring-2"
            />

            <button
              type="submit"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-burgundy via-rose-red to-gold px-6 py-3 font-display text-lg font-medium text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-95"
            >
              Unlock My Gift ❤️
            </button>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-body text-sm text-rose-red"
                >
                  Oops! That's not the right password ❤️
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        ) : (
          <motion.div
            key="unlocking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 flex flex-col items-center gap-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.5, 1.3, 1] }}
              transition={{ duration: 0.8 }}
              className="text-7xl"
            >
              💖
            </motion.div>
            <p className="font-display font-medium text-burgundy text-xl sm:text-2xl lg:text-3xl">
              Unlocking Beautiful Memories...
            </p>
            <motion.div
              className="h-10 w-10 rounded-full border-4 border-gold border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
