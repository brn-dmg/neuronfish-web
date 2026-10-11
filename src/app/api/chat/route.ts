import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { streamText, type ModelMessage } from 'ai'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
})
import { NextRequest } from 'next/server'
import { buildSystemPrompt } from '@/components/pluto/system-prompt'

// Simple in-memory IP rate limiter - resets on server restart.
// Upgrade to Upstash Redis if abuse becomes a concern.
const ipStore = new Map<string, { count: number; resetAt: number }>()
const IP_LIMIT = 30
const HOUR_MS = 60 * 60 * 1000
const SESSION_LIMIT = 20

export async function POST(req: NextRequest) {
  // ── IP rate limiting ──────────────────────────────────────────
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const ipData = ipStore.get(ip)

  if (ipData) {
    if (now > ipData.resetAt) {
      ipStore.set(ip, { count: 1, resetAt: now + HOUR_MS })
    } else if (ipData.count >= IP_LIMIT) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      )
    } else {
      ipData.count++
    }
  } else {
    ipStore.set(ip, { count: 1, resetAt: now + HOUR_MS })
  }

  // ── Session limit (client-enforced, double-checked here) ──────
  const sessionCount = parseInt(
    req.headers.get('x-session-count') ?? '0',
    10
  )
  if (sessionCount > SESSION_LIMIT) {
    return new Response(
      JSON.stringify({ error: 'Session limit reached.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // ── Parse body ────────────────────────────────────────────────
  let messages: ModelMessage[]
  try {
    const body = await req.json()
    if (!Array.isArray(body.messages)) throw new Error('Invalid messages')
    messages = body.messages as ModelMessage[]
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // ── Stream from Gemini ────────────────────────────────────────
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: buildSystemPrompt(),
    messages,
    temperature: 0.7,
  })

  return result.toTextStreamResponse()
}
