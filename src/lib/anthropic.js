// NOTE: In production, API calls should go through a backend/edge function.
// Never expose your API key on the client.

export async function generateWithAI(prompt) {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  if (!res.ok) throw new Error('AI request failed')
  return res.json()
}