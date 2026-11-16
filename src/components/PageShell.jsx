import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import BackgroundEffects from './BackgroundEffects'

// Shared shell used by pages 3-9: a full-height section with a soft
// gradient + floating decoration, a heading, content slot, and an
// optional "next" button pinned at the bottom.
export default function PageShell({
  id,
  gradient = 'from-beige via-cream to-blush',
  bgItems = ['❤️', '✨'],
  heading,
  subheading,
  children,
  onNext,
  nextLabel = 'Continue',
  showNext = true,
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-gradient-to-br ${gradient} bg-wave px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16`}
    >
      <BackgroundEffects items={bgItems} count={14} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mb-10 flex w-full max-w-7xl flex-col items-center gap-3 text-center mx-auto"
      >
        {heading && (
          <h2 className="font-display font-bold text-burgundy text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{heading}</h2>
        )}
        {subheading && <p className="font-body text-burgundy/70 text-sm sm:text-base lg:text-lg">{subheading}</p>}
      </motion.div>

      <div className="relative z-10 flex w-full max-w-7xl mx-auto flex-1 flex-col items-center">{children}</div>

      {showNext && (
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onClick={onNext}
          className="relative z-10 mt-14 flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-gradient-to-r from-burgundy via-rose-red to-gold px-7 py-3 font-display text-base font-medium text-white shadow-glow transition-transform hover:scale-105 active:scale-95"
        >
          {nextLabel} <FaArrowRight />
        </motion.button>
      )}
    </section>
  )
}
