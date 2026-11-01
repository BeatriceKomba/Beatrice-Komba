import { motion } from 'framer-motion'
import { HeartPulse, PenLine, Users } from 'lucide-react'
import blouse from '../assets/beatrice-blouse.webp'
import { experiences, profile } from '../data/profile'
import { Reveal, SectionHeading, staggerChild, staggerParent } from './Reveal'

const socialStages = experiences.filter((e) => e.domain === 'sociaal').length

const facts = [
  { value: String(experiences.length), label: 'werkplekken sinds 2020' },
  { value: String(socialStages), label: 'stages in het sociaal domein' },
  { value: '2027', label: 'afronding AD Sociaal werk (jan.)' },
]

const chapters = [
  {
    icon: HeartPulse,
    period: '2018 – 2023',
    title: 'Zorg',
    text: 'Mbo 4 Doktersassistente aan het ROC Da Vinci College, een stage in de huisartsenpraktijk en parttime werk bij de GGD Zuid-Holland Zuid tijdens de coronaperiode.',
  },
  {
    icon: Users,
    period: '2023 – nu',
    title: 'Sociaal werk',
    text: 'De Associate Degree Sociaal werk aan de Hogeschool Rotterdam, met stages bij Leerplicht (Dienst Gezondheid & Jeugd), SOL en VluchtelingenWerk.',
  },
]

export default function About() {
  return (
    <section id="over-mij" aria-labelledby="over-mij-titel" className="relative bg-gradient-to-b from-transparent via-surface to-transparent py-24 md:py-32">
      <div className="gutter mx-auto max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="min-w-0">
            <SectionHeading
              id="over-mij-titel"
              eyebrow="Over mij"
              lines={['Van zorg', 'naar welzijn']}
              intro="Beatrice combineert een achtergrond als doktersassistente met een opleiding en stages in het sociaal werk."
            />

            <motion.dl
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="mt-12 grid grid-cols-3 gap-4 border-t border-hair pt-8"
            >
              {facts.map((f) => (
                <motion.div key={f.label} variants={staggerChild} className="min-w-0">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="text-4xl font-extralight tabular-nums md:text-5xl">{f.value}</dd>
                  <dd className="mt-2 text-sm leading-snug text-muted">{f.label}</dd>
                </motion.div>
              ))}
            </motion.dl>

            <Reveal className="mt-12">
              <figure className="group relative overflow-hidden rounded-3xl">
                <img
                  src={blouse}
                  alt="Beatrice Komba in een witte blouse"
                  width={750}
                  height={1000}
                  loading="lazy"
                  className="photo aspect-[4/3] w-full object-cover object-[55%_32%] group-hover:scale-[1.03]"
                />
                <figcaption className="label absolute bottom-4 left-4 rounded-full bg-paper/70 px-3 py-1.5 text-ink backdrop-blur">
                  Beatrice Komba
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div className="min-w-0 space-y-6">
            {profile.about ? (
              <Reveal>
                <p className="text-2xl font-light leading-relaxed">{profile.about}</p>
              </Reveal>
            ) : (
              <Reveal className="placeholder p-6 md:p-8">
                <p className="label flex items-center gap-2 text-azure">
                  <PenLine className="h-4 w-4" aria-hidden="true" /> Placeholder
                </p>
                <p className="mt-3 text-xl font-light leading-relaxed text-ink md:text-2xl">
                  Hier komt de persoonlijke introductie van Beatrice: wie ze is, wat haar drijft in het sociaal werk en waarom
                  ze graag met mensen werkt.
                </p>
                <p className="mt-3 text-sm">Nog aan te leveren door Beatrice zelf, zodat de tekst echt van haar is.</p>
              </Reveal>
            )}

            <div className="relative grid gap-5 sm:grid-cols-2">
              <svg aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-10 w-16 -translate-x-1/2 -translate-y-1/2 sm:block" viewBox="0 0 64 40" fill="none">
                <motion.path
                  d="M2 20 C 20 2, 44 38, 62 20"
                  stroke="#5AA9E6"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                />
              </svg>
              {chapters.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.15} x={i === 0 ? -20 : 20} y={0}>
                  <article className="group h-full rounded-3xl border border-hair bg-paper p-7 transition-[box-shadow,border-color] duration-500 hover:border-azure/40 hover:shadow-lift">
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-paper transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                        <c.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm tabular-nums text-azure-deep">{c.period}</span>
                    </div>
                    <h3 className="mt-6 text-2xl font-light uppercase tracking-wide">{c.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">{c.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            {!profile.motivation && (
              <Reveal className="placeholder px-6 py-4 text-sm">
                <strong className="font-normal text-ink">Placeholder:</strong> motivatie voor sociaal werk en persoonlijke
                ontwikkeling, in de woorden van Beatrice.
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
