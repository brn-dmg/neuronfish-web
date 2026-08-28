'use client'

import { useRef, type KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  value: string
  onChange: (val: string) => void
  onSend: () => void
  isDisabled: boolean
  isLimitReached: boolean
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isDisabled,
  isLimitReached,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isDisabled && value.trim()) onSend()
    }
  }

  function handleInput() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  if (isLimitReached) {
    return (
      <div className="border-t border-white/5 px-4 py-3 text-center">
        <p className="text-xs text-[#9CA3AF]">
          Session limit reached.{' '}
          <a
            href="mailto:risad@neuronfish.dev"
            className="text-blue-400 underline underline-offset-2"
          >
            Email us
          </a>{' '}
          if you need more help!
        </p>
      </div>
    )
  }

  return (
    <div className="border-t border-white/5 px-3 py-3">
      <div
        className={cn(
          'flex items-end gap-2 rounded-xl bg-[#1a1f2e] px-3 py-2',
          'ring-1 ring-white/8 focus-within:ring-blue-500/50 transition-all duration-200'
        )}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={isDisabled}
          placeholder="Ask me anything about NeuronFish…"
          className={cn(
            'flex-1 resize-none bg-transparent text-sm text-white',
            'placeholder:text-[#4B5563] outline-none',
            'max-h-[120px] leading-relaxed py-0.5',
            isDisabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        <button
          onClick={onSend}
          disabled={isDisabled || !value.trim()}
          className={cn(
            'mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
            'bg-blue-600 text-white transition-all duration-200',
            'hover:bg-blue-500 active:scale-95',
            'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-blue-600'
          )}
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-[#374151]">
        Pluto may make mistakes — verify important info.
      </p>
    </div>
  )
}
