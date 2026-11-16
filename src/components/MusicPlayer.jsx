import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'
import CONFIG from '../config'

// A small floating pill player, fixed to the corner of the screen.
export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const startPlayback = () => {
      audio.play().catch(() => setPlaying(false))
    }

    startPlayback()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90vw] sm:w-auto sm:left-auto sm:right-5 sm:translate-x-0 z-50 flex items-center justify-between sm:justify-start gap-2 glass-card rounded-full px-4 py-2 shadow-card"
    >
      <audio ref={audioRef} src={CONFIG.music} loop autoPlay preload="auto" />
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause music' : 'Play music'}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-rose-red text-white shadow-glow transition-transform hover:scale-110"
      >
        {playing ? <FaPause size={13} /> : <FaPlay size={13} className="ml-0.5" />}
      </button>
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute' : 'Mute'}
        className="flex h-8 w-8 items-center justify-center rounded-full text-burgundy transition-transform hover:scale-110 ml-auto sm:ml-0"
      >
        {muted ? <FaVolumeMute size={15} /> : <FaVolumeUp size={15} />}
      </button>
      <span className="inline pr-1 text-xs font-medium text-burgundy/70">
        {playing ? 'Playing our song' : 'Play our song'}
      </span>
    </motion.div>
  )
}
