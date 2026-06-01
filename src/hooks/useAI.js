import { useState } from 'react'
import { generateBio, generateSummary, suggestSkills, analyzeATS, improveText } from '../lib/anthropic'
import toast from 'react-hot-toast'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const run = async (fn, ...args) => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await fn(...args)
      setResult(data)
      return data
    } catch (err) {
      setError(err.message)
      toast.error('AI request failed: ' + err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    result,
    error,
    generateBio: (exp) => run(generateBio, exp),
    generateSummary: (text) => run(generateSummary, text),
    suggestSkills: (jd, skills) => run(suggestSkills, jd, skills),
    analyzeATS: (resume, jd) => run(analyzeATS, resume, jd),
    improveText: (text, ctx) => run(improveText, text, ctx),
  }
}
