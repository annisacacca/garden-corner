import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion } from 'framer-motion'
import {
  LeafSprig,
  CloverIcon,
  StarDoodle,
  FrogSticker,
  CoffeeStain,
  PaperclipDoodle,
  StickyNoteDoodle,
  PressedFlower,
} from './icons.jsx'

const STICKERS = [PressedFlower, CloverIcon, LeafSprig, StarDoodle, FrogSticker, CoffeeStain, PaperclipDoodle, StickyNoteDoodle]

export default function BoardAtmosphere({ boardRef }) {
  const reducedMotion = useReducedMotion()
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    setIsNight(hour < 6 || hour >= 19)
  }, [])

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return
    const node = boardRef.current
    if (!node) return
    const handleMove = (e) => {
      const rect = node.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      parallaxX.set(relX * 14)
      parallaxY.set(relY * 14)
    }
    node.addEventListener('mousemove', handleMove)
    return () => node.removeEventListener('mousemove', handleMove)
  }, [boardRef, parallaxX, parallaxY, reducedMotion])

  const stickers = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        Icon: STICKERS[i % STICKERS.length],
        top: `${8 + ((i * 37) % 84)}%`,
        left: `${5 + ((i * 53) % 90)}%`,
        size: 22 + ((i * 11) % 20),
        rotate: ((i * 29) % 40) - 20,
        duration: 6 + (i % 4),
      })),
    []
  )

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        top: `${(i * 23) % 100}%`,
        left: `${(i * 41) % 100}%`,
        size: 3 + (i % 3),
        duration: 4 + (i % 5),
        delay: i * 0.3,
      })),
    []
  )

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ x: parallaxX, y: parallaxY }}
    >
      {stickers.map(({ Icon, top, left, size, rotate, duration }, i) => (
        <motion.div
          key={i}
          className="absolute opacity-60"
          style={{ top, left, width: size, height: size }}
          initial={{ rotate }}
          animate={reducedMotion ? {} : { y: [0, -8, 0], rotate: [rotate, rotate + 4, rotate] }}
          transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="w-full h-full" />
        </motion.div>
      ))}

      {!reducedMotion &&
        particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: isNight ? '#F4E7A6' : '#5F6F52',
              boxShadow: isNight ? '0 0 6px 2px rgba(244,231,166,0.55)' : 'none',
            }}
            animate={{
              opacity: isNight ? [0.1, 0.9, 0.1] : [0.15, 0.4, 0.15],
              y: [0, -10, 0],
            }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}

      {!reducedMotion && (
        <motion.div
          className="absolute top-1/4"
          initial={{ x: '-10vw', opacity: 0 }}
          animate={{ x: '110vw', opacity: [0, 1, 1, 0], rotate: [0, 30, -10, 15] }}
          transition={{ duration: 18, repeat: Infinity, repeatDelay: 10, ease: 'linear' }}
        >
          <LeafSprig className="w-8 h-8 opacity-50" color="#7C9A6B" />
        </motion.div>
      )}
    </motion.div>
  )
}