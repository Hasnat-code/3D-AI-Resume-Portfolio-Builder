import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function usePortfolio(userId) {
  const [portfolio, setPortfolio] = useState(null)
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    if (!userId) return
    supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId)
      .single()
      .then(({ data }) => { setPortfolio(data); setLoading(false) })
  }, [userId])

  return { portfolio, loading }
}