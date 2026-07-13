// src/components/music/SpotifyPlaylist.jsx
import { ListMusic } from 'lucide-react'

/**
 * Presentational shell only. The actual widget DOM node is created and
 * managed by useSpotifyNowPlaying via `widgetRef` — this component never
 * touches the Spotify controller, and never manually syncs track state.
 * Clicking a song inside the embed drives playback_update, which the
 * page's nowPlaying state already listens to.
 */
export default function SpotifyPlaylist({ widgetRef, ready, hasEmbed, night }) {
  return (
    <div
      className={`px-5 py-5 ${night ? 'border-white/10' : 'border-dark/10'}`}
      style={{ borderTop: `1px dashed ${night ? 'rgba(255,249,241,0.15)' : 'rgba(95,111,82,0.2)'}` }}
    >
      <div className="flex items-center gap-2 mb-3">
        <ListMusic className={`w-4 h-4 ${night ? 'text-cream/50' : 'text-ink/40'}`} />
        <p className={`font-hand text-base ${night ? 'text-cream/60' : 'text-ink/50'}`}>pick a song to play</p>
      </div>

      {!hasEmbed ? (
        <p className={`py-6 text-center font-body text-sm ${night ? 'text-cream/60' : 'text-ink/50'}`}>
          the playlist link hasn't loaded — check{' '}
          <code className="rounded bg-black/10 px-1 py-0.5">spotifySharedPlaylistUrl</code> in{' '}
          <code className="rounded bg-black/10 px-1 py-0.5">data/playlist.js</code>
        </p>
      ) : (
        <>
          {!ready && (
            <p className={`pb-2 text-center font-body text-xs ${night ? 'text-cream/40' : 'text-ink/40'}`}>
              loading playlist...
            </p>
          )}
          <div ref={widgetRef} className="overflow-hidden rounded-2xl" />
        </>
      )}
    </div>
  )
}