import { motion } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative px-6 py-16 mt-20 overflow-hidden bg-dark text-cream">
      <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
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

        <p className="mt-4 text-3xl font-hand text-cream/90">
          Thank you for visiting my little world.
        </p>
        <p className="max-w-md mt-2 text-sm font-body text-cream/60">
          Come back anytime the frog will be here, and the leaves keep falling.
        </p>

        <div className="flex gap-4 mt-6">
          {[
            { icon: Instagram, href: 'https://www.instagram.com/el.lyue?igsh=eGZkeXQ4b240dHJn&utm_source=qr', label: 'Instagram' },
            { icon: Github, href: 'https://github.com/annisacacca', label: 'Github' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: 'nocteralily@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              data-cursor-hover
              className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-cream/10 hover:bg-cream/20"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <p className="mt-10 text-xs font-body text-cream/40">
          © {new Date().getFullYear()} Noctera · made with care, one leaf at a time 🌿
        </p>
      </div>
    </footer>
  )
}
