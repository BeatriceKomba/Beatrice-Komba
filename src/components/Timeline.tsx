import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { BookOpen, Briefcase, ChevronDown, Clock, GraduationCap, HeartPulse, MapPin, Users } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { education, experiences, type Education, type Experience } from '../data/profile'
import { SectionHeading } from './Reveal'

const months: Record<string, number> = {
  jan: 0, feb: 1, mrt: 2, apr: 3, mei: 4, jun: 5, jul: 6, aug: 7, sep: 8, okt: 9, nov: 10, dec: 11,
}
const toSortKey = (date: string) => {
  const [m, y] = date.replace('.', '').split(' ')
  return Number(y) * 12 + (months[m] ?? 0)
}

type Item = { type: 'werk'; data: Experience } | { type: 'opleiding'; data: Education }
type Filter = 'alles' | 'werk' | 'opleiding'

const filters: { id: Filter; label: string }[] = [
  { id: 'alles', label: 'Alles' },
  { id: 'werk', label: 'Werkervaring' },
  { id: 'opleiding', label: 'Opleiding' },
]

function iconFor(item: Item) {
  if (item.type === 'opleiding') return GraduationCap
  return item.data.domain === 'zorg' ? HeartPulse : item.data.kind === 'Stage' ? Users : Briefcase
}

function TimelineCard({ item, index }: { item: Item; index: number }) {
  const [open, setOpen] = useState(false)
  const Icon = iconFor(item)
  const isWork = item.type === 'werk'
  const d = item.data
  const exp = isWork ? (d as Experience) : null
  const edu = isWork ? null : (d as Education)
  const title = exp ? exp.title : `${edu!.level}, ${edu!.program}`
  const org = exp ? exp.organization : edu!.school
  const current = exp ? exp.end === 'heden' : Boolean(edu!.current)
  const panelId = `details-${d.id}`

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.2), ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 md:grid-cols-[9rem_3rem_1fr] md:gap-x-6"
    >
      <div className="hidden pt-6 text-right md:block">
        <p className="text-2xl font-extralight tabular-nums">{d.start.split(' ')[1]}</p>
        <p className="text-sm text-muted">
          {d.start} – {d.end}
        </p>
      </div>

      <div className="relative flex justify-center pt-5">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
          className={`relative z-10 grid h-10 w-10 place-items-center rounded-full ring-4 ring-paper md:h-12 md:w-12 ${
            isWork ? 'bg-ink text-paper' : 'bg-azure text-paper'
          }`}
        >
          <Icon className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
          {current && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-light opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-azure-light ring-2 ring-paper" />
            </span>
          )}
        </motion.span>
      </div>

      <article className="group mb-6 min-w-0 rounded-3xl border border-hair bg-surface p-6 shadow-soft transition-[box-shadow,transform,border-color] duration-500 hover:-translate-y-1 hover:border-azure/40 hover:shadow-lift md:p-7">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`rounded-full px-3 py-1 uppercase tracking-[0.12em] ${isWork ? 'border border-hair text-ink-soft' : 'border border-azure/50 text-azure-deep'}`}>
            {exp ? exp.kind : 'Opleiding'}
          </span>
          {current && <span className="rounded-full bg-azure px-3 py-1 uppercase tracking-[0.12em] text-paper">Huidig</span>}
          <span className="text-muted md:hidden">
            {d.start} – {d.end}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-light leading-tight">{title}</h3>
        <p className="mt-1 text-ink-soft">{org}</p>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-5 inline-flex items-center gap-2 rounded-full text-xs uppercase tracking-[0.14em] text-azure-deep transition-colors hover:text-ink"
        >
          {open ? 'Minder details' : 'Meer details'}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-4 border-t border-hair pt-5 text-sm">
                <dl className="grid gap-3 text-ink-soft sm:grid-cols-2">
                  {exp && (
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-azure" aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Locatie</dt>
                        <dd>
                          {exp.location}
                          {exp.workplace && ` · ${exp.workplace}`}
                        </dd>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-azure" aria-hidden="true" />
                    <div>
                      <dt className="sr-only">Periode</dt>
                      <dd>
                        {d.start} – {d.end}
                        {exp && ` · ${exp.duration}`}
                      </dd>
                    </div>
                  </div>
                  {edu && (
                    <div className="flex items-start gap-2">
                      <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-azure" aria-hidden="true" />
                      <div>
                        <dt className="sr-only">Niveau</dt>
                        <dd>{edu.level}</dd>
                      </div>
                    </div>
                  )}
                </dl>

                {exp && exp.skills.length > 0 && (
                  <div>
                    <p className="label">Vaardigheden</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {exp.skills.map((s) => (
                        <li key={s} className="rounded-full border border-hair px-3 py-1 text-ink">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp?.description && <p className="leading-relaxed text-ink-soft">{exp.description}</p>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.li>
  )
}

export default function Timeline() {
  const [filter, setFilter] = useState<Filter>('alles')
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  const items = useMemo<Item[]>(() => {
    const all: Item[] = [
      ...experiences.map((data) => ({ type: 'werk' as const, data })),
      ...education.map((data) => ({ type: 'opleiding' as const, data })),
    ]
    return all
      .filter((i) => filter === 'alles' || i.type === filter)
      .sort((a, b) => toSortKey(b.data.start) - toSortKey(a.data.start))
  }, [filter])

  return (
    <section id="loopbaan" aria-labelledby="loopbaan-titel" className="relative bg-gradient-to-b from-transparent via-surface to-transparent py-24 md:py-32">
      <div className="gutter mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="loopbaan-titel"
            eyebrow="Opleiding & werkervaring"
            lines={['Een tijdlijn', 'in beweging']}
            intro="Van middelbare school tot de huidige stage. Open een kaart voor locatie, periode en vaardigheden."
          />
          <div role="group" aria-label="Filter de tijdlijn" className="flex shrink-0 self-start rounded-full border border-hair bg-paper p-1 md:self-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={`relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                  filter === f.id ? 'text-paper' : 'text-muted hover:text-ink'
                }`}
              >
                {filter === f.id && (
                  <motion.span layoutId="timeline-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div ref={listRef} className="relative mt-16">
          <div aria-hidden="true" className="absolute bottom-6 left-[1.25rem] top-5 w-px -translate-x-1/2 bg-hair md:left-[calc(9rem+1.5rem+1.5rem)]">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-gradient-to-b from-azure to-azure-light" />
          </div>
          <motion.ol layout className="relative">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <TimelineCard key={`${item.type}-${item.data.id}`} item={item} index={i} />
              ))}
            </AnimatePresence>
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
