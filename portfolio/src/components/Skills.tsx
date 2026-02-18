import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/** Skill category type */
interface SkillCategory {
    title: string
    skills: string[]
}

const categories: SkillCategory[] = [
    {
        title: 'Frontend Engineering',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
        title: 'Backend Engineering',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'MongoDB', 'Redis', 'Kafka'],
    },
    {
        title: 'DevOps & Infrastructure',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    },
    {
        title: 'Blockchain & Systems',
        skills: ['Solidity', 'Ethereum', 'Rust', 'Solana'],
    },
    {
        title: 'Languages',
        skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
    },
]

const Skills = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="skills" ref={ref} className="relative py-24 sm:py-32 bg-black px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    Skills
                </motion.p>

                {/* Section heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-16 leading-tight"
                >
                    Tech stack & expertise.
                </motion.h2>

                {/* Skill category grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, i) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, borderColor: '#333333' }}
                            className="border border-[#1a1a1a] rounded-xl p-6 bg-[#0a0a0a] transition-colors duration-300 hover:bg-[#0f0f0f] group"
                        >
                            {/* Category title */}
                            <h3 className="text-white text-sm font-semibold tracking-wide mb-5 uppercase">
                                {category.title}
                            </h3>

                            {/* Skill tags */}
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, j) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.3, delay: 0.3 + i * 0.1 + j * 0.04 }}
                                        className="px-3 py-1.5 text-xs font-medium text-[#a1a1a1] bg-[#111111] border border-[#1a1a1a] rounded-md transition-all duration-300 group-hover:border-[#222222] group-hover:text-[#cccccc]"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
