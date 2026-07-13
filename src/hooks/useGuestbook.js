import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

const COLORS = ['green', 'cream', 'sky', 'blush']

export function useGuestbook({ limit } = {}) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    setError(null)

    let query = supabase
      .from('guestbook_entries')
      .select('*')
      .order('created_at', { ascending: false })

    if (limit) query = query.limit(limit)

    const { data, error } = await query

    if (error) setError(error.message)
    else setEntries(data ?? [])

    setLoading(false)
  }, [limit])

  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  const addEntry = useCallback(async ({ name, message }) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const rotate = (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 4)

    const { data, error } = await supabase
      .from('guestbook_entries')
      .insert({
        name: name?.trim() || 'anonymous leaf',
        message: message.trim(),
        color,
        rotate,
      })
      .select()
      .single()

    if (error) throw error

    setEntries((prev) => [data, ...prev])
    return data
  }, [])

  return { entries, loading, error, addEntry, refetch: fetchEntries }
}