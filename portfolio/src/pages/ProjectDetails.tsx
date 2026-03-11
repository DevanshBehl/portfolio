import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { projects } from '../data/projects'

const ArrowIconLeft = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover/link:-translate-x-0.5"
    >
        <path d="M17 12H7M7 12L12 7M7 12L12 17" />
    </svg>
)

const ExternalLinkIcon = () => (
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

const ProjectDetails = () => {
    const { id } = useParams<{ id: string }>()
    const project = projects.find((p) => p.id === id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!project) {
        return (
            <div className="min-h-screen text-white bg-[#050505] flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center pt-24">
                    <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                    <Link to="/" className="text-[#888] hover:text-white transition-colors underline">
                        Return Home
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen text-white bg-[#050505] relative w-full overflow-hidden flex flex-col">
            <Navbar />
            <main className="flex-1 w-full pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-[#666] hover:text-white text-sm font-mono uppercase tracking-widest transition-colors duration-300 group/link mb-12"
                        >
                            <ArrowIconLeft /> Back to home
                        </Link>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 mb-10">
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1.5 text-xs uppercase font-mono tracking-wider text-[#999] bg-[#111] border border-[#222] rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#1a1a1a] pt-12">
                        <motion.div
                            className="md:col-span-2 space-y-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <section>
                                <h2 className="text-[#888] text-sm font-mono uppercase tracking-widest mb-4">Overview</h2>
                                <p className="text-[#ccc] text-lg leading-relaxed">{project.extendedDescription}</p>
                            </section>

                            {project.architecture && (
                                <section>
                                    <h2 className="text-[#888] text-sm font-mono uppercase tracking-widest mb-4">Architecture</h2>
                                    <p className="text-[#ccc] text-lg leading-relaxed">{project.architecture}</p>
                                </section>
                            )}

                            <section>
                                <h2 className="text-[#888] text-sm font-mono uppercase tracking-widest mb-4">Key Features</h2>
                                <ul className="space-y-3">
                                    {project.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-[#ccc] text-lg leading-relaxed">
                                            <span className="text-[#444] mt-1.5">▹</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </motion.div>

                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <section className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6">
                                <h2 className="text-[#888] text-sm font-mono uppercase tracking-widest mb-4">Links</h2>
                                <div className="space-y-4">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-white hover:text-[#bbb] transition-colors group/link pb-4 border-b border-[#222]"
                                    >
                                        GitHub Repository <ExternalLinkIcon />
                                    </a>
                                    {project.demo !== '#' && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-white hover:text-[#bbb] transition-colors group/link"
                                        >
                                            Live Demo <ExternalLinkIcon />
                                        </a>
                                    )}
                                </div>
                            </section>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ProjectDetails
