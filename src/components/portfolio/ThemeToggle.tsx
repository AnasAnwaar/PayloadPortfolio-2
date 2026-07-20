'use client'

import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'

import { useTheme } from '@/providers/Theme'

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> }
}

/**
 * Sliding switch.
 *
 * Theme changes go through the View Transitions API where supported, which
 * cross-fades a snapshot of the page on the compositor. `flushSync` is required
 * so React commits the DOM change inside the transition callback rather than on
 * a later tick, otherwise there is nothing to capture. Browsers without the API
 * fall back to the scoped CSS transition in globals.css.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { setTheme, theme } = useTheme()
  const isDark = theme === 'dark'

  const toggle = () => {
    const next = isDark ? 'light' : 'dark'
    const root = document.documentElement

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next)
      return
    }

    const doc = document as ViewTransitionDocument
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => flushSync(() => setTheme(next)))
      return
    }

    root.classList.add('theme-switching')
    window.setTimeout(() => root.classList.remove('theme-switching'), 420)
    setTheme(next)
  }

  return (
    <button
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`no-theme-transition relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border border-brand-fg/25 bg-brand-fg/10 px-1 transition-colors duration-300 hover:border-brand-fg/50 ${className}`}
      onClick={toggle}
      role="switch"
      type="button"
    >
      {/* Both icons stay mounted and cross-fade — swapping the element mid-slide
          is what made the knob look like it stuttered. */}
      <Sun className={`pointer-events-none absolute left-2 text-brand-muted transition-opacity duration-300 ${isDark ? 'opacity-60' : 'opacity-0'}`} size={14} />
      <Moon className={`pointer-events-none absolute right-2 text-brand-muted transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-60'}`} size={14} />
      <span
        className={`no-theme-transition pointer-events-none relative grid size-7 place-items-center rounded-full bg-mint text-page shadow-md will-change-transform ${isDark ? 'translate-x-7' : 'translate-x-0'}`}
        style={{ transition: 'transform 420ms cubic-bezier(0.34, 1.4, 0.64, 1)' }}
      >
        <Sun className={`absolute transition-all duration-300 ${isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} size={15} />
        <Moon className={`absolute transition-all duration-300 ${isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} size={15} />
      </span>
    </button>
  )
}
