import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, align = 'left', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-8 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <span className="font-hand text-xl text-dark/70">{eyebrow}</span>
      )}
      <h2 className="mt-1 font-heading text-4xl text-ink sm:text-5xl">{title}</h2>
      <span
        className={`mt-3 block h-[3px] w-16 rounded-full bg-primary ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </motion.div>
  )
}
