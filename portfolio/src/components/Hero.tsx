import { motion } from 'framer-motion'
import type { Easing } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight-new'
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas'
import React, { useCallback, useRef, useState, memo } from 'react'

const ease: Easing = [0.16, 1, 0.3, 1]

/* ═══════════════════════════════════════════════════════════════════
   GASEOUS CLOUDS COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

const GaseousClouds = memo(() => {
    // Only render clouds after mounting to avoid hydration mismatch if any, 
    // though framer-motion handles it well. We just return the static markup here.
    return (
        <div className="absolute inset-0 pointer-events-none opacity-80" style={{ mixBlendMode: 'screen' }}>
            {/* Core Nebula 1 */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: '60vw', height: '60vh', top: '0%', left: '-10%',
                    background: 'radial-gradient(circle at center, rgba(30, 60, 140, 0.45) 0%, rgba(20, 40, 90, 0.15) 40%, transparent 70%)',
                    filter: 'blur(80px)',
                }}
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, 30, -50, 0],
                    scale: [1, 1.25, 0.9, 1],
                    opacity: [0.3, 0.5, 0.25, 0.3],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Core Nebula 2 (Purple hue) */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: '70vw', height: '70vh', bottom: '-20%', right: '-10%',
                    background: 'radial-gradient(circle at center, rgba(60, 30, 120, 0.35) 0%, rgba(40, 20, 80, 0.1) 45%, transparent 70%)',
                    filter: 'blur(100px)',
                }}
                animate={{
                    x: [0, -60, 40, 0],
                    y: [0, -40, 60, 0],
                    scale: [1, 0.85, 1.15, 1],
                    opacity: [0.25, 0.45, 0.2, 0.25],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Midground Cloud 1 (Teal/Cyan hue) */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: '45vw', height: '45vh', top: '30%', right: '20%',
                    background: 'radial-gradient(circle at center, rgba(20, 100, 120, 0.25) 0%, rgba(10, 50, 60, 0.05) 50%, transparent 80%)',
                    filter: 'blur(70px)',
                }}
                animate={{
                    x: [0, -40, 20, 0],
                    y: [0, 50, -30, 0],
                    scale: [1, 1.1, 0.95, 1],
                    opacity: [0.2, 0.35, 0.15, 0.2],
                }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Foreground Drifting Gas */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: '100vw', height: '40vh', top: '60%', left: '0%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(40, 70, 160, 0.15) 30%, rgba(50, 30, 100, 0.1) 70%, transparent 100%)',
                    filter: 'blur(60px)',
                    transform: 'rotate(-15deg)',
                }}
                animate={{
                    x: ['-20%', '20%', '-20%'],
                    y: ['-5%', '5%', '-5%'],
                    opacity: [0.15, 0.3, 0.15],
                }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    )
})

/* ═══════════════════════════════════════════════════════════════════
   BOTTOM LAYER GRID
   ═══════════════════════════════════════════════════════════════════ */

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
   LASER BEAM & APP WINDOW MOCKUP
   ═══════════════════════════════════════════════════════════════════ */

const photonParticles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 4, // 3 to 7 seconds (slower)
    offsetX: (Math.random() - 0.5) * 16, // scattered up to 8px from center
    size: 1 + Math.random() * 2, // 1px to 3px (smaller)
    opacity: 0.4 + Math.random() * 0.6,
}));

const LaserBeam = memo(() => {
    return (
        <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 w-[100vw] max-w-7xl h-[200vh] pointer-events-none z-10 flex flex-col items-center justify-start overflow-visible">
            {/* The primary vertical laser line */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "100%", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-[4px] bg-[#fdfbf7] shadow-[0_0_30px_10px_rgba(253,251,247,0.6)] origin-top"
                style={{
                    background: "linear-gradient(to bottom, transparent, rgba(253,251,247,0.8) 20%, rgba(253,251,247,1) 80%, rgba(255,255,255,1))"
                }}
            />

            {/* Photon Particles Traveling Downwards */}
            {photonParticles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute top-0 rounded-full bg-[#fdfbf7]"
                    style={{
                        width: p.size,
                        height: p.size, // Perfect spheres
                        left: `calc(50% + ${p.offsetX}px)`,
                        boxShadow: "0 0 6px 1px rgba(253,251,247, 0.8)",
                    }}
                    animate={{
                        y: ["0vh", "150vh"],
                        opacity: [0, p.opacity, p.opacity, p.opacity, 0],
                        scale: [0.5, 1, 1, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* The warm radial flare centered perfectly behind the canvas */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="w-[100vw] sm:w-[50rem] h-[30rem] sm:h-[50rem] absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                    transform: "translateY(calc(50% + 10rem))",
                    // @ts-ignore - for responsive styling if needed, though we'll just use a solid calc for now that roughly fits both
                    "@media (min-width: 640px)": { transform: "translateY(calc(50% + 14rem))" },
                    background: "radial-gradient(circle at center, rgba(253,251,247,0.18) 0%, rgba(253,251,247,0.06) 30%, transparent 60%)",
                    filter: "blur(40px)"
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
    const [maskPos, setMaskPos] = useState<{ x: number; y: number } | null>(null)

    // Using requestAnimationFrame for high performance mouse tracking
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!sectionRef.current) return
        const rect = sectionRef.current.getBoundingClientRect()
        setMaskPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        })
    }, [])

    const handleMouseLeave = useCallback(() => {
        setMaskPos(null)
    }, [])

    // Smooth hover effect - we make a portion of the TOP layer transparent to reveal the bottom
    // We only show the reveal if we have a mask position AND if the cursor is on the right half of the screen.
    const showReveal = typeof window !== 'undefined'
        ? maskPos && maskPos.x > window.innerWidth / 2
        : false

    // The mask image will be a radial gradient on the top layer that creates a "hole".
    // A standard mask hides everything outside the mask. To make a hole, we make the center transparent and the rest black.
    // By default, the top layer is fully visible (no mask, or mask fully black). 
    // When clamped, the hole reveals the layer underneath.
    const maskStyle: React.CSSProperties = showReveal && maskPos
        ? {
            WebkitMaskImage: `radial-gradient(circle 350px at ${maskPos.x}px ${maskPos.y}px, transparent 0%, transparent 20%, black 70%, black 100%)`,
            maskImage: `radial-gradient(circle 350px at ${maskPos.x}px ${maskPos.y}px, transparent 0%, transparent 20%, black 70%, black 100%)`,
        }
        : {}

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
                TOP LAYER — Black overlay with Spotlight & Clouds (Masked)
                ═══════════════════════════════════════════════════════ */}
            <div
                className="absolute inset-0 z-10 bg-black pointer-events-none"
                style={{
                    ...maskStyle,
                    // Smooth transition when mouse leaves/enters
                    transition: showReveal ? 'none' : 'mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out',
                }}
            >
                {/* Spotlight */}
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

                {/* Gaseous Clouds — Deep Space Flow */}
                <GaseousClouds />
            </div>

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
                    <LaserBeam />
                    <PixelatedCanvas
                        src="/devansh.jpg"
                        className="w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] rounded-xl shrink-0 border border-white/10 shadow-[0_0_80px_10px_rgba(253,251,247,0.15)] bg-[radial-gradient(ellipse_at_top,_rgba(253,251,247,0.3)_0%,_rgba(253,251,247,0.05)_50%,_rgba(0,0,0,0.6)_100%)] relative z-10"
                        objectFit="cover"
                        responsive={true}
                        cellSize={1}
                        dotScale={1}
                        tintColor="#fdfbf7"
                        tintStrength={0.2}
                    />
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
