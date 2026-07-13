import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CloudRain, Moon, Sun } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { useMusic } from '../context/MusicContext.jsx'
import { spotifyEmbedInfo } from '../data/playlist.js'
import { friendsMusic } from '../data/friendsMusic.js'
import { useSpotifyNowPlaying } from '../hooks/useSpotifyNowPlaying.js'
import FriendCard from '../components/music/FriendCard.jsx'
import FriendDetailModal from '../components/music/FriendDetailModal.jsx'

// ============================================================
// GANTI DI SINI — data kamu sendiri (si "main character")
// ganti avatar ke foto kamu, dan name/tagline sesuka kamu
// ============================================================
const owner = {
  name: 'My aku gwejh abdi',
  avatar: '/images/me-placeholder.jpeg',
  tagline: "hi, it's me — welcome to my little music corner",
  cardIssuedDate: '07/13/26', // GANTI: tanggal "issued" di card, format bebas
  cardId: '202607130', // GANTI: nomor "id" kecil di pojok card, angka bebas
  favoriteSong: {
    title: 'Salvatore',
    artist: 'Lana Del Rey',
    album: 'Honeymoon - Lana Del Rey',
    // GANTI: link mp3/preview 30 detik (misal dari Spotify preview_url,
    // atau file lokal di /public/audio/lagu.mp3)
    previewUrl: '/audio/salvatore.mp3',
  },
}

// ============================================================
// GANTI DI SINI — 5 lagu favorit kamu yang muncul di samping card.
// cover = gambar sampul lagu, previewUrl = link mp3/preview 30 detik
// ============================================================
const favoriteSongs = [
  {
    id: 'song-1',
    title: 'Cinamon Girl',
    artist: 'Lana Del Rey',
    cover: '/images/song-placeholder-1.jpg',
    previewUrl: '/audio/song-1.mp3',
  },
  {
    id: 'song-2',
    title: 'If you\'re not the one',
    artist: 'Daniel Bedingfield',
    cover: '/images/song-placeholder-2.jpg',
    previewUrl: '/audio/song-2.mp3',
  },
  {
    id: 'song-3',
    title: 'About You',
    artist: 'The 1975',
    cover: '/images/song-placeholder-3.jpg',
    previewUrl: '/audio/song-3.mp3',
  },
  {
    id: 'song-4',
    title: 'Wildflower',
    artist: 'Billie Eilish',
    cover: '/images/song-placeholder-4.jpg',
    previewUrl: '/audio/song-4.mp3',
  },
  {
    id: 'song-5',
    title: 'Backburner',
    artist: 'Niki',
    cover: '/images/song-placeholder-5.jpg',
    previewUrl: '/audio/song-5.mp3',
  },
]

// warna kepala pin gantian — ganti hex ini kalau mau match persis token warnamu
const pinPalette = [
  { head: '#E7A0A0', stroke: '#c97f7f' }, // pink
  { head: '#9FC2C9', stroke: '#7aa3ab' }, // sky
  { head: '#E8C77C', stroke: '#c9a24f' }, // mustard
  { head: '#A8B89A', stroke: '#889878' }, // sage
]

function PinIcon({ className = '', color = pinPalette[0], style }) {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" className={className} style={style}>
      <ellipse cx="13" cy="23" rx="4" ry="1.4" fill="#5F6F52" opacity="0.15" />
      <line x1="13" y1="14" x2="13" y2="22" stroke="#8a6a4f" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="13" cy="9" r="8" fill={color.head} stroke={color.stroke} strokeWidth="1" />
      <circle cx="10" cy="6.5" r="2" fill="white" opacity="0.6" />
    </svg>
  )
}

/* ---------------------------------------------------------
   Sticker kecil, senada sama halaman Supporters
--------------------------------------------------------- */

function CuteSparkle({ className = 'w-5 h-5 text-accent', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path
        d="M12 2c.5 3.6 1.2 6 2.4 7.6C15.6 11.2 18 12 21.5 12c-3.5 0-5.9.9-7.1 2.5C13.2 16 12.5 18.4 12 22c-.5-3.6-1.2-6-2.4-7.5C8.4 12.9 6 12 2.5 12 6 12 8.4 11.2 9.6 9.6 10.8 8 11.5 5.6 12 2Z"
        className="fill-current"
      />
    </svg>
  )
}

function CuteLeaf({ className = 'w-5 h-5 text-primary/70', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path d="M4 20C3 12 8 4 20 3c1 10-6 17-16 17Z" className="fill-current opacity-80" />
      <path d="M5.5 18.5C9 14 12.5 10.5 18 5" className="stroke-cream/80" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

function CuteStar({ className = 'w-4 h-4 text-accent', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path
        d="M12 2.5 14.8 9l7 .6-5.3 4.6 1.6 6.9L12 17.6 5.9 21.1l1.6-6.9L2.2 9.6l7-.6Z"
        className="fill-current"
      />
    </svg>
  )
}

function CuteClover({ className = 'w-5 h-5 text-primary', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path
        d="M12 12c0-2.5-2-4.5-4.5-4.5S3 9.5 3 12s2 4.5 4.5 4.5S12 14.5 12 12Z"
        className="fill-current opacity-90"
      />
      <path
        d="M12 12c0-2.5 2-4.5 4.5-4.5S21 9.5 21 12s-2 4.5-4.5 4.5S12 14.5 12 12Z"
        className="fill-current opacity-90"
      />
      <path
        d="M12 12c-2.5 0-4.5-2-4.5-4.5S9.5 3 12 3s4.5 2 4.5 4.5S14.5 12 12 12Z"
        className="fill-current opacity-90"
      />
      <path
        d="M12 12c-2.5 0-4.5 2-4.5 4.5S9.5 21 12 21s4.5-2 4.5-4.5S14.5 12 12 12Z"
        className="fill-current opacity-90"
      />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        className="opacity-70"
      />
    </svg>
  )
}

function CuteHeart({ className = 'w-4 h-4 text-accent', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-10-9.3C.4 7.8 2.3 4.5 5.6 4c2-.3 3.8.7 6.4 3.5C14.6 4.7 16.4 3.7 18.4 4c3.3.5 5.2 3.8 3.6 7.2-2.5 4.7-10 9.3-10 9.3Z"
        className="fill-current opacity-90"
      />
    </svg>
  )
}

function CuteNote({ className = 'w-5 h-5 text-accent', rotate = 0 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ rotate: `${rotate}deg` }} aria-hidden="true">
      <circle cx="7" cy="18" r="3" className="fill-current" />
      <circle cx="18" cy="15" r="3" className="fill-current" />
      <path
        d="M10 18V5l11-2v10"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// kucing pake headphone — maskot kecil buat ngisi ruang kosong di bawah card,
// tetep nyambung ke tema "music room"
function CuteCatHeadphones({ className = 'w-16 h-16 text-accent' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M20 42 Q50 6 80 42"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="17" cy="48" r="10" className="fill-current" opacity="0.85" />
      <circle cx="83" cy="48" r="10" className="fill-current" opacity="0.85" />
      <path d="M30 32 L21 11 L43 26 Z" className="fill-current" opacity="0.9" />
      <path d="M70 32 L79 11 L57 26 Z" className="fill-current" opacity="0.9" />
      <circle cx="50" cy="57" r="29" fill="#fff" stroke="currentColor" strokeWidth="2.5" />
      <path d="M38 56 Q41 51 45 56" stroke="#3a3a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M55 56 Q59 51 62 56" stroke="#3a3a3a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M47 63 L53 63 L50 67 Z" fill="#e8a0a0" />
      <path d="M50 67 Q46 71 42 69" stroke="#3a3a3a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M50 67 Q54 71 58 69" stroke="#3a3a3a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="21" y1="59" x2="35" y2="57" stroke="#3a3a3a" strokeWidth="1" opacity="0.45" />
      <line x1="21" y1="65" x2="35" y2="63" stroke="#3a3a3a" strokeWidth="1" opacity="0.45" />
      <line x1="79" y1="59" x2="65" y2="57" stroke="#3a3a3a" strokeWidth="1" opacity="0.45" />
      <line x1="79" y1="65" x2="65" y2="63" stroke="#3a3a3a" strokeWidth="1" opacity="0.45" />
      <circle cx="38" cy="61" r="3" fill="#f4b8b8" opacity="0.6" />
      <circle cx="62" cy="61" r="3" fill="#f4b8b8" opacity="0.6" />
    </svg>
  )
}

// kodok kecil lagi dengerin lagu, temen duduk si kucing
function CuteFrogNote({ className = 'w-16 h-16 text-primary' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <ellipse cx="50" cy="62" rx="32" ry="25" className="fill-current" opacity="0.85" />
      <circle cx="32" cy="36" r="13" className="fill-current" opacity="0.85" />
      <circle cx="68" cy="36" r="13" className="fill-current" opacity="0.85" />
      <circle cx="32" cy="36" r="6" fill="#2c2c2c" />
      <circle cx="68" cy="36" r="6" fill="#2c2c2c" />
      <circle cx="30" cy="34" r="2" fill="#fff" />
      <circle cx="66" cy="34" r="2" fill="#fff" />
      <path d="M36 66 Q50 79 64 66" stroke="#2c2c2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="63" r="4" fill="#f4b8b8" opacity="0.5" />
      <circle cx="70" cy="63" r="4" fill="#f4b8b8" opacity="0.5" />
    </svg>
  )
}

function WashiTape({ colorClass = 'bg-accent/50', rotate = -6, className = '' }) {
  return (
    <div
      className={`absolute h-6 w-20 shadow-sm ${colorClass} ${className}`}
      style={{
        rotate: `${rotate}deg`,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0 4px, transparent 4px 9px)',
      }}
      aria-hidden="true"
    />
  )
}

const tornClip =
  'polygon(2% 4%,12% 0%,22% 3%,33% 0%,44% 2%,55% 0%,66% 3%,77% 0%,88% 2%,98% 0%,100% 96%,90% 100%,80% 97%,68% 100%,57% 98%,46% 100%,35% 97%,24% 100%,13% 98%,0% 100%)'

function PlayPauseIcon({ playing, className = 'w-4 h-4' }) {
  return playing ? (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4.5" height="16" rx="1.5" />
      <rect x="13.5" y="4" width="4.5" height="16" rx="1.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5z" />
    </svg>
  )
}

/* ---------------------------------------------------------
   Card "main character" versi artist-card / ID-card:
   - foto model perangko (stamp) di kiri, dashed border kayak
     ID card referensi
   - background SOLID (bukan transparan) biar kartu keliatan
     nempel, bukan ngambang
   - rounded-[28px] + overflow-hidden biar radius rapi sampe
     ke footer strip
   - footer strip: barcode + id kecil + tombol play, jadi satu
     baris terpisah, mirip strip hijau di kartu referensi
--------------------------------------------------------- */

function StampFrame({ children }) {
  return (
    <div className="relative flex-shrink-0 p-1 bg-white">
      <div className="absolute border-2 border-dashed pointer-events-none inset-1 border-primary/40" aria-hidden="true" />
      <div className="relative overflow-hidden border-[3px] border-primary/60">{children}</div>
    </div>
  )
}

const barcodeBars = [2, 1, 3, 1, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3]

function BarcodeDoodle({ night, className = '' }) {
  return (
    <div className={`flex items-end h-6 gap-[2px] ${className}`} aria-hidden="true">
      {barcodeBars.map((w, i) => (
        <span
          key={i}
          className={night ? 'bg-cream/50' : 'bg-ink/45'}
          style={{ width: `${w}px`, height: i % 3 === 0 ? '100%' : '65%' }}
        />
      ))}
    </div>
  )
}

function OwnerMusicCard({ night }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      setAudioError(false)
      audio
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          // kalau gagal (file belum ada / salah path / format nggak didukung),
          // state playing TIDAK berubah + tampilin pesan biar kelihatan jelas
          setAudioError(true)
          console.warn('gagal muter previewUrl, cek path/format filenya:', err)
        })
    }
  }

  const cardBg = night ? 'bg-[#2a2a26]' : 'bg-[#faf3e3]'
  const borderColor = night ? 'border-cream/20' : 'border-accent/30'

  return (
    <div
      className={`relative w-full max-w-md overflow-hidden rounded-[24px] border-2 ${borderColor} shadow-paper rotate-[-1deg] ${cardBg}`}
    >
      {/* dashed inner border, kesan ID card */}
      <div
        className="absolute rounded-[18px] pointer-events-none inset-2 border border-dashed border-accent/25"
        aria-hidden="true"
      />

      {/* stiker-stiker lucu, sengaja acak posisi & rotasinya biar ga polos */}
      <CuteSparkle className="absolute w-4 h-4 top-3 right-6 text-accent" rotate={12} />
      <CuteStar className="absolute w-3.5 h-3.5 top-3 right-16 text-sky" rotate={-10} />
      <CuteClover className="absolute w-5 h-5 -top-2 left-24 text-primary" rotate={-8} />
      <CuteHeart className="absolute w-4 h-4 bottom-14 left-4 text-blush" rotate={10} />

      <div className="relative flex gap-4 p-4">
        <div>
          <StampFrame>
            <div className="w-16 h-20 overflow-hidden bg-secondary">
              <img
                src={owner.avatar}
                alt={owner.name}
                className="object-cover w-full h-full"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
          </StampFrame>
          <p className={`mt-1 text-center font-hand text-[9px] ${night ? 'text-cream/50' : 'text-ink/40'}`}>
            issued: {owner.cardIssuedDate}
          </p>
        </div>

        <div className="relative z-10 flex-1 min-w-0 pt-0.5">
          <h3 className={`font-hand text-xl leading-none ${night ? 'text-cream' : 'text-accent'}`}>
            music card
          </h3>

          <div className={`mt-2 space-y-0.5 font-hand text-[13px] ${night ? 'text-cream/85' : 'text-ink/75'}`}>
            <p>
              <span className="opacity-50">name</span> : {owner.name}
            </p>
            <p className="truncate">
              <span className="opacity-50">song</span> : {owner.favoriteSong.title}
            </p>
            <p className="truncate">
              <span className="opacity-50">artist</span> : {owner.favoriteSong.artist}
            </p>
            <p className="truncate">
              <span className="opacity-50">album</span> : {owner.favoriteSong.album}
            </p>
          </div>
        </div>

        {/* kodok gede ngisi ruang kosong di pojok kanan bawah card —
            z-0 + relative di teks di atas biar tulisan tetep kebaca */}
        <CuteFrogNote
          className={`pointer-events-none absolute -bottom-3 right-2 z-0 h-20 w-20 ${
            night ? 'text-primary/50' : 'text-primary/40'
          }`}
        />
      </div>

      {/* footer strip, kayak strip hijau di referensi */}
      <div
        className={`relative flex items-center justify-between gap-3 px-4 py-2 ${
          night ? 'bg-white/10' : 'bg-accent/15'
        }`}
      >
        <BarcodeDoodle night={night} className="max-w-[100px]" />
        <span className={`font-hand text-[9px] tracking-wide ${night ? 'text-cream/50' : 'text-ink/40'}`}>
          #{owner.cardId}
        </span>
        <button
          type="button"
          data-cursor-hover
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-white transition-transform rounded-full bg-accent hover:scale-105 active:scale-95"
        >
          <PlayPauseIcon playing={playing} className="w-3 h-3" />
        </button>
      </div>

      <audio ref={audioRef} src={owner.favoriteSong.previewUrl} onEnded={() => setPlaying(false)} />

      {audioError && (
        <p className="relative px-4 py-1.5 text-center font-hand text-[11px] leading-snug text-red-500 bg-red-50">
          ⚠️ file audio nggak ketemu di <code className="font-mono">{owner.favoriteSong.previewUrl}</code> — pastikan
          filenya beneran ada persis di path itu (folder <code className="font-mono">public/audio</code>, huruf
          besar-kecil harus sama)
        </p>
      )}
    </div>
  )
}

/* ---------------------------------------------------------
   List 5 lagu favorit, ditaruh di samping OwnerMusicCard.
   Klik tombol play di salah satu lagu -> vinyl di atas ikut
   muter, gambar cover-nya muncul di tengah vinyl, dan teks di
   bawah vinyl ganti jadi judul + artis lagu yang lagi diputer.
--------------------------------------------------------- */

// kata-kata lucu buat ngisi ruang kosong di bawah card — TANPA kotak,
// langsung tulisan warna-warni yang "dicoret" lepas di atas kertas
const musicQuotes = [
  "life's basically a mixtape — mine's got way too many replays on one song",
  'currently vibing, please do not disturb (unless it\'s snacks)',
  "put your headphones on, the world can wait a sec",
  'some days just need three chords and the truth',
]

const wordColorsDay = ['text-accent', 'text-primary', 'text-sky', 'text-blush', 'text-ink/70']
const wordColorsNight = ['text-accent', 'text-sky', 'text-blush', 'text-primary', 'text-cream/90']
const wordTilts = [-3, 2, -1, 3, -2, 1.5, -2.5, 2.5]

function MusicQuoteNote({ night }) {
  const quote = useMemo(() => musicQuotes[Math.floor(Math.random() * musicQuotes.length)], [])
  const words = quote.split(' ')
  const colors = night ? wordColorsNight : wordColorsDay

  return (
    <div className="relative flex flex-col items-center justify-center flex-1 gap-4 p-4 text-center">
      <CuteStar className="absolute w-4 h-4 top-2 left-6 text-sky" rotate={14} />
      <CuteSparkle className="absolute top-0 w-4 h-4 right-8 text-accent" rotate={-10} />
      <CuteHeart className="absolute w-4 h-4 bottom-6 right-4 text-accent" rotate={10} />
      <CuteClover className="absolute w-4 h-4 bottom-4 left-4 text-primary" rotate={-8} />

      <p className="text-xl leading-relaxed font-hand sm:text-2xl">
        {words.map((word, i) => (
          <span
            key={i}
            className={`mr-2 inline-block ${colors[i % colors.length]}`}
            style={{ rotate: `${wordTilts[i % wordTilts.length]}deg` }}
          >
            {word}
          </span>
        ))}
        <span className="inline-block ml-1">🎧</span>
      </p>

      <div className="flex items-center gap-2">
        <CuteCatHeadphones className={`w-10 h-10 ${night ? 'text-cream/70' : 'text-accent/70'}`} />
        <CuteFrogNote className={`w-10 h-10 ${night ? 'text-cream/60' : 'text-primary/60'}`} />
        <p className={`font-hand text-sm ${night ? 'text-cream/50' : 'text-ink/40'}`}>my listening buddies</p>
      </div>
    </div>
  )
}

function FavoriteSongsList({ night, activeSongId, songPlaying, songError, onToggle }) {
  const panelBg = night ? 'bg-white/5' : 'bg-white'

  return (
    <div className={`relative p-5 shadow-paper rotate-[1deg] ${panelBg}`}>
      <WashiTape colorClass="bg-primary/40" rotate={-6} className="-top-3 left-8 w-14" />
      <CuteStar className="absolute w-4 h-4 -top-2 -right-2 text-accent" rotate={10} />

      <h3 className={`mb-4 font-heading text-lg ${night ? 'text-cream' : 'text-ink'}`}>my top 5 songs gwejh</h3>

      {songError && (
        <p className="mb-3 rounded-lg bg-red-50 px-3 py-1.5 font-hand text-[11px] leading-snug text-red-500">
          ⚠️ file audio lagu ini nggak ketemu — cek <code className="font-mono">previewUrl</code> di{' '}
          <code className="font-mono">favoriteSongs</code>, pastikan filenya beneran ada di{' '}
          <code className="font-mono">public/audio</code>
        </p>
      )}

      <ul className="space-y-1.5">
        {favoriteSongs.map((song) => {
          const isActive = activeSongId === song.id
          const isPlayingThis = isActive && songPlaying

          return (
            <li key={song.id}>
              <button
                type="button"
                data-cursor-hover
                onClick={() => onToggle(song)}
                className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                  isActive ? (night ? 'bg-accent/25' : 'bg-accent/10') : night ? 'hover:bg-white/10' : 'hover:bg-black/5'
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded bg-secondary">
                  <img src={song.cover} alt={song.title} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-body text-sm truncate ${night ? 'text-cream' : 'text-ink'}`}>{song.title}</p>
                  <p className={`font-body text-xs truncate ${night ? 'text-cream/60' : 'text-ink/50'}`}>
                    {song.artist}
                  </p>
                </div>
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                    isActive ? 'bg-accent text-white' : night ? 'bg-white/10 text-cream/70' : 'bg-secondary text-ink/60'
                  }`}
                >
                  <PlayPauseIcon playing={isPlayingThis} className="w-3 h-3" />
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function GridPaperBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(60,50,40,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(60,50,40,0.05) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }}
      aria-hidden="true"
    />
  )
}

// rotasi tetap dipakai buat kesan "ditempel" tiap kartu, dibikin lebih variatif
const rotations = [-6, 4, -3, 7, -5, 2.5, -8, 5, -4, 6, -2, 3.5]
// stagger vertikal HANYA lewat margin, di dalam grid — jadi nggak akan
// pernah numpuk ke row lain kayak sebelumnya (itu penyebab berantakannya)
const marginTops = ['sm:mt-0', 'sm:mt-8', 'sm:mt-2', 'sm:mt-10', 'sm:mt-1', 'sm:mt-6', 'sm:mt-3']

// Fisher-Yates biasa. Di-random SEKALI pas komponen mount (lewat useMemo
// dengan deps kosong), jadi urutannya acak tapi nggak lompat-lompat lagi
// tiap kali state lain (rain/night/modal) bikin komponen re-render.
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Music() {
  const { isPlaying } = useMusic()
  const [rain, setRain] = useState(false)
  const [night, setNight] = useState(false)
  const [activeFriend, setActiveFriend] = useState(null)

  const { containerRef, nowPlaying } = useSpotifyNowPlaying(spotifyEmbedInfo)

  // lagu yang lagi dipilih dari list "my top 5 songs"
  const [activeSong, setActiveSong] = useState(null)
  const [songPlaying, setSongPlaying] = useState(false)
  const [songError, setSongError] = useState(false)
  const songAudioRef = useRef(null)

  // begitu activeSong ganti, pindahin sumber audio-nya lalu play
  useEffect(() => {
    const audio = songAudioRef.current
    if (!audio || !activeSong) return
    setSongError(false)
    audio.src = activeSong.previewUrl
    audio
      .play()
      .then(() => setSongPlaying(true))
      .catch((err) => {
        setSongPlaying(false)
        setSongError(true)
        console.warn('gagal muter previewUrl lagu ini, cek path/format filenya:', err)
      })
  }, [activeSong])

  const handleSongToggle = (song) => {
    const audio = songAudioRef.current
    if (!audio) return

    // klik lagu yang sama -> toggle play/pause
    if (activeSong?.id === song.id) {
      if (songPlaying) {
        audio.pause()
        setSongPlaying(false)
      } else {
        setSongError(false)
        audio
          .play()
          .then(() => setSongPlaying(true))
          .catch((err) => {
            setSongError(true)
            console.warn('gagal muter previewUrl lagu ini, cek path/format filenya:', err)
          })
      }
      return
    }

    // klik lagu lain -> ganti lagu aktif, useEffect di atas yang urus play-nya
    setActiveSong(song)
  }

  // kalau ada lagu dari list yang lagi aktif, vinyl & teks di bawahnya
  // ikut nampilin lagu itu. kalau belum pernah pilih, fallback ke widget spotify
  const vinylTitle = activeSong ? activeSong.title : nowPlaying?.title
  const vinylArtist = activeSong ? activeSong.artist : nowPlaying?.artist
  const vinylArt = activeSong ? activeSong.cover : nowPlaying?.albumArt
  const spinning = activeSong ? songPlaying : nowPlaying ? !nowPlaying.isPaused : isPlaying

  // urutan diacak sekali aja per kunjungan halaman, biar nggak "friend 1,2,3..."
  const shuffledFriends = useMemo(() => shuffle(friendsMusic), [])

  useEffect(() => {
    if (nowPlaying?.title) {
      document.title = `${nowPlaying.title} · Annisa's Little World`
    }
    return () => {
      document.title = "Annisa's Little World"
    }
  }, [nowPlaying?.title])

  const panelBg = night ? 'bg-white/5' : 'bg-white'

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-4 sm:px-6 pb-24 pt-32 transition-colors duration-700 ${
        night ? 'bg-dark' : 'bg-cream'
      }`}
    >
      {!night && <GridPaperBg />}

      {rain && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-40">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-[-10%] w-[1.5px] bg-sky/60"
              style={{ left: `${(i * 37) % 100}%`, height: 40 }}
              animate={{ y: ['0vh', '110vh'] }}
              transition={{ duration: 0.9 + (i % 5) * 0.15, repeat: Infinity, delay: i * 0.08, ease: 'linear' }}
            />
          ))}
        </div>
      )}

      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="a cozy corner"
          title="music room"
          align="center"
          className={night ? '[&_h2]:text-cream [&_span:first-child]:text-cream/70' : ''}
        />

        <div className="flex justify-center gap-3 mb-10">
          <button
            data-cursor-hover
            onClick={() => setRain((r) => !r)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm shadow-paper transition-colors ${
              rain ? 'bg-primary text-ink' : 'bg-white text-ink/60'
            }`}
          >
            <CloudRain className="w-4 h-4" /> Rain
          </button>
          <button
            data-cursor-hover
            onClick={() => setNight((n) => !n)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm shadow-paper transition-colors ${
              night ? 'bg-primary text-ink' : 'bg-white text-ink/60'
            }`}
          >
            {night ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {night ? 'Night' : 'Day'}
          </button>
        </div>

        {/* ---- vinyl + spotify, kertas ditempel, bukan kotak kaku ---- */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
          <div
            className={`relative flex flex-col items-center justify-center p-10 pt-8 text-center shadow-soft ${panelBg} rotate-[-1.5deg]`}
          >
            <WashiTape colorClass="bg-sky/50" rotate={5} className="-translate-x-1/2 -top-3 left-1/2" />
            <CuteLeaf className="absolute w-6 h-6 -bottom-3 -left-3 text-primary/70" rotate={-16} />

            <div className="relative flex items-center justify-center w-56 h-56">
              <svg
                viewBox="0 0 200 200"
                className="absolute w-56 h-56 drop-shadow-lg"
                style={{
                  animation: 'vinylSpin 6s linear infinite',
                  animationPlayState: spinning ? 'running' : 'paused',
                }}
              >
                <defs>
                  <clipPath id="discClip">
                    <circle cx="100" cy="100" r="96" />
                  </clipPath>
                  <path id="discTextPath" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
                </defs>

                <circle cx="100" cy="100" r="96" fill="#1c1c1c" />

                {vinylArt ? (
                  <image
                    href={vinylArt}
                    x="4"
                    y="4"
                    width="192"
                    height="192"
                    clipPath="url(#discClip)"
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <circle cx="100" cy="100" r="96" fill="#2f2f2c" clipPath="url(#discClip)" />
                )}

                <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <circle cx="100" cy="100" r="56" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
                <circle cx="100" cy="100" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                {vinylTitle && (
                  <text fill="rgba(255,255,255,0.9)" fontSize="10" letterSpacing="2">
                    <textPath href="#discTextPath" startOffset="50%" textAnchor="middle">
                      {vinylTitle.toUpperCase()}
                    </textPath>
                  </text>
                )}

                <circle cx="100" cy="100" r="20" fill="#f4ede1" />
                <circle cx="100" cy="100" r="4" fill="#1c1c1c" />
              </svg>
            </div>

            <p className={`mt-6 font-heading text-xl ${night ? 'text-cream' : 'text-ink'}`}>
              {vinylTitle ?? 'nothing spinning yet'}
            </p>
            <p className={`mt-1 font-hand text-lg ${night ? 'text-cream/70' : 'text-ink/60'}`}>
              {vinylArtist ?? 'press play on the playlist to the right →'}
            </p>
          </div>

          <div className={`relative p-4 pt-6 shadow-soft ${panelBg} rotate-[1.5deg]`}>
            <WashiTape colorClass="bg-blush/50" rotate={-5} className="-top-3 left-8" />
            <CuteSparkle className="absolute w-5 h-5 -top-3 -right-2 text-accent" rotate={14} />
            <div ref={containerRef} />
          </div>
        </div>

        {/* ---- card "main character" kamu + list 5 lagu favorit di sampingnya.
              posisinya di bawah vinyl + widget. play dari list ini yang
              bikin vinyl di atas ikut muter & ganti info lagu ---- */}
        <div className="grid grid-cols-1 gap-3 mt-14 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex flex-col h-full gap-4">
            <OwnerMusicCard night={night} />
            <MusicQuoteNote night={night} />
          </div>
          <FavoriteSongsList
            night={night}
            activeSongId={activeSong?.id}
            songPlaying={songPlaying}
            songError={songError}
            onToggle={handleSongToggle}
          />
        </div>

        <audio ref={songAudioRef} onEnded={() => setSongPlaying(false)} />

        {/* friends scatter section — grid, bukan flex+translateY,
            jadi rapi di hp/tab/desktop tapi tetep kerasa "ditempel asal" */}
        <div className="mt-16">
          <h3 className={`mb-1 text-center font-heading text-xl ${night ? 'text-cream' : 'text-ink'}`}>
            what my friends are playing
          </h3>
          <p className={`mb-10 text-center font-hand text-sm ${night ? 'text-cream/60' : 'text-ink/50'}`}>
            tap a card to peek into their little music world
          </p>

          <div className="grid max-w-4xl grid-cols-1 px-1 mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
            {shuffledFriends.map((friend, i) => {
              const rotate = rotations[i % rotations.length]
              const marginTop = marginTops[i % marginTops.length]
              const pinColor = pinPalette[i % pinPalette.length]
              const pinRotate = rotations[(i + 5) % rotations.length]

              return (
                <motion.div
                  key={friend.id}
                  initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                  whileInView={{ opacity: 1, scale: 1, rotate }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ type: 'spring', stiffness: 180, damping: 16 }}
                  className={`relative ${marginTop}`}
                >
                  <PinIcon
                    color={pinColor}
                    className="absolute z-10 -top-4 -right-3 drop-shadow-sm"
                    style={{ rotate: `${pinRotate}deg` }}
                  />
                  <FriendCard friend={friend} night={night} onClick={() => setActiveFriend(friend)} />
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className={`relative mt-14 p-6 shadow-paper ${panelBg} rotate-[-1deg]`}>
          <WashiTape colorClass="bg-accent/40" rotate={6} className="-top-3 left-10" />
          <h3 className={`font-heading text-xl ${night ? 'text-cream' : 'text-ink'}`}>currently on repeat</h3>
          <p className={`mt-2 font-hand text-lg ${night ? 'text-cream/70' : 'text-ink/60'}`}>
            {nowPlaying?.title
              ? `"${nowPlaying.title}" by ${nowPlaying.artist} — can't stop replaying this one 🎵`
              : '"placeholder lyric snippet — replace with a line from a song you love" 🎵'}
          </p>
        </div>
      </div>

      <FriendDetailModal friend={activeFriend} night={night} onClose={() => setActiveFriend(null)} />
    </div>
  )
}