/**
 * Calls Claude / Gemini / OpenAI using the API key the user stored in their profile.
 * Nothing is hardcoded. Key is saved in Supabase profiles.ai_key column.
 */

export async function callAI({ provider = 'claude', apiKey, prompt, maxTokens = 800 }) {
  if (!apiKey) throw new Error('No API key provided. Add your key in Settings.')

  if (provider === 'claude') {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error?.message || `Claude API error ${res.status}`)
    }
    const data = await res.json()
    return data.content?.[0]?.text || ''
  }

  if (provider === 'openai') {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        max_tokens: maxTokens,
        messages: [{ role: 'user', content: prompt }],
      }),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error?.message || `OpenAI API error ${res.status}`)
    }
    const data = await res.json()
    return data.choices?.[0]?.message?.content || ''
  }

  if (provider === 'gemini') {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    )
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error?.message || `Gemini API error ${res.status}`)
    }
    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  }

  throw new Error(`Unknown provider: ${provider}`)
}

// ── Prompt builders ──────────────────────────────────────────
export const prompts = {
  bio: (exp) =>
    `Write a compelling 3-sentence professional bio for a developer with this experience: "${exp}". Be specific and punchy. Return only the bio, no labels.`,

  summary: (text) =>
    `Write a powerful 3-sentence resume summary for this developer profile: "${text}". Focus on impact and value. Return only the summary.`,

  skills: (jd, current) =>
    `Job description: "${jd}"\nCurrent skills: "${current}"\n\nList 6 skills missing from the profile that appear in the job description. Return as JSON array: ["skill1","skill2",...]`,

  ats: (resume, jd) =>
    `Analyze this resume text: "${resume}" against this job description: "${jd}".\nReturn JSON only: {"score":85,"matched":["word1"],"missing":["word2"],"tips":["tip1"]}`,

  improve: (text) =>
    `Improve this portfolio text to sound more professional and impactful: "${text}". Return only the improved text.`,
}
