import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SkillCategory {
    icon: string
    title: string
    skills: string[]
}

const categories: SkillCategory[] = [
    {
        icon: '◆',
        title: 'Frontend Engineering',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'HTML5 / CSS3'],
    },
    {
        icon: '⬡',
        title: 'Backend Engineering',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'MongoDB', 'Redis', 'Kafka', 'GraphQL', 'REST APIs'],
    },
    {
        icon: '△',
        title: 'DevOps & Infrastructure',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Nginx', 'Linux', 'GitHub Actions'],
    },
    {
        icon: '◇',
        title: 'Blockchain & Web3',
        skills: ['Solidity', 'Ethereum', 'Rust', 'Solana', 'Hardhat', 'Ethers.js', 'IPFS', 'Smart Contracts'],
    },
    {
        icon: '○',
        title: 'Languages',
        skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Rust', 'Solidity', 'SQL'],
    },
    {
        icon: '□',
        title: 'Tools & Practices',
        skills: ['Git', 'Figma', 'Postman', 'Jira', 'Agile / Scrum', 'TDD', 'System Design', 'Microservices'],
    },
]

const ease = [0.16, 1, 0.3, 1] as const

const Skills = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="skills" ref={ref} className="relative py-24 sm:py-32 bg-[#050505] px-6">
            <div className="max-w-6xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    Skills
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                    Tech stack & expertise.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-[#777777] text-sm sm:text-base max-w-2xl mb-16 leading-relaxed"
                >
                    A curated collection of technologies I work with daily to build robust,
                    scalable, and performant applications.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((category, i) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease }}
                            whileHover={{ y: -4, borderColor: '#2a2a2a' }}
                            className="border border-[#1a1a1a] rounded-xl p-[1px] bg-gradient-to-b from-[#1a1a1a] to-transparent transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Inner Card Container */}
                            <div className="w-full h-full bg-[#080808] rounded-[10px] p-6 flex flex-col relative z-10 transition-colors duration-300 group-hover:bg-[#0a0a0a]">
                                {/* Top accent glow on hover */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#444] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon + Title */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[#333] text-sm group-hover:text-[#666] transition-colors duration-300 font-mono">
                                        [{category.icon}]
                                    </span>
                                    <h3 className="text-white text-sm font-bold tracking-widest uppercase group-hover:text-[#fdfbf7] transition-colors duration-300">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Skill tags */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, j) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 + j * 0.03 }}
                                            className="px-2.5 py-1 text-[11px] font-mono tracking-wide text-[#888] bg-[#111] border border-[#1a1a1a] rounded transition-all duration-300 group-hover:border-[#2a2a2a] group-hover:text-[#bbb]"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
