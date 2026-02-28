import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'


/** Expertise bullet points */
const highlights: string[] = [
    'Clean, maintainable architecture',
    'Distributed systems & event-driven design',
    'DevOps & cloud-native infrastructure',
    'Web3 & blockchain development',
    'Performance-first mindset',
]

const About = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section
            id="about"
            ref={ref}
            className="relative py-24 sm:py-32 bg-[#0f0f0f] px-6"
        >
            <div className="max-w-4xl mx-auto">
                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    About
                </motion.p>

                <div className="border border-[#1a1a1a] rounded-xl p-[1px] bg-gradient-to-b from-[#1a1a1a] to-transparent relative overflow-hidden">
                    <div className="w-full h-full bg-[#080808] rounded-[10px] p-8 sm:p-12 relative z-10">
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#444] to-transparent opacity-50" />

                        {/* Dot grid subtle background */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                        {/* Terminal Header Bar */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a1a1a]">
                            <div className="flex gap-2">
                                <span className="w-3 h-3 rounded-full bg-[#333]" />
                                <span className="w-3 h-3 rounded-full bg-[#333]" />
                                <span className="w-3 h-3 rounded-full bg-[#333]" />
                            </div>
                            <span className="text-[#555] text-[10px] font-mono tracking-widest uppercase">
                                usr/bin/about
                            </span>
                        </div>

                        {/* Section heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-tight"
                        >
                            Systems-oriented engineer.
                        </motion.h2>

                        {/* Bio paragraph */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-[#a1a1a1] text-base sm:text-lg leading-relaxed max-w-3xl mb-10"
                        >
                            Devansh is a systems-oriented full stack developer specializing in
                            scalable backend architecture, modern frontend engineering, and
                            decentralized application development. He focuses on performance,
                            clean abstractions, and production-ready infrastructure.
                        </motion.p>

                        {/* Expertise highlights — staggered entrance */}
                        {/* Expertise highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 relative z-10">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: -15 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                                    className="flex items-center gap-3 cursor-default group"
                                >
                                    <span className="text-[#444] text-[10px] font-mono group-hover:text-[#666] transition-colors duration-300">{`>`}</span>
                                    <span className="text-[#a1a1a1] text-sm group-hover:text-white transition-colors duration-300 font-mono tracking-wide">
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
