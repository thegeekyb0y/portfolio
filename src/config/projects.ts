export type Project = {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    title: "Kraked",
    slug: "kraked",
    description: "Realtime Collaborative Study Platform",
    longDescription: `Kraked is a real-time study platform built for students who want accountability and focus. Users create study rooms, track time with a built-in timer, and see live member activity. Built with Next.js, Prisma, and WebSockets — deployed on Railway with Redis for presence tracking.`,
    image: "/projects/pg1.png",
    liveUrl: "https://dsbored121.vercel.app",
    githubUrl: "https://github.com/thegeekyb0y/dsbored121",
    tags: ["Next.js", "Prisma", "NextAuth", "Redis", "PostgreSQL"],
  },
  {
    title: "NpmSearch",
    slug: "npmsearch",
    description: "Fast npm package browser with Redis caching",
    longDescription: `NpmSearch is a fast, minimal interface for browsing the npm registry. Search results are cached in Redis to eliminate repeat API calls, making it significantly faster than the official npm website. Built with Next.js 14, Tailwind v4, and Geist typography.`,
    image: "/projects/pg2.png",
    liveUrl: "https://npmsearch121.vercel.app",
    githubUrl: "https://github.com/thegeekyb0y/npmsearch",
    tags: ["Next.js", "Redis", "Tailwind"],
  },
  {
    title: "VedaAI",
    slug: "vedaai",
    description: "AI-powered exam paper generation platform",
    longDescription: `VedaAI lets teachers generate full exam papers in seconds using Groq AI. Built a BullMQ job queue for async paper generation, Socket.IO for real-time progress updates, and a PDF export pipeline. Frontend on Vercel, backend on Railway with MongoDB.`,
    image: "/pg3.png",
    liveUrl: "https://veda-ai-nu.vercel.app",
    githubUrl: "https://github.com/thegeekyb0y/vedaai",
    tags: ["Next.js", "TypeScript", "Groq", "BullMQ", "Socket.IO"],
  },
  {
    title: "Music Hi Kehde",
    slug: "music-hi-kehde",
    description: "A landing page created with React and TailwindCSS",
    longDescription: `Music Hi Kehde is a music-themed landing page built as a frontend exercise. Focused on smooth animations, responsive layout, and clean component structure. Built with React and Tailwind CSS.`,
    image: "/projects/pg3.png",
    githubUrl: "https://github.com/thegeekyb0y/musichikehde",
    liveUrl: "https://musichikehde.vercel.app",
    tags: ["React", "Tailwind"],
  },
  {
    title: "SMS Spam Classifier",
    slug: "sms-spam-classifier",
    description: "ML model to detect if an email or SMS is spam.",
    longDescription: `A machine learning project that classifies SMS and email messages as spam or not. Trained on the UCI SMS Spam Collection dataset using NLP techniques — TF-IDF vectorization and a Naive Bayes classifier. Deployed as an interactive web app with Streamlit.`,
    image: "/projects/pg5.png",
    githubUrl: "https://github.com/thegeekyb0y/sms-spam-classifier",
    liveUrl: "https://sms-spamdetector.streamlit.app/",
    tags: ["Python", "Machine Learning", "Streamlit"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = projects.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}
