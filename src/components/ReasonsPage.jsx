import { useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from './PageShell'
import CONFIG from '../config'

const CARD_COLORS = [
  'from-rose to-blush',
  'from-sky-blue to-lavender',
  'from-gold-light to-blush',
  'from-lavender to-baby-pink',
  'from-blush to-gold-light',
  'from-baby-pink to-sky-blue',
]

function ReasonCard({ index, reason }) {
  const [flipped, setFlipped] = useState(false)
  const gradient = CARD_COLORS[index % CARD_COLORS.length]

  return (
    <div
      className="h-40 w-full cursor-pointer [perspective:1000px]"
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br ${gradient} p-4 text-center shadow-card [backface-visibility:hidden]`}
        >
          <span className="font-display font-bold text-burgundy text-3xl sm:text-4xl">{index + 1}</span>
          <span className="font-body text-burgundy/70 text-xs sm:text-sm">Tap to reveal</span>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white p-4 text-center shadow-card [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <p className="font-body font-medium text-burgundy text-sm sm:text-base">{reason}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default function ReasonsPage({ onNext }) {
  return (
    <PageShell
      id="reasons"
      gradient="from-baby-pink via-beige to-rose"
      bgItems={['💗', '✨', '🌷']}
      heading={`${CONFIG.reasons.length} Reasons You're Amazing ❤️`}
      subheading="Tap each card to reveal a reason."
      onNext={onNext}
      nextLabel="Open The Secret Letter"
    >
      <div className="grid w-full max-w-7xl mx-auto grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {CONFIG.reasons.map((reason, i) => (
          <ReasonCard key={i} index={i} reason={reason} />
        ))}
      </div>
    </PageShell>
  )
}
