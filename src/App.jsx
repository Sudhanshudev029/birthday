import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import PasswordScreen from './components/PasswordScreen'
import WelcomePage from './components/WelcomePage'
import PhotoGallery from './components/PhotoGallery'
import MemoryTimeline from './components/MemoryTimeline'
import ReasonsPage from './components/ReasonsPage'
import SecretLetter from './components/SecretLetter'
import WishWall from './components/WishWall'
import BirthdayCake from './components/BirthdayCake'
import GiftBox from './components/GiftBox'
import FinalCelebration from './components/FinalCelebration'
import MusicPlayer from './components/MusicPlayer'
import SparkleTrail from './components/SparkleTrail'

// Ordered list of steps after the password is unlocked.
const STEPS = [
  'welcome',
  'gallery',
  'timeline',
  'reasons',
  'letter',
  'wishwall',
  'cake',
  'gift',
  'final',
]

export default function App() {
  const [phase, setPhase] = useState('loading') // loading -> locked -> journey
  const [stepIndex, setStepIndex] = useState(0)

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const step = STEPS[stepIndex]

  return (
    <div className="relative min-h-screen w-full bg-cream">
      <SparkleTrail />

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div key="loading" exit={{ opacity: 0 }}>
            <Loader onDone={() => setPhase('locked')} />
          </motion.div>
        )}

        {phase === 'locked' && (
          <motion.div key="locked" exit={{ opacity: 0 }}>
            <PasswordScreen onUnlock={() => setPhase('journey')} />
          </motion.div>
        )}

        {phase === 'journey' && (
          <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {step === 'welcome' && <WelcomePage onNext={goNext} />}
            {step === 'gallery' && <PhotoGallery onNext={goNext} />}
            {step === 'timeline' && <MemoryTimeline onNext={goNext} />}
            {step === 'reasons' && <ReasonsPage onNext={goNext} />}
            {step === 'letter' && <SecretLetter onNext={goNext} />}
            {step === 'wishwall' && <WishWall onNext={goNext} />}
            {step === 'cake' && <BirthdayCake onNext={goNext} />}
            {step === 'gift' && <GiftBox onNext={goNext} />}
            {step === 'final' && <FinalCelebration />}
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'journey' && <MusicPlayer />}
    </div>
  )
}
