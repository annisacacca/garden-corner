import { useEffect, useRef, useState } from 'react'
import { Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react'

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function TrackPlayer({ src, night }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    setIsPlaying(false)
    setProgress(0)
    setDuration(0)
    if (audioRef.current) audioRef.current.currentTime = 0
  }, [src])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsPlaying((p) => !p)
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    const value = Number(e.target.value)
    if (audio) audio.currentTime = value
    setProgress(value)
  }

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2

  return (
    <div className={`rounded-[20px] p-4 ${night ? 'bg-white/10' : 'bg-white/80'}`}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-3">
        <button
          data-cursor-hover
          onClick={togglePlay}
          className="flex items-center justify-center flex-shrink-0 text-white rounded-full w-11 h-11 bg-accent shadow-soft"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="w-full accent-accent"
            data-cursor-hover
          />
          <div className={`flex justify-between mt-1 font-body text-[11px] ${night ? 'text-cream/60' : 'text-ink/50'}`}>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <VolumeIcon className={`w-4 h-4 flex-shrink-0 ${night ? 'text-cream/70' : 'text-ink/50'}`} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-accent"
          data-cursor-hover
        />
      </div>
    </div>
  )
}