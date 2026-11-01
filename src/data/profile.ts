// Alle gegevens komen uit het LinkedIn-profiel van Beatrice (screenshots, oktober 2026).
// Velden met `null` zijn nog niet bekend; zodra je ze invult, verschijnen ze vanzelf op de site.

export const profile = {
  name: 'Beatrice Komba',
  firstName: 'Beatrice',
  lastName: 'Komba',
  role: 'Sociaal Werker',
  headline: 'Student aan de Hogeschool Rotterdam',
  linkedin: 'https://www.linkedin.com/in/beatrice-komba-44a180415/',
  email: 'Beatricehassan@hotmail.com' as string | null,
  // Opgeslagen in internationaal formaat (voor tel:-links), getoond als `phoneDisplay`.
  phone: '+31687147319' as string | null,
  phoneDisplay: '+31 6 87 14 73 19',
  cvPdf: null as string | null,
  // Persoonlijke introductie en motivatie: nog aan te leveren door Beatrice.
  about: 'Beatrice is een doorzetter en een harde werker. Ze stelt zichzelf duidelijke doelen en werkt daar met volle inzet naartoe. Daarbij denkt ze niet alleen aan zichzelf: ze wil ook haar patiënten, cliënten en collega’s helpen groeien en naar een hoger niveau tillen.' as string | null,
  motivation: null as string | null,
}

export type ExperienceKind = 'Stage' | 'Parttime' | 'Bijbaan'

export interface Experience {
  id: string
  title: string
  organization: string
  kind: ExperienceKind
  start: string
  end: string
  duration: string
  location: string
  workplace: string | null
  domain: 'sociaal' | 'zorg' | 'overig'
  skills: string[]
  description: string | null
}

export const experiences: Experience[] = [
  {
    id: 'albert-heijn',
    title: 'Drivers Care',
    organization: 'Albert Heijn Barendrecht',
    kind: 'Bijbaan',
    start: 'dec. 2023',
    end: 'heden',
    duration: '3 jr',
    location: 'Barendrecht, Zuid-Holland',
    workplace: null,
    domain: 'overig',
    skills: [],
    description: null,
  },
  {
    id: 'vluchtelingenwerk',
    title: 'Stagiair maatschappelijk werk',
    organization: 'VluchtelingenWerk Zuid-Holland en Zeeland',
    kind: 'Stage',
    start: 'sep. 2025',
    end: 'heden',
    duration: '1 jr 2 mnd',
    location: 'Zwijndrecht, Zuid-Holland',
    workplace: 'Op locatie',
    domain: 'sociaal',
    skills: ['Persoonlijke begeleiding', 'Financiële administratie', 'Zelfstandigheid', 'Integratie'],
    description: null,
  },
  {
    id: 'sol',
    title: 'Stagiair maatschappelijk werk',
    organization: 'SOL',
    kind: 'Stage',
    start: 'sep. 2024',
    end: 'apr. 2025',
    duration: '8 maanden',
    location: 'Rotterdam, Zuid-Holland',
    workplace: 'Op locatie',
    domain: 'sociaal',
    skills: [],
    description: null,
  },
  {
    id: 'dgj',
    title: 'Stagiair consulent Leerplicht',
    organization: 'Dienst Gezondheid & Jeugd ZHZ',
    kind: 'Stage',
    start: 'feb. 2024',
    end: 'jul. 2024',
    duration: '6 maanden',
    location: 'Dordrecht, Zuid-Holland',
    workplace: 'Op locatie',
    domain: 'sociaal',
    skills: [],
    description: null,
  },
  {
    id: 'ggd-tester',
    title: 'Corona tester',
    organization: 'GGD Zuid-Holland Zuid',
    kind: 'Parttime',
    start: 'nov. 2021',
    end: 'feb. 2023',
    duration: '1 jr 4 mnd',
    location: 'Dordrecht, Zuid-Holland',
    workplace: 'Op locatie',
    domain: 'zorg',
    skills: [],
    description: null,
  },
  {
    id: 'ggd-prikker',
    title: 'Optrekker / prikker',
    organization: 'GGD Zuid-Holland Zuid',
    kind: 'Parttime',
    start: 'jan. 2021',
    end: 'aug. 2021',
    duration: '8 maanden',
    location: 'Dordrecht, Zuid-Holland',
    workplace: 'Op locatie',
    domain: 'zorg',
    skills: ['Injecteren', 'Vaccinaties voorbereiden'],
    description: null,
  },
  {
    id: 'huisarts',
    title: 'Stagiair doktersassistente',
    organization: 'Huisartspraktijk Verwijs-Hollants',
    kind: 'Stage',
    start: 'aug. 2020',
    end: 'dec. 2021',
    duration: '1 jr 5 mnd',
    location: 'Sliedrecht, Zuid-Holland',
    workplace: 'Op locatie',
    domain: 'zorg',
    skills: ['Injecteren', 'Bloeddruk meten', 'Plannen', 'Telefonische triage', 'Suikergehalte meten', 'Medicatie herhalen'],
    description: null,
  },
]

