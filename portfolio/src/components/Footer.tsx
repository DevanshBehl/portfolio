import { motion } from 'framer-motion'

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full bg-black text-white pt-24 pb-8 px-6 md:px-12 flex flex-col justify-between border-t border-white/10 font-sans"
        >
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-7xl mx-auto">
                {/* Headline */}
                <div className="text-3xl md:text-3xl font-medium tracking-tight mb-12 md:mb-0 text-[#fdfbf7]">
                    Experience liftoff
                </div>

                {/* Right Links Grid */}
                <div className="flex gap-16 md:gap-32 text-sm text-[#888888] font-medium">
                    <ul className="flex flex-col gap-4">
                        <li className="hover:text-white cursor-pointer transition-colors">Download</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Product</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Docs</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Changelog</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Press</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Releases</li>
                    </ul>
                    <ul className="flex flex-col gap-4">
                        <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Use Cases</li>
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-7xl mx-auto text-sm text-[#888888] font-medium gap-8 md:gap-0">
                {/* Logo Area */}
                <div className="text-xl font-semibold tracking-tight text-[#fdfbf7]">
                    Devansh
                </div>

                {/* Bottom Links */}
                <div className="flex flex-wrap gap-6 md:gap-8">
                    <a href="#" className="hover:text-white transition-colors">About</a>
                    <a href="#" className="hover:text-white transition-colors">Products</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
