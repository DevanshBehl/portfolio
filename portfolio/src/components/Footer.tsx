import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-8 bg-black border-t border-[#111111] px-6"
        >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <p className="text-[#555555] text-xs font-medium tracking-wide">
                    © 2026 Devansh Behl
                </p>

                {/* Built with */}
                <p className="text-[#555555] text-xs font-medium tracking-wide">
                    Built with React, TypeScript &amp; Tailwind CSS
                </p>
            </div>
        </motion.footer>
    )
}

export default Footer
