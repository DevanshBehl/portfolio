import { motion } from 'framer-motion'
import type { Easing } from 'framer-motion'
import { Spotlight } from '@/components/ui/spotlight-new'

/* Shared cubic-bezier easing for a premium feel */
const ease: Easing = [0.16, 1, 0.3, 1]

const Hero = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center bg-black px-6 overflow-hidden"
        >
            {/* Aceternity Spotlight — monochromatic white from both sides */}
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

            {/* Subtle grid pattern overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 2 }}
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Role tag */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease }}
                    className="text-[#888888] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-6 sm:mb-8"
                >
                    Full Stack Developer · Web3 Developer · DevOps Engineer
                </motion.p>

                {/* Name — staggered line reveal */}
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
                    className="text-lg sm:text-xl lg:text-2xl text-[#a1a1a1] font-normal max-w-2xl mx-auto mb-4 leading-relaxed"
                >
                    Full Stack &amp; Web3 Engineer building scalable systems.
                </motion.p>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.95, ease }}
                    className="text-sm sm:text-base text-[#888888] font-normal max-w-xl mx-auto mb-10 sm:mb-12 leading-relaxed"
                >
                    I design and build high-performance web applications, decentralized
                    systems, and production-grade cloud infrastructure.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.1, ease }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
