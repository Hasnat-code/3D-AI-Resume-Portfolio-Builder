import { useState } from 'react'
import { generateWithAI } from '@/lib/anthropic'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  async function generate(prompt) {
    setLoading(true)
    setError(null)
    try {
      return await generateWithAI(prompt)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error }
}