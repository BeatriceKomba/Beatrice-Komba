import { motion } from 'framer-motion'
import { Compass, HandHeart, HeartPulse, Link2 } from 'lucide-react'
import { SectionHeading, staggerChild, staggerParent } from './Reveal'

// Lijnillustraties per thema; worden getekend zodra de kaart in beeld komt.
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, delay: 0.3 + i * 0.15, ease: 'easeInOut' }, opacity: { duration: 0.2 } },
  }),
}

const themes = [
  {
    icon: HandHeart,
    title: 'Begeleiding',
    text: 'Naast iemand staan en samen stappen zetten, in het tempo van die persoon.',
    proof: 'Persoonlijke begeleiding en zelfstandigheid bij VluchtelingenWerk.',
    paths: ['M8 60 C 30 60, 40 22, 62 22 S 96 40, 112 18', 'M8 70 C 32 70, 44 34, 66 34 S 98 52, 112 30'],
  },
  {
    icon: Link2,
    title: 'Verbinding',
    text: 'Mensen helpen hun plek te vinden in hun buurt en in de samenleving.',
    proof: 'Integratie van nieuwkomers bij VluchtelingenWerk.',
    paths: [
      'M30 40 L60 22 L90 44 L30 40',
      'M22 40 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M52 22 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M82 44 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0',
    ],
  },
  {
    icon: HeartPulse,
    title: 'Welzijn',
    text: 'Gezondheid en welzijn horen bij elkaar; het een beïnvloedt het ander.',
    proof: 'Ervaring als doktersassistente en bij de GGD Zuid-Holland Zuid.',
    paths: ['M6 46 H38 L46 26 L56 62 L64 38 H112', 'M78 30 C 86 14, 104 14, 108 22 C 100 32, 86 34, 78 30 Z'],
  },
  {
    icon: Compass,
    title: 'Ondersteuning',
    text: 'Praktische hulp waar het vastloopt, zoals geldzaken of schoolgang.',
    proof: 'Financiële administratie bij VluchtelingenWerk en stage bij Leerplicht.',
    paths: ['M14 50 C 30 66, 90 66, 106 50', 'M40 50 V30 M60 50 V20 M80 50 V30'],
  },
]

export default function Story() {
  return (
    <section id="verhaal" aria-labelledby="verhaal-titel" className="relative isolate overflow-hidden py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-lilac/40 blur-[120px]" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-azure/10 blur-[110px]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
          <defs>
            <pattern id="ringen" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="40" stroke="#14284B" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ringen)" />
        </svg>
      </div>

      <div className="gutter mx-auto max-w-6xl">
        <SectionHeading
          id="verhaal-titel"
          eyebrow="Het werkveld"
          lines={['Waar sociaal werk', 'om draait']}
          intro="Vier kernthema's van het vak, en waar Beatrice er in de praktijk mee heeft gewerkt."
        />

        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {themes.map((t) => (
            <motion.li
              key={t.title}
              variants={staggerChild}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="group flex flex-col rounded-3xl border border-hair bg-surface/70 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-azure/40 hover:bg-raised"
            >
              <svg viewBox="0 0 120 80" className="h-20 w-28" fill="none" aria-hidden="true">
                {t.paths.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    custom={i}
                    variants={draw}
                    stroke={i === 0 ? '#7FBDF0' : 'rgba(20,40,75,0.3)'}
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>
              <h3 className="mt-6 flex items-center gap-3 text-xl font-normal uppercase tracking-[0.08em]">
                <t.icon className="h-5 w-5 text-azure-deep transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
                {t.title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{t.text}</p>
              <div className="mt-auto pt-6">
                <div className="border-t border-hair pt-5">
                  <span className="label block">In de praktijk</span>
                  <p className="mt-2 text-sm leading-relaxed text-azure-deep">{t.proof}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
