import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  CalendarDays,
  Compass,
  Droplet,
  Globe2,
  HandHeart,
  PhoneCall,
  Pill,
  Syringe,
  TestTube,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'
import { skillGroups } from '../data/profile'
import { SectionHeading } from './Reveal'

const icons: Record<string, LucideIcon> = {
  'Persoonlijke begeleiding': HandHeart,
  Integratie: Globe2,
  Zelfstandigheid: Compass,
  'Financiële administratie': Wallet,
  Injecteren: Syringe,
  'Vaccinaties voorbereiden': TestTube,
  'Bloeddruk meten': Activity,
  'Suikergehalte meten': Droplet,
  'Medicatie herhalen': Pill,
  'Telefonische triage': PhoneCall,
  Plannen: CalendarDays,
}

export default function Skills() {
  const [groupId, setGroupId] = useState(skillGroups[0].id)
  const group = skillGroups.find((g) => g.id === groupId)!
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)

  return (
    <section id="vaardigheden" aria-labelledby="vaardigheden-titel" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-lilac/40 blur-[110px]" />
      <div className="gutter relative mx-auto max-w-6xl">
        <SectionHeading
          id="vaardigheden-titel"
          eyebrow="Vaardigheden"
          lines={['Wat ze', 'in huis heeft']}
          intro={`${total} vaardigheden uit de praktijk. Bij elke vaardigheid staat waar die is opgedaan, in plaats van een cijfer of percentage.`}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_1fr]">
          <div className="flex min-w-0 flex-col gap-8">
            <div role="tablist" aria-label="Groepen vaardigheden" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {skillGroups.map((g) => {
                const selected = g.id === groupId
                return (
                  <button
                    key={g.id}
                    id={`tab-${g.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`panel-${g.id}`}
                    onClick={() => setGroupId(g.id)}
                    className={`relative shrink-0 rounded-2xl px-5 py-4 text-left transition-colors ${selected ? 'text-paper' : 'text-ink hover:bg-raised'}`}
                  >
                    {selected && (
                      <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-2xl bg-ink shadow-lift" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative flex items-center justify-between gap-6">
                      <span className="text-sm uppercase tracking-[0.1em]">{g.title}</span>
                      <span
                        className={`grid h-7 min-w-7 place-items-center rounded-full px-2 text-xs tabular-nums ${
                          selected ? 'bg-azure text-paper' : 'bg-raised text-muted'
                        }`}
                      >
                        {g.skills.length}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

          </div>

          <div id={`panel-${group.id}`} role="tabpanel" aria-labelledby={`tab-${group.id}`} className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-ink-soft">{group.intro}</p>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {group.skills.map((skill, i) => {
                    const Icon = icons[skill.name] ?? HandHeart
                    return (
                      <motion.li
                        key={skill.name}
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        whileHover="hover"
                        className="group relative overflow-hidden rounded-3xl border border-hair bg-surface p-6 transition-[box-shadow,border-color] duration-500 hover:border-azure/40 hover:shadow-lift"
                      >
                        <motion.span
                          variants={{ hover: { rotate: [0, -12, 10, -4, 0], scale: 1.12 } }}
                          transition={{ duration: 0.6 }}
                          className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-paper"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </motion.span>
                        <h3 className="mt-5 text-xl font-light leading-snug">{skill.name}</h3>
                        <div className="mt-4">
                          <p className="label">Opgedaan bij</p>
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {skill.where.map((w) => (
                              <li key={w} className="rounded-full border border-hair px-2.5 py-1 text-xs text-ink-soft">
                                {w}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Onderbouwing: één segment per werkplek waar de vaardigheid is ingezet */}
                        <div className="mt-5 flex gap-1" aria-hidden="true">
                          {[0, 1].map((n) => (
                            <motion.span
                              key={n}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.6, delay: 0.3 + i * 0.07 + n * 0.1 }}
                              className={`h-1 flex-1 origin-left rounded-full ${n < skill.where.length ? 'bg-azure' : 'bg-hair'}`}
                            />
                          ))}
                        </div>
                        <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-azure/0 transition-colors duration-500 group-hover:bg-azure/10" />
                      </motion.li>
                    )
                  })}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
