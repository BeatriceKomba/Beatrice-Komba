import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import figureUrl from '../../assets/figuur/figuur.webp'
import { Eyebrow } from '../Reveal'
import Sparkle from '../Sparkle'
import { BeatriceFigure } from './figure'

export default function AvatarSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    let figure: BeatriceFigure
    try {
      figure = new BeatriceFigure(canvas, figureUrl, Boolean(reduce), () => setReady(true), () => setFailed(true))
    } catch {
      setFailed(true)
      return
    }
    // Valt terug op de stilstaande illustratie als het niet op tijd laadt
    const timeout = window.setTimeout(() => {
      if (!figure.ready) setFailed(true)
    }, 20000)
    const onLost = () => setFailed(true)
    canvas.addEventListener('webglcontextlost', onLost)

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect()
      figure.resize(Math.max(1, width), Math.max(1, height))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    let visible = false
    let raf = 0
    const loop = () => {
      figure.render()
      if (visible) raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (visible && !was) raf = requestAnimationFrame(loop)
    })
    io.observe(wrap)

    return () => {
      window.clearTimeout(timeout)
      canvas.removeEventListener('webglcontextlost', onLost)
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      figure.dispose()
    }
  }, [reduce])

  return (
    <section id="figuur" aria-labelledby="figuur-titel" className="relative isolate overflow-hidden py-24 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-light/60 blur-[120px]" />
        <div className="absolute left-[18%] top-[30%] h-72 w-72 animate-drift rounded-full bg-lilac/70 blur-[90px]" />
        <div className="absolute right-[16%] top-[58%] h-72 w-72 animate-drift rounded-full bg-peach/70 blur-[90px] [animation-delay:-9s]" />
      </div>

      <div className="gutter mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-x-10">
        <div className="min-w-0 text-center lg:text-left">
          <Eyebrow className="justify-center lg:justify-start">Even voorstellen</Eyebrow>
          <motion.h2
            id="figuur-titel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="display mt-5 text-[clamp(2.6rem,6.5vw,5.2rem)]"
          >
            <span className="fade-text block">Zeg eens</span>
            <span className="fade-text block">hallo</span>
          </motion.h2>
        </div>

        <div ref={wrapRef} className="relative mx-auto h-[min(78vh,760px)] min-h-[480px] w-full max-w-[520px]">
          <Sparkle className="absolute left-[10%] top-[12%] h-7 w-7 animate-twinkle text-azure" />
          <Sparkle className="absolute bottom-[24%] right-[8%] h-5 w-5 animate-twinkle text-azure-deep [animation-delay:-2s]" />
          {failed ? (
            <img src={figureUrl} alt="Illustratie van Beatrice in een zwarte jurk" className="mx-auto h-full w-auto object-contain" />
          ) : (
            <motion.canvas
              ref={canvasRef}
              role="img"
              aria-label="Illustratie van Beatrice in een zwarte jurk, die knippert en glimlacht"
              initial={{ opacity: 0, y: 30 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            />
          )}
        </div>
      </div>
    </section>
  )
}
