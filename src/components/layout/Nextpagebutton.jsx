import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// urutan sama persis kayak di FloatingNav.jsx
const order = [
  '/', '/about', '/gallery', '/hobbies', '/music',
  '/books', '/supporters', '/community', '/guestbook', '/contact',
]

export default function NextPageButton() {
  const location = useLocation()
  const currentIndex = order.indexOf(location.pathname)

  // kalau path saat ini nggak ada di list (misal halaman 404), sembunyikan tombol
  if (currentIndex === -1) return null

  const nextPath = order[(currentIndex + 1) % order.length]

  return (
    <div className="fixed z-50 bottom-5 right-4 lg:hidden">
      <Link to={nextPath} data-cursor-hover aria-label="Next page">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/70 shadow-soft"
        >
          <ArrowRight className="w-5 h-5 text-ink" strokeWidth={2.2} />
        </motion.div>
      </Link>
    </div>
  )
}