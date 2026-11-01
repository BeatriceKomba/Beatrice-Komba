import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { scrollToId, useScrolledPast } from '../hooks/scroll'

export default function BackToTop() {
  const visible = useScrolledPast(700)
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToId('top')}
          aria-label="Terug naar boven"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          className="fixed z-40 grid h-12 w-12 place-items-center rounded-full border border-hair bg-ink text-paper shadow-[0_10px_30px_-10px_rgba(47,127,193,.35)] transition-colors hover:bg-azure-light"
          style={{
            right: 'max(1.25rem, env(safe-area-inset-right, 0px))',
            bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
