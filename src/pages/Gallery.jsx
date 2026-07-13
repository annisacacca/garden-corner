import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import PolaroidCard from '../components/ui/PolaroidCard.jsx'
import { galleryPhotos } from '../data/gallery.js'

// Small hand-drawn botanical doodles to scatter between photos.
// Kept as inline SVG so they inherit currentColor and stay crisp at any size.
function LeafSprig({ className = '', color = '#5F6F52' }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <path d="M30 55C30 35 22 20 8 8" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M18 30C14 24 16 16 22 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M24 42C18 40 14 34 16 26" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function PressedFlower({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="20"
          rx="4.5"
          ry="9"
          fill="#E7CFA4"
          fillOpacity="0.75"
          stroke="#B8945E"
          strokeWidth="0.6"
          transform={`rotate(${deg} 20 20) translate(0 -8)`}
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="#C98A4B" />
    </svg>
  )
}

// Washi tape strip — random-ish rotation and one of a few muted colorways.
function WashiTape({ rotate = -6, color = 'bg-[#D9C7A3]/70', className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute h-5 w-16 ${color} shadow-sm ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: 'polygon(4% 0, 96% 0, 100% 100%, 0% 100%)',
      }}
    />
  )
}

const taped = [-8, 5, -4, 9, -6, 3]

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <div className="relative max-w-6xl px-6 pt-32 pb-24 mx-auto">
      {/* faint corkboard-ish backdrop texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #5F6F52 1px, transparent 0)',
          backgroundSize: '18px 18px',
        }}
      />

      <div className="relative flex items-center justify-center gap-3 mb-4">
        <PressedFlower className="w-8 h-8 -translate-y-1" />
        <SectionHeading eyebrow="a scattered film roll" title="gallery" align="center" />
        <PressedFlower className="w-8 h-8 -translate-y-1 -scale-x-100" />
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {galleryPhotos.map((photo, i) => (
          <div key={photo.id} className="relative group break-inside-avoid">
            {/* washi tape pinned at the top of each photo */}
            <WashiTape
              rotate={taped[i % taped.length]}
              color={i % 3 === 0 ? 'bg-[#E7CFA4]/80' : i % 3 === 1 ? 'bg-[#B9D7A8]/70' : 'bg-[#D9B8B8]/70'}
              className="left-1/2 top-[-10px] -translate-x-1/2"
            />
            <PolaroidCard
              image={photo.image}
              caption={photo.caption}
              rotate={photo.rotate}
              onClick={() => setActive(photo)}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-0"
            />
            {/* occasional leaf doodle tucked at the corner */}
            {i % 2 === 0 && (
              <LeafSprig className="absolute w-10 h-10 rotate-45 pointer-events-none -bottom-3 -right-3 opacity-70" />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: -1.5 }}
              exit={{ scale: 0.85, opacity: 0, rotate: -3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md p-4 pb-8 bg-white shadow-lift"
            >
              <WashiTape rotate={-10} color="bg-[#E7CFA4]/90" className="left-1/2 top-[-14px] -translate-x-1/2 w-24" />
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute p-1 rounded-full right-3 top-3 bg-white/80 text-ink/60 hover:text-ink"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex aspect-[4/5] items-center justify-center bg-secondary">
                <span className="text-lg font-hand text-ink/40">photo soon</span>
              </div>
              <p className="mt-3 text-xl text-center font-hand text-ink">{active.caption}</p>
              <LeafSprig className="absolute w-10 h-10 pointer-events-none -bottom-2 -left-4 -rotate-12 opacity-60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}