import { useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from './PageShell'
import CONFIG from '../config'

const NOTE_COLORS = ['bg-blush', 'bg-sky-blue', 'bg-gold-light', 'bg-lavender', 'bg-baby-pink', 'bg-rose']
const ROTATIONS = [-6, 4, -3, 6, -5, 3, -4, 5]

export default function WishWall({ onNext }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <PageShell
      id="wishwall"
      gradient="from-cream via-baby-pink to-sky-blue"
      bgItems={['🌼', '🎈', '✨']}
      heading="A Wall Full Of Wishes"
      subheading="Tap a note to read it."
      onNext={onNext}
      nextLabel="Make A Wish On The Cake"
    >
      <div className="grid w-full max-w-7xl mx-auto grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {CONFIG.wishes.map((wish, i) => (
          <motion.button
            key={i}
            onClick={() => setExpanded(expanded === i ? null : i)}
            initial={{ opacity: 0, y: 20, rotate: ROTATIONS[i % ROTATIONS.length] }}
            whileInView={{ opacity: 1, y: 0, rotate: ROTATIONS[i % ROTATIONS.length] }}
            viewport={{ once: true, amount: 0.3 }}
            animate={expanded === i ? { scale: 1.15, rotate: 0, zIndex: 20 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`relative flex h-32 items-center justify-center rounded-md p-4 text-center shadow-card ${
              NOTE_COLORS[i % NOTE_COLORS.length]
            }`}
          >
            <p className="font-body font-medium text-burgundy text-xs sm:text-sm lg:text-base break-words">{wish}</p>
          </motion.button>
        ))}
      </div>
    </PageShell>
  )
}
