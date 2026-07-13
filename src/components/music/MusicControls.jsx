// src/components/music/MusicControls.jsx
import { motion } from 'framer-motion'
import { ExternalLink, Heart, Pause, Play } from 'lucide-react'

export default function MusicControls({ spinning, ready, onToggle, liked, onToggleLike, playlistUrl, night }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-6 md:justify-start">
      <motion.button
        data-cursor-hover
        onClick={onToggle}
        disabled={!ready}
        aria-label={spinning ? 'Pause' : 'Play'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center justify-center text-white rounded-full h-14 w-14 shadow-soft bg-accent disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {spinning ? <Pause className="w-6 h-6" /> : <Play className="h-6 w-6 translate-x-0.5" />}
      </motion.button>

      <motion.a
        href={playlistUrl}
        target="_blank"
        rel="noreferrer"
        data-cursor-hover
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-2 rounded-full px-4 py-3 font-body text-sm shadow-paper transition-colors ${
          night ? 'bg-white/10 text-cream hover:bg-white/20' : 'bg-white text-ink/70 hover:bg-white'
        }`}
      >
        Open in Spotify
        <ExternalLink className="h-3.5 w-3.5" />
      </motion.a>

      <motion.button
        data-cursor-hover
        onClick={onToggleLike}
        aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.9 }}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-paper transition-colors ${
          night ? 'bg-white/10' : 'bg-white'
        }`}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            liked ? 'fill-primary text-primary' : night ? 'text-cream/40' : 'text-ink/30'
          }`}
        />
      </motion.button>
    </div>
  )
}