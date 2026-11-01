import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import { anchorProps, scrollToId, useActiveSection, useScrolledPast } from '../hooks/scroll'

const ids = navItems.map((n) => n.id)

export default function Header() {
  const scrolled = useScrolledPast(24)
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 z-50 border-b transition-[background-color,border-color] duration-500 ${
        scrolled || open ? 'border-hair bg-paper/80 backdrop-blur-md' : 'border-transparent'
      }`}
      style={{ top: 0, paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav className="gutter mx-auto flex h-16 max-w-6xl items-center justify-between md:h-20" aria-label="Hoofdnavigatie">
        <a
          {...anchorProps('top')}
          onClick={(e) => {
            e.preventDefault()
            setOpen(false)
            scrollToId('top')
          }}
          className="group flex items-center gap-3"
          aria-label={`${profile.name}, naar boven`}
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-azure/50 text-xs font-light tracking-[0.12em] text-azure-deep transition-transform duration-500 group-hover:rotate-[18deg]">
            BK
          </span>
          <span className="hidden text-sm font-normal uppercase tracking-[0.2em] sm:block">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                {...anchorProps(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                  active === item.id ? 'text-paper' : 'text-muted hover:text-ink'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobiel-menu"
          aria-label={open ? 'Menu sluiten' : 'Menu openen'}
          className="grid h-11 w-11 place-items-center rounded-full border border-hair text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobiel-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="gutter flex h-[calc(100dvh-4rem)] flex-col pb-10 pt-4">
              {navItems.map((item, i) => (
                <motion.li key={item.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i + 0.1 }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setOpen(false)
                      setTimeout(() => scrollToId(item.id), 260)
                    }}
                    className="display flex items-center justify-between border-b border-hair py-5 text-4xl"
                  >
                    {item.label}
                    <ArrowUpRight className="h-6 w-6 text-azure" aria-hidden="true" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
