'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ChevronDown, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { ChatMessages, type Message } from './ChatMessages'
import { ChatInput } from './ChatInput'

const SESSION_LIMIT = 20

const SUGGESTED_PROMPTS_EMPTY = [
  'What is Dikkha AI?',
  'Tell me about CHHAR',
  "What's NeuronFish's mission?",
  'How do I download Dikkha AI?',
  "What products are coming next?",
  'Who is on the team?',
]

const AVATAR_SRC = '/pluto-avatar.jpg'
const FAB_SIZE = 74 // px — bigger for visibility

const BUBBLE_SHOW_MS = 5000   // visible for 5 seconds
const BUBBLE_CYCLE_MS = 35000 // new appearance every 35s (30s hidden + 5s visible)
const BUBBLE_INITIAL_DELAY_MS = 1500

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  const abortRef = useRef<AbortController | null>(null)
  const bubbleTimers = useRef<ReturnType<typeof setTimeout>[]>([])
  const bubbleInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>

    const showOnce = () => {
      setShowBubble(true)
      hideTimer = setTimeout(() => setShowBubble(false), BUBBLE_SHOW_MS)
      bubbleTimers.current.push(hideTimer)
    }

    // First appearance after initial delay
    const firstTimer = setTimeout(showOnce, BUBBLE_INITIAL_DELAY_MS)
    bubbleTimers.current.push(firstTimer)

    // Then repeat every BUBBLE_CYCLE_MS indefinitely
    bubbleInterval.current = setInterval(showOnce, BUBBLE_CYCLE_MS)

    return () => {
      bubbleTimers.current.forEach(clearTimeout)
      if (bubbleInterval.current) clearInterval(bubbleInterval.current)
    }
  }, [])

  function openChat() {
    setIsOpen(true)
    setShowBubble(false)
    bubbleTimers.current.forEach(clearTimeout)
    if (bubbleInterval.current) clearInterval(bubbleInterval.current)
  }

  function closeChat() { setIsOpen(false) }

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming || sessionCount >= SESSION_LIMIT) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInputValue('')
    setIsStreaming(true)

    const newCount = sessionCount + 1
    setSessionCount(newCount)

    const assistantId = crypto.randomUUID()
    setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }])

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-count': String(newCount),
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: errData.error ?? 'Something went wrong. Please try again.' }
              : m
          )
        )
        return
      }

      if (!res.body) return
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        )
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: 'Connection error. Please try again.' }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }, [messages, isStreaming, sessionCount])

  const isLimitReached = sessionCount >= SESSION_LIMIT
  const isEmpty = messages.length === 0

  return (
    <>
      {/* ── Speech bubble (cycles automatically) ───────────── */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 340, damping: 24 }}
            className="fixed z-[9998] cursor-pointer select-none"
            style={{
              bottom: 20 + FAB_SIZE / 2 - 28, // vertically centred with FAB
              right: FAB_SIZE + 28,            // sits to the left of the FAB
            }}
            onClick={openChat}
          >
            {/* Bubble body */}
            <div
              className={cn(
                'relative rounded-2xl rounded-br-md',
                'bg-gradient-to-br from-[#0e2035] to-[#0d1825]',
                'px-4 py-3',
                'shadow-xl shadow-cyan-950/60',
                'ring-1 ring-cyan-500/35',
                'max-w-[195px]'
              )}
            >
              {/* Subtle top glow strip */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              <p className="text-[13px] font-bold leading-snug">
                <span className="bg-gradient-to-r from-cyan-300 to-sky-300 bg-clip-text text-transparent">
                  Hi! I&apos;m Pluto
                </span>
              </p>
              <p className="mt-1 text-[12px] text-[#93c5d8] leading-snug">
                Your NeuronFish assistant.
                <br />
                <span className="font-medium text-white/80">Let&apos;s talk!</span>
              </p>

              {/* Right-pointing tail */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full"
                style={{
                  width: 0,
                  height: 0,
                  borderTop: '7px solid transparent',
                  borderBottom: '7px solid transparent',
                  borderLeft: '9px solid #112030',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className={cn(
              'fixed z-[9998] flex flex-col',
              'w-[360px] max-w-[calc(100vw-40px)]',
              'rounded-2xl bg-[#0d1117] shadow-2xl',
              'ring-1 ring-white/8'
            )}
            style={{
              bottom: FAB_SIZE + 16,
              right: 20,
              height: 'min(520px, calc(100dvh - 120px))',
            }}
          >
            {/* Header — overflow-hidden + rounded-t-2xl here so the panel border-radius clips the header bg, not the avatar */}
            <div className="flex shrink-0 items-center gap-3 overflow-hidden rounded-t-2xl border-b border-white/5 px-4 py-3.5">
              <div className="relative shrink-0">
                <div className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/10 bg-[#080e18]">
                  <img
                    src={AVATAR_SRC}
                    alt="Pluto"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0d1117] bg-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-none">Pluto</p>
                <p className="mt-0.5 text-[11px] text-[#6B7280] leading-none">NeuronFish assistant</p>
              </div>
              <button
                onClick={closeChat}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#4B5563] transition-colors hover:bg-white/5 hover:text-white"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {isEmpty ? (
                <EmptyState onPromptClick={sendMessage} />
              ) : (
                <ChatMessages
                  messages={messages}
                  isStreaming={isStreaming}
                  onPromptClick={sendMessage}
                />
              )}
            </div>

            {/* Input */}
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={() => sendMessage(inputValue)}
              isDisabled={isStreaming || isLimitReached}
              isLimitReached={isLimitReached}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB — swim up entrance + idle bob ───────────────── */}
      {/*
        Two-layer approach:
        - Outer motion.div: one-shot entrance (slides up from below on mount)
        - Inner motion.button: continuous idle bob (only when panel is closed)
      */}
      <motion.div
        className="fixed z-[9999]"
        style={{ bottom: 20, right: 20 }}
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.5 }}
      >
        <motion.button
          aria-label={isOpen ? 'Close chat' : 'Open Pluto chat'}
          onClick={isOpen ? closeChat : openChat}
          className="relative overflow-hidden rounded-full shadow-xl shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{ width: FAB_SIZE, height: FAB_SIZE }}
          /* Idle bob — pauses while panel is open */
          animate={isOpen ? { y: 0 } : { y: [0, -9, 0] }}
          transition={
            isOpen
              ? { type: 'spring', stiffness: 300, damping: 22 }
              : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.88 }}
        >
          {/* Fish avatar — always visible as the button face */}
          <img
            src={AVATAR_SRC}
            alt="Pluto"
            className="absolute inset-0 h-full w-full rounded-full object-contain bg-[#080e18]"
            draggable={false}
          />

          {/* Dark overlay + X icon when open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60"
              >
                <motion.div
                  initial={{ rotate: -45, scale: 0.6 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -45, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-5 w-5 text-white" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cyan glow ring (only when closed) */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full ring-2 ring-cyan-400/50"
              style={{ animation: 'pluto-pulse-ring 2.5s ease-out infinite' }}
            />
          )}
        </motion.button>
      </motion.div>
    </>
  )
}

function EmptyState({ onPromptClick }: { onPromptClick: (p: string) => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-5 py-6 text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
      >
        <img
          src={AVATAR_SRC}
          alt="Pluto"
          className="h-16 w-16 rounded-full object-contain bg-[#080e18] shadow-lg shadow-cyan-900/40 ring-2 ring-cyan-500/30"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-sm font-semibold text-white">Hi, I&apos;m Pluto!</p>
        <p className="mt-1 text-xs text-[#6B7280] leading-relaxed">
          Ask me anything about NeuronFish,
          <br />
          Dikkha AI, or CHHAR.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-2"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
      >
        {SUGGESTED_PROMPTS_EMPTY.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onPromptClick(prompt)}
            className={cn(
              'rounded-full border border-white/10 bg-white/5 px-3 py-1.5',
              'text-[11px] text-[#9CA3AF] leading-none',
              'transition-all duration-150',
              'hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300',
              'active:scale-95'
            )}
          >
            {prompt}
          </button>
        ))}
      </motion.div>
    </div>
  )
}
