import { useMemo } from 'react'

/**
 * Ambient floating background decoration.
 * `items` is an array of emoji/characters to scatter across the screen.
 * Pass a different `items` set per page so each page feels distinct
 * while sharing the same soft, dreamy motion language.
 */
export default function BackgroundEffects({ items = ['❤️', '✨'], count = 18, className = '' }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const item = items[i % items.length]
      const left = Math.random() * 100
      const size = 14 + Math.random() * 22
      const duration = 6 + Math.random() * 8
      const delay = Math.random() * 6
      const drift = Math.random() > 0.5 ? 'animate-float' : 'animate-floatSlow'
      const top = Math.random() * 100
      const opacity = 0.35 + Math.random() * 0.45
      return { id: i, item, left, size, duration, delay, drift, top, opacity }
    })
  }, [items, count])

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute select-none ${p.drift}`}
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: 'drop-shadow(0 2px 6px rgba(128,0,32,0.08))',
          }}
        >
          {p.item}
        </span>
      ))}
    </div>
  )
}
