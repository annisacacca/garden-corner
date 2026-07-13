import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-dark px-6 py-16 text-cream">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          animate={{ rotate: [0, -8, 8, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="36" cy="42" r="20" fill="#B9D7A8" />
          <circle cx="24" cy="24" r="8" fill="#B9D7A8" />
          <circle cx="48" cy="24" r="8" fill="#B9D7A8" />
          <circle cx="24" cy="24" r="3.2" fill="#2F3629" />
          <circle cx="48" cy="24" r="3.2" fill="#2F3629" />
          <path d="M28 48 Q36 54 44 48" stroke="#2F3629" strokeWidth="2" fill="none" strokeLinecap="round" />
          <motion.path
            d="M16 46 Q6 40 4 30"
            stroke="#B9D7A8"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ transformOrigin: '16px 46px' }}
          />
        </motion.svg>

        <p className="mt-4 font-hand text-3xl text-cream/90">
          Thank you for visiting my little world.
        </p>
        <p className="mt-2 max-w-md font-body text-sm text-cream/60">
          Come back anytime — the frog will be here, and the leaves keep falling.
        </p>

        <div className="mt-6 flex gap-4">
          {[
            { icon: Instagram, href: '#', label: 'Instagram' },
            { icon: Github, href: '#', label: 'Github' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              data-cursor-hover
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="mt-10 font-body text-xs text-cream/40">
          © {new Date().getFullYear()} Annisa Fitriani Lestari · made with care, one leaf at a time 🌿
        </p>
      </div>
    </footer>
  )
}
