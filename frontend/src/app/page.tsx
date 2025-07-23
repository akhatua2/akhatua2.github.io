import About from "../components/About"
import Experience from "../components/Experience"
import Projects from "../components/Projects"
import Contact from "../components/Contact"
import SectionDivider from "../components/SectionDivider"
import Education from "../components/Education"
import Publications from "../components/Publications"
import Hobbies from "../components/Hobbies"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <main>
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Publications />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Hobbies />
      <SectionDivider />
      <Contact />
      <Footer />
    </main>
  )
}
