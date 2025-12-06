import Navigation from "@/components/Navigation";
import EmployeeBadge from "@/components/EmployeeBadge";
import UniversityID from "@/components/UniversityID";

export const metadata = {
  title: "Experience — Arpandeep Khatua",
};

export default function Experience() {
  return (
    <main>
      <Navigation />
      <div className="mx-auto flex min-h-screen max-w-[65rem] flex-col gap-8 px-6 py-14 sm:px-10 pt-20">

      <section className="fade-up flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Experience</p>
        <h1
          className="text-3xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Work that shaped how I build.
        </h1>
      </section>

      <section className="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stanford Research - Badge */}
          <EmployeeBadge
            name="Arpandeep Khatua"
            employeeId="STAN-2024-0901"
            title="Research Assistant"
            department="Stanford AI Lab"
            location="Stanford, CA"
            startDate="Sep 2024"
            endDate="Present"
            achievements={[
              "Socially intelligent agent systems for nuanced human-AI interaction",
              "Corpus-level inconsistency detection for LLM outputs",
              "Relational positional embeddings for transformer models"
            ]}
            accessLevel={["Research", "GPU Access", "Publications"]}
            photo="/me-transparent.png"
            company="Stanford"
          />

          {/* Meta IC4 - Employee Badge */}
          <EmployeeBadge
            name="Arpandeep Khatua"
            employeeId="META-2023-0427"
            title="Software Engineer IC4"
            department="Facebook Groups"
            location="Menlo Park, CA"
            startDate="Jan 2023"
            endDate="Sep 2024"
            achievements={[
              "Onboarding flows that increased daily group creations by 3%",
              "Privacy and admin uplift for admin-less communities",
              "GenAI summaries and answer agents for Groups"
            ]}
            accessLevel={["Production", "Code Review", "GenAI"]}
            photo="/me_2024.png"
            company="Meta"
          />

          {/* Meta Intern - Employee Badge */}
          <EmployeeBadge
            name="Arpandeep Khatua"
            employeeId="META-2022-0815"
            title="Software Engineering Intern"
            department="Facebook Watch"
            location="New York, NY"
            startDate="May 2022"
            endDate="Aug 2022"
            achievements={[
              "Infinite scroll comments and polls that increased watch time",
              "E2E testing framework and docs adopted by 50+ teams"
            ]}
            accessLevel={["Staging", "Code Review"]}
            photo="/me_2022.png"
            company="Meta"
          />
        </div>
      </section>

      {/* Academic Experience Section */}
      <section className="fade-up flex flex-col gap-2 mt-12">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">Academic</p>
        <h2
          className="text-2xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Where I learned to learn.
        </h2>
      </section>

      <section className="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Stanford University ID */}
          <div className="flex flex-col gap-4">
            <UniversityID
              name="Arpandeep Khatua"
              studentId="STAN-2024-XXXX"
              degree="MS in Computer Science"
              department="School of Engineering"
              location="Stanford, CA"
              startDate="Sep 2024"
              endDate="Present"
              highlights={[
                "Research Assistant at Stanford AI Lab (SALT, OVAL, SNAP)",
                "Working with Prof. Diyi Yang, Prof. Jure Leskovec, and Prof. Monica Lam",
                "Focus on language agents, model evaluation, and human-AI interaction"
              ]}
              statusBadges={["Graduate Student", "Research", "Active"]}
              photo="/me-transparent.png"
              university="Stanford"
            />
            {/* Content Section */}
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "var(--font-space)", color: "#8C1515" }}>
                Coursework & Teaching
              </h3>
              <ul className="space-y-2">
                <li className="text-xs text-foreground flex items-start gap-2">
                  <span className="text-[#8C1515] mt-0.5">•</span>
                  <span>Conversational Virtual Assistants, Human Centered NLP, Reinforcement Learning, Deep RL</span>
                </li>
                <li className="text-xs text-foreground flex items-start gap-2">
                  <span className="text-[#8C1515] mt-0.5">•</span>
                  <span>Teaching Assistant: CS 224V (Conversational Virtual Assistants)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* UIUC University ID */}
          <div className="flex flex-col gap-4">
            <UniversityID
              name="Arpandeep Khatua"
              studentId="UIUC-2019-XXXX"
              degree="BS in Computer Engineering"
              department="College of Engineering"
              location="Urbana, IL"
              startDate="Aug 2019"
              endDate="May 2022"
              highlights={[
                "James Scholar Honors, Dean's List (All Semesters)",
                "Course Assistant for ECE 391, ECE 313, ECE 210",
                "Honors Lab Instructor for ECE 110H/120H",
                "Worked on large-scale graph systems research"
              ]}
              statusBadges={["Graduated", "Honors", "Teaching Assistant"]}
              photo="/me_2022.png"
              university="UIUC"
              gpa="4.00/4.00"
            />
            {/* Content Section */}
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "var(--font-space)", color: "#FF5F05" }}>
                Coursework & Teaching
              </h3>
              <ul className="space-y-2">
                <li className="text-xs text-foreground flex items-start gap-2">
                  <span className="text-[#FF5F05] mt-0.5">•</span>
                  <span>Senior Thesis: Generating Large Real World and Synthetic Graph Datasets for GNN Applications</span>
                </li>
                <li className="text-xs text-foreground flex items-start gap-2">
                  <span className="text-[#FF5F05] mt-0.5">•</span>
                  <span>Coursework: NLP, ML, Deep Learning, Algorithms, Parallel Programming, Data Structures, Database Systems, Computer Systems</span>
                </li>
                <li className="text-xs text-foreground flex items-start gap-2">
                  <span className="text-[#FF5F05] mt-0.5">•</span>
                  <span>Teaching: ECE 391 (Computer Systems), ECE 313 (Probability), ECE 210 (Signals), ECE 110 & Honors Lab</span>
                </li>
                <li className="text-xs text-foreground flex items-start gap-2">
                  <span className="text-[#FF5F05] mt-0.5">•</span>
                  <span>Highest Honors, Bronze Tablet, Edmund J. James Scholar</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}

