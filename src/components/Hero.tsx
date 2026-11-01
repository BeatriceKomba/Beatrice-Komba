import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, FileText, GraduationCap, HandHeart } from 'lucide-react'
import { useRef } from 'react'
import portrait from '../assets/beatrice-komba.webp'
import { profile } from '../data/profile'
import { anchorProps } from '../hooks/scroll'
import Sparkle from './Sparkle'
import Typewriter from './Typewriter'

const ease = [0.22, 1, 0.36, 1] as const

function AnimatedLine({ word, delay }: { word: string; delay: number }) {
  return (
    <span className="block overflow-hidden whitespace-nowrap pb-[0.04em]" aria-hidden="true">
      <span className="fade-text inline-block">
        {word.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90])
  const archY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50])
  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160])
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60])

  return (
    <section ref={ref} id="top" aria-labelledby="hero-titel" className="relative isolate overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36">
      <motion.div aria-hidden="true" style={{ y: blobY }} className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-20 h-[30rem] w-[30rem] animate-drift rounded-full bg-lilac/50 blur-[120px]" />
        <div className="absolute -right-24 top-40 h-[22rem] w-[22rem] animate-drift rounded-full bg-azure/10 blur-[110px] [animation-delay:-8s]" />
      </motion.div>
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

      {/* Lijn die 'verbinding' verbeeldt */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-24 -z-10 h-[420px] w-full" viewBox="0 0 1440 420" preserveAspectRatio="none" fill="none">
        <motion.path
          d="M-20 330 C 220 380, 340 120, 560 180 S 900 380, 1080 220 S 1340 60, 1460 120"
          stroke="#5AA9E6"
          strokeOpacity="0.4"
          strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, delay: 0.4, ease: 'easeInOut' }}
        />
        <motion.path
          d="M-20 380 C 260 300, 420 330, 620 260 S 980 120, 1180 300 S 1380 360, 1460 300"
          stroke="#14284B"
          strokeOpacity="0.08"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, delay: 0.8, ease: 'easeInOut' }}
        />
      </svg>

      <div className="gutter mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <motion.div style={{ y: textY }} className="min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="label inline-flex items-center gap-2 rounded-full border border-hair px-4 py-2 text-ink-soft"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-azure" />
            </span>
            Persoonlijk cv
          </motion.p>

          <h1 id="hero-titel" className="display mt-7 text-[clamp(3rem,12.5vw,7rem)] lg:text-[clamp(3rem,7.4vw,7rem)]">
            <span className="sr-only">
              {profile.name}, {profile.role}
            </span>
            <AnimatedLine word={profile.firstName} delay={0.35} />
            <AnimatedLine word={profile.lastName} delay={0.65} />
          </h1>

          <p className="mt-6 flex min-h-[2.5rem] items-center gap-4 text-xl font-extralight uppercase tracking-[0.12em] text-azure-deep md:text-3xl">
            <span className="h-px w-10 bg-azure" aria-hidden="true" />
            <Typewriter text={profile.role} startDelay={1300} />
          </p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Student Associate Degree Sociaal Werk aan de Hogeschool Rotterdam. Met ervaring in de huisartsenpraktijk en bij de
            GGD, en stages in het maatschappelijk werk en bij Leerplicht.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <motion.a
              {...anchorProps('over-mij')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-xs font-medium uppercase tracking-[0.16em] text-paper shadow-lift transition-colors hover:bg-azure-light"
            >
              Ontdek mijn verhaal
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </motion.a>
            {profile.cvPdf && (
              <motion.a
                href={profile.cvPdf}
                target="_blank"
                rel="noopener"
                whileHover={{ y: -2 }}
                className="inline-flex items-center gap-2 rounded-full border border-hair px-6 py-4 text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:border-azure"
              >
                <FileText className="h-4 w-4" aria-hidden="true" /> Bekijk cv (PDF)
              </motion.a>
            )}
          </motion.div>
        </motion.div>

        {/* Portret in boogvorm */}
        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-sm lg:max-w-none">
          <motion.div
            aria-hidden="true"
            style={{ y: archY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="absolute -right-3 -top-4 bottom-8 left-6 rounded-t-full border border-azure/50"
          />
          <Sparkle className="absolute -left-2 top-6 h-8 w-8 animate-twinkle text-azure-deep" />
          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0 round 999px 999px 32px 32px)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0 round 999px 999px 32px 32px)' }}
            transition={{ duration: 1.3, delay: 0.45, ease }}
            className="group relative overflow-hidden rounded-b-[2rem] rounded-t-full bg-raised shadow-lift"
          >
            <img
              src={portrait}
              alt="Portret van Beatrice Komba"
              width={400}
              height={400}
              fetchPriority="high"
              className="photo aspect-[4/5] w-full object-cover object-[50%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/60 via-transparent to-transparent" aria-hidden="true" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.5, ease }} className="absolute -left-4 bottom-16 sm:-left-10">
            <motion.div
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 rounded-2xl border border-hair bg-surface/90 px-4 py-3 shadow-soft backdrop-blur"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-paper">
                <HandHeart className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-normal text-ink">Stage maatschappelijk werk</span>
                <span className="text-muted">VluchtelingenWerk · nu</span>
              </span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 1.7, ease }} className="absolute -right-2 top-10 sm:-right-8">
            <motion.div
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-paper shadow-lift"
            >
              <GraduationCap className="h-5 w-5 text-azure-light" aria-hidden="true" />
              <span className="text-sm leading-tight">
                <span className="block font-medium">AD Sociaal werk</span>
                <span className="text-paper/60">Hogeschool Rotterdam</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.a
        {...anchorProps('over-mij')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="label absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-label="Scroll naar Over mij"
      >
        Scroll
        <span className="flex h-10 w-6 justify-center rounded-full border border-hair pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-azure"
            animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
