/**
 * AI helper functions — all calls go through Supabase Edge Functions
 * so the Anthropic API key stays server-side and never exposed in the browser.
 *
 * Deploy the edge function at:  supabase/functions/ai-generate/index.ts
 */
import { supabase } from './supabase'

async function invoke(type, payload) {
  const { data, error } = await supabase.functions.invoke('ai-generate', {
    body: { type, ...payload },
  })
  if (error) throw new Error(error.message)
  return data.result
}

/** Generate an AI bio from raw experience text */
export async function generateBio(experience) {
  return invoke('bio', { experience })
}

/** Generate an ATS-optimized resume summary */
export async function generateSummary(resumeText) {
  return invoke('summary', { resumeText })
}

/** Suggest skills based on job description */
export async function suggestSkills(jobDescription, currentSkills) {
  return invoke('skills', { jobDescription, currentSkills })
}

/** Analyse ATS compatibility of a resume vs job description */
export async function analyzeATS(resumeText, jobDescription) {
  return invoke('ats', { resumeText, jobDescription })
}

/** Improve any section of portfolio text */
export async function improveText(text, context) {
  return invoke('improve', { text, context })
}
