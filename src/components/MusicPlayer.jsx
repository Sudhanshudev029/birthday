import { useEffect, useRef } from 'react'
import CONFIG from '../config'

// Background music: always plays, no visible controls.
export default function MusicPlayer() {
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const events = ['pointerdown', 'keydown', 'touchstart']
    const removeListeners = () =>
      events.forEach((e) => window.removeEventListener(e, resume))
    // If the browser blocks autoplay, start on the first user interaction.
    function resume() {
      audio.play().then(removeListeners).catch(() => {})
    }

    audio.play().catch(() => {
      events.forEach((e) => window.addEventListener(e, resume))
    })

    return removeListeners
  }, [])

  return <audio ref={audioRef} src={CONFIG.music} loop autoPlay preload="auto" />
}
