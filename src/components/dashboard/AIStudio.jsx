import { useState } from 'react'
import { useAI } from '@/hooks/useAI'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/ui/GlassCard'

export default function AIStudio() {
  const [prompt,   setPrompt]   = useState('')
  const [response, setResponse] = useState('')
  const { generate, loading }   = useAI()

  async function handleGenerate() {
    const res = await generate(prompt)
    if (res) setResponse(res.text ?? JSON.stringify(res))
  }

  return (
    <GlassCard>
      <h3 className="font-display text-lg font-semibold text-white mb-4">AI Studio</h3>
      <textarea
        className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
        rows={4}
        placeholder="Ask AI to write your bio, improve your summary…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button className="mt-3" onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating…' : 'Generate ✦'}
      </Button>
      {response && (
        <p className="mt-4 text-sm text-slate-300 bg-white/5 rounded-xl p-4">{response}</p>
      )}
    </GlassCard>
  )
}