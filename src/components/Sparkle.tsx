/** Vierpuntige ster, zoals het glinster-accent in het voorbeeldontwerp. */
export default function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 0 C21 13 27 19 40 20 C27 21 21 27 20 40 C19 27 13 21 0 20 C13 19 19 13 20 0 Z" fill="currentColor" />
    </svg>
  )
}
