import { useEffect, useRef, useCallback } from 'react'

interface DotGridProps {
    className?: string
    /** Spacing between dots in pixels */
    gap?: number
    /** Base radius of each dot */
    dotRadius?: number
    /** Color of the dots (CSS color string) */
    dotColor?: string
    /** How far the mouse influence reaches */
    influenceRadius?: number
    /** How strongly dots are pushed away */
    pushStrength?: number
}

interface Dot {
    /** Original grid x */
    ox: number
    /** Original grid y */
    oy: number
    /** Current rendered x */
    x: number
    /** Current rendered y */
    y: number
}

const DotGrid: React.FC<DotGridProps> = ({
    className = '',
    gap = 24,
    dotRadius = 1,
    dotColor = 'rgba(255,255,255,0.15)',
    influenceRadius = 120,
    pushStrength = 40,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const dotsRef = useRef<Dot[]>([])
    const mouseRef = useRef({ x: -9999, y: -9999 })
    const rafRef = useRef<number>(0)
    const sizeRef = useRef({ w: 0, h: 0 })

    /* Build the dot grid */
    const buildGrid = useCallback(() => {
        const { w, h } = sizeRef.current
        const dots: Dot[] = []
        const cols = Math.ceil(w / gap) + 1
        const rows = Math.ceil(h / gap) + 1
        // Centre the grid
        const offsetX = (w - (cols - 1) * gap) / 2
        const offsetY = (h - (rows - 1) * gap) / 2
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const ox = offsetX + c * gap
                const oy = offsetY + r * gap
                dots.push({ ox, oy, x: ox, y: oy })
            }
        }
        dotsRef.current = dots
    }, [gap])

    /* Animation loop */
    const animate = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const { w, h } = sizeRef.current
        ctx.clearRect(0, 0, w, h)

        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const ir2 = influenceRadius * influenceRadius
        const lerp = 0.12 // spring-like return speed

        ctx.fillStyle = dotColor

        for (const dot of dotsRef.current) {
            const dx = dot.ox - mx
            const dy = dot.oy - my
            const dist2 = dx * dx + dy * dy

            if (dist2 < ir2 && dist2 > 0) {
                const dist = Math.sqrt(dist2)
                const factor = 1 - dist / influenceRadius
                // Eased push: stronger when closer
                const push = factor * factor * pushStrength
                const nx = dx / dist
                const ny = dy / dist
                // Target is pushed position
                const tx = dot.ox + nx * push
                const ty = dot.oy + ny * push
                dot.x += (tx - dot.x) * 0.3
                dot.y += (ty - dot.y) * 0.3
            } else {
                // Return to original position
                dot.x += (dot.ox - dot.x) * lerp
                dot.y += (dot.oy - dot.y) * lerp
            }

            ctx.beginPath()
            ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2)
            ctx.fill()
        }

        rafRef.current = requestAnimationFrame(animate)
    }, [dotColor, dotRadius, influenceRadius, pushStrength])

    /* Resize handler */
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                const dpr = window.devicePixelRatio || 1
                canvas.width = width * dpr
                canvas.height = height * dpr
                canvas.style.width = `${width}px`
                canvas.style.height = `${height}px`
                const ctx = canvas.getContext('2d')
                if (ctx) ctx.scale(dpr, dpr)
                sizeRef.current = { w: width, h: height }
                buildGrid()
            }
        })

        resizeObserver.observe(canvas.parentElement || canvas)
        return () => resizeObserver.disconnect()
    }, [buildGrid])

    /* Start animation loop */
    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(rafRef.current)
    }, [animate])

    /* Mouse tracking */
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const parent = canvas.parentElement || canvas
        const handleMouseMove = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect()
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }
        const handleMouseLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 }
        }

        parent.addEventListener('mousemove', handleMouseMove)
        parent.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            parent.removeEventListener('mousemove', handleMouseMove)
            parent.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ pointerEvents: 'all' }}
        />
    )
}

export default DotGrid
