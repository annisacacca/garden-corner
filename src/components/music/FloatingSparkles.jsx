// src/components/music/FloatingSparkles.jsx
import Sparkle from './Sparkle.jsx'

// fixed, hand-placed positions — deliberately irregular, like they were
// scattered by hand rather than generated on a grid
const POSITIONS = [
  { top: '4%', left: '8%', size: 12, delay: 0 },
  { top: '10%', right: '10%', size: 16, delay: 0.6 },
  { top: '46%', left: '2%', size: 10, delay: 1.2 },
  { bottom: '14%', right: '4%', size: 13, delay: 0.3 },
  { bottom: '6%', left: '20%', size: 9, delay: 1.6 },
  { top: '58%', right: '18%', size: 11, delay: 0.9 },
]

export default function FloatingSparkles({ tone = 'ink', active = true }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 pointer-events-none">
      {POSITIONS.map((p, i) => (
        <Sparkle
          key={i}
          size={p.size}
          delay={p.delay}
          duration={2.8 + (i % 3) * 0.5}
          className={tone === 'cream' ? 'text-cream/50' : 'text-primary/70'}
          style={{ position: 'absolute', top: p.top, left: p.left, right: p.right, bottom: p.bottom }}
        />
      ))}
    </div>
  )
}