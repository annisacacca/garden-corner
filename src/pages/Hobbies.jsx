import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Code2, Palette, Clapperboard, Music2,
  Sprout, Gamepad2, NotebookPen, ChefHat, Scissors, X, Heart,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import WashiTape from '../components/ui/WashiTape.jsx'
import { hobbies } from '../data/hobbies.js'

const icons = {
  reading: BookOpen,
  coding: Code2,
  design: Palette,
  movies: Clapperboard,
  music: Music2,
  plants: Sprout,
  games: Gamepad2,
  journaling: NotebookPen,
  cooking: ChefHat,
  handcraft: Scissors,
}

// Each hobby has its own tiny animation variant that plays on click,
// giving every card a distinct little personality.
const animations = {
  reading: { rotateY: [0, 25, 0] },
  coding: { scale: [1, 1.15, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] },
  design: { rotate: [0, 15, -15, 0] },
  movies: { scaleY: [1, 0.85, 1] },
  music: { rotate: [0, -8, 8, -8, 0] },
  plants: { scale: [1, 1.2, 1] },
  games: { y: [0, -10, 0, -6, 0] },
  journaling: { x: [0, 4, -4, 0] },
  cooking: { rotate: [0, -12, 12, -8, 0], scale: [1, 1.08, 1] },
  handcraft: { rotate: [0, 20, -10, 0], y: [0, -3, 0] },
}

// Alternating tilt so the grid feels hand-placed, not machine-aligned.
// Only applied from `sm:` breakpoint up — kept straight on mobile so
// cards don't crowd/overlap on narrow 2-column layouts.
const tilts = [-2, 3, -3, 2, -1, 3, -2, 1, -3, 2]

function HobbyCard({ hobby, tilt, onOpen }) {
  const Icon = icons[hobby.id]
  const [key, setKey] = useState(0)

  return (
    <motion.button
      data-cursor-hover
      onClick={() => {
        setKey((k) => k + 1)
        onOpen(hobby)
      }}
      whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative flex flex-col items-center justify-center gap-3 rounded-3xl ${hobby.color} p-5 sm:p-6 text-center shadow-paper sm:rotate-[var(--tilt)]`}
      style={{ '--tilt': `${tilt}deg` }}
    >
      <motion.div
        key={key}
        animate={animations[hobby.id]}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white/70 sm:h-14 sm:w-14"
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-dark" />
      </motion.div>
      <div>
        <p className="text-base sm:text-lg font-heading text-ink">{hobby.label}</p>
        <p className="text-xs sm:text-sm font-hand text-ink/50">{hobby.hint}</p>
      </div>
      <span className="absolute hidden px-2 py-0.5 text-[10px] font-hand text-ink/40 bg-white/60 rounded-full -bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity sm:block">
        tap me
      </span>
    </motion.button>
  )
}

function HobbyDetailModal({ hobby, onClose }) {
  if (!hobby) return null
  const Icon = icons[hobby.id]

  // Optional fields — safe fallbacks if not present in data/hobbies.js
  const description = hobby.description ?? `Just something that makes ${hobby.label.toLowerCase()} feel like home.`
  const favorite = hobby.favorite ?? null
  const since = hobby.since ?? null
  const level = hobby.level ?? 3 // 1–5 cozy meter

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/30 backdrop-blur-sm p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, rotate: -3, y: 20 }}
          animate={{ opacity: 1, scale: 1, rotate: -1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className={`relative w-full max-w-sm rounded-[28px] ${hobby.color} p-7 shadow-lift`}
        >
          <WashiTape className="left-1/2 top-[-12px] -translate-x-1/2" rotate={-4} width="w-20" />

          <button
            onClick={onClose}
            data-cursor-hover
            className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-paper top-3 right-3"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-ink" />
          </button>

          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/70">
            <Icon className="w-7 h-7 text-dark" />
          </div>

          <h3 className="text-2xl text-center font-heading text-ink">{hobby.label}</h3>
          <p className="mt-1 text-sm text-center font-hand text-ink/50">{hobby.hint}</p>

          <p className="mt-4 text-sm leading-relaxed text-center font-body text-ink/70">
            {description}
          </p>

          {favorite && (
            <div className="p-3 mt-4 text-center rounded-2xl bg-white/60">
              <p className="text-xs font-semibold tracking-wide uppercase font-body text-ink/40">
                current favorite
              </p>
              <p className="mt-1 text-sm font-hand text-ink/80">{favorite}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 mt-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={`h-4 w-4 ${i < level ? 'fill-dark/70 text-dark/70' : 'text-dark/20'}`}
              />
            ))}
          </div>

          {since && (
            <p className="mt-2 text-xs text-center font-hand text-ink/40">
              been at it since {since}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Hobbies() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="max-w-5xl px-6 pt-32 pb-24 mx-auto">
      <SectionHeading eyebrow="things that make me happy" title="hobbies" align="center" />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="max-w-md mx-auto mb-10 text-sm text-center font-body text-ink/50"
      >
        tap a card to peek at what I'm currently into ~
      </motion.p>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {hobbies.map((hobby, i) => (
          <motion.div
            key={hobby.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <HobbyCard hobby={hobby} tilt={tilts[i % tilts.length]} onOpen={setSelected} />
          </motion.div>
        ))}
      </div>

      <HobbyDetailModal hobby={selected} onClose={() => setSelected(null)} />
    </div>
  )
}