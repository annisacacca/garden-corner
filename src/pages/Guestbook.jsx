import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import StickyNote from '../components/ui/StickyNote.jsx'
import { useGuestbook } from '../hooks/useGuestbook.js'

export default function Guestbook() {
  const { entries, loading, error, addEntry } = useGuestbook()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!message.trim()) return

    setSubmitting(true)
    setSubmitError(null)
    try {
      await addEntry({ name, message })
      setName('')
      setMessage('')
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl px-6 pt-32 pb-24 mx-auto">
      <SectionHeading eyebrow="leave a little note" title="guestbook" align="center" />

      <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto mb-12 bg-white rounded-3xl shadow-soft">
        <label className="block text-xs font-semibold tracking-wide uppercase font-body text-ink/50">
          your name (optional)
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="anonymous leaf"
          className="w-full px-3 py-2 mt-1 text-sm border outline-none rounded-xl border-secondary bg-cream font-body text-ink focus:border-primary"
        />
        <label className="block mt-4 text-xs font-semibold tracking-wide uppercase font-body text-ink/50">
          your message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="leave a kind little note..."
          rows={3}
          maxLength={300}
          className="w-full px-3 py-2 mt-1 text-lg border outline-none resize-none rounded-xl border-secondary bg-cream font-hand text-ink focus:border-primary"
        />
        {submitError && (
          <p className="mt-2 text-xs text-red-500">{submitError}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          data-cursor-hover
          className="mt-4 w-full rounded-full bg-dark py-2.5 font-body text-sm font-semibold text-cream transition-transform hover:scale-[1.02] disabled:opacity-50"
        >
          {submitting ? 'Pinning...' : 'Pin it to the wall'}
        </button>
      </form>

      {loading && (
        <p className="text-sm text-center font-body text-ink/50">loading notes...</p>
      )}
      {error && (
        <p className="text-sm text-center text-red-500">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <AnimatePresence>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <StickyNote color={entry.color} rotate={entry.rotate} className="min-h-[120px]">
                <p className="text-base leading-6">{entry.message}</p>
                <p className="mt-2 text-sm text-ink/50">— {entry.name}</p>
              </StickyNote>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}