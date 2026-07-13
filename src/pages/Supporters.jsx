// pages/Supporters.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { friendsMusic } from '../data/friendsMusic.js'

// ============================================================
// Layout ini sengaja NGGAK pakai <SectionHeading/> biasa —
// halaman ini "signature moment" tersendiri: scrapbook journal.
// Semua warna tetap pakai token existing (ink/accent/primary/
// blush/sky/cream) biar konsisten sama sisi web yang lain.
// ============================================================

const rotates = [-3, 2, -2, 3, -1.5, 2.5, -3, 1.5, -2, 3]
const offsets = ['sm:mt-0', 'sm:mt-8', 'sm:mt-3', 'sm:mt-10', 'sm:mt-1', 'sm:mt-6']
const tapeColors = ['bg-accent/50', 'bg-sky/50', 'bg-blush/50', 'bg-primary/40']
const tapeRotates = [-6, 4, -4, 6]
const stickerCycle = ['leaf', 'clover', 'sparkle', 'strawberry']

// torn-edge photo: dua varian clip-path biar nggak keliatan copy-paste
const tornClips = [
  'polygon(2% 4%,12% 0%,22% 3%,33% 0%,44% 2%,55% 0%,66% 3%,77% 0%,88% 2%,98% 0%,100% 96%,90% 100%,80% 97%,68% 100%,57% 98%,46% 100%,35% 97%,24% 100%,13% 98%,0% 100%)',
  'polygon(0% 3%,10% 0%,20% 2%,31% 0%,42% 3%,53% 0%,64% 2%,75% 0%,86% 3%,100% 0%,98% 97%,88% 100%,78% 98%,67% 100%,56% 97%,45% 100%,34% 98%,23% 100%,12% 97%,2% 100%)',
]

/* ---------------------------------------------------------
   ICON / STICKER SET BUATAN SENDIRI
--------------------------------------------------------- */

function CuteHeart({ className = 'w-3.5 h-3.5 text-accent' }) {
  return (
    <svg viewBox="0 0 24 22" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.2c-.4-.35-4.15-3.6-6.9-6.6C2.6 10.9 1.4 8.7 1.7 6.4 2 4 4 2 6.6 2c1.75 0 3.3.95 4.1 2.4a.5.5 0 0 0 .9 0C12.4 2.95 13.95 2 15.7 2 18.3 2 20.3 4 20.6 6.4c.3 2.3-.9 4.5-3.4 7.2-2.75 3-6.5 6.25-6.9 6.6-.1.1-.2.1-.3 0Z"
        className="fill-current opacity-90"
      />
    </svg>
  )
}

function CuteMusicNote({ className = 'w-3.5 h-3.5 text-ink/50' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9 17.2c0 1.5-1.4 2.6-3 2.6s-3-1.1-3-2.6 1.4-2.6 3-2.6c.5 0 1 .1 1.4.3V6.8c0-.5.35-.9.85-1L17.7 3c.65-.15 1.3.35 1.3 1v11.7c0 1.5-1.4 2.6-3 2.6s-3-1.1-3-2.6 1.4-2.6 3-2.6c.5 0 1 .1 1.4.3V8.4l-8.4 1.9v6.9Z"
        className="fill-current"
      />
    </svg>
  )
}

function CuteWhisperBubble({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 22" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2C6.5 2 2 5.4 2 9.6c0 2.5 1.6 4.7 4.1 6.1-.15 1.1-.6 2.3-1.4 3.3-.2.25 0 .6.3.55 1.75-.3 3.2-1 4.2-1.7.9.2 1.85.3 2.8.3 5.5 0 10-3.4 10-7.6S17.5 2 12 2Z"
        className="stroke-current fill-none"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8.3" cy="9.8" r="1" className="fill-current" />
      <circle cx="12" cy="9.8" r="1" className="fill-current" />
      <circle cx="15.7" cy="9.8" r="1" className="fill-current" />
    </svg>
  )
}

