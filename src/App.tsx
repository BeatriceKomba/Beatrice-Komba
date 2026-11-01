import { MotionConfig } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Story from './components/Story'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import AvatarSection from './components/avatar/AvatarSection'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#inhoud"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Naar de inhoud
      </a>
      <ScrollProgress />
      <Header />
      <main id="inhoud">
        <Hero />
        <About />
        <AvatarSection />
        <Story />
        <Timeline />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
