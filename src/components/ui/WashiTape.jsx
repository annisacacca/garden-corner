export default function WashiTape({ className = '', rotate = -4, width = 'w-16' }) {
  return (
    <span
      aria-hidden="true"
      className={`washi absolute h-5 ${width} opacity-80 shadow-sm ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    />
  )
}
