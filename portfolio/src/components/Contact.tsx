import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useCallback, memo } from 'react'

/* ═══════════════════════════════════════════════════════════════════
   PARTICLE DATA MODEL (from ParticleHero)
   ═══════════════════════════════════════════════════════════════════ */

interface Particle {
    x: number
    y: number
    gridX: number
    gridY: number
    targetX: number
    targetY: number
    vx: number
    vy: number
    radius: number
    targetRadius: number
    r: number
    g: number
    b: number
    targetR: number
    targetG: number
    targetB: number
    alpha: number
    targetAlpha: number
    isActive: boolean
}

const GRID_SPACING = 40
const IDLE_RADIUS = 1.5
const ACTIVE_RADIUS = 2.5
const IDLE_COLOR = { r: 255, g: 245, b: 230, a: 0.6 }
const ACTIVE_COLOR = { r: 255, g: 248, b: 235, a: 1.0 }
const TENSION = 0.08
const FRICTION = 0.75
const REPEL_RADIUS = 80
const REPEL_FORCE = 12
const COLOR_LERP = 0.06
const SIZE_LERP = 0.08
const ALPHA_LERP = 0.06

/* ═══════════════════════════════════════════════════════════════════
   SHAPE GENERATION — Curly braces via off-screen canvas sampling
   ═══════════════════════════════════════════════════════════════════ */

function generateBraceCoords(
    width: number,
    height: number
): { x: number; y: number }[] {
    const offCanvas = document.createElement('canvas')
    offCanvas.width = width
    offCanvas.height = height
    const ctx = offCanvas.getContext('2d')
    if (!ctx) return []

    const fontSize = Math.floor(height * 0.75)
    ctx.font = `bold ${fontSize}px Georgia, "Times New Roman", serif`
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Wider bracket placement to give content more room inside
    ctx.fillText('{', width * 0.18, height * 0.5)
    ctx.fillText('}', width * 0.82, height * 0.5)

    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    const coords: { x: number; y: number }[] = []

    const sampleStep = Math.max(2, Math.floor(Math.min(width, height) / 400))
    for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
            const idx = (y * width + x) * 4
            if (data[idx + 3] > 128) {
                coords.push({ x, y })
            }
        }
    }

    for (let i = coords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[coords[i], coords[j]] = [coords[j], coords[i]]
    }

    return coords
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT LINK DATA
   ═══════════════════════════════════════════════════════════════════ */

interface ContactLink {
    label: string
    value: string
    href: string
    icon: React.ReactNode
}

const contactLinks: ContactLink[] = [
    {
        label: 'Email',
        value: 'devanshbhel@gmail.com',
        href: 'mailto:devanshbhel@gmail.com',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        value: 'github.com/DevanshBehl',
        href: 'https://github.com/DevanshBehl',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
                <path d="M12 19v3" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/devansh-behl',
        href: 'https://linkedin.com/in/devansh-behl',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        value: '@devansh_behl_',
        href: 'https://instagram.com/devansh_behl_',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
        ),
    },
]

/* ═══════════════════════════════════════════════════════════════════
   OVERLAY CONTENT — Contact info displayed over the canvas
   ═══════════════════════════════════════════════════════════════════ */

