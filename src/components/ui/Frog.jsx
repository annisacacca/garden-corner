import { motion } from 'framer-motion'

export default function Frog({ size = 140, className = '' }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      <ellipse cx="70" cy="118" rx="52" ry="10" fill="#5F6F52" opacity="0.12" />
      <ellipse cx="70" cy="78" rx="34" ry="28" fill="#B9D7A8" />
      <circle cx="46" cy="52" r="15" fill="#B9D7A8" />
      <circle cx="94" cy="52" r="15" fill="#B9D7A8" />
      <circle cx="46" cy="52" r="6" fill="#5F6F52" />
      <circle cx="94" cy="52" r="6" fill="#5F6F52" />
      <circle cx="43" cy="49" r="1.8" fill="white" />
      <circle cx="91" cy="49" r="1.8" fill="white" />
      <path d="M52 88 Q70 100 88 88" stroke="#5F6F52" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="56" cy="84" rx="5" ry="3" fill="#E7A0A0" opacity="0.5" />
      <ellipse cx="84" cy="84" rx="5" ry="3" fill="#E7A0A0" opacity="0.5" />
      <ellipse cx="40" cy="98" rx="10" ry="7" fill="#A9C98F" />
      <ellipse cx="100" cy="98" rx="10" ry="7" fill="#A9C98F" />
    </motion.svg>
  )
}