export interface Education {
  id: string
  school: string
  program: string
  level: string
  start: string
  end: string
  current?: boolean
}

export const education: Education[] = [
  {
    id: 'hr',
    school: 'Hogeschool Rotterdam',
    program: 'Sociaal werk',
    level: "Associate Degree (AD)",
    start: 'sep. 2023',
    end: 'jan. 2027',
    current: true,
  },
  {
    id: 'davinci',
    school: 'ROC Da Vinci College',
    program: 'Doktersassistente',
    level: 'Mbo 4',
    start: 'aug. 2018',
    end: 'dec. 2021',
  },
  {
    id: 'insula',
    school: 'Insula College',
    program: 'Middelbare school',
    level: 'Vmbo-gl',
    start: 'sep. 2014',
    end: 'jul. 2018',
  },
]

export interface SkillGroup {
  id: string
  title: string
  intro: string
  skills: { name: string; where: string[] }[]
}

// Vaardigheden zoals vermeld op LinkedIn, met de plek waar ze zijn opgedaan als onderbouwing.
export const skillGroups: SkillGroup[] = [
  {
    id: 'sociaal',
    title: 'Sociaal werk',
    intro: 'Opgedaan in de stage maatschappelijk werk bij VluchtelingenWerk.',
    skills: [
      { name: 'Persoonlijke begeleiding', where: ['VluchtelingenWerk'] },
      { name: 'Integratie', where: ['VluchtelingenWerk'] },
      { name: 'Zelfstandigheid', where: ['VluchtelingenWerk'] },
      { name: 'Financiële administratie', where: ['VluchtelingenWerk'] },
    ],
  },
  {
    id: 'zorg',
    title: 'Zorg & gezondheid',
    intro: 'Opgedaan in de huisartsenpraktijk en bij de GGD.',
    skills: [
      { name: 'Injecteren', where: ['Huisartspraktijk', 'GGD'] },
      { name: 'Vaccinaties voorbereiden', where: ['GGD'] },
      { name: 'Bloeddruk meten', where: ['Huisartspraktijk'] },
      { name: 'Suikergehalte meten', where: ['Huisartspraktijk'] },
      { name: 'Medicatie herhalen', where: ['Huisartspraktijk'] },
    ],
  },
  {
    id: 'organisatie',
    title: 'Contact & organisatie',
    intro: 'Opgedaan aan de balie en telefoon van de huisartsenpraktijk.',
    skills: [
      { name: 'Telefonische triage', where: ['Huisartspraktijk'] },
      { name: 'Plannen', where: ['Huisartspraktijk'] },
    ],
  },
]

export const navItems = [
  { id: 'over-mij', label: 'Over mij' },
  { id: 'verhaal', label: 'Werkveld' },
  { id: 'loopbaan', label: 'Loopbaan' },
  { id: 'vaardigheden', label: 'Vaardigheden' },
  { id: 'contact', label: 'Contact' },
]
