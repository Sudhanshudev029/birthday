import { useEffect, useRef } from 'react'

// Leaves a soft trail of gold sparkle dots behind the cursor.
// Purely decorative, cleans up after itself, and is skipped on touch devices.
export default function SparkleTrail() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // skip on touch devices
    const container = containerRef.current
    let lastTime = 0

    function handleMove(e) {
      const now = Date.now()
      if (now - lastTime < 40) return // throttle
      lastTime = now

      const dot = document.createElement('span')
      dot.className = 'sparkle-dot'
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      container.appendChild(dot)

      dot.animate(
        [
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(0.2)', opacity: 0 },
        ],
        { duration: 700, easing: 'ease-out' }
      ).onfinish = () => dot.remove()
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return <div ref={containerRef} />
}
