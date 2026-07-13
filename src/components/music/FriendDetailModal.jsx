import { AnimatePresence, motion } from 'framer-motion'
import { Disc3, Heart, Mic2, Music2, Quote, X } from 'lucide-react'
import TrackPlayer from './TrackPlayer.jsx'
import Frog from '../ui/Frog.jsx'

export default function FriendDetailModal({ friend, night, onClose }) {
  return (
    <AnimatePresence>
      {friend && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 22, stiffness: 260 }}
            className={`scrollbar-hide relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-y-auto rounded-[24px] shadow-soft sm:rounded-[28px] md:grid md:max-h-[85vh] md:grid-cols-2 md:grid-rows-[auto_1fr] ${
              night ? 'bg-dark' : 'bg-cream'
            }`}
          >
            <button
              data-cursor-hover
              onClick={onClose}
              className={`absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full sm:right-4 sm:top-4 sm:h-8 sm:w-8 ${
                night ? 'bg-white/10 text-cream' : 'bg-white text-ink/60'
              }`}
            >
              <X className="w-3.5 h-3.5 sm:h-4 sm:w-4" />
            </button>

            {/* PROFILE — top on mobile (left-aligned header), top-right column on desktop (centered) */}
            <div
              className={`order-1 flex items-center gap-3 border-b p-4 pb-3 text-left sm:p-6 sm:pb-4 md:order-none md:col-start-2 md:row-start-1 md:flex-col md:items-center md:border-b-0 md:p-7 md:pb-0 md:text-center ${
                night ? 'border-white/10' : 'border-ink/10'
              }`}
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="object-cover border-2 border-white rounded-full shadow-soft w-11 h-11 sm:w-14 sm:h-14 md:h-20 md:w-20 md:border-4"
              />
              <div className="min-w-0 md:mt-3">
                <h3 className={`truncate font-heading text-lg sm:text-xl md:text-2xl ${night ? 'text-cream' : 'text-ink'}`}>
                  {friend.name}
                </h3>
                <p className={`flex items-center gap-1 font-hand text-xs sm:text-sm md:mt-1 md:justify-center ${night ? 'text-cream/60' : 'text-ink/50'}`}>
                  <Heart className="w-3 h-3 text-accent shrink-0" /> their little music corner
                </p>
              </div>
            </div>

            {/* SONG SECTION */}
            <div
              className={`order-2 flex flex-col p-4 sm:p-6 md:order-none md:col-start-1 md:row-start-1 md:row-span-2 md:p-7`}
            >
              <div className={`mb-2 flex items-center gap-2 font-heading text-xs sm:text-sm md:mb-3 ${night ? 'text-cream/80' : 'text-ink/70'}`}>
                <Music2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> favorite song
              </div>

              {/* mobile: compact horizontal row | desktop: big square cover */}
              <div className="flex items-center gap-3 md:block">
                <img
                  src={friend.favoriteSong.cover}
                  alt={friend.favoriteSong.title}
                  className="object-cover w-16 h-16 shrink-0 shadow-soft rounded-xl sm:w-20 sm:h-20 md:aspect-square md:h-auto md:w-full md:rounded-[20px]"
                />
                <div className="min-w-0 md:mt-4 md:text-center">
                  <p className={`truncate font-heading text-sm leading-tight sm:text-base md:text-lg ${night ? 'text-cream' : 'text-ink'}`}>
                    {friend.favoriteSong.title}
                  </p>
                  <p className={`truncate mt-0.5 font-body text-xs sm:text-sm ${night ? 'text-cream/60' : 'text-ink/50'}`}>
                    {friend.favoriteSong.artist}
                  </p>
                </div>
              </div>

              <div className="mt-2 md:mt-4">
                <TrackPlayer src={friend.favoriteSong.src} night={night} />
              </div>
            </div>

            {/* ALBUM/ARTIST + NOTES */}
            <div className="flex flex-col flex-1 order-3 min-h-0 p-4 pt-3 sm:p-6 sm:pt-4 md:order-none md:col-start-2 md:row-start-2 md:p-7 md:pt-0">
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <div className={`mb-1.5 flex items-center gap-1.5 font-heading text-[11px] sm:text-xs ${night ? 'text-cream/80' : 'text-ink/70'}`}>
                    <Disc3 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> album
                  </div>
                  <div className={`flex items-center gap-2 overflow-hidden rounded-xl p-1.5 sm:block sm:rounded-[18px] sm:p-0 ${night ? 'bg-white/5' : 'bg-white/70'}`}>
                    <img
                      src={friend.favoriteAlbum.cover}
                      alt={friend.favoriteAlbum.title}
                      className="object-cover w-10 h-10 rounded-lg shrink-0 sm:aspect-square sm:w-full sm:h-auto sm:rounded-none"
                    />
                    <div className="min-w-0 sm:p-2.5 sm:text-center">
                      <p className={`truncate font-heading text-[11px] leading-tight sm:text-xs ${night ? 'text-cream' : 'text-ink'}`}>
                        {friend.favoriteAlbum.title}
                      </p>
                      <p className={`hidden mt-0.5 font-body text-[11px] sm:block ${night ? 'text-cream/60' : 'text-ink/50'}`}>
                        {friend.favoriteAlbum.artist}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className={`mb-1.5 flex items-center gap-1.5 font-heading text-[11px] sm:text-xs ${night ? 'text-cream/80' : 'text-ink/70'}`}>
                    <Mic2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> artist
                  </div>
                  <div className={`flex items-center gap-2 overflow-hidden rounded-xl p-1.5 sm:block sm:rounded-[18px] sm:p-0 ${night ? 'bg-white/5' : 'bg-white/70'}`}>
                    <img
                      src={friend.favoriteArtist.photo}
                      alt={friend.favoriteArtist.name}
                      className="object-cover w-10 h-10 rounded-full shrink-0 shadow-soft sm:aspect-square sm:w-full sm:h-auto"
                    />
                    <div className="min-w-0 sm:p-2.5 sm:text-center">
                      <p className={`truncate font-heading text-[11px] leading-tight sm:text-xs ${night ? 'text-cream' : 'text-ink'}`}>
                        {friend.favoriteArtist.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {friend.notes && (
                <div
                  className={`relative mt-3 flex-1 min-h-0 overflow-visible rounded-2xl p-3 pt-5 sm:mt-4 sm:rounded-[18px] sm:p-4 sm:pt-6 ${
                    night ? 'bg-white/5' : 'bg-white/70'
                  }`}
                >
                  <Frog size={32} className="absolute -top-5 right-1 drop-shadow-sm sm:-top-7 sm:w-10" />

                  <div
                    className={`mb-1 flex h-6 w-6 items-center justify-center rounded-full sm:h-7 sm:w-7 ${
                      night ? 'bg-white/10' : 'bg-ink/5'
                    }`}
                  >
                    <Quote
                      className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${night ? 'text-cream/50' : 'text-ink/40'}`}
                      fill="currentColor"
                    />
                  </div>

                  <p className={`font-hand text-sm leading-snug sm:text-base sm:leading-relaxed ${night ? 'text-cream/80' : 'text-ink/70'}`}>
                    {friend.notes.lyric}
                  </p>
                  <p className={`mt-1.5 font-body text-[11px] sm:mt-2 sm:text-xs ${night ? 'text-cream/50' : 'text-ink/40'}`}>
                    {friend.notes.song} - {friend.notes.artist}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}