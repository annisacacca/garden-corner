import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { certificates } from '../data/certificates.js'

function Clothespin() {
  return (
    <svg width="18" height="26" viewBox="0 0 18 26" className="absolute -top-4 left-1/2 -translate-x-1/2">
      <rect x="2" y="0" width="6" height="22" rx="2" fill="#E7CFA4" />
      <rect x="10" y="0" width="6" height="22" rx="2" fill="#E7CFA4" />
      <circle cx="9" cy="9" r="3" fill="#5F6F52" opacity="0.6" />
    </svg>
  )
}

export default function Certificates() {
  const [active, setActive] = useState(null)

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      <SectionHeading eyebrow="little proofs of effort" title="certificates" align="center" />

      <div className="relative rounded-[28px] bg-secondary/50 p-10">
        <div className="absolute left-6 right-6 top-8 h-[2px] bg-dark/20" />
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.id}
              data-cursor-hover
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ rotate: [cert.rotate, cert.rotate - 4, cert.rotate + 4, cert.rotate], transition: { duration: 0.5 } }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setActive(cert)}
              style={{ rotate: cert.rotate }}
              className="relative rounded-sm bg-white p-4 text-left shadow-paper"
            >
              <Clothespin />
              <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-secondary">
                <span className="font-hand text-base text-ink/40">certificate</span>
              </div>
              <p className="mt-3 font-body text-sm font-semibold text-ink">{cert.title}</p>
              <p className="font-body text-xs text-ink/50">{cert.issuer} · {cert.year}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/40 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lift"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 text-ink/50 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-secondary">
                <span className="font-hand text-lg text-ink/40">certificate preview</span>
              </div>
              <h3 className="mt-4 font-heading text-xl text-ink">{active.title}</h3>
              <p className="font-body text-sm text-ink/60">{active.issuer} · {active.year}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
