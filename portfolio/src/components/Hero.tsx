import { motion } from 'framer-motion'
import type { Easing } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight-new'
import { Scales } from '@/components/ui/scales'
import React, { useCallback, useRef, useEffect, memo } from 'react'

const ease: Easing = [0.16, 1, 0.3, 1]

/* ═══════════════════════════════════════════════════════════════════
   NEBULA CLOUD — dual-layer SVG blob background (Huly.io-style)
   ═══════════════════════════════════════════════════════════════════ */

const NebulaCloud = memo(() => {
    return (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
            {/* ── Primary blob (large) ── */}
            <svg
                width="900"
                height="500"
                viewBox="0 0 900 500"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    mixBlendMode: 'screen',
                    opacity: 0.82,
                    position: 'absolute',
                    left: '50%',
                    top: '20%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    animation: 'nebula-pulse 18s ease-in-out infinite, nebula-drift 26s ease-in-out infinite',
                }}
            >
                <defs>
                    <radialGradient id="nebula1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(210,185,255,0.55)" />
                        <stop offset="30%" stopColor="rgba(150,100,255,0.38)" />
                        <stop offset="60%" stopColor="rgba(80,45,200,0.18)" />
                        <stop offset="85%" stopColor="rgba(40,15,120,0.07)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    <filter id="f1">
                        <feGaussianBlur stdDeviation="45 30" />
                    </filter>
                </defs>
                <ellipse cx="50%" cy="50%" rx="42%" ry="38%" fill="url(#nebula1)" filter="url(#f1)" />
            </svg>

            {/* ── Secondary blob (accent, cooler) ── */}
            <svg
                width="500"
                height="280"
                viewBox="0 0 500 280"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    mixBlendMode: 'lighten',
                    opacity: 0.65,
                    position: 'absolute',
                    left: '58%',
                    top: '35%',
                    pointerEvents: 'none',
                    animation: 'nebula-pulse-2 14s ease-in-out infinite 3s',
                }}
            >
                <defs>
                    <radialGradient id="nebula2" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="rgba(140,100,255,0.35)" />
                        <stop offset="40%" stopColor="rgba(100,60,220,0.20)" />
                        <stop offset="70%" stopColor="rgba(50,20,160,0.10)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                    <filter id="f2">
                        <feGaussianBlur stdDeviation="28 20" />
                    </filter>
                </defs>
                <ellipse cx="50%" cy="50%" rx="42%" ry="38%" fill="url(#nebula2)" filter="url(#f2)" />
            </svg>
        </div>
    )
})

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM LAYER GRID
   ═══════════════════════════════════════════════════════════════════ */
// add comments
const gridItems = [
    { title: "Frontend Architecture", code: "const render = () => <UI />;", position: "col-start-3 row-start-1" },
    { title: "Backend Systems", code: "app.listen(8080, () => log('Ready'));", position: "col-start-4 row-start-1" },
    { title: "Web3 Protocols", code: "contract.methods.mint().send();", position: "col-start-3 row-start-2" },
    { title: "DevOps & Cloud", code: "docker build -t app . && kubectl apply", position: "col-start-4 row-start-2" },
    { title: "Smart Contracts", code: "pragma solidity ^0.8.0;", position: "col-start-2 row-start-3" },
    { title: "System Design", code: "class LoadBalancer { ... }", position: "col-start-3 row-start-3" },
    { title: "Database Architecture", code: "SELECT * FROM users WHERE active = 1;", position: "col-start-4 row-start-3" },
    { title: "CI/CD Pipelines", code: "on: push:\n  branches: [main]", position: "col-start-3 row-start-4" },
];

const BottomLayerGrid = memo(() => {
    return (
        <div className="w-full h-full max-w-6xl mx-auto p-12 grid grid-cols-4 grid-rows-4 gap-x-12 gap-y-16 items-center">
            {gridItems.map((item, idx) => (
                <div key={idx} className={`p-6 border border-[#222] bg-[#0a0a0a] rounded-xl shadow-2xl ${item.position}`}>
                    <h3 className="text-[#888] text-sm tracking-wider uppercase font-semibold mb-4">{item.title}</h3>
                    <div className="bg-[#111] p-4 rounded-md border border-[#333]">
                        <code className="text-[#fdfbf7] font-mono text-xs break-words block whitespace-pre-wrap">
                            {item.code}
                        </code>
                    </div>
                </div>
            ))}
        </div>
    )
})

