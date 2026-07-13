// Shared hand-drawn doodle icon set — no emoji, all inherit currentColor / explicit fills.

export function LeafSprig({ className = '', color = '#5F6F52' }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none">
      <path d="M30 55C30 35 22 20 8 8" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <path d="M18 30C14 24 16 16 22 12" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M24 42C18 40 14 34 16 26" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

export function PressedFlower({ className = '' }) {
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

export function CloverIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 34 34" className={className} fill="none">
      {[0, 90, 180, 270].map((deg) => (
        <ellipse
          key={deg}
          cx="17"
          cy="10"
          rx="6"
          ry="7"
          fill="#7C9A6B"
          opacity="0.8"
          transform={`rotate(${deg} 17 17)`}
        />
      ))}
      <path d="M17 17v12" stroke="#5F6F52" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function StarDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2c0.7 4.2 2.8 6.3 7 7-4.2 0.7-6.3 2.8-7 7-0.7-4.2-2.8-6.3-7-7 4.2-0.7 6.3-2.8 7-7Z"
        fill="#C98A4B"
        opacity="0.85"
      />
    </svg>
  )
}

export function FrogSticker({ className = '' }) {
  return (
    <svg viewBox="0 0 30 24" className={className} fill="none">
      <ellipse cx="8" cy="7" rx="4.2" ry="3.8" fill="#B9D7A8" stroke="#5F6F52" strokeWidth="1.2" />
      <ellipse cx="22" cy="7" rx="4.2" ry="3.8" fill="#B9D7A8" stroke="#5F6F52" strokeWidth="1.2" />
      <circle cx="8" cy="7" r="1.4" fill="#3E362B" />
      <circle cx="22" cy="7" r="1.4" fill="#3E362B" />
      <rect x="4" y="9" width="22" height="13" rx="6.5" fill="#B9D7A8" stroke="#5F6F52" strokeWidth="1.3" />
      <path d="M10 16c1.6 1.6 8.4 1.6 10 0" stroke="#5F6F52" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function CoffeeStain({ className = '' }) {
  return (
    <svg viewBox="0 0 50 50" className={className} fill="none">
      <ellipse cx="25" cy="25" rx="22" ry="18" fill="#B8945E" opacity="0.12" />
      <ellipse cx="25" cy="25" rx="16" ry="13" fill="none" stroke="#B8945E" strokeWidth="1.4" opacity="0.28" />
    </svg>
  )
}

export function PaperclipDoodle({ className = '' }) {
  return (
    <svg viewBox="0 0 30 60" className={className} fill="none">
      <path
        d="M8 8v34a7 7 0 0 0 14 0V14a4 4 0 0 0-8 0v26a1.5 1.5 0 0 0 3 0V16"
        stroke="#8A7256"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function StickyNoteDoodle({ className = '', color = '#EADFC2' }) {
  return (
    <svg viewBox="0 0 44 44" className={className} fill="none">
      <path d="M4 4h32l4 4v32H4V4Z" fill={color} stroke="#B8945E" strokeWidth="1" opacity="0.9" />
      <path d="M36 4v6h6" fill="none" stroke="#B8945E" strokeWidth="1" opacity="0.6" />
      <path d="M11 16h20M11 23h20M11 30h13" stroke="#8A7256" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
    </svg>
  )
}

// ---- filter category icons ----

export function FriendsIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 28 20" className={className} fill="none">
      <circle cx="10" cy="7" r="4.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="19" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M3 19c0.6-4.4 3.6-6.4 7-6.4s6.4 2 7 6.4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M18 12.4c3 0 5.4 1.9 6 6.6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function CoffeeCupIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M4 9h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M17 10h1.5a2.8 2.8 0 0 1 0 5.6H17" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 3c-0.6 1 0.6 1.6 0 2.6M12 3c-0.6 1 0.6 1.6 0 2.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function GradCapIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 28 22" className={className} fill="none">
      <path d="M14 2 2 8l12 5 12-5-12-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M8 11v5c0 1.8 2.7 3 6 3s6-1.2 6-3v-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M25 9v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function NatureLeafIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 26 26" className={className} fill="none">
      <path
        d="M13 2c8 1 11 6 11 11 0 6-5 11-11 11S2 19 2 13c0-2 0.6-3.8 1.7-5.3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M13 4v18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

export function CameraDoodleIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="13" r="3.4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

export function SparkleFavoriteIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 2c0.6 4 2.6 6 6.6 6.6-4 0.6-6 2.6-6.6 6.6-0.6-4-2.6-6-6.6-6.6C9.4 8 11.4 6 12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function WashiTape({ rotate = -6, color = '#D9C7A3', className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute h-5 w-16 ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: 'polygon(4% 0, 96% 0, 100% 100%, 0% 100%)',
        backgroundColor: color,
        opacity: 0.75,
        boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
      }}
    />
  )
}