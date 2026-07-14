import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading.jsx'
import StickyNote from '../ui/StickyNote.jsx'
import { useGuestbook } from '../../hooks/useGuestbook.js'

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function GuestNotesWall() {
  const { entries, loading } = useGuestbook({ limit: 30 })
  const shuffled = useMemo(() => shuffle(entries).slice(0, 9), [entries])

  if (!loading && entries.length === 0) return null

  return (
    <section className="max-w-5xl px-6 pb-24 mx-auto">
      <SectionHeading eyebrow="notes from visitors" title="the visitor wall" align="center" />

      {loading ? (
        <p className="text-sm text-center font-body text-ink/50">loading notes...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {shuffled.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <StickyNote color={entry.color} rotate={entry.rotate} className="min-h-[110px]">
                <p className="text-base leading-6">{entry.message}</p>
                <p className="mt-2 text-sm text-ink/50">— {entry.name}</p>
              </StickyNote>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/guestbook" data-cursor-hover className="text-sm underline font-hand text-ink/60">
          leave your own note →
        </Link>
      </div>
    </section>
  )
}