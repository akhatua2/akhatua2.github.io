import About from "@/components/About"
import Contact from "@/components/Contact"
import Experience from "@/components/Experience"
import Projects from "@/components/Projects"
import SectionDivider from "@/components/SectionDivider"

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <About />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Contact />
    </main>
  )
}
