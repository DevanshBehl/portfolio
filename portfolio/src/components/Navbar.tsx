import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/** Navigation link configuration */
interface NavLink {
    label: string
    href: string
}

const navLinks: NavLink[] = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
            const sections = navLinks.map((l) => l.href.replace('#', ''))
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i])
                if (el && window.scrollY >= el.offsetTop - 200) {
                    setActiveSection(sections[i])
                    break
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-black/80 backdrop-blur-xl border-b border-[#1a1a1a]'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <a
                        href="#"
                        className="text-white font-semibold text-lg tracking-tight transition-all duration-300 hover:opacity-70"
                    >
                        Devansh Behl
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-white ${activeSection === link.href.replace('#', '')
                                        ? 'text-white'
                                        : 'text-[#a1a1a1]'
                                    }`}
                            >
                                {link.label}
                                {/* Active indicator dot */}
                                <motion.span
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                                    initial={false}
                                    animate={{
                                        opacity: activeSection === link.href.replace('#', '') ? 1 : 0,
                                        scale: activeSection === link.href.replace('#', '') ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="block w-5 h-[1.5px] bg-white"
                        />
                        <motion.span
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            className="block w-5 h-[1.5px] bg-white"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="block w-5 h-[1.5px] bg-white"
                        />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-[#1a1a1a]"
                    >
                        <div className="px-6 py-4">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="block py-3 text-[#a1a1a1] text-sm font-medium tracking-wide transition-colors duration-300 hover:text-white border-b border-[#111111] last:border-0"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
