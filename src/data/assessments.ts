export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface Assessment {
  name: string;
  difficulty: Difficulty;
  tagline: string;
  price: string;
  duration: string;
  proves: string[];
}

export const ASSESSMENTS: Assessment[] = [
  { name: "JavaScript Fundamentals", difficulty: "Beginner", tagline: "Master the language of the web before anything else.", price: "₹299", duration: "60 Minutes", proves: ["Variables, Scope & Closures", "DOM Manipulation", "Async JS & Promises", "ES6+ Modern Features"] },
  { name: "React Developer", difficulty: "Intermediate", tagline: "Prove you can build real-world React applications.", price: "₹499", duration: "90 Minutes", proves: ["Hooks & State Management", "Component Architecture", "Performance Optimization", "React Router & Context"] },
  { name: "System Design Pro", difficulty: "Advanced", tagline: "Demonstrate architectural thinking at scale.", price: "₹799", duration: "120 Minutes", proves: ["Scalability Patterns", "Database Design", "Load Balancing", "API Architecture"] },
  { name: "Python for Data", difficulty: "Intermediate", tagline: "Certify your data science and analysis capabilities.", price: "₹499", duration: "90 Minutes", proves: ["Pandas & NumPy Mastery", "Data Cleaning & Wrangling", "Statistical Analysis", "Data Visualization"] },
  { name: "DevOps Practitioner", difficulty: "Advanced", tagline: "Ship, scale, and automate like a true DevOps engineer.", price: "₹699", duration: "105 Minutes", proves: ["CI/CD Pipeline Design", "Docker & Kubernetes", "Cloud Infrastructure (AWS)", "Monitoring & Observability"] },
  { name: "UI/UX Foundations", difficulty: "Beginner", tagline: "Prove your instinct for user-centered design.", price: "₹299", duration: "60 Minutes", proves: ["Wireframing & Prototyping", "Design Systems", "Accessibility Standards", "User Research Basics"] },
  { name: "Node.js Backend", difficulty: "Intermediate", tagline: "Build, secure, and deploy real backend systems.", price: "₹499", duration: "90 Minutes", proves: ["RESTful API Design", "Authentication & JWT", "Database Integration", "Error Handling & Logging"] },
  { name: "TypeScript Mastery", difficulty: "Intermediate", tagline: "Prove you think in types, not just JavaScript.", price: "₹499", duration: "90 Minutes", proves: ["Type System & Generics", "Interfaces vs Types", "Utility Types", "tsconfig & Strict Mode"] },
  { name: "SQL & Databases", difficulty: "Beginner", tagline: "Prove your data retrieval and modeling fundamentals.", price: "₹299", duration: "60 Minutes", proves: ["SELECT & JOINs", "Indexing Basics", "Normalization", "Transactions & ACID"] },
  { name: "Git & Version Control", difficulty: "Beginner", tagline: "Certify your collaboration and branching proficiency.", price: "₹199", duration: "45 Minutes", proves: ["Branching Strategy", "Merge vs Rebase", "Pull Request Workflow", "Conflict Resolution"] },
  { name: "REST API Design", difficulty: "Intermediate", tagline: "Prove you can design clean, scalable HTTP APIs.", price: "₹399", duration: "75 Minutes", proves: ["HTTP Methods & Status Codes", "Authentication Patterns", "Pagination & Filtering", "API Versioning"] },
  { name: "CSS & Responsive Design", difficulty: "Beginner", tagline: "Certify your layout and styling fundamentals.", price: "₹249", duration: "60 Minutes", proves: ["Flexbox & Grid", "Media Queries", "CSS Variables", "Animation & Transitions"] },
  { name: "Next.js Fullstack", difficulty: "Advanced", tagline: "Prove you can build production-grade fullstack apps.", price: "₹799", duration: "120 Minutes", proves: ["App Router & Server Components", "API Routes & Middleware", "SSR vs SSG vs ISR", "Deployment & Edge Functions"] },
  { name: "Data Structures & Algorithms", difficulty: "Advanced", tagline: "Demonstrate problem-solving and complexity analysis.", price: "₹699", duration: "120 Minutes", proves: ["Arrays, Stacks & Queues", "Trees & Graphs", "Sorting & Searching", "Dynamic Programming"] },
];
