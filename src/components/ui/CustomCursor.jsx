import { useEffect, useRef, useState } from 'react'

// Cute leaf cursor: a small leaf glyph follows the pointer with light spring lag,
// and grows/rotates when hovering interactive elements.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const leafRef = useRef(null)
  const svgRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)
  const hoveringRef = useRef(false)

  useEffect(() => {
    const touch = window.matchMedia('(hover: none)').matches
    setIsTouch(touch)
    if (touch) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let leafX = mouseX
    let leafY = mouseY

    function applyHoverStyles(hovering) {
      if (hoveringRef.current === hovering) return
      hoveringRef.current = hovering
      if (svgRef.current) {
        svgRef.current.setAttribute('width', hovering ? '34' : '24')
        svgRef.current.setAttribute('height', hovering ? '34' : '24')
        svgRef.current.classList.toggle('rotate-12', hovering)
        svgRef.current.classList.toggle('-rotate-45', !hovering)
        const path = svgRef.current.querySelector('path[fill]')
        if (path) path.setAttribute('fill', hovering ? '#E7CFA4' : '#B9D7A8')
      }
    }

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      // dot tracks the raw pointer 1:1, zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      const target = e.target
      applyHoverStyles(!!(target.closest && target.closest('[data-cursor-hover]')))
    }

    let raf
    function animate() {
      // tighter lerp so the leaf feels attached instead of dragging behind
      leafX += (mouseX - leafX) * 0.35
      leafY += (mouseY - leafY) * 0.35
      if (leafRef.current) {
        leafRef.current.style.transform = `translate(${leafX}px, ${leafY}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-dark" />
      </div>
      <div
        ref={leafRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <svg
          ref={svgRef}
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          className="-translate-x-1/2 -translate-y-1/2 -rotate-45 transition-[width,height] duration-200 ease-out"
        >
          <path
            d="M4 20C4 11 10 4 20 4C20 14 13 20 4 20Z"
            fill="#B9D7A8"
            fillOpacity="0.85"
            stroke="#5F6F52"
            strokeWidth="1.2"
          />
          <path d="M6 18C9 14 12 10 18 6" stroke="#5F6F52" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    </>
  )
}