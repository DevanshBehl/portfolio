import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Project {
    title: string
    description: string
    techStack: string[]
    github: string
    demo: string
}

const projects: Project[] = [
    {
        title: 'Decentralized Exchange (DEX)',
        description:
            'A fully on-chain decentralized exchange with automated market making, liquidity pools, and real-time price feeds. Supports ERC-20 token swaps with minimal slippage and gas-optimized smart contracts.',
        techStack: ['Solidity', 'React', 'TypeScript', 'Ethers.js', 'Hardhat'],
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
    {
        title: 'Real-time Scalable Chat System',
        description:
            'Horizontally scalable messaging platform supporting millions of concurrent connections with real-time delivery guarantees. Features end-to-end encryption, message persistence, and presence detection.',
        techStack: ['WebSockets', 'Redis Pub/Sub', 'PostgreSQL', 'Node.js', 'Docker'],
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
    {
        title: 'AI-based Failure Prediction Platform',
        description:
            'Industrial IoT analytics engine that predicts equipment failures using machine learning models. Deployed on serverless AWS infrastructure with automated retraining pipelines.',
        techStack: ['Python', 'AWS SageMaker', 'Lambda', 'PostgreSQL', 'React'],
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
    {
        title: 'Carbon Footprint Tracker',
        description:
            'Full stack application enabling organizations to monitor, analyze, and offset their carbon emissions in real time. Features interactive dashboards and automated reporting.',
        techStack: ['Next.js', 'MongoDB', 'Node.js', 'Tailwind CSS', 'Chart.js'],
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
]


const ArrowIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    >
        <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
)

const ease = [0.16, 1, 0.3, 1] as const

const Projects = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="projects" ref={ref} className="relative py-24 sm:py-32 bg-[#050505] px-6">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    Projects
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                    Selected work.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-[#777777] text-sm sm:text-base max-w-2xl mb-16 leading-relaxed"
                >
                    A selection of projects that showcase my approach to building
                    production-grade, scalable systems.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}
                            whileHover={{ y: -4, borderColor: '#2a2a2a' }}
                            className="border border-[#1a1a1a] rounded-xl p-[1px] bg-gradient-to-b from-[#1a1a1a] to-transparent transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Inner Card Container */}
                            <div className="w-full h-full bg-[#080808] rounded-[10px] p-6 sm:p-8 flex flex-col relative z-10 transition-colors duration-300 group-hover:bg-[#0a0a0a]">
                                {/* Top accent line glow */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#444] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Project number and Tech Stack Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[#333] text-sm font-mono tracking-widest block group-hover:text-[#555] transition-colors duration-300">
                                        PROJ_{String(i + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight mb-3 group-hover:text-[#fdfbf7] transition-colors duration-300">
                                    {project.title}
                                </h3>

                                <p className="text-[#888] text-sm leading-relaxed mb-6 flex-grow">
                                    {project.description}
                                </p>

                                {/* Tech stack tags */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-[#666] bg-[#111] border border-[#1a1a1a] rounded transition-colors duration-300 group-hover:border-[#333] group-hover:text-[#999]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex items-center gap-6 mt-auto">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-[#666] text-xs font-mono uppercase tracking-widest transition-colors duration-300 hover:text-white group/link"
                                    >
                                        [ GitHub <ArrowIcon /> ]
                                    </a>
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-[#666] text-xs font-mono uppercase tracking-widest transition-colors duration-300 hover:text-white group/link"
                                    >
                                        [ Demo <ArrowIcon /> ]
                                    </a>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
