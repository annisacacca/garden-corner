import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowDown, Sparkles } from 'lucide-react'
import WashiTape from '../components/ui/WashiTape.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import StickyNote from '../components/ui/StickyNote.jsx'
import GuestNotesWall from '../components/home/GuestNotesWall.jsx'

function AnimatedFrog() {
  return (
    <motion.svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="70" cy="118" rx="52" ry="10" fill="#5F6F52" opacity="0.12" />
      <ellipse cx="70" cy="78" rx="34" ry="28" fill="#B9D7A8" />
      <circle cx="46" cy="52" r="15" fill="#B9D7A8" />
      <circle cx="94" cy="52" r="15" fill="#B9D7A8" />
      <circle cx="46" cy="52" r="6" fill="#5F6F52" />
      <circle cx="94" cy="52" r="6" fill="#5F6F52" />
      <circle cx="43" cy="49" r="1.8" fill="white" />
      <circle cx="91" cy="49" r="1.8" fill="white" />
      <path d="M52 88 Q70 100 88 88" stroke="#5F6F52" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="56" cy="84" rx="5" ry="3" fill="#E7A0A0" opacity="0.5" />
      <ellipse cx="84" cy="84" rx="5" ry="3" fill="#E7A0A0" opacity="0.5" />
      <ellipse cx="40" cy="98" rx="10" ry="7" fill="#A9C98F" />
      <ellipse cx="100" cy="98" rx="10" ry="7" fill="#A9C98F" />
    </motion.svg>
  )
}

// short handwritten-diary style notes — no emoji, kept plain and a little quiet
const JAR_NOTES = [
  'left the porch light on for you tonight',
  'this page has been rewritten four times and it still isn\u2019t perfect, and that\u2019s fine',
  'the frog says hi but only if you\u2019re not looking directly at it',
  'still figuring out the layout for the music page',
  'thinking about repainting the whole site in autumn colors eventually',
  'a small reminder that unfinished things are still things',
  'this jar refills itself, don\u2019t worry about running out',
  'wrote this at 1am, no regrets',
  'there\u2019s a version of this site that only exists in my notes app',
  'you found the quiet corner of the site',
  'every note in here was typed and re-typed at least once',
  'this jar has never once been empty',
]

