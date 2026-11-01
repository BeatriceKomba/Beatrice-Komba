import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  x?: number
}

export function Reveal({ children, className, delay = 0, y = 28, x = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

/** Grote dunne kop; elke regel schuift apart omhoog. */
export function DisplayHeading({
  id,
  lines,
  align = 'center',
  className = '',
}: {
  id: string
  lines: string[]
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <motion.h2
      id={id}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={`display ${className.includes('text-[') ? '' : 'text-[clamp(2.4rem,7vw,5.5rem)]'} ${align === 'center' ? 'text-center' : ''} ${className}`}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="fade-text inline-block"
            variants={{ hidden: { y: '105%' }, show: { y: 0, transition: { duration: 1, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-azure" aria-hidden="true" />
      {children}
    </p>
  )
}

interface SectionHeadingProps {
  id: string
  eyebrow: string
  lines: string[]
  intro?: ReactNode
  align?: 'left' | 'center'
}

/** Kop in de stijl van de eerste versie: eyebrow, grote dunne kop en intro. */
export function SectionHeading({ id, eyebrow, lines, intro, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>
      <DisplayHeading id={id} lines={lines} align={align} className="mt-5 text-[clamp(2.3rem,5.5vw,4.5rem)]" />
      {intro && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
