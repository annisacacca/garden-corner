import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Home as HomeIcon, NotebookText, Palette, Sprout,
  Award, Image, Heart, Music2, MessageSquareHeart, Mail, Users, BookOpen,
} from 'lucide-react'

const links = [
  { to: '/', label: 'Home', icon: HomeIcon, color: 'bg-primary/70', tape: 'bg-accent/70' },
  { to: '/about', label: 'About', icon: NotebookText, color: 'bg-blush/60', tape: 'bg-primary/60' },
  { to: '/gallery', label: 'Gallery', icon: Image, color: 'bg-blush/50', tape: 'bg-secondary' },
  { to: '/hobbies', label: 'Hobbies', icon: Heart, color: 'bg-sky/50', tape: 'bg-primary/60' },
  { to: '/music', label: 'Music', icon: Music2, color: 'bg-accent/50', tape: 'bg-blush/50' },
  { to: '/books', label: 'Books', icon: BookOpen, color: 'bg-primary/60', tape: 'bg-blush/60' },
  { to: '/supporters', label: 'Thanks', icon: Users, color: 'bg-secondary/70', tape: 'bg-primary/50' },
  { to: '/community', label: 'Scrapbook', icon: Palette, color: 'bg-sky/60', tape: 'bg-blush/50' },
  { to: '/guestbook', label: 'Guestbook', icon: MessageSquareHeart, color: 'bg-primary/50', tape: 'bg-sky/50' },
  { to: '/contact', label: 'Contact', icon: Mail, color: 'bg-blush/60', tape: 'bg-accent/50' },
]

// alternating tilt so tabs feel hand-placed, not machine-aligned
const tilts = [-3, 2, -2, 3, -1, 2, -3, 1, -2, 3]

export default function FloatingNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop: colorful scrapbook tabs */}
      <nav className="fixed z-50 hidden -translate-x-1/2 left-1/2 top-3 lg:block">
        <div className="flex items-end gap-1.5 rounded-b-2xl bg-white/40 px-3 pb-2 pt-0 backdrop-blur-sm">
          {links.map((link, i) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                data-cursor-hover
                className="relative block group"
                style={{ rotate: `${tilts[i]}deg` }}
              >
                {({ isActive }) => (
                  <motion.div
                    initial={false}
                    animate={{
                      y: isActive ? -6 : 0,
                      rotate: isActive ? 0 : tilts[i],
                    }}
                    whileHover={{ y: -8, rotate: 0, scale: 1.06 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className={`relative flex flex-col items-center gap-1 rounded-xl px-3 py-2.5 shadow-paper ${link.color} ${
                      isActive ? 'shadow-lift ring-2 ring-white/70' : ''
                    }`}
                  >
                    {/* washi tape only on the active tab */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-tape"
                        className={`absolute -top-2.5 left-1/2 h-4 w-9 -translate-x-1/2 rounded-sm opacity-90 ${link.tape}`}
                        style={{ rotate: -3 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="w-4 h-4 text-ink/80" strokeWidth={2.2} />
                    <span className="text-sm leading-none font-hand text-ink/80">{link.label}</span>
                  </motion.div>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>

      {/* Mobile / tablet: floating tab trigger + drawer */}
      <div className="fixed z-50 right-4 top-4 lg:hidden">
        <motion.button
          data-cursor-hover
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          whileTap={{ scale: 0.92 }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/70 shadow-soft"
        >
          <Menu className="w-5 h-5 text-ink" />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-cream/97 p-6 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl font-hand text-dark">find your way ~</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-paper"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-3 mt-8 overflow-y-auto auto-rows-min">
              {links.map((link, i) => {
                const Icon = link.icon
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 14, rotate: tilts[i] }}
                    animate={{ opacity: 1, y: 0, rotate: tilts[i] }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex flex-col items-center gap-1.5 rounded-2xl px-4 py-4 shadow-paper ${link.color} ${
                          isActive ? 'ring-2 ring-dark/20' : ''
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 text-ink/80" strokeWidth={2.2} />
                      <span className="text-base font-heading text-ink">{link.label}</span>
                    </NavLink>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}