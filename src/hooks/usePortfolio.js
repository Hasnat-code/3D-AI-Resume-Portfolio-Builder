import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

export function usePortfolio() {
  const { user } = useAuth()
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchPortfolios = async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (error) toast.error(error.message)
    else setPortfolios(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchPortfolios() }, [user])

  const createPortfolio = async (title, template = 'neural-dark') => {
    const { data, error } = await supabase
      .from('portfolios')
      .insert({ user_id: user.id, title, template, data: {} })
      .select()
      .single()
    if (error) { toast.error(error.message); return null }
    setPortfolios((prev) => [data, ...prev])
    toast.success('Portfolio created!')
    return data
  }

  const updatePortfolio = async (id, updates) => {
    const { data, error } = await supabase
      .from('portfolios')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) { toast.error(error.message); return null }
    setPortfolios((prev) => prev.map((p) => (p.id === id ? data : p)))
    return data
  }

  const deletePortfolio = async (id) => {
    const { error } = await supabase.from('portfolios').delete().eq('id', id)
    if (error) { toast.error(error.message); return }
    setPortfolios((prev) => prev.filter((p) => p.id !== id))
    toast.success('Portfolio deleted.')
  }

  return { portfolios, loading, createPortfolio, updatePortfolio, deletePortfolio, refetch: fetchPortfolios }
}
