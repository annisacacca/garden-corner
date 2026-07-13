// src/lib/spotify.js
// Ubah link biasa open.spotify.com jadi format yang dibutuhkan buat embed
// player + IFrame API. Paste link track/album/playlist apa aja, ini yang
// urus sisanya.

const SPOTIFY_TYPES = ['track', 'album', 'playlist', 'artist', 'show', 'episode']

export function parseSpotifyUrl(spotifyUrl) {
  try {
    const url = new URL(spotifyUrl)
    const parts = url.pathname.split('/').filter(Boolean)
    const typeIndex = parts.findIndex((part) => SPOTIFY_TYPES.includes(part))
    if (typeIndex === -1) return null

    const type = parts[typeIndex]
    const id = parts[typeIndex + 1]
    if (!id) return null

    return {
      type,
      id,
      uri: `spotify:${type}:${id}`,
      embedUrl: `https://open.spotify.com/embed/${type}/${id}?utm_source=generator`,
    }
  } catch {
    return null
  }
}