/* ═══════════════════════════════════════════════════════════════════
   FLOWING LIGHT BEAM — Many thin beams concentrated into one laser
   ═══════════════════════════════════════════════════════════════════ */

const BEAM_COUNT = 80

// Pre-compute beam positions — Gaussian-like distribution centered at 0
// More beams clustered at center, fewer toward edges
const beamConfigs = Array.from({ length: BEAM_COUNT }).map((_, i) => {
    // Distribute beams in a bell-curve: center-heavy, edge-sparse
    const t = (i / (BEAM_COUNT - 1)) * 2 - 1 // -1 to 1
    const offset = Math.sign(t) * Math.pow(Math.abs(t), 0.6) * 40 // ±40px from center, clustered
    const duration = 6 + (i % 7) * 1.2 // 6s to ~14s variations
    const delay = (i * 0.3) % 8 // stagger up to 8s then wrap
    const opacity = 1 - Math.abs(t) * 0.5 // center beams brighter

    return { offset, duration, delay, opacity }
})

const FlowingLightBeam = memo(() => {
    return (
        <div
            className="absolute bottom-[100%] left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
                width: '100vw',
                maxWidth: '80rem',
                height: '200vh',
                overflow: 'hidden',
                zIndex: 10,
            }}
        >
            {/* Atmospheric purple haze behind */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 30% 60% at 50% 50%, rgba(200,190,240,0.1) 0%, transparent 70%)',
                }}
            />

            {/* Beam container — all beams centered */}
            <div
                className="absolute inset-0"
                style={{ mixBlendMode: 'screen' }}
            >
                {beamConfigs.map((cfg, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            marginLeft: `${cfg.offset}px`,
                            top: 0,
                            width: '4px',
                            height: '100%',
                            animation: `beam-fall ${cfg.duration}s linear ${cfg.delay}s infinite both`,
                        }}
                    >
                        {/* Glow halo behind core */}
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                top: 0,
                                width: '40px',
                                height: '100%',
                                background: `linear-gradient(to bottom, transparent 0%, rgba(230,225,255,${0.04 * cfg.opacity}) 20%, rgba(240,235,255,${0.08 * cfg.opacity}) 50%, rgba(230,225,255,${0.04 * cfg.opacity}) 80%, transparent 100%)`,
                                filter: 'blur(12px)',
                                borderRadius: '50%',
                            }}
                        />
                        {/* Core beam — razor thin */}
                        <div
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                width: '100%',
                                height: '100%',
                                clipPath: 'polygon(48% 0, 52% 0, 58% 100%, 42% 100%)',
                                background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(248,245,255,${0.4 * cfg.opacity}) 10%, rgba(255,255,255,${0.95 * cfg.opacity}) 35%, rgba(245,240,255,${0.9 * cfg.opacity}) 50%, rgba(255,255,255,${0.95 * cfg.opacity}) 65%, rgba(248,245,255,${0.4 * cfg.opacity}) 90%, rgba(255,255,255,0) 100%)`,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Bottom convergence glow */}
            <div
                className="absolute bottom-0 left-1/2 pointer-events-none"
                style={{
                    width: '30rem',
                    height: '16rem',
                    transform: 'translate(-50%, 30%)',
                    background: 'radial-gradient(ellipse 55% 50% at 50% 20%, rgba(220,210,255,0.15) 0%, rgba(200,190,240,0.05) 40%, transparent 70%)',
                }}
            />
        </div>
    )
})



/* ═══════════════════════════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const maskRef = useRef<HTMLDivElement>(null)
    const rafPending = useRef(false)
    const rectCache = useRef<DOMRect | null>(null)
    const maskActive = useRef(false)

    // Cache bounding rect — recalculate only on resize / scroll, not every frame
    useEffect(() => {
        const updateRect = () => {
            if (sectionRef.current) {
                rectCache.current = sectionRef.current.getBoundingClientRect()
            }
        }
        updateRect()
        window.addEventListener('resize', updateRect, { passive: true })
        window.addEventListener('scroll', updateRect, { passive: true })
        return () => {
            window.removeEventListener('resize', updateRect)
            window.removeEventListener('scroll', updateRect)
        }
    }, [])

    // Direct DOM manipulation — NO React state, NO re-renders
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (rafPending.current) return
        const clientX = e.clientX
        const clientY = e.clientY
        rafPending.current = true
        requestAnimationFrame(() => {
            rafPending.current = false
            const mask = maskRef.current
            if (!mask) return
            const rect = rectCache.current || sectionRef.current?.getBoundingClientRect()
            if (!rect) return
            const x = clientX - rect.left
            const y = clientY - rect.top
            const halfW = window.innerWidth / 2

            if (x > halfW) {
                // Right half — punch a hole
                const grad = `radial-gradient(circle 350px at ${x}px ${y}px, transparent 0%, transparent 20%, black 70%, black 100%)`
                mask.style.maskImage = grad
                mask.style.webkitMaskImage = grad
                if (!maskActive.current) {
                    mask.style.transition = 'none'
                    maskActive.current = true
                }
            } else if (maskActive.current) {
                // Left half — restore, only if previously active
                mask.style.transition = 'mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out'
                mask.style.maskImage = ''
                mask.style.webkitMaskImage = ''
                maskActive.current = false
            }
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        const mask = maskRef.current
        if (!mask || !maskActive.current) return
        mask.style.transition = 'mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out'
        mask.style.maskImage = ''
        mask.style.webkitMaskImage = ''
        maskActive.current = false
    }, [])

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-[160vh] w-full bg-[#050505] overflow-hidden flex flex-col pt-[22vh]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ═══════════════════════════════════════════════════════
                BOTTOM LAYER — Underlying Grid with scattered code blocks
                ═══════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 z-0 overflow-hidden pt-20">
                <BottomLayerGrid />
            </div>

            {/* ═══════════════════════════════════════════════════════
                TOP LAYER — Black mask overlay (no children = cheap repaint)
                ═══════════════════════════════════════════════════════ */}
            <div
                ref={maskRef}
                className="absolute inset-0 z-10 bg-black pointer-events-none"
                style={{ contain: 'strict' }}
            />

            {/* ═══════════════════════════════════════════════════════
                SPOTLIGHT — own compositing layer, NOT inside mask div
                ═══════════════════════════════════════════════════════ */}
            <div className="absolute inset-0 z-[11] pointer-events-none">
                <Spotlight
                    gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, .08) 0, hsla(0, 0%, 80%, .02) 50%, hsla(0, 0%, 60%, 0) 80%)"
                    gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .06) 0, hsla(0, 0%, 80%, .02) 80%, transparent 100%)"
                    gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .04) 0, hsla(0, 0%, 60%, .02) 80%, transparent 100%)"
                    translateY={-350}
                    width={560}
                    height={1380}
                    smallWidth={240}
                    duration={7}
                    xOffset={100}
                />
            </div>

            {/* ═══════════════════════════════════════════════════════
                NEBULA CLOUD LAYER — z-5, below laser beams, above black bg
                ═══════════════════════════════════════════════════════ */}
            <NebulaCloud />

            {/* ═══════════════════════════════════════════════════════
                TEXT CONTENT LAYER — Always visible
                ═══════════════════════════════════════════════════════ */}
            <div
                className="relative z-20 max-w-5xl w-full text-left pointer-events-auto px-10 sm:px-16 lg:px-24 mb-16"
            >
                {/* Role tag */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="text-[#888888] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6 sm:mb-8"
                >
                    Full Stack Developer · Web3 Developer · DevOps Engineer
                </motion.p>

                {/* Name */}
                <div className="overflow-hidden mb-2 sm:mb-3">
                    <motion.h1
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.4, ease }}
                        className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter text-white leading-[0.9]"
                    >
                        Devansh
                    </motion.h1>
                </div>
                <div className="overflow-hidden mb-6 sm:mb-8">
                    <motion.h1
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 0.55, ease }}
                        className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter text-white leading-[0.9]"
                    >
                        Behl
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8, ease }}
                    className="text-lg sm:text-xl lg:text-2xl text-[#a1a1a1] font-normal max-w-2xl mb-4 leading-relaxed"
                >
                    Full Stack &amp; Web3 Engineer building scalable systems.
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.95, ease }}
                    className="text-sm sm:text-base text-[#888888] font-normal max-w-xl mb-10 sm:mb-12 leading-relaxed"
                >
                    I design and build high-performance web applications, decentralized
                    systems, and production-grade cloud infrastructure.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.1, ease }}
                    className="flex flex-col sm:flex-row items-start justify-start gap-4"
                >
                    <motion.a
                        href="#projects"
                        whileHover={{ scale: 1.04, borderColor: '#555555' }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="px-8 py-3.5 border border-[#333333] text-white text-sm font-medium tracking-wide rounded-full inline-flex items-center gap-2 transition-colors duration-300 hover:bg-[#111111]"
                    >
                        View Projects
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.a>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="px-8 py-3.5 bg-white text-black text-sm font-medium tracking-wide rounded-full transition-colors duration-300 hover:bg-[#e0e0e0]"
                    >
                        Contact Me
                    </motion.a>
                </motion.div>
            </div>

            {/* Container for the About text and Canvas — Normal flow prevents overlapping */}
            <div className="z-30 relative w-full mt-16 sm:mt-24 lg:mt-32 mb-32 lg:min-h-[28rem] pointer-events-auto flex flex-col lg:block items-center">

                {/* About Text Layout — Aligned Left perfectly to match the main Name text */}
                <div className="w-full max-w-5xl px-10 sm:px-16 lg:px-24 mb-12 lg:mb-0 lg:absolute lg:left-0 lg:top-0 h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                    <div className="flex flex-col max-w-[90vw] sm:max-w-lg text-white drop-shadow-md">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-[#fdfbf7] drop-shadow-lg">
                            Systems-oriented engineer.
                        </h2>
                        <div className="h-[2px] w-12 lg:w-16 bg-[#fdfbf7] mb-6 shadow-[0_0_10px_rgba(253,251,247,0.5)] mx-auto lg:mx-0" />
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 lg:mb-8 font-medium">
                            I am a systems-oriented full stack developer specializing in
                            scalable backend architecture, modern frontend engineering, and
                            decentralized application development. I focus on performance,
                            clean abstractions, and production-ready infrastructure.
                        </p>
                        <div className="flex flex-col gap-3">
                            {[
                                'Clean, maintainable architecture',
                                'Distributed systems & event-driven design',
                                'DevOps & cloud-native infrastructure',
                                'Web3 & blockchain development',
                                'Performance-first mindset'
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3 justify-center lg:justify-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#fdfbf7] shadow-[0_0_8px_rgba(253,251,247,0.8)]" />
                                    <span className="text-gray-200 text-sm sm:text-base font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pixelated Canvas Layout & Laser Beam — Centered on Mobile, right-aligned (80%) on Desktop */}
                <div className="relative lg:absolute lg:left-[80%] lg:-translate-x-1/2 lg:top-0">
                    <FlowingLightBeam />
                    <div className="w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] rounded-xl shrink-0 border border-white/10 shadow-[0_0_80px_10px_rgba(253,251,247,0.15)] bg-[radial-gradient(ellipse_at_top,_rgba(253,251,247,0.3)_0%,_rgba(253,251,247,0.05)_50%,_rgba(0,0,0,0.6)_100%)] relative z-10 overflow-hidden">
                        <Scales
                            orientation="diagonal"
                            size={12}
                            color="rgba(253,251,247,0.12)"
                            className="rounded-xl"
                        />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto"
            >
                <span className="text-[#555555] text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[1px] h-8 bg-[#888888]"
                />
            </motion.div>
        </section>
    )
}

export default Hero
