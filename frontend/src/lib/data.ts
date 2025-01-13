export type SectionName = "About" | "Publications" | "Experience" | "Projects" | "Contact" | "Education" | "Hobbies";

type Link = {
  name: SectionName;
  hash: string;
};

export const links: Link[] = [
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Education",
    hash: "#education",
  },
  {
    name: "Publications",
    hash: "#publications",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Hobbies",
    hash: "#hobbies",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const; 