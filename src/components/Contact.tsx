import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, FileText, Linkedin, Mail, Phone, type LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/profile'
import { Reveal, SectionHeading } from './Reveal'

interface ContactCardProps {
  icon: LucideIcon
  label: string
  value: string
  href: string
  copyValue?: string
}

/** Contactkaart met klikbare link en (optioneel) een knop om de gegevens te kopiëren. */
function ContactCard({ icon: Icon, label, value, href, copyValue }: ContactCardProps) {
  const [copied, setCopied] = useState(false)
  const id = `contact-${label.toLowerCase().replace(/\W/g, '')}`
  const copy = async () => {
    if (!copyValue) return
    try {
      await navigator.clipboard.writeText(copyValue)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      const el = document.getElementById(id)
      if (el) window.getSelection()?.selectAllChildren(el)
    }
  }
  return (
    <motion.li
      whileHover={{ y: -4 }}
      className="flex flex-col justify-between gap-6 rounded-3xl border border-hair bg-paper p-6 transition-colors hover:border-azure/40"
    >
      <span className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-azure text-paper">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        {copyValue && (
          <button
            type="button"
            onClick={copy}
            aria-label={`${label} kopiëren`}
            className="inline-flex items-center gap-1.5 rounded-full border border-azure-deep/40 px-3 py-1.5 text-xs text-azure-deep transition-colors hover:bg-azure-deep hover:text-paper"
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            <span aria-live="polite">{copied ? 'Gekopieerd' : 'Kopieer'}</span>
          </button>
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-xl uppercase tracking-[0.08em]">{label}</span>
        <a id={id} href={href} className="break-all text-sm text-ink-soft underline decoration-azure-deep/40 underline-offset-4 hover:text-ink hover:decoration-azure-deep">
          {value}
        </a>
      </span>
    </motion.li>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-titel" className="relative isolate overflow-hidden bg-gradient-to-b from-transparent via-surface to-transparent py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-lilac/40 blur-[120px]" />
        <svg className="absolute bottom-0 left-0 h-48 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none">
          <motion.path
            d="M0 160 C 300 60, 520 200, 760 120 S 1200 40, 1440 110"
            stroke="#7FBDF0"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="gutter mx-auto max-w-4xl">
        <SectionHeading
          id="contact-titel"
          eyebrow="Contact"
          lines={['Laten we', 'kennismaken']}
          align="center"
          intro="Een stageplek, een vacature of gewoon een kennismaking? Neem gerust contact op."
        />

        <Reveal className="mt-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col justify-between gap-6 rounded-3xl bg-ink p-6 text-paper shadow-lift transition-colors hover:bg-azure-light"
              >
                <span className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-paper text-azure-deep">
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xl uppercase tracking-[0.08em]">LinkedIn</span>
                  <span className="text-sm text-paper/60">Bekijk het volledige profiel</span>
                </span>
              </motion.a>
            </li>
            {profile.email && <ContactCard icon={Mail} label="E-mail" value={profile.email} href={`mailto:${profile.email}`} copyValue={profile.email} />}
            {profile.phone && (
              <ContactCard icon={Phone} label="Telefoon" value={profile.phoneDisplay} href={`tel:${profile.phone}`} copyValue={profile.phone} />
            )}
            {profile.cvPdf && <ContactCard icon={FileText} label="Cv (PDF)" value="Bekijken of downloaden" href={profile.cvPdf} />}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
