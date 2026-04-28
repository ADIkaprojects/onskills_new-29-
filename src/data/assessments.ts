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
];
