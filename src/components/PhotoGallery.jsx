import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaHeart } from 'react-icons/fa'
import PageShell from './PageShell'
import CONFIG from '../config'

export default function PhotoGallery({ onNext }) {
  const [active, setActive] = useState(null)

  return (
    <PageShell
      id="gallery"
      gradient="from-blush via-cream to-lavender"
      bgItems={['🌸', '✨', '🦋']}
      heading="Our Beautiful Memories"
      subheading="A few moments we'll always treasure."
      onNext={onNext}
      nextLabel="See The Timeline"
    >
      <div className="grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {CONFIG.photos.map((photo, i) => (
          <motion.button
            key={photo.src}
            initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -4 : 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -3 : 3 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -10, rotate: 0, scale: 1.04 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => setActive(photo)}
            className="group flex flex-col items-center rounded-md bg-white p-3 pb-5 shadow-card transition-shadow hover:shadow-glow"
          >
            <div className="aspect-square w-full overflow-hidden rounded-sm bg-beige">
              <img
                src={photo.src}
                alt={photo.caption}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextSibling.style.display = 'flex'
                }}
              />
              <div className="hidden h-full w-full items-center justify-center text-4xl text-rose">📷</div>
            </div>
            <div className="mt-3 flex w-full items-start justify-between gap-2 px-1">
              <span className="font-body text-xs text-burgundy/70 flex-1 break-words">{photo.caption}</span>
              <FaHeart className="text-rose-red shrink-0 mt-0.5" size={12} />
            </div>
            <span className="w-full px-1 text-left font-body text-[10px] text-burgundy/40">{photo.date}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-burgundy/70 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[95vw] sm:max-w-md lg:max-w-lg rounded-2xl bg-white p-4 pb-6 shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-burgundy text-white shadow-lg"
                aria-label="Close"
              >
                <FaTimes />
              </button>
              <img src={active.src} alt={active.caption} className="max-h-[60vh] w-full rounded-lg object-cover" />
              <p className="mt-3 text-center font-display text-lg text-burgundy break-words">{active.caption}</p>
              <p className="text-center font-body text-xs text-burgundy/50">{active.date}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  )
}
