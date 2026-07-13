// src/components/music/Sparkle.jsx
import { motion } from 'framer-motion'

// hand-drawn four-point sparkle, not a lucide icon on purpose —
// it's the one recurring decorative mark for this page
export default function Sparkle({ size = 14, className = '', style, delay = 0, duration = 3.2 }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ ...style, willChange: 'transform, opacity' }}
      aria-hidden="true"
      initial={{ opacity: 0.25, scale: 0.8, y: 0 }}
      animate={{ opacity: [0.25, 0.9, 0.25], scale: [0.8, 1, 0.8], y: [0, -6, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <path
        d="M12 1C12.3 7.5 13 12 23 12C13 12 12.3 16.5 12 23C11.7 16.5 11 12 1 12C11 12 11.7 7.5 12 1Z"
        fill="currentColor"
      />
    </motion.svg>
  )
}