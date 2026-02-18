import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/** Contact link type */
interface ContactLink {
    label: string
    value: string
    href: string
}

const contactLinks: ContactLink[] = [
    {
        label: 'Email',
        value: 'devansh@example.com',
        href: 'mailto:devansh@example.com',
    },
    {
        label: 'GitHub',
        value: 'github.com/devanshbehl',
        href: 'https://github.com/devanshbehl',
    },
    {
        label: 'LinkedIn',
        value: 'linkedin.com/in/devanshbehl',
        href: 'https://linkedin.com/in/devanshbehl',
    },
]

const Contact = () => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            id="contact"
            ref={ref}
            className="relative py-24 sm:py-32 bg-[#0f0f0f] px-6"
        >
            <div className="max-w-3xl mx-auto text-center">
                {/* Section label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-[#888888] text-xs font-medium tracking-[0.2em] uppercase mb-4"
                >
                    Contact
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
                >
                    Let's Build Something
                    <br />
                    Scalable.
                </motion.h2>

                {/* Animated divider */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 48 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-[1px] bg-[#333333] mx-auto mb-12"
                />

                {/* Contact links */}
                <div className="space-y-3 flex flex-col items-center">
                    {contactLinks.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            whileHover={{ scale: 1.02, borderColor: '#333333' }}
                            className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-[#1a1a1a] bg-[#0a0a0a] transition-colors duration-300 hover:bg-[#111111] group w-full sm:max-w-md"
                        >
                            <span className="text-[#555555] text-xs font-medium tracking-widest uppercase w-16 text-left shrink-0">
                                {link.label}
                            </span>
                            <span className="text-[#a1a1a1] text-sm font-medium group-hover:text-white transition-colors duration-300 flex-1 text-left">
                                {link.value}
                            </span>
                            <motion.svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#555555] group-hover:text-white transition-colors duration-300"
                                initial={{ x: -4, opacity: 0 }}
                                whileHover={{ x: 0, opacity: 1 }}
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </motion.svg>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Contact
