import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'
import BackgroundEffects from './BackgroundEffects'
import CONFIG from '../config'

export default function WelcomePage({ onNext }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-sky-blue via-baby-pink to-beige bg-wave px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16 text-center">
      <BackgroundEffects items={['🎈', '🎈', '✨']} count={14} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex w-full max-w-7xl mx-auto flex-col items-center gap-6"
      >
        <div className="min-h-[4rem] font-body text-burgundy/80 text-sm sm:text-base lg:text-lg">
          <Typewriter
            words={[
              'Every birthday is special...',
              'But today is even more special...',
              'Because today belongs to someone truly amazing.',
            ]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={45}
            deleteSpeed={0}
            delaySpeed={1400}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4.5, duration: 0.8 }}
          className="font-display font-bold leading-tight text-burgundy text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Happy Birthday
          <span className="mt-2 block font-script text-rose-red text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {CONFIG.name}
          </span>
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.3, duration: 0.6 }}
          onClick={onNext}
          className="mt-4 flex w-full sm:w-auto justify-center rounded-full bg-gradient-to-r from-burgundy via-rose-red to-gold px-8 py-3 font-display text-lg font-medium text-white shadow-glow transition-transform hover:scale-105 active:scale-95"
        >
          Begin Your Journey ❤️
        </motion.button>
      </motion.div>
    </div>
  )
}
