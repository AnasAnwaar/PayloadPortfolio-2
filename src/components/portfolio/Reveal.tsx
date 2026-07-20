'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Fades and lifts children into view once. Uses a single observer per element and
 * disconnects after firing, so long lists don't hold observers open.
 */
export function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
}: {
  as?: 'article' | 'div' | 'section'
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      ref={ref as never}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
