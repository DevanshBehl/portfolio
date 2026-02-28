import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ExperienceEntry {
    role: string
    company: string
    period: string
    description: string
    highlights: string[]
}

const experiences: ExperienceEntry[] = [
    {
        role: 'Full Stack Developer',
        company: 'Freelance',
        period: '2023 – Present',
        description:
            'Building scalable full-stack and blockchain solutions for clients. Architecting production systems with modern tooling and cloud-native infrastructure.',
        highlights: [
            'Delivered 10+ production applications across web2 and web3 domains',
            'Reduced API latency by 60% through caching layers and query optimization',
            'Designed microservice architectures handling 50k+ daily active users',
        ],
    },
    {
        role: 'Web3 Developer',
        company: 'Independent Projects',
        period: '2022 – Present',
        description:
            'Developed smart contracts and decentralized applications on Ethereum and Solana. Designed token economics and DeFi protocol integrations.',
        highlights: [
            'Built and deployed 5+ smart contracts on Ethereum mainnet',
            'Integrated DeFi protocols for automated yield optimization',
            'Implemented gas-optimized Solidity patterns saving 30% on transaction costs',
        ],
    },
    {
        role: 'DevOps Engineer',
        company: 'Project-based',
        period: '2023 – Present',
        description:
            'Designed cloud-native deployment architectures on AWS. Implemented CI/CD pipelines, container orchestration, and infrastructure as code.',
        highlights: [
            'Automated infrastructure provisioning with Terraform across 3 AWS regions',
            'Built zero-downtime deployment pipelines with GitHub Actions and K8s',
            'Reduced deployment time from 45 minutes to under 5 minutes',
        ],
    },
]

const ease = [0.16, 1, 0.3, 1] as const

const Experience = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="experience" ref={ref} className="relative py-24 sm:py-32 bg-[#050505] px-6">
            <div className="max-w-4xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    Experience
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                    Professional timeline.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-[#777777] text-sm sm:text-base max-w-2xl mb-16 leading-relaxed"
                >
                    A track record of building systems that scale and delivering results
                    that matter.
                </motion.p>

                {/* Timeline */}
                <div className="relative">
                    {/* Animated vertical line */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={isInView ? { height: '100%' } : {}}
                        transition={{ duration: 1.2, delay: 0.3, ease }}
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
                                    ease,
                                }}
                                className="relative pl-8 sm:pl-14 group"
                            >
                                {/* Timeline dot and connecting line to card */}
                                <div className="absolute left-0 sm:left-4 top-8 flex items-center w-8 sm:w-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                                        className="w-2 h-2 -translate-x-[3.5px] rounded-full bg-[#444] border-[1.5px] border-[#111] group-hover:bg-white group-hover:border-white group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 z-10"
                                    />
                                    <div className="flex-1 h-[1px] bg-gradient-to-r from-[#222] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Experience Card */}
                                <div className="border border-[#1a1a1a] rounded-xl p-6 sm:p-8 bg-[#0a0a0a] transition-all duration-300 group-hover:bg-[#0c0c0c] overflow-hidden relative">
                                    {/* Top accent line glow */}
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#444] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight mb-1">
                                        {entry.role}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-4">
                                        <p className="text-[#a1a1a1] text-sm font-semibold tracking-wide">
                                            {entry.company}
                                        </p>
                                        <span className="hidden sm:inline text-[#333]">&bull;</span>
                                        <p className="text-[#666] text-xs font-mono uppercase tracking-widest">
                                            {entry.period}
                                        </p>
                                    </div>

                                    <p className="text-[#888] text-sm leading-relaxed mb-6 max-w-2xl">
                                        {entry.description}
                                    </p>

                                    {/* Highlight bullets */}
                                    <ul className="space-y-3">
                                        {entry.highlights.map((highlight, j) => (
                                            <motion.li
                                                key={j}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ duration: 0.4, delay: 0.6 + index * 0.15 + j * 0.05 }}
                                                className="flex items-start gap-3 text-[#777] text-xs sm:text-sm leading-relaxed group-hover:text-[#999] transition-colors duration-300"
                                            >
                                                <span className="w-[1px] h-3 bg-[#333] mt-1 shrink-0 group-hover:bg-[#666] transition-colors duration-300" />
                                                {highlight}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