function FireflySVG({ size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <defs>
        <radialGradient id="fireflyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F3D98B" stopOpacity="1" />
          <stop offset="55%" stopColor="#E7B94E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E7B94E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="10" cy="10" r="10" fill="url(#fireflyGlow)" />
      <circle cx="10" cy="10" r="2.4" fill="#FFF6DE" />
    </svg>
  )
}

function JarSVG({ open }) {
  return (
    <svg width="150" height="170" viewBox="0 0 150 170">
      {/* jar body */}
      <path
        d="M40 60 L38 150 Q38 160 50 160 L100 160 Q112 160 112 150 L110 60 Z"
        fill="#EAF3ED"
        fillOpacity="0.55"
        stroke="#8FA98F"
        strokeWidth="2.5"
      />
      {/* glass shine */}
      <path d="M52 68 L50 148" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      {/* jar neck */}
      <rect x="52" y="44" width="46" height="20" rx="4" fill="#EAF3ED" fillOpacity="0.6" stroke="#8FA98F" strokeWidth="2.5" />
      {/* lid */}
      <motion.g
        animate={{ rotate: open ? -34 : 0, x: open ? -14 : 0, y: open ? -6 : 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        style={{ transformOrigin: '58px 42px' }}
      >
        <rect x="46" y="32" width="58" height="14" rx="6" fill="#B9704A" stroke="#8B5335" strokeWidth="2" />
        <rect x="52" y="26" width="46" height="10" rx="4" fill="#C77F53" stroke="#8B5335" strokeWidth="2" />
      </motion.g>
    </svg>
  )
}

function FireflyJar() {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState(null)
  const [releaseCount, setReleaseCount] = useState(0)
  const [batch, setBatch] = useState(0)
  const closeTimeoutRef = useRef(null)
  const noteTimeoutRef = useRef(null)

  const handleOpenJar = () => {
    if (open) return

    setOpen(true)
    setBatch((b) => b + 1)
    setReleaseCount((c) => c + 1)

    const randomNote = JAR_NOTES[Math.floor(Math.random() * JAR_NOTES.length)]

    if (noteTimeoutRef.current) clearTimeout(noteTimeoutRef.current)
    noteTimeoutRef.current = setTimeout(() => setNote(randomNote), 650)

    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false)
      setNote(null)
    }, 4200)
  }

  const fireflyOffsets = [
    { dx: -30, dy: -70, delay: 0 },
    { dx: 18, dy: -95, delay: 0.08 },
    { dx: -8, dy: -60, delay: 0.16 },
    { dx: 34, dy: -55, delay: 0.05 },
    { dx: -22, dy: -40, delay: 0.22 },
  ]

  return (
    <section className="max-w-5xl px-6 pb-24 mx-auto">
      <SectionHeading eyebrow="a jar of small notes" title="the firefly jar" align="center" />
      <div className="flex flex-col items-center gap-6 rounded-[32px] bg-white/60 p-10 shadow-soft sm:flex-row sm:justify-center sm:gap-14">
        <div
          onClick={handleOpenJar}
          data-cursor-hover
          className="relative flex-shrink-0 cursor-pointer select-none"
          style={{ width: 150, height: 170 }}
        >
          <JarSVG open={open} />

          <AnimatePresence>
            {open &&
              fireflyOffsets.map((f, i) => (
                <motion.div
                  key={`${batch}-${i}`}
                  initial={{ opacity: 0, x: 68, y: 90, scale: 0.4 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: 68 + f.dx,
                    y: 90 + f.dy,
                    scale: [0.4, 1, 1, 0.6],
                  }}
                  transition={{ duration: 2.4, delay: f.delay, ease: 'easeOut' }}
                  className="absolute top-0 left-0 pointer-events-none"
                >
                  <FireflySVG size={9 + (i % 3) * 2} />
                </motion.div>
              ))}
          </AnimatePresence>

          {!open && (
            <p className="absolute -translate-x-1/2 bottom-[-26px] left-1/2 whitespace-nowrap text-xs font-hand text-ink/40">
              tap the lid
            </p>
          )}
        </div>

        <div className="flex flex-col items-center min-h-[110px] justify-center sm:items-start">
          <AnimatePresence mode="wait">
            {note ? (
              <motion.div
                key={note}
                initial={{ opacity: 0, y: 10, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: -1.5 }}
                exit={{ opacity: 0, y: -8, rotate: 2 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <WashiTape className="left-1/2 top-[-10px] -translate-x-1/2" rotate={-3} width="w-16" />
                <StickyNote color="cream" rotate={-1.5} className="max-w-xs text-sm shadow-lift">
                  {note}
                </StickyNote>
              </motion.div>
            ) : (
              <p className="max-w-xs text-sm text-center font-body text-ink/50 sm:text-left">
                open the jar and one of them will land close enough to read.
              </p>
            )}
          </AnimatePresence>

          {releaseCount > 0 && (
            <p className="mt-4 text-xs font-hand text-ink/40">
              opened {releaseCount} {releaseCount === 1 ? 'time' : 'times'}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative flex flex-col items-center justify-center max-w-6xl min-h-screen px-6 pt-24 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          <div className="relative rounded-paper border-[10px] border-white bg-white p-2 shadow-lift">
            <div className="relative overflow-hidden rounded-sm h-52 w-44 bg-secondary sm:h-64 sm:w-52">
              <img
                src="/poto.png"
                alt="Noctera"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
          </div>
          <WashiTape className="left-1/2 top-[-14px] -translate-x-1/2" rotate={-4} width="w-20" />
          <motion.div
            className="absolute -right-10 -top-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-7 w-7 text-accent" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl font-hand text-dark/80"
        >
          hi, i'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-1 text-5xl leading-tight font-heading text-ink sm:text-6xl md:text-7xl"
        >
          Noctera
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="max-w-xl mt-4 text-base font-body text-ink/70 sm:text-lg"
        >
          Computer Science Education Student
          <br />
          {/* Universitas Pendidikan Indonesia */}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="max-w-md mt-4 text-sm font-body text-ink/60"
        >
          This little corner of the internet is where I share my projects, creativity, and small pieces of who I am. Feel free to explore, click around, and stay for a while.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-8"
        >
          <Link
            to="/about"
            data-cursor-hover
            className="inline-flex items-center gap-2 py-3 text-sm font-semibold transition-transform rounded-full group bg-dark px-7 font-body text-cream shadow-soft hover:scale-105"
          >
            Explore My World
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>

        <div className="absolute -translate-x-1/2 bottom-8 left-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex flex-col items-center gap-1 text-ink/40"
          >
            <span className="text-sm font-hand">scroll a little</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>
      </section>

      <section className="max-w-5xl px-6 pb-24 mx-auto">
        <SectionHeading eyebrow="say hello to" title="the resident frog" align="center" />
        <div className="flex flex-col items-center gap-8 rounded-[32px] bg-white/60 p-10 shadow-soft sm:flex-row sm:justify-center">
          <AnimatedFrog />
          <div className="max-w-sm text-center sm:text-left">
            <p className="text-sm font-body text-ink/70">
              This little frog lives on the lily pad in the corner of every page.
              Meet Froggy. He doesn't write code, doesn't fix bugs, and honestly has no idea what's going on but he's doing his best.
            </p>
            <div className="flex justify-center gap-3 mt-4 sm:justify-start">
              <StickyNote color="green" rotate={-4} className="text-sm">
                ribbit ribbit
              </StickyNote>
              <StickyNote color="cream" rotate={3} className="text-sm">
                hi there!
              </StickyNote>
            </div>
          </div>
        </div>
      </section>

      <FireflyJar />
      <GuestNotesWall />
    </div>
  )
}