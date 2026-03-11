import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </>
    )
}

export default Home
