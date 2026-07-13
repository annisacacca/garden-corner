// src/components/music/VinylPlayer.jsx
import { AnimatePresence, motion } from 'framer-motion'
import FloatingSparkles from './FloatingSparkles.jsx'

/**
 * Pure presentation: album cover overlapping a vinyl record inside a
 * paper sleeve. Spinning/sliding is driven entirely by the `spinning`
 * prop, which the page derives from nowPlaying.isPaused — no Spotify
 * logic lives in here.
 */
export default function VinylPlayer({ nowPlaying, spinning, night }) {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto sm:w-72 sm:h-72 md:mx-0">
      <FloatingSparkles tone={night ? 'cream' : 'ink'} />

      {/* paper sleeve, sits behind everything */}
      <div
        aria-hidden="true"
        className={`absolute inset-3 rounded-[30px] shadow-inner transition-colors duration-700 ${
          night ? 'bg-black/30' : 'bg-dark/90'
        }`}
      />

      {/* vinyl — slides further out and spins while playing */}
      <motion.div
        className="absolute z-10"
        animate={{ x: spinning ? 46 : 10, rotate: spinning ? 0 : -2 }}
        transition={{ type: 'spring', stiffness: 110, damping: 18 }}
      >
        <div
          className="relative w-56 h-56 rounded-full shadow-lg sm:h-60 sm:w-60 bg-ink"
          style={{
            animation: 'vinylSpin 6s linear infinite',
            animationPlayState: spinning ? 'running' : 'paused',
          }}
        >
          <div className="absolute border rounded-full border-cream/10 inset-5" />
          <div className="absolute border rounded-full border-cream/10 inset-10" />
          <div className="absolute rounded-full border border-cream/10 inset-[3.75rem]" />
          <div className="absolute inset-0 m-auto rounded-full h-2.5 w-2.5 bg-cream/70" />
        </div>
      </motion.div>

      {/* album cover, overlaps the vinyl, crossfades on track change */}
      <div className="relative z-20 overflow-hidden rounded-[24px] shadow-soft h-40 w-40 sm:h-44 sm:w-44 bg-secondary">
        <AnimatePresence mode="wait">
          {nowPlaying?.albumArt ? (
            <motion.img
              key={nowPlaying.albumArt}
              src={nowPlaying.albumArt}
              alt={nowPlaying?.title ?? 'album cover'}
              className="absolute inset-0 object-cover w-full h-full"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            />
          ) : (
            <motion.div
              key="empty"
              className="absolute inset-0 flex items-center justify-center text-ink/25"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}