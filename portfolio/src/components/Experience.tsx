import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/** Experience entry type */
interface ExperienceEntry {
    role: string
    company: string
    period: string
    description: string
}

const experiences: ExperienceEntry[] = [
    {
        role: 'Full Stack Developer',
        company: 'Freelance',
        period: '2023 – Present',
        description:
            'Building scalable full-stack and blockchain solutions for clients. Architecting production systems with modern tooling and cloud-native infrastructure.',
    },
    {
        role: 'Web3 Developer',
        company: 'Independent Projects',
        period: '2022 – Present',
        description:
            'Developed smart contracts and decentralized applications on Ethereum and Solana. Designed token economics and DeFi protocol integrations.',
    },
    {
        role: 'DevOps Engineer',
        company: 'Project-based',
        period: '2023 – Present',
        description:
            'Designed cloud-native deployment architectures on AWS. Implemented CI/CD pipelines, container orchestration with Kubernetes, and infrastructure as code.',
    },
]

const Experience = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="experience" ref={ref} className="relative py-24 sm:py-32 bg-black px-6">
            <div className="max-w-4xl mx-auto">
                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    Experience
                </motion.p>

                {/* Section heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-16 leading-tight"
                >
                    Professional timeline.
                </motion.h2>

                {/* Timeline */}
                <div className="relative">
                    {/* Animated vertical line */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: '100%' } : {}}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 sm:left-4 top-0 w-[1px] bg-[#1a1a1a]"
                    />

                    <div className="space-y-12 sm:space-y-16">
                        {experiences.map((entry, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.4 + index * 0.15,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                                className="relative pl-8 sm:pl-14 group"
                            >
                                {/* Timeline dot */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                                    className="absolute left-0 sm:left-4 top-1.5 w-2 h-2 -translate-x-[3.5px] rounded-full bg-[#333333] border-2 border-[#333333] group-hover:bg-white group-hover:border-white transition-all duration-300"
                                />

                                {/* Period */}
                                <p className="text-[#555555] text-xs font-medium tracking-widest uppercase mb-2">
                                    {entry.period}
                                </p>

                                {/* Role & Company */}
                                <h3 className="text-white text-lg sm:text-xl font-semibold tracking-tight mb-1">
                                    {entry.role}
                                </h3>
                                <p className="text-[#888888] text-sm font-medium mb-3">
                                    {entry.company}
                                </p>

                                {/* Description */}
                                <p className="text-[#a1a1a1] text-sm leading-relaxed max-w-2xl">
                                    {entry.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
