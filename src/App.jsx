import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import useLenis from './lib/useLenis.js'
import CustomCursor from './components/ui/CustomCursor.jsx'
import LoadingScreen from './components/ui/LoadingScreen.jsx'
import FloatingDecor from './components/ui/FloatingDecor.jsx'
import FloatingNav from './components/layout/FloatingNav.jsx'
import MusicPlayer from './components/layout/MusicPlayer.jsx'
import Footer from './components/layout/Footer.jsx'
import PageTransition from './components/layout/PageTransition.jsx'

import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Experience from './pages/Experience.jsx'
import Certificates from './pages/Certificates.jsx'
import Gallery from './pages/Gallery.jsx'
import Hobbies from './pages/Hobbies.jsx'
import Music from './pages/Music.jsx'
import BookShelf from './pages/BookShelf.jsx'
import Supporters from './pages/Supporters.jsx'
import CommunityScrapbook from './pages/CommunityScrapbook.jsx'
import Guestbook from './pages/Guestbook.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useLenis()

  useEffect(() => {
    let raf
    const start = performance.now()
    function tick(now) {
      const elapsed = now - start
      const pct = Math.min(100, (elapsed / 1600) * 100)
      setProgress(pct)
      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setLoading(false), 250)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
  }, [loading])

  return (
    <div className="relative min-h-screen bg-cream">
      <LoadingScreen visible={loading} progress={progress} />
      <CustomCursor />
      <FloatingDecor />
      <FloatingNav />
      <MusicPlayer />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/experience" element={<PageTransition><Experience /></PageTransition>} />
            <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/hobbies" element={<PageTransition><Hobbies /></PageTransition>} />
            <Route path="/music" element={<PageTransition><Music /></PageTransition>} />
            <Route path="/books" element={<PageTransition><BookShelf /></PageTransition>} />
            <Route path="/supporters" element={<PageTransition><Supporters /></PageTransition>} />
            <Route path="/community" element={<PageTransition><CommunityScrapbook /></PageTransition>} />
            <Route path="/guestbook" element={<PageTransition><Guestbook /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            
          </Routes>
        </AnimatePresence>
        <Footer />
      </main>
    </div>
  )
}
