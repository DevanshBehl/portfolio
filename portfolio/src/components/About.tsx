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

                {/* Section heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-8 leading-tight"
                >
                    Systems-oriented engineer.
                </motion.h2>

                {/* Animated divider */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[1px] bg-[#333333] mb-8"
                />

                {/* Bio paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-[#a1a1a1] text-base sm:text-lg leading-relaxed max-w-3xl mb-12"
                >
                    Devansh is a systems-oriented full stack developer specializing in
                    scalable backend architecture, modern frontend engineering, and
                    decentralized application development. He focuses on performance,
                    clean abstractions, and production-ready infrastructure.
                </motion.p>

                {/* Expertise highlights — staggered entrance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, x: -15 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                            whileHover={{ x: 4 }}
                            className="flex items-start gap-3 group cursor-default"
                        >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#333333] group-hover:bg-white transition-colors duration-300 shrink-0" />
                            <span className="text-[#a1a1a1] text-sm sm:text-base group-hover:text-white transition-colors duration-300">
                                {item}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default About
