import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full bg-[#050505] text-white pt-24 pb-8 px-6 md:px-12 flex flex-col justify-between border-t border-white/5 font-sans"
        >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-7xl mx-auto">
                {/* Headline */}
                <div className="text-3xl md:text-3xl font-medium tracking-tight mb-12 md:mb-0 text-[#fdfbf7]">
                    Let's Connect
                </div>

                {/* Right Links Grid */}
                <div className="flex gap-16 md:gap-32 text-sm text-[#888] font-medium">
                    <ul className="flex flex-col gap-4">
                        <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
                        <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                        <li><a href="#experience" className="hover:text-white transition-colors">Experience</a></li>
                        <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                    <ul className="flex flex-col gap-4">
                        <li><a href="https://github.com/DevanshBehl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                        <li><a href="https://linkedin.com/in/devansh-behl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                        <li><a href="https://instagram.com/devanshbehl" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                        <li><a href="mailto:[devanshbhel@gmail.com" className="hover:text-white transition-colors">Email</a></li>
                    </ul>
                </div>
            </div>

            {/* Middle Massive Text */}
            <div className="w-full flex justify-center items-center py-20 md:py-32 overflow-hidden select-none">
                <h1
                    className="text-[13vw] leading-none font-bold text-[#fdfbf7] whitespace-nowrap"
                    style={{ letterSpacing: '-0.04em' }}
                >
                    Devansh Behl
                </h1>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-7xl mx-auto text-sm text-[#888] font-medium gap-8 md:gap-0">
                {/* Logo Area */}
                <div className="text-xl font-semibold tracking-tight text-[#fdfbf7]">
                    Devansh Behl
                </div>

                {/* Bottom right */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <span className="text-[#555] text-xs">
                        Built with React & TypeScript
                    </span>
                    <span className="text-[#444] text-xs">
                        © {new Date().getFullYear()} Devansh Behl
                    </span>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
