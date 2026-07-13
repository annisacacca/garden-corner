import { useState } from 'react'
import { motion } from 'framer-motion'
import { WashiTape, LeafSprig, PressedFlower } from './icons.jsx'

export default function PolaroidPhoto({
  photo,
  target,
  visible,
  draggable,
  zIndex,
  onFocus,
  reducedMotion,
  boardRef,
}) {
  const [flipped, setFlipped] = useState(false)
  const [hovering, setHovering] = useState(false)

  const handleTap = () => {
    onFocus(photo.id)
    setFlipped((f) => !f)
  }

  return (
    <motion.div
      className="absolute top-0 left-0"
      style={{ zIndex, touchAction: draggable ? 'none' : 'auto' }}
      initial={false}
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotate,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.85,
      }}
      transition={
        reducedMotion
          ? { duration: 0.25 }
          : { type: 'spring', stiffness: 220, damping: 18, mass: 0.9 }
      }
      drag={draggable && visible}
      dragMomentum
      dragElastic={0.12}
      dragConstraints={boardRef}
      onDragStart={() => onFocus(photo.id)}
      onTap={draggable ? handleTap : undefined}
      whileDrag={{ scale: 1.06, boxShadow: '0 22px 40px rgba(62,54,43,0.28)' }}
      whileHover={visible ? { y: target.y - 4, scale: 1.05 } : undefined}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
    >
      <div
        className="relative select-none w-36 sm:w-44"
        style={{ perspective: 1200, pointerEvents: visible ? 'auto' : 'none' }}
      >
        {photo.hasTape && (
          <WashiTape
            rotate={-8}
            color={photo.tapeColor}
            className="left-1/2 top-[-10px] w-14 -translate-x-1/2"
          />
        )}

        <motion.div
          className="relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Front */}
          <div
            className="rounded-sm bg-white p-2.5 pb-4 shadow-lift"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex aspect-[4/5] items-center justify-center bg-[#F1ECE0]">
              {photo.image ? (
                <img
                  src={photo.image}
                  alt={photo.caption}
                  loading="lazy"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="px-2 text-sm text-center font-hand text-ink/35">
                  photo soon
                </span>
              )}
            </div>
            <p className="mt-2.5 text-center font-hand text-base text-ink sm:text-lg">
              {photo.caption}
            </p>
            <p className="text-center text-[10px] uppercase tracking-wide text-ink/40 sm:text-xs">
              {photo.date}
              {photo.location ? ` · ${photo.location}` : ''}
            </p>

            {photo.decoration === 'leaf' && (
              <LeafSprig className="absolute rotate-45 pointer-events-none -bottom-3 -right-3 h-9 w-9 opacity-70" />
            )}
            {photo.decoration === 'flower' && (
              <PressedFlower className="absolute w-8 h-8 pointer-events-none -bottom-3 -left-3 opacity-80" />
            )}
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-sm bg-[#EFE7D5] p-4 shadow-lift"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-sm leading-relaxed text-center font-hand text-ink/80 sm:text-base">
              {photo.story}
            </p>
          </div>
        </motion.div>

        {visible && hovering && !flipped && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink/80 px-2.5 py-1 text-[10px] text-white"
          >
            Click to flip.
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}