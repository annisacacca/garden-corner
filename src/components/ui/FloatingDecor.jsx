import { motion } from 'framer-motion'
import { useMemo } from 'react'

function Leaf({ style }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" style={style} fill="none">
      <path d="M4 20C4 11 10 4 20 4C20 14 13 20 4 20Z" fill="#B9D7A8" fillOpacity="0.55" />
    </svg>
  )
}

function Butterfly({ style }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" style={style} fill="none">
      <path d="M12 12C9 6 3 6 3 11C3 15 8 15 12 12Z" fill="#E7CFA4" fillOpacity="0.6" />
      <path d="M12 12C15 6 21 6 21 11C21 15 16 15 12 12Z" fill="#E7CFA4" fillOpacity="0.6" />
      <path d="M12 12C10 15 8 19 9 21C10 20 11.5 15 12 12Z" fill="#E7CFA4" fillOpacity="0.6" />
      <line x1="12" y1="10" x2="12" y2="20" stroke="#5F6F52" strokeWidth="0.8" opacity="0.5" />
    </svg>
  )
}

// Subtle, decorative, non-interactive ambient background. Kept lightweight —
// purely CSS/SVG transforms so it stays smooth even on lower-end devices.
export default function FloatingDecor({ density = 'normal' }) {
  const count = density === 'light' ? 4 : 7

  const leaves = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: `leaf-${i}`,
        left: `${(i * 97 + 13) % 100}%`,
        delay: i * 1.3,
        duration: 14 + (i % 5) * 2,
        size: 16 + (i % 3) * 8,
      })),
    [count]
  )

  const butterflies = useMemo(
    () =>
      Array.from({ length: Math.max(2, Math.floor(count / 3)) }).map((_, i) => ({
        id: `b-${i}`,
        top: `${20 + i * 22}%`,
        delay: i * 2.4,
        duration: 20 + i * 4,
      })),
    [count]
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute top-[-5%]"
          style={{ left: leaf.left }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, 30, -20, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: 'linear',
          }}
        >
          <Leaf style={{ width: leaf.size, height: leaf.size }} />
        </motion.div>
      ))}

      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute left-[-5%]"
          style={{ top: b.top }}
          animate={{
            x: ['0vw', '110vw'],
            y: [0, -20, 10, -10, 0],
          }}
          transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Butterfly />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
