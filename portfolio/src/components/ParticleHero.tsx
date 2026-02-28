import { useRef, useEffect, useCallback, memo } from 'react'

/* ═══════════════════════════════════════════════════════════════════
   PARTICLE DATA MODEL
   Every particle is a plain JS object — no React state to avoid re-renders
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

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */

const GRID_SPACING = 40
const IDLE_RADIUS = 1.5
const ACTIVE_RADIUS = 4.0

// Idle color: warm white luminous dots
const IDLE_COLOR = { r: 255, g: 245, b: 230, a: 0.6 }
// Active color: warm white luminous (brighter on morph)
const ACTIVE_COLOR = { r: 255, g: 248, b: 235, a: 1.0 }

// Spring physics constants
const TENSION = 0.08
const FRICTION = 0.75

// Mouse repulsion
const REPEL_RADIUS = 80
const REPEL_FORCE = 12

// Interpolation speeds
const COLOR_LERP = 0.06
const SIZE_LERP = 0.08
const ALPHA_LERP = 0.06

/* ═══════════════════════════════════════════════════════════════════
   SHAPE GENERATION — Curly braces { } via off-screen canvas sampling
   ═══════════════════════════════════════════════════════════════════ */

function generateBraceCoords(
    width: number,
    height: number
): { x: number; y: number }[] {
    // Create an off-screen canvas to render the braces
    const offCanvas = document.createElement('canvas')
    offCanvas.width = width
    offCanvas.height = height
    const ctx = offCanvas.getContext('2d')
    if (!ctx) return []

    // Draw { } centered on the off-screen canvas
    // Font size scales with canvas height (~85% of viewport height)
    const fontSize = Math.floor(height * 0.75)
    ctx.font = `bold ${fontSize}px Georgia, "Times New Roman", serif`
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // Draw left brace at ~30% and right brace at ~70%
    ctx.fillText('{', width * 0.3, height * 0.5)
    ctx.fillText('}', width * 0.7, height * 0.5)

    // Sample pixel data to find where the braces were drawn
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data
    const coords: { x: number; y: number }[] = []

    // Sample every 4th pixel in both dimensions to get ~800-1200 points
    const sampleStep = Math.max(4, Math.floor(Math.min(width, height) / 200))
    for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
            const idx = (y * width + x) * 4
            // Check alpha channel — if visible, it's part of the brace
            if (data[idx + 3] > 128) {
                coords.push({ x, y })
            }
        }
    }

    // Shuffle so particles map to random brace positions each time
    for (let i = coords.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[coords[i], coords[j]] = [coords[j], coords[i]]
    }

    return coords
}

/* ═══════════════════════════════════════════════════════════════════
   OVERLAY UI — positioned absolute over the canvas
   ═══════════════════════════════════════════════════════════════════ */

const OverlayUI = memo(
    ({
        onHoverIn,
        onHoverOut,
    }: {
        onHoverIn: () => void
        onHoverOut: () => void
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
                    fontFamily:
                        "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                }}
                onMouseLeave={onHoverOut}
            >
                {/* Pill badge */}
                <span
                    style={{
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 999,
                        padding: '6px 16px',
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.5)',
                        marginBottom: 24,
                        pointerEvents: 'auto',
                        letterSpacing: '0.02em',
                        backdropFilter: 'blur(8px)',
                        background: 'rgba(255,255,255,0.03)',
                    }}
                >
                    Full Stack · Web3 · DevOps
                </span>

                {/* "For Developers" — hover triggers morph */}
                <h2
                    onMouseEnter={onHoverIn}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 700,
                        color: '#f0f0f0',
                        margin: 0,
                        lineHeight: 1.1,
                        cursor: 'default',
                        pointerEvents: 'auto',
                        letterSpacing: '-0.02em',
                    }}
                >
                    Building the Future
                </h2>

                {/* Subtitle */}
                <h3
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.35)',
                        margin: '4px 0 0 0',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        pointerEvents: 'auto',
                    }}
                >
                    One system at a time
                </h3>

                {/* CTA Button */}
                <a
                    href="#projects"
                    style={{
                        marginTop: 40,
                        background: '#f0f0f0',
                        color: '#050505',
                        borderRadius: 999,
                        padding: '14px 40px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        pointerEvents: 'auto',
                        textDecoration: 'none',
                        letterSpacing: '0.01em',
                        transition: 'transform 0.2s ease, background 0.2s ease',
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = 'scale(1.04)')
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    Explore Projects
                </a>
            </div>
        )
    }
)

/* ═══════════════════════════════════════════════════════════════════
   PARTICLE HERO COMPONENT — Canvas-based particle grid with morphing
   ═══════════════════════════════════════════════════════════════════ */

