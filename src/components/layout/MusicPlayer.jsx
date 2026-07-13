import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc3 } from 'lucide-react'
import { useMusic } from '../../context/MusicContext.jsx'

export default function MusicPlayer() {
  const { track, isPlaying, toggle, next, prev, volume, setVolume, muted, toggleMute } = useMusic()
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="w-72 rounded-3xl bg-white/90 p-4 shadow-lift backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: isPlaying ? Infinity : 0, duration: 6, ease: 'linear' }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dark text-cream"
              >
                <Disc3 className="h-6 w-6" />
              </motion.div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-base text-ink">{track.title}</p>
                <p className="truncate font-body text-xs text-ink/60">{track.artist}</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4">
              <button data-cursor-hover onClick={prev} aria-label="Previous track" className="text-ink/70 hover:text-ink">
                <SkipBack className="h-4 w-4" />
              </button>
              <button
                data-cursor-hover
                onClick={toggle}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-ink shadow-paper"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-0.5" />}
              </button>
              <button data-cursor-hover onClick={next} aria-label="Next track" className="text-ink/70 hover:text-ink">
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button data-cursor-hover onClick={toggleMute} aria-label="Mute" className="text-ink/70">
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-1 flex-1 accent-primary"
              />
            </div>

            <button
              data-cursor-hover
              onClick={() => setExpanded(false)}
              className="mt-3 w-full text-center font-hand text-sm text-ink/50"
            >
              tuck away ~
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            data-cursor-hover
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setExpanded(true)}
            aria-label="Open music player"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lift"
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: isPlaying ? Infinity : 0, duration: 6, ease: 'linear' }}
            >
              <Disc3 className="h-6 w-6 text-dark" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
