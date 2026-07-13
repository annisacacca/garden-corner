import { motion } from 'framer-motion'
import { Disc3, Sparkles } from 'lucide-react'

export default function FriendCard({ friend, night, onClick }) {
  return (
    <motion.button
      data-cursor-hover
      onClick={onClick}
      whileHover={{ y: -4, rotate: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex w-full items-center gap-4 rounded-[22px] p-4 text-left shadow-paper transition-colors ${
        night ? 'bg-white/5 hover:bg-white/10' : 'bg-white/70 hover:bg-white'
      }`}
    >
      <Sparkles className="absolute w-4 h-4 top-2 right-2 text-accent/60" />
      <img
        src={friend.avatar}
        alt={friend.name}
        className="flex-shrink-0 object-cover border-2 border-white rounded-full w-14 h-14 shadow-soft"
      />
      <div className="flex-1 min-w-0">
        <p className={`font-heading text-base ${night ? 'text-cream' : 'text-ink'}`}>{friend.name}</p>
        <div className={`mt-1 flex items-center gap-1 font-body text-xs ${night ? 'text-cream/60' : 'text-ink/50'}`}>
          <Disc3 className="flex-shrink-0 w-3 h-3" />
          <span className="truncate">
            {friend.favoriteAlbum.title} · {friend.favoriteAlbum.artist}
          </span>
        </div>
      </div>
    </motion.button>
  )
}