function CuteLock({ className = 'w-4 h-4', locked = true }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.4" className="stroke-current fill-none" strokeWidth="1.6" />
      {locked ? (
        <path
          d="M7.5 10.5V7.8a4.5 4.5 0 0 1 9 0v2.7"
          className="stroke-current fill-none"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M7.5 10.5V7.8a4.5 4.5 0 0 1 8-2.8"
          className="stroke-current fill-none"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
      <circle cx="12" cy="15" r="1.3" className="fill-current" />
    </svg>
  )
}

function CuteSparkleBurst({ className = 'w-6 h-6 text-accent', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path
        d="M12 2c.5 3.6 1.2 6 2.4 7.6C15.6 11.2 18 12 21.5 12c-3.5 0-5.9.9-7.1 2.5C13.2 16 12.5 18.4 12 22c-.5-3.6-1.2-6-2.4-7.5C8.4 12.9 6 12 2.5 12 6 12 8.4 11.2 9.6 9.6 10.8 8 11.5 5.6 12 2Z"
        className="fill-current"
      />
    </svg>
  )
}

function CuteLeaf({ className = 'w-5 h-5 text-primary/70', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path d="M4 20C3 12 8 4 20 3c1 10-6 17-16 17Z" className="fill-current opacity-80" />
      <path d="M5.5 18.5C9 14 12.5 10.5 18 5" className="stroke-cream/80" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function CuteClover({ className = 'w-6 h-6 text-primary', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <g className="fill-current opacity-90">
        <circle cx="9" cy="9" r="4.2" />
        <circle cx="15" cy="9" r="4.2" />
        <circle cx="9" cy="15" r="4.2" />
        <circle cx="15" cy="15" r="4.2" />
      </g>
      <path d="M12 12v9" className="stroke-current" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function CuteStrawberry({ className = 'w-6 h-6', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 26" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path d="M12 6c-1.5-2.5-4-3.5-6.5-3 1 1.3 1.8 2.4 2.2 3.4C6 6 4.8 6 3.5 6.6 5 7.4 6.3 8 7.3 8.6" className="stroke-primary" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M12 8c5 0 8 4 6.3 10.5C17 23.5 14.5 25 12 25s-5-1.5-6.3-6.5C4 12 7 8 12 8Z" className="fill-accent/85" />
      <g className="fill-cream/80">
        <circle cx="9" cy="13" r="0.6" />
        <circle cx="13" cy="12" r="0.6" />
        <circle cx="16" cy="14.5" r="0.6" />
        <circle cx="8" cy="17" r="0.6" />
        <circle cx="12" cy="17.5" r="0.6" />
        <circle cx="15.5" cy="18.5" r="0.6" />
        <circle cx="11" cy="21" r="0.6" />
      </g>
    </svg>
  )
}

function CuteBandage({ className = 'h-5 w-9', rotate = 0 }) {
  return (
    <svg viewBox="0 0 40 20" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <rect x="1" y="1" width="38" height="18" rx="9" className="fill-blush/70 stroke-blush" strokeWidth="1" />
      <rect x="14" y="1" width="12" height="18" className="fill-cream/70" />
      <g className="fill-ink/30">
        <circle cx="17" cy="6" r="0.8" />
        <circle cx="22" cy="6" r="0.8" />
        <circle cx="17" cy="10" r="0.8" />
        <circle cx="22" cy="10" r="0.8" />
        <circle cx="17" cy="14" r="0.8" />
        <circle cx="22" cy="14" r="0.8" />
      </g>
    </svg>
  )
}

function Sticker({ type, className, rotate }) {
  switch (type) {
    case 'clover':
      return <CuteClover className={className} rotate={rotate} />
    case 'strawberry':
      return <CuteStrawberry className={className} rotate={rotate} />
    case 'sparkle':
      return <CuteSparkleBurst className={className} rotate={rotate} />
    default:
      return <CuteLeaf className={className} rotate={rotate} />
  }
}

/** Panah lengkung tulisan-tangan, dari label nama ke arah foto */
function ArrowDoodle({ flip = false, className = '' }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`${className} ${flip ? '-scale-x-100' : ''}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 4c10 2 22 10 26 24"
        className="stroke-ink/60"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 25 L28 28 L24 34"
        className="stroke-ink/60"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

/* ---------------------------------------------------------
   BACKGROUND: kertas grid + spiral binding
--------------------------------------------------------- */

function GridPaperBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(60,50,40,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(60,50,40,0.06) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }}
      aria-hidden="true"
    />
  )
}

function SpiralBinding() {
  const rings = Array.from({ length: 16 })
  return (
    <div className="absolute top-0 bottom-0 left-0 flex-col justify-around hidden w-10 py-10 sm:flex" aria-hidden="true">
      {rings.map((_, i) => (
        <div key={i} className="w-6 h-6 mx-auto border-2 rounded-full shadow-inner border-ink/30 bg-cream" />
      ))}
    </div>
  )
}

/* ---------------------------------------------------------
   FOTO — seragam ukurannya, tapi bisa di-tuning per orang
   lewat friendsMusic.js: avatarZoom, avatarPosition, avatarFit
--------------------------------------------------------- */

function TornPhoto({ friend, index }) {
  const fit = friend.avatarFit || 'cover'
  const zoom = friend.avatarZoom || 1
  const position = friend.avatarPosition || 'center 25%'
  const clip = tornClips[index % tornClips.length]

  return (
    <div className="overflow-hidden bg-secondary aspect-[4/5]" style={{ clipPath: clip }}>
      <img
        src={friend.avatar}
        alt={friend.name}
        className="w-full h-full"
        style={{
          objectFit: fit,
          objectPosition: position,
          transform: `scale(${zoom})`,
          transformOrigin: position,
        }}
      />
    </div>
  )
}

function WashiTape({ index }) {
  return (
    <div
      className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 ${tapeColors[index % tapeColors.length]} shadow-sm`}
      style={{
        rotate: `${tapeRotates[index % tapeRotates.length]}deg`,
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 9px)',
      }}
      aria-hidden="true"
    />
  )
}

function SecretReveal({ note }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="overflow-hidden"
    >
      <motion.div
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative p-4 mt-3 rounded-2xl bg-accent/10"
      >
        <motion.span
          className="absolute -top-2 -left-1"
          animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CuteSparkleBurst className="w-4 h-4 text-accent" />
        </motion.span>
        <p className="text-base leading-relaxed whitespace-pre-line font-hand text-ink/80">{note}</p>
      </motion.div>
    </motion.div>
  )
}

/** Form password kecil — muncul sebelum secretNote ke-reveal */
function SecretPasswordGate({ onSubmit, error }) {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(value)
  }

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onSubmit={handleSubmit}
      className="overflow-hidden"
    >
      <motion.div
        animate={error ? { x: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 p-3 mt-3 rounded-2xl bg-ink/5"
      >
        <CuteLock className="flex-shrink-0 w-4 h-4 text-ink/50" />
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type the password..."
          autoFocus
          className="flex-1 min-w-0 text-sm bg-transparent outline-none font-body text-ink/80 placeholder:text-ink/35"
        />
        <button
          type="submit"
          data-cursor-hover
          className="px-3 py-1 text-xs transition-colors rounded-full shrink-0 font-body bg-accent/20 text-accent hover:bg-accent/30"
        >
          unlock
        </button>
      </motion.div>
      {error && (
        <p className="mt-1.5 px-1 text-xs font-hand text-accent/80">psst, that's not it — try again</p>
      )}
    </motion.form>
  )
}

function SupporterCard({ friend, index }) {
  const [revealed, setRevealed] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [error, setError] = useState(false)
  const rotate = rotates[index % rotates.length]
  const offset = offsets[index % offsets.length]
  const flipArrow = index % 2 === 1
  const stickerType = stickerCycle[index % stickerCycle.length]
  const stickerSide = index % 2 === 0 ? '-right-3' : '-left-3'

  const handleToggle = () => {
    if (revealed) {
      // sembunyiin lagi, reset semua state gate
      setRevealed(false)
      setGateOpen(false)
      setError(false)
      return
    }
    setGateOpen((g) => !g)
    setError(false)
  }

  const handlePasswordSubmit = (value) => {
    const correct = friend.secretPassword ?? ''
    if (value.trim().toLowerCase() === correct.trim().toLowerCase()) {
      setRevealed(true)
      setGateOpen(false)
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay: index * 0.04 }}
      className={`relative ${offset}`}
    >
      {/* label nama + panah lengkung, gaya "Lang / Yan" di jurnal */}
      <div className={`flex items-center gap-1 mb-1 ${flipArrow ? 'flex-row-reverse justify-end pr-2' : 'pl-2'}`}>
        <ArrowDoodle flip={flipArrow} className="w-9 h-7 shrink-0" />
        <span className="px-2 py-0.5 -rotate-1 rounded-md bg-accent/10 text-base font-heading text-accent whitespace-nowrap">
          {friend.name}
        </span>
      </div>

      <div className="relative p-3 pt-4 bg-white rounded-sm shadow-paper" style={{ rotate: `${rotate}deg` }}>
        <WashiTape index={index} />

        <div className={`absolute -top-3 ${stickerSide} z-10`}>
          <Sticker type={stickerType} className="w-7 h-7" rotate={rotates[(index + 2) % rotates.length] * 4} />
        </div>

        <TornPhoto friend={friend} index={index} />

        {friend.thanksNote && (
          <p className="mt-2.5 px-1 font-hand text-base leading-relaxed text-ink/70 whitespace-pre-line">
            {friend.thanksNote}
          </p>
        )}

        {friend.songForThem && (
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2 mt-2 ${tapeColors[(index + 1) % tapeColors.length]}`}>
            <CuteMusicNote className="flex-shrink-0 w-3.5 h-3.5 text-ink/60" />
            <div className="min-w-0">
              <p className="text-[11px] font-body text-ink/50">a song from me to you</p>
              <p className="text-sm font-medium truncate font-body text-ink/80">
                {friend.songForThem.title} · {friend.songForThem.artist}
              </p>
            </div>
          </div>
        )}

        {friend.secretNote && (
          <>
            <button
              data-cursor-hover
              onClick={handleToggle}
              className="flex items-center gap-1.5 mt-3 px-1 text-sm font-body text-ink/50 hover:text-ink/80 transition-colors"
            >
              {revealed ? <CuteLock className="w-4 h-4" locked={false} /> : <CuteWhisperBubble className="w-4 h-4" />}
              {revealed ? 'shh, close it back' : 'whisper a secret'}
            </button>

            <AnimatePresence mode="wait">
              {gateOpen && !revealed && (
                <SecretPasswordGate key="gate" onSubmit={handlePasswordSubmit} error={error} />
              )}
              {revealed && <SecretReveal key="reveal" note={friend.secretNote} />}
            </AnimatePresence>
          </>
        )}

        <CuteHeart className="absolute w-4 h-4 -bottom-2 -right-2 text-accent drop-shadow" />
      </div>
    </motion.div>
  )
}

export default function Supporters() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-cream">
      <GridPaperBg />
      <SpiralBinding />

      <div className="relative max-w-5xl px-5 pt-24 pb-24 mx-auto sm:pl-16 sm:pr-8">
        {/* ---- HEADER ala jurnal ---- */}
        <div className="relative mb-16 text-center sm:text-left">
          <p className="mb-1 text-sm tracking-widest uppercase font-body text-ink/45">a little thank you journal</p>
          <h1 className="leading-[0.95]">
            <span className="block text-3xl font-hand -rotate-2 text-ink/70">my</span>
            <span className="relative inline-block text-6xl sm:text-7xl font-heading text-accent -rotate-1">
              cherished
              <CuteSparkleBurst className="absolute w-6 h-6 -top-3 -right-6 text-accent" rotate={12} />
            </span>
            <span className="block text-5xl font-hand sm:text-6xl text-primary rotate-1">pals</span>
          </h1>

          <div className="flex items-center justify-center gap-4 mt-4 sm:justify-start">
            <CuteClover rotate={-10} className="w-7 h-7 text-primary" />
            <CuteStrawberry rotate={8} className="w-7 h-7" />
            <CuteBandage rotate={-6} className="w-10 h-6" />
            <CuteLeaf rotate={16} className="w-6 h-6 text-primary/70" />
          </div>

          <p className="max-w-md mx-auto mt-4 text-base font-hand text-ink/60 sm:mx-0">
            the people who hyped me up while building this little corner ♡
          </p>
        </div>

        {/* ---- KOLASE FOTO ---- */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {friendsMusic.map((friend, i) => (
            <SupporterCard key={friend.id} friend={friend} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}