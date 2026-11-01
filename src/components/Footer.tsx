import fkmLogo from '../assets/brand/fkm-design.webp'
import { navItems, profile } from '../data/profile'
import { anchorProps, scrollToId } from '../hooks/scroll'
import Sparkle from './Sparkle'

export default function Footer() {
  return (
    <footer className="border-t border-hair" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="gutter mx-auto max-w-7xl py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a {...anchorProps(item.id)} className="label flex items-center gap-2 transition-colors hover:text-ink">
                  <span className="h-1 w-1 rounded-full bg-muted/60" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 text-xs text-muted">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <button type="button" onClick={() => scrollToId('top')} className="group flex items-center gap-2 text-ink hover:text-azure-deep">
              <Sparkle className="h-4 w-4 transition-transform duration-700 group-hover:rotate-90" />
              Naar boven
            </button>
          </div>
        </div>

        {/* Maker van de website */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 border-t border-hair pb-14 pt-6 text-xs text-muted sm:flex-row sm:pb-0">
          <span>Website ontworpen en gemaakt door</span>
          <span className="rounded-xl bg-[#060606] px-3 py-1 shadow-soft">
            <img src={fkmLogo} alt="FKM Design" width={84} height={40} className="block h-10 w-auto" loading="lazy" />
          </span>
        </div>
      </div>
    </footer>
  )
}
