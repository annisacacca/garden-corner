// src/components/music/NowPlayingInfo.jsx
import { AnimatePresence, motion } from 'framer-motion'

const EQ_BARS = [0, 1, 2, 3, 4]

export default function NowPlayingInfo({ nowPlaying, spinning, night }) {
  const title = nowPlaying?.title ?? null
  const artist = nowPlaying?.artist ?? null

  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <span className={`font-hand text-base ${night ? 'text-cream/60' : 'text-ink/50'}`}>now spinning</span>

      <AnimatePresence mode="wait">
        <motion.h3
          key={title ?? 'placeholder-title'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className={`mt-1 font-heading text-2xl sm:text-3xl ${night ? 'text-cream' : 'text-ink'}`}
        >
          {title ?? 'Press Play To Start'}
        </motion.h3>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={artist ?? 'placeholder-artist'}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className={`mt-1 font-body text-sm ${night ? 'text-cream/70' : 'text-ink/60'}`}
        >
          {artist ?? 'Our shared playlist is waiting for you'}
        </motion.p>
      </AnimatePresence>

      <div className="flex items-end h-4 gap-1 mt-3" aria-hidden="true">
        {EQ_BARS.map((i) => (
          <motion.span
            key={i}
            className={`w-1 rounded-full ${night ? 'bg-cream/50' : 'bg-primary'}`}
            style={{ height: 16, transformOrigin: 'bottom' }}
            animate={spinning ? { scaleY: [0.3, 1, 0.45, 0.85, 0.3] } : { scaleY: 0.25 }}
            transition={
              spinning
                ? { duration: 0.9 + i * 0.12, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.2 }
            }
          />
        ))}
      </div>
    </div>
  )
}