const ParticleHero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const mouseRef = useRef({ x: -9999, y: -9999 })
    const animFrameRef = useRef<number>(0)
    const braceCoordsRef = useRef<{ x: number; y: number }[]>([])
    const isMorphedRef = useRef(false)
    const dimensionsRef = useRef({ w: 0, h: 0 })

    /* ─── Initialize the particle grid ─── */
    const initGrid = useCallback((w: number, h: number) => {
        const cols = Math.floor(w / GRID_SPACING)
        const rows = Math.floor(h / GRID_SPACING)
        // Offset to center the grid
        const offsetX = (w - (cols - 1) * GRID_SPACING) / 2
        const offsetY = (h - (rows - 1) * GRID_SPACING) / 2
        const particles: Particle[] = []

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const gx = offsetX + col * GRID_SPACING
                const gy = offsetY + row * GRID_SPACING
                particles.push({
                    x: gx,
                    y: gy,
                    gridX: gx,
                    gridY: gy,
                    targetX: gx,
                    targetY: gy,
                    vx: 0,
                    vy: 0,
                    radius: IDLE_RADIUS,
                    targetRadius: IDLE_RADIUS,
                    r: IDLE_COLOR.r,
                    g: IDLE_COLOR.g,
                    b: IDLE_COLOR.b,
                    alpha: IDLE_COLOR.a,
                    targetR: IDLE_COLOR.r,
                    targetG: IDLE_COLOR.g,
                    targetB: IDLE_COLOR.b,
                    targetAlpha: IDLE_COLOR.a,
                    isActive: false,
                })
            }
        }

        particlesRef.current = particles
        dimensionsRef.current = { w, h }

        // Pre-compute brace coordinates for this canvas size
        braceCoordsRef.current = generateBraceCoords(w, h)
    }, [])

    /* ─── Morph to curly braces (State B) ─── */
    const morphToBraces = useCallback(() => {
        if (isMorphedRef.current) return
        isMorphedRef.current = true

        const particles = particlesRef.current
        const braceCoords = braceCoordsRef.current
        if (!braceCoords.length) return

        // Assign brace positions to a subset of particles
        // Pick particles nearest to each brace coordinate for more natural motion
        const numActive = Math.min(braceCoords.length, particles.length)

        // Reset all particles first
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

        // For each brace coordinate, find the nearest available particle
        const used = new Set<number>()
        for (let i = 0; i < numActive; i++) {
            const target = braceCoords[i]
            let bestIdx = -1
            let bestDist = Infinity

            // Sample a subset of particles for performance (check every 1st)
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

    /* ─── Return to grid (State A) ─── */
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

    /* ─── Animation loop ─── */
    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        // Set initial canvas size
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

        // ResizeObserver for responsive canvas
        const resizeObserver = new ResizeObserver(() => {
            setCanvasSize()
            // Re-morph if currently morphed after resize
            if (isMorphedRef.current) {
                isMorphedRef.current = false
                morphToBraces()
            }
        })
        resizeObserver.observe(container)

        // Mouse tracking (relative to canvas)
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
        container.addEventListener('mouseleave', handleMouseLeave, {
            passive: true,
        })

        /* ─── MAIN RENDER LOOP ─── */
        const animate = () => {
            const particles = particlesRef.current
            const { w, h } = dimensionsRef.current
            const mx = mouseRef.current.x
            const my = mouseRef.current.y

            // Clear canvas
            ctx.clearRect(0, 0, w, h)

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i]

                /* ── SPRING PHYSICS ──
                 * Force pulls particle toward its target position.
                 * Velocity accumulates force and is damped by friction,
                 * creating an elastic "snap" to target with overshoot. */
                const forceX = (p.targetX - p.x) * TENSION
                const forceY = (p.targetY - p.y) * TENSION
                p.vx = (p.vx + forceX) * FRICTION
                p.vy = (p.vy + forceY) * FRICTION
                p.x += p.vx
                p.y += p.vy

                /* ── MOUSE REPULSION ──
                 * When the cursor is within repelRadius, push the particle
                 * away proportionally. The spring physics will pull it back,
                 * creating a magnetic tension effect. */
                const dx = mx - p.x
                const dy = my - p.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < REPEL_RADIUS && dist > 0) {
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS
                    p.x -= (dx / dist) * force * REPEL_FORCE
                    p.y -= (dy / dist) * force * REPEL_FORCE
                }

                /* ── COLOR INTERPOLATION ──
                 * Per-channel lerp toward the target color. This creates
                 * a smooth fade between idle gray and active blue. */
                p.r += (p.targetR - p.r) * COLOR_LERP
                p.g += (p.targetG - p.g) * COLOR_LERP
                p.b += (p.targetB - p.b) * COLOR_LERP
                p.alpha += (p.targetAlpha - p.alpha) * ALPHA_LERP

                /* ── SIZE INTERPOLATION ── */
                p.radius += (p.targetRadius - p.radius) * SIZE_LERP

                /* ── RENDER PARTICLE ── */
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${p.r | 0},${p.g | 0},${p.b | 0},${p.alpha.toFixed(2)})`
                ctx.fill()
            }

            animFrameRef.current = requestAnimationFrame(animate)
        }

        animFrameRef.current = requestAnimationFrame(animate)

        // Cleanup
        return () => {
            cancelAnimationFrame(animFrameRef.current)
            resizeObserver.disconnect()
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [initGrid, morphToBraces])

    return (
        <section
            id="particle-hero"
            ref={containerRef}
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                // background removed to let global gradient show through
            }}
        >
            {/* Canvas — full bleed, no pointer events (UI captures them) */}
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

            {/* Overlay UI with interactive text */}
            <OverlayUI onHoverIn={morphToBraces} onHoverOut={returnToGrid} />
        </section>
    )
}

export default ParticleHero
