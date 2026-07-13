import { motion } from 'framer-motion'

export default function PolaroidCard({ image, caption, rotate = -2, onClick, className = '' }) {
  return (
    <motion.figure
      data-cursor-hover
      className={`card-stack w-full cursor-pointer rounded-[4px] bg-white p-3 pb-8 ${className}`}
      style={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 16 }}
      onClick={onClick}
    >
      <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-secondary">
        {image ? (
          <img src={image} alt={caption || ''} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink/30 font-hand text-xl">
            photo soon
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-hand text-lg text-ink">{caption}</figcaption>
      )}
    </motion.figure>
  )
}
