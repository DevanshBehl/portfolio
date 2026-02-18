import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/** Project data type */
interface Project {
    title: string
    description: string
    techStack: string
    github: string
    demo: string
}

const projects: Project[] = [
    {
        title: 'Decentralized Exchange (DEX)',
        description:
            'A fully on-chain decentralized exchange with automated market making, liquidity pools, and real-time price feeds.',
        techStack: 'Solidity · React · TypeScript · Ethers.js · Hardhat',
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
    {
        title: 'Real-time Scalable Chat System',
        description:
            'Horizontally scalable messaging platform supporting millions of concurrent connections with real-time delivery guarantees.',
        techStack: 'WebSockets · Redis Pub/Sub · PostgreSQL · Node.js · Docker',
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
    {
        title: 'AI-based Failure Prediction Platform',
        description:
            'Industrial IoT analytics engine that predicts equipment failures using machine learning models deployed on AWS infrastructure.',
        techStack: 'Python · AWS SageMaker · Lambda · PostgreSQL · React',
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
    {
        title: 'Carbon Footprint Tracker',
        description:
            'Full stack web application enabling organizations to monitor, analyze, and offset their carbon emissions in real time.',
        techStack: 'Next.js · MongoDB · Node.js · Tailwind CSS · Chart.js',
        github: 'https://github.com/devanshbehl',
        demo: '#',
    },
]

/** Arrow icon for links */
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

const Projects = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            id="projects"
            ref={ref}
            className="relative py-24 sm:py-32 bg-[#0f0f0f] px-6"
        >
            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    Projects
                </motion.p>

                {/* Section heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-16 leading-tight"
                >
                    Selected work.
                </motion.h2>

                {/* Project grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <motion.article
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ scale: 1.02, borderColor: '#333333' }}
                            className="border border-[#1a1a1a] rounded-xl p-6 sm:p-8 bg-[#0a0a0a] transition-colors duration-300 group"
                        >
                            {/* Project number */}
                            <span className="text-[#222222] text-xs font-mono mb-4 block">
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            {/* Project title */}
                            <h3 className="text-white text-lg sm:text-xl font-semibold tracking-tight mb-3 group-hover:text-white transition-colors duration-300">
                                {project.title}
                            </h3>

                            {/* Project description */}
                            <p className="text-[#888888] text-sm leading-relaxed mb-5">
                                {project.description}
                            </p>

                            {/* Tech stack */}
                            <p className="text-[#555555] text-xs font-medium tracking-wide mb-6">
                                {project.techStack}
                            </p>

                            {/* Links */}
                            <div className="flex items-center gap-5">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[#a1a1a1] text-xs font-medium tracking-wide transition-colors duration-300 hover:text-white group/link"
                                >
                                    GitHub <ArrowIcon />
                                </a>
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[#a1a1a1] text-xs font-medium tracking-wide transition-colors duration-300 hover:text-white group/link"
                                >
                                    Live Demo <ArrowIcon />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
