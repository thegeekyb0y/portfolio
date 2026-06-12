export type Project = {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    title: "Kraked",
    description: "Realtime Collaborative Study Platform",
    image: "/pg1.png",
    liveUrl: "https://dsbored121.vercel.app",
    githubUrl: "https://github.com/thegeekyb0y/dsbored121",
    tags: ["Next.js", "Prisma", "NextAuth", "Redis", "PostgreSQL"],
  },
  {
    title: "NpmSearch",
    description: "Fast npm package browser with Redis caching",
    image: "/pg2.png",
    liveUrl: "https://npmsearch121.vercel.app",
    githubUrl: "https://github.com/thegeekyb0y/npmsearch",
    tags: ["Next.js", "Redis", "Tailwind"],
  },
  {
    title: "VedaAI",
    description: "AI-powered exam paper generation platform",
    image: "/pg3.png",
    liveUrl: "https://veda-ai-nu.vercel.app",
    githubUrl: "https://github.com/thegeekyb0y/vedaai",
    tags: ["Next.js", "TypeScript", "Groq"],
  },
  {
    title: "Music Hi Kehde",
    description: "A landing page created with React and TailwindCSS",
    image: "/pg4.png",
    githubUrl: "https://github.com/thegeekyb0y/musichikehde",
    liveUrl: "https://musichikehde.vercel.app",
    tags: ["React", "Tailwind"],
  },
];
