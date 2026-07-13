// api/spotify-first-track.js
// Serverless function — jalan di server, jadi client_secret aman di sini.

export default async function handler(req, res) {
  const { type, id } = req.query // contoh: ?type=playlist&id=3VppTpCCcIbWhflL5ao6Xr

  if (!type || !id) {
    return res.status(400).json({ error: 'Missing type or id' })
  }

  try {
    // 1. Ambil access token pakai Client Credentials flow
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString('base64'),
      },
      body: 'grant_type=client_credentials',
    })
    const tokenData = await tokenRes.json()
    if (!tokenRes.ok) {
      return res.status(500).json({ error: 'Failed to get token', detail: tokenData })
    }
    const accessToken = tokenData.access_token

    // 2. Ambil track pertama tergantung type-nya
    let track = null

    if (type === 'playlist') {
      const r = await fetch(
        `https://api.spotify.com/v1/playlists/${id}/tracks?limit=1`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      const data = await r.json()
      track = data.items?.[0]?.track ?? null
    } else if (type === 'album') {
      const r = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const data = await r.json()
      track = data.tracks?.items?.[0] ?? null
      if (track) track.album = { images: data.images }
    } else if (type === 'track') {
      const r = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      track = await r.json()
    }

    if (!track) {
      return res.status(404).json({ error: 'Track not found' })
    }

    return res.status(200).json({
      title: track.name,
      artist: track.artists?.map((a) => a.name).join(', ') ?? null,
      albumArt: track.album?.images?.[0]?.url ?? null,
    })
  } catch (err) {
    return res.status(500).json({ error: 'Server error', detail: String(err) })
  }
}