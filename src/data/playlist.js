import { parseSpotifyUrl } from '../lib/spotify.js'

// Ganti `src` dengan file lofi kamu sendiri (misal file di /public/audio/).
// Playlist lokal ini cuma buat floating mini-player — beda sama playlist
// Spotify di halaman Music.
export const playlist = [
  { id: 1, title: 'rainy afternoon', artist: 'lofi placeholder', src: '/audio/audio.mp3' },
  { id: 2, title: 'garden window', artist: 'lofi placeholder', src: '/audio/track-2.mp3' },
  { id: 3, title: 'quiet pages', artist: 'lofi placeholder', src: '/audio/track-3.mp3' },
]

// Playlist yang kamu bikin bareng temen. Tinggal paste link
// open.spotify.com di sini — sisanya kebentuk otomatis.
export const spotifySharedPlaylistUrl =
  'https://open.spotify.com/playlist/3VppTpCCcIbWhflL5ao6Xr?si=d966cb446d344a2c'

export const spotifyEmbedInfo = parseSpotifyUrl(spotifySharedPlaylistUrl)