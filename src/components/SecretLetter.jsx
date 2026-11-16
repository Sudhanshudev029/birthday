import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import PageShell from './PageShell'
import CONFIG from '../config'

export default function SecretLetter({ onNext }) {
  const [opened, setOpened] = useState(false)

  return (
    <PageShell
      id="letter"
      gradient="from-lavender via-blush to-cream"
      bgItems={['💌', '✨', '🕊️']}
      heading="A Secret Letter For You"
      subheading={!opened ? 'Click the envelope to open it.' : undefined}
      onNext={onNext}
      nextLabel="Visit The Wish Wall"
      showNext={opened}
    >
      <div className="flex w-full max-w-[95vw] sm:max-w-md lg:max-w-xl flex-col items-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              onClick={() => setOpened(true)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.04 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative flex h-56 w-80 max-w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br from-cream to-blush shadow-card"
              aria-label="Open the letter"
            >
              <div className="absolute inset-0 rounded-xl border-2 border-gold/40" />
              <div className="absolute top-0 h-0 w-0 border-l-[160px] border-r-[160px] border-t-[90px] border-l-transparent border-r-transparent border-t-rose/70" />
              <span className="mt-6 text-5xl">💌</span>
              <span className="mt-4 font-display text-burgundy">Tap to open</span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ y: -60, opacity: 0, rotate: -3 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glass-card w-full rounded-xl border border-gold/30 px-8 py-10 shadow-card"
            >
              <p className="whitespace-pre-line font-body leading-relaxed text-burgundy text-sm sm:text-base lg:text-lg break-words">
                <Typewriter
                  words={[CONFIG.letter]}
                  loop={1}
                  cursor
                  cursorStyle="|"
                  typeSpeed={18}
                  deleteSpeed={0}
                  delaySpeed={0}
                />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}