const ContactOverlay = memo(
    ({
        onHoverIn,
        onHoverOut,
        isInView,
    }: {
        onHoverIn: () => void
        onHoverOut: () => void
        isInView: boolean
    }) => {
        return (
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    pointerEvents: 'none',
                    padding: '4rem 2rem',
                }}
                onMouseEnter={onHoverIn}
                onMouseLeave={onHoverOut}
            >
                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                    style={{ pointerEvents: 'auto' }}
                >
                    Contact
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 leading-tight text-center"
                    style={{ pointerEvents: 'auto', cursor: 'default' }}
                >
                    Let's Build Something
                </motion.h2>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight text-center"
                    style={{ pointerEvents: 'auto', cursor: 'default' }}
                >
                    Scalable.
                </motion.h2>

                {/* Availability */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[#777] text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed text-center"
                    style={{ pointerEvents: 'auto' }}
                >
                    Currently available for freelance work and full-time opportunities.
                    Reach out and let's discuss your next project.
                </motion.p>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-[1px] bg-[#333] mb-8"
                />

                {/* Contact links */}
                <div className="space-y-3 flex flex-col items-center w-full" style={{ pointerEvents: 'auto' }}>
                    {contactLinks.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="block relative p-[1px] rounded-xl bg-gradient-to-b from-[#1a1a1a] to-transparent w-full max-w-md group overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#444] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                            <div className="flex items-center justify-between gap-4 px-6 py-3.5 rounded-[10px] bg-[#080808]/80 backdrop-blur-md transition-colors duration-300 group-hover:bg-[#0a0a0a]/90 w-full relative z-10">
                                <span className="text-[#444] text-sm group-hover:text-[#888] transition-colors duration-300 flex items-center justify-center w-6">
                                    {link.icon}
                                </span>
                                <div className="flex-1 flex items-center gap-4">
                                    <span className="text-[#555] text-xs font-mono tracking-widest uppercase w-20 text-left shrink-0">
                                        {link.label}
                                    </span>
                                    <span className="text-[#a1a1a1] text-sm font-medium group-hover:text-white transition-colors duration-300 flex-1 text-left truncate">
                                        {link.value}
                                    </span>
                                </div>
                                <span className="text-[#333] group-hover:text-white transition-colors duration-300">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        )
    }
)

/* ═══════════════════════════════════════════════════════════════════
   CONTACT SECTION — Particle canvas with curly brace morphing
   ═══════════════════════════════════════════════════════════════════ */

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: -9999, y: -9999 })
    const animFrameRef = useRef<number>(0)
    const braceCoordsRef = useRef<{ x: number; y: number }[]>([])
    const isMorphedRef = useRef(false)
    const dimensionsRef = useRef({ w: 0, h: 0 })

    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

    const initGrid = useCallback((w: number, h: number) => {
        const cols = Math.floor(w / GRID_SPACING)
        const rows = Math.floor(h / GRID_SPACING)
        const offsetX = (w - (cols - 1) * GRID_SPACING) / 2
        const offsetY = (h - (rows - 1) * GRID_SPACING) / 2
        const particles: Particle[] = []

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const gx = offsetX + col * GRID_SPACING
                const gy = offsetY + row * GRID_SPACING
                particles.push({
                    x: gx, y: gy,
                    gridX: gx, gridY: gy,
                    targetX: gx, targetY: gy,
                    vx: 0, vy: 0,
                    radius: IDLE_RADIUS, targetRadius: IDLE_RADIUS,
                    r: IDLE_COLOR.r, g: IDLE_COLOR.g, b: IDLE_COLOR.b, alpha: IDLE_COLOR.a,
                    targetR: IDLE_COLOR.r, targetG: IDLE_COLOR.g, targetB: IDLE_COLOR.b, targetAlpha: IDLE_COLOR.a,
                    isActive: false,
                })
            }
        }

        particlesRef.current = particles
        dimensionsRef.current = { w, h }
        braceCoordsRef.current = generateBraceCoords(w, h)
    }, [])

    const morphToBraces = useCallback(() => {
        if (isMorphedRef.current) return
        isMorphedRef.current = true

        const particles = particlesRef.current
        const braceCoords = braceCoordsRef.current
        if (!braceCoords.length) return

        const numActive = Math.min(braceCoords.length, particles.length)

        for (const p of particles) {
            p.targetX = p.gridX
            p.targetY = p.gridY
            p.targetRadius = IDLE_RADIUS
            p.targetR = IDLE_COLOR.r
            p.targetG = IDLE_COLOR.g
            p.targetB = IDLE_COLOR.b
            p.targetAlpha = IDLE_COLOR.a
            p.isActive = false
        }

        const used = new Set<number>()
        for (let i = 0; i < numActive; i++) {
            const target = braceCoords[i]
            let bestIdx = -1
            let bestDist = Infinity

            for (let j = 0; j < particles.length; j++) {
                if (used.has(j)) continue
                const dx = particles[j].gridX - target.x
                const dy = particles[j].gridY - target.y
                const dist = dx * dx + dy * dy
                if (dist < bestDist) {
                    bestDist = dist
                    bestIdx = j
                }
            }

            if (bestIdx >= 0) {
                used.add(bestIdx)
                const p = particles[bestIdx]
                p.targetX = target.x
                p.targetY = target.y
                p.targetRadius = ACTIVE_RADIUS
                p.targetR = ACTIVE_COLOR.r
                p.targetG = ACTIVE_COLOR.g
                p.targetB = ACTIVE_COLOR.b
                p.targetAlpha = ACTIVE_COLOR.a
                p.isActive = true
            }
        }
    }, [])

    const returnToGrid = useCallback(() => {
        if (!isMorphedRef.current) return
        isMorphedRef.current = false

        for (const p of particlesRef.current) {
            p.targetX = p.gridX
            p.targetY = p.gridY
            p.targetRadius = IDLE_RADIUS
            p.targetR = IDLE_COLOR.r
            p.targetG = IDLE_COLOR.g
            p.targetB = IDLE_COLOR.b
            p.targetAlpha = IDLE_COLOR.a
            p.isActive = false
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        const setCanvasSize = () => {
            const rect = container.getBoundingClientRect()
            const w = rect.width
            const h = rect.height
            const dpr = window.devicePixelRatio || 1
            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            initGrid(w, h)
        }

        setCanvasSize()

        const resizeObserver = new ResizeObserver(() => {
            setCanvasSize()
            if (isMorphedRef.current) {
                isMorphedRef.current = false
                morphToBraces()
            }
        })
        resizeObserver.observe(container)

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }
        const handleMouseLeave = () => {
            mouseRef.current.x = -9999
            mouseRef.current.y = -9999
        }

        container.addEventListener('mousemove', handleMouseMove, { passive: true })
        container.addEventListener('mouseleave', handleMouseLeave, { passive: true })

        const animate = () => {
            const particles = particlesRef.current
            const { w, h } = dimensionsRef.current
            const mx = mouseRef.current.x
            const my = mouseRef.current.y

            ctx.clearRect(0, 0, w, h)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                const forceX = (p.targetX - p.x) * TENSION
                const forceY = (p.targetY - p.y) * TENSION
                p.vx = (p.vx + forceX) * FRICTION
                p.vy = (p.vy + forceY) * FRICTION
                p.x += p.vx
                p.y += p.vy

                const dx = mx - p.x
                const dy = my - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < REPEL_RADIUS && dist > 0) {
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
                    p.x -= (dx / dist) * force * REPEL_FORCE
                    p.y -= (dy / dist) * force * REPEL_FORCE
                }

                p.r += (p.targetR - p.r) * COLOR_LERP
                p.g += (p.targetG - p.g) * COLOR_LERP
                p.b += (p.targetB - p.b) * COLOR_LERP
                p.alpha += (p.targetAlpha - p.alpha) * ALPHA_LERP
                p.radius += (p.targetRadius - p.radius) * SIZE_LERP

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.r | 0},${p.g | 0},${p.b | 0},${p.alpha.toFixed(2)})`
                ctx.fill()
            }

            animFrameRef.current = requestAnimationFrame(animate)
        }

        animFrameRef.current = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animFrameRef.current)
            resizeObserver.disconnect()
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [initGrid, morphToBraces])

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative bg-[#050505]"
        >
            {/* Particle canvas container */}
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    minHeight: '700px',
                    overflow: 'hidden',
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        display: 'block',
                    }}
                />

                {/* Contact content overlaid inside the brackets */}
                <ContactOverlay
                    onHoverIn={morphToBraces}
                    onHoverOut={returnToGrid}
                    isInView={isInView}
                />
            </div>
        </section>
    )
}

export default Contact
