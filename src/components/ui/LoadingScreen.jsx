import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ visible, progress = 0 }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          <div className="relative flex flex-col items-center">
            {/* ripples */}
            <div className="relative flex items-center justify-center w-40 h-40">
              <motion.span
                className="absolute w-24 h-24 border-2 rounded-full border-primary/40"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.span
                className="absolute w-24 h-24 border-2 rounded-full border-primary/30"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
              />

              {/* lily pad */}
              <svg width="120" height="120" viewBox="0 0 120 120" className="relative">
                <ellipse cx="60" cy="88" rx="46" ry="12" fill="#CFE3E0" opacity="0.7" />
                <path
                  d="M60 40 C90 40 100 62 92 78 C84 94 36 94 28 78 C20 62 30 40 60 40Z"
                  fill="#A9C98F"
                />
                <path d="M60 40 L60 78" stroke="#5F6F52" strokeWidth="1.5" opacity="0.4" />
                <path d="M60 78 Q76 68 88 58" stroke="#5F6F52" strokeWidth="1" opacity="0.3" fill="none" />
                <path d="M60 78 Q44 68 32 58" stroke="#5F6F52" strokeWidth="1" opacity="0.3" fill="none" />

                {/* frog body */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ellipse cx="60" cy="62" rx="19" ry="15" fill="#B9D7A8" />
                  <circle cx="48" cy="46" r="8" fill="#B9D7A8" />
                  <circle cx="72" cy="46" r="8" fill="#B9D7A8" />
                  <circle cx="48" cy="46" r="3.4" fill="#5F6F52" />
                  <circle cx="72" cy="46" r="3.4" fill="#5F6F52" />
                  <motion.g
                    animate={{ scaleY: [1, 1, 0.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
                    style={{ transformOrigin: '48px 46px' }}
                  >
                    <circle cx="48" cy="46" r="3.4" fill="#5F6F52" />
                  </motion.g>
                  <path d="M50 66 Q60 72 70 66" stroke="#5F6F52" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <ellipse cx="52" cy="64" rx="3" ry="2" fill="#E7A0A0" opacity="0.5" />
                  <ellipse cx="68" cy="64" rx="3" ry="2" fill="#E7A0A0" opacity="0.5" />
                </motion.g>
              </svg>
            </div>

            <motion.p
              className="mt-4 text-2xl font-hand text-dark"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing Noctera's little world...
            </motion.p>

            <div className="mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full bg-primary"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
