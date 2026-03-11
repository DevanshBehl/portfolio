import { useEffect } from 'react'
import Lenis from 'lenis'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'

/** Root application — assembles all portfolio sections */
const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <Router>
      <div className="min-h-screen text-white bg-[#050505] relative w-full overflow-hidden">
        {/* Global purple atmospheric gradient behind everything */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,80,220,0.12) 0%, rgba(20,10,40,0.05) 50%, transparent 100%)',
          }}
        />
        <div className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
