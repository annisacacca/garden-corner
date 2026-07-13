import { motion } from 'framer-motion'
import { Instagram, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'

const links = [
  { icon: Instagram, label: 'Instagram', value: '@el.lyue', href: 'https://www.instagram.com/el.lyue?igsh=eGZkeXQ4b240dHJn&utm_source=qr' },
  { icon: Github, label: 'Github', value: 'annisacacca', href: 'https://github.com/annisacacca' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Annisa Fitriani Lestari', href: '#' },
  { icon: Mail, label: 'Email', value: 'nocteralily@gmail.com', href: 'mailto:nocteralily@gmail.com' },
]

export default function Contact() {
  return (
    <div className="max-w-3xl px-6 pt-32 pb-24 mx-auto">
      <SectionHeading eyebrow="send a little letter" title="contact" align="center" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative max-w-md mx-auto mb-12"
      >
        <div className="relative p-1 rounded-2xl bg-accent/50 shadow-soft">
          <div className="relative p-10 overflow-hidden rounded-xl bg-cream">
            <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full">
              <polygon points="0,0 100,60 200,0" fill="#E7CFA4" opacity="0.6" />
              <polygon points="0,120 100,60 200,120" fill="#B9D7A8" opacity="0.4" />
            </svg>
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-paper"
              >
                <Mail className="h-7 w-7 text-dark" />
              </motion.div>
              <p className="mt-4 text-2xl text-center font-hand text-ink">
                say hi anytime - I'd love to hear from you
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map(({ icon: Icon, label, value, href }, i) => (
          <motion.a
            key={label}
            href={href}
            data-cursor-hover
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-4 p-4 transition-transform bg-white rounded-2xl shadow-paper hover:-translate-y-1"
          >
            <span className="flex items-center justify-center rounded-full h-11 w-11 bg-primary/50">
              <Icon className="w-5 h-5 text-ink" />
            </span>
            <span>
              <span className="block text-xs font-semibold tracking-wide uppercase font-body text-ink/50">
                {label}
              </span>
              <span className="block text-sm font-body text-ink">{value}</span>
            </span>
          </motion.a>
        ))}

        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-paper sm:col-span-2">
          <span className="flex items-center justify-center rounded-full h-11 w-11 bg-primary/50">
            <MapPin className="w-5 h-5 text-ink" />
          </span>
          <span>
            <span className="block text-xs font-semibold tracking-wide uppercase font-body text-ink/50">
              Location
            </span>
            <span className="block text-sm font-body text-ink">Bandung Coret, West Java, Indonesia </span>
          </span>
        </div>
      </div>
    </div>
  )
}
