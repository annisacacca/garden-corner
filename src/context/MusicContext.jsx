import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { playlist } from '../data/playlist.js'

const MusicContext = createContext(null)

// NOTE: replace src urls in src/data/playlist.js with your own lofi tracks.
// Autoplay with sound is blocked by browsers until the user interacts once,
// so we start playback on the first click/tap anywhere on the site.

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.15)
  const [muted, setMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const track = playlist[trackIndex]

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = muted ? 0 : volume
  }, [volume, muted])

  useEffect(() => {
    function startOnFirstInteraction() {
      if (hasStarted) return
      setHasStarted(true)
      audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {})
    }
    window.addEventListener('pointerdown', startOnFirstInteraction, { once: true })
    return () => window.removeEventListener('pointerdown', startOnFirstInteraction)
  }, [hasStarted])

  const play = () => {
    audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {})
  }
  const pause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }
  const toggle = () => (isPlaying ? pause() : play())
  const next = () => setTrackIndex((i) => (i + 1) % playlist.length)
  const prev = () => setTrackIndex((i) => (i - 1 + playlist.length) % playlist.length)
  const toggleMute = () => setMuted((m) => !m)

  return (
    <MusicContext.Provider
      value={{ track, trackIndex, isPlaying, volume, muted, play, pause, toggle, next, prev, setVolume, toggleMute, setTrackIndex }}
    >
      <audio
        ref={audioRef}
        src={track.src}
        loop={false}
        onEnded={next}
        preload="none"
      />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
