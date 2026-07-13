// src/hooks/useSpotifyNowPlaying.js
import { useEffect, useRef, useState } from 'react'

const IFRAME_API_SRC = 'https://open.spotify.com/embed/iframe-api/v1'

export function useSpotifyNowPlaying(embedInfo, { height = 352, theme = '0' } = {}) {
  const containerRef = useRef(null)
  const controllerRef = useRef(null)
  const [nowPlaying, setNowPlaying] = useState(null)

  // Fetch metadata track pertama duluan, sebelum user pencet play
  useEffect(() => {
    if (!embedInfo) return
    let cancelled = false

    fetch(`/api/spotify-first-track?type=${embedInfo.type}&id=${embedInfo.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled || data.error) return
        setNowPlaying((prev) =>
          prev
            ? prev
            : {
                title: data.title,
                artist: data.artist,
                albumArt: data.albumArt,
                isPaused: true,
              }
        )
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [embedInfo])

  useEffect(() => {
    if (!embedInfo || !containerRef.current) return
    let cancelled = false

    const mount = (IFrameAPI) => {
      if (cancelled || !containerRef.current || controllerRef.current) return
      IFrameAPI.createController(
        containerRef.current,
        { uri: embedInfo.uri, width: '100%', height, theme },
        (EmbedController) => {
          controllerRef.current = EmbedController
          EmbedController.addListener('playback_update', (event) => {
            const item = event.data?.item
            setNowPlaying((prev) => ({
              title: item?.name ?? prev?.title ?? null,
              artist: item?.artists?.map((a) => a.name).join(', ') ?? prev?.artist ?? null,
              albumArt: item?.images?.at(-1)?.url ?? prev?.albumArt ?? null,
              isPaused: event.data?.isPaused ?? true,
            }))
          })
        }
      )
    }

    if (window.__spotifyIframeAPI) {
      mount(window.__spotifyIframeAPI)
    } else {
      window.onSpotifyIframeApiReady = (IFrameAPI) => {
        window.__spotifyIframeAPI = IFrameAPI
        mount(IFrameAPI)
      }
      if (!document.querySelector(`script[src="${IFRAME_API_SRC}"]`)) {
        const script = document.createElement('script')
        script.src = IFRAME_API_SRC
        script.async = true
        document.body.appendChild(script)
      }
    }

    return () => {
      cancelled = true
      controllerRef.current?.destroy?.()
      controllerRef.current = null
    }
  }, [embedInfo, height, theme])

  return { containerRef, nowPlaying }
}