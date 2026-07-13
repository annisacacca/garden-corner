import { motion } from 'framer-motion'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { experience } from '../data/experience.js'

function LeafBullet() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M4 20C4 11 10 4 20 4C20 14 13 20 4 20Z" fill="#B9D7A8" stroke="#5F6F52" strokeWidth="1" />
    </svg>
  )
}

export default function Experience() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <SectionHeading eyebrow="growing, one step at a time" title="my journey" align="center" />

      <div className="relative pl-10">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
          className="absolute left-3 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-primary via-primary/60 to-transparent"
        />

        <div className="space-y-14">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative"
            >
              <span className="absolute -left-10 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-cream">
                <LeafBullet />
              </span>
              <div className="rounded-2xl bg-white p-5 shadow-paper">
                <p className="font-hand text-lg text-dark/70">{item.period}</p>
                <h3 className="mt-0.5 font-heading text-xl text-ink">{item.role}</h3>
                <p className="font-body text-sm font-semibold text-ink/60">{item.org}</p>
                <p className="mt-2 font-body text-sm leading-6 text-ink/65">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
