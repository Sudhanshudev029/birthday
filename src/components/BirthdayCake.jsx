import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import PageShell from './PageShell'
import CONFIG from '../config'

function fireworks() {
  const duration = 2500
  const end = Date.now() + duration
  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 65, origin: { x: 0 }, colors: ['#D4AF37', '#C94F6D', '#FADDE1'] })
    confetti({ particleCount: 4, angle: 120, spread: 65, origin: { x: 1 }, colors: ['#D4AF37', '#C94F6D', '#FADDE1'] })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()
  confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, colors: ['#D4AF37', '#800020', '#F7D9DD', '#FFFFFF'] })
}

export default function BirthdayCake({ onNext }) {
  const total = CONFIG.candleCount
  const [lit, setLit] = useState(Array.from({ length: total }, () => true))
  const [celebrated, setCelebrated] = useState(false)

  const allBlown = lit.every((l) => !l)

  useEffect(() => {
    if (allBlown && !celebrated) {
      setCelebrated(true)
      fireworks()
    }
  }, [allBlown, celebrated])

  function blow(i) {
    setLit((prev) => prev.map((v, idx) => (idx === i ? false : v)))
  }

  return (
    <PageShell
      id="cake"
      gradient="from-blush via-gold-light to-cream"
      bgItems={['🎂', '✨', '🎈']}
      heading="Make A Wish"
      subheading="Click every candle to blow it out."
      onNext={onNext}
      nextLabel="Open Your Gift"
      showNext={allBlown}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Candles */}
        <div className="flex items-end justify-center gap-3">
          {lit.map((isLit, i) => (
            <button
              key={i}
              onClick={() => blow(i)}
              disabled={!isLit}
              aria-label={`Candle ${i + 1}`}
              className="relative flex w-4 flex-col items-center focus:outline-none"
            >
              <AnimatePresence>
                {isLit ? (
                  <motion.span
                    key="flame"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3, y: -10 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ scale: { duration: 0.6, repeat: Infinity } }}
                    className="mb-0.5 text-lg"
                  >
                    🔥
                  </motion.span>
                ) : (
                  <motion.span
                    key="smoke"
                    initial={{ opacity: 0.6, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.4 }}
                    className="mb-0.5 text-sm text-burgundy/30"
                  >
                    ﹏
                  </motion.span>
                )}
              </AnimatePresence>
              <div className={`h-10 w-2 rounded-sm ${['bg-rose-red', 'bg-royal-blue', 'bg-gold'][i % 3]}`} />
            </button>
          ))}
        </div>

        {/* Cake body */}
        <div className="flex flex-col items-center w-full max-w-[18rem]">
          <div className="h-8 w-10/12 sm:w-56 rounded-t-xl bg-white shadow-inner" />
          <div className="h-16 w-11/12 sm:w-64 bg-gradient-to-b from-rose to-blush shadow-card" />
          <div className="h-16 w-full sm:w-72 rounded-b-xl bg-gradient-to-b from-baby-pink to-rose shadow-card" />
        </div>

        <AnimatePresence>
          {allBlown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <p className="font-display font-semibold text-burgundy text-xl sm:text-2xl lg:text-3xl">
                Wish made. Here's to it coming true. 🎉
              </p>
              <div className="flex gap-3 text-3xl">
                <motion.span animate={{ y: [0, -14, 0] }} transition={{ duration: 2, repeat: Infinity }}>🎈</motion.span>
                <motion.span animate={{ y: [0, -18, 0] }} transition={{ duration: 2.4, repeat: Infinity, delay: 0.2 }}>🎈</motion.span>
                <motion.span animate={{ y: [0, -12, 0] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}>🎈</motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  )
}
