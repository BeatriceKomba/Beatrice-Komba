import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterProps {
  text: string
  startDelay?: number
  speed?: number
  className?: string
}

/** Typt de tekst eenmalig uit. Schermlezers krijgen direct de volledige tekst. */
export default function Typewriter({ text, startDelay = 900, speed = 85, className }: TypewriterProps) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? text.length : 0)

  useEffect(() => {
    if (reduce) {
      setCount(text.length)
      return
    }
    let i = 0
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setCount(i)
        if (i >= text.length) window.clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [text, startDelay, speed, reduce])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] animate-blink bg-azure-light" />
      </span>
    </span>
  )
}
