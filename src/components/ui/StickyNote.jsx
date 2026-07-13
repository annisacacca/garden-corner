import { motion } from 'framer-motion'

const colors = {
  green: 'bg-primary/70',
  cream: 'bg-accent/60',
  sky: 'bg-sky/70',
  blush: 'bg-blush/70',
}

export default function StickyNote({ children, color = 'cream', rotate = -3, className = '' }) {
  return (
    <motion.div
      className={`relative rounded-sm p-4 font-hand text-lg text-ink shadow-paper ${colors[color]} ${className}`}
      style={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <span
        className="absolute -top-2 left-1/2 h-4 w-10 -translate-x-1/2 rounded-sm bg-white/50"
        style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
      />
      {children}
    </motion.div>
  )
}
