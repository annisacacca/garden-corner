import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="58" r="26" fill="#B9D7A8" />
          <circle cx="34" cy="36" r="10" fill="#B9D7A8" />
          <circle cx="66" cy="36" r="10" fill="#B9D7A8" />
          <circle cx="34" cy="36" r="4" fill="#5F6F52" />
          <circle cx="66" cy="36" r="4" fill="#5F6F52" />
          <path d="M38 66 Q50 56 62 66" stroke="#5F6F52" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
      <h1 className="mt-6 font-heading text-3xl text-ink">hop... this page wandered off</h1>
      <p className="mt-2 font-body text-sm text-ink/60">
        Placeholder 404 — the frog couldn't find this page either.
      </p>
      <Link
        to="/"
        data-cursor-hover
        className="mt-6 rounded-full bg-dark px-6 py-2.5 font-body text-sm font-semibold text-cream"
      >
        back to the lily pad
      </Link>
    </div>
  )
}
