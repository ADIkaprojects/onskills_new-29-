"use client";

import { useState, useRef, useCallback, useEffect, useId } from "react";
import { Navbar } from "@/components/Navbar";
import {
  ShoppingCart, ChevronLeft, ChevronRight, X, Trash2,
  Clock, BarChart2, CheckCircle, Tag, Search, ArrowRight,
  SlidersHorizontal, RotateCcw,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Assessment {
  id: string; title: string; description: string;
  logo: string; logoAlt: string; duration: string;
  questions: number; difficulty: "Beginner" | "Intermediate" | "Advanced";
  price: number; categoryId: string; tags: string[];
}
interface CartItem extends Assessment { quantity: number; }
interface Category { id: string; name: string; assessments: Assessment[]; }
interface FilterState {
  categories: string[]; difficulty: string[]; priceBracket: string[]; tags: string[];
}

/* ─────────────────────────────────────────────
   DATA  (prices in ₹, reasonable INR amounts)
───────────────────────────────────────────── */
const CATEGORIES: Category[] = [
  {
    id: "frontend", name: "Frontend / Web Development",
    assessments: [
      { id: "react",      title: "React Mastery",          description: "Deep-dive into hooks, context, performance patterns, and advanced component composition with real-world scenarios.",  logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",              logoAlt: "React",        duration: "45 min", questions: 30, difficulty: "Intermediate", price: 799,  categoryId: "frontend", tags: ["Hooks","JSX","State"] },
      { id: "typescript", title: "TypeScript Pro",          description: "Generics, utility types, discriminated unions and advanced type inference — prove you think in types.",              logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",   logoAlt: "TypeScript",   duration: "50 min", questions: 35, difficulty: "Advanced",     price: 1299, categoryId: "frontend", tags: ["Generics","Types","Utility"] },
      { id: "nextjs",     title: "Next.js Expert",          description: "Server components, App Router, streaming, caching strategies, and full-stack patterns in Next.js 14+.",             logo: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",                             logoAlt: "Next.js",      duration: "55 min", questions: 32, difficulty: "Advanced",     price: 1499, categoryId: "frontend", tags: ["App Router","RSC","SSR"] },
      { id: "css",        title: "CSS Architecture",        description: "Cascade layers, container queries, custom properties, and modern layout systems from Grid to subgrid.",             logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", logoAlt: "CSS3",         duration: "40 min", questions: 28, difficulty: "Intermediate", price: 699,  categoryId: "frontend", tags: ["Grid","Flex","Variables"] },
      { id: "vue",        title: "Vue.js Fundamentals",     description: "Composition API, reactivity system, Pinia state management and component best practices.",                          logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",          logoAlt: "Vue.js",       duration: "45 min", questions: 30, difficulty: "Beginner",     price: 499,  categoryId: "frontend", tags: ["Composition","Pinia","SFC"] },
    ],
  },
  {
    id: "cloud", name: "Cloud & DevOps",
    assessments: [
      { id: "aws",        title: "AWS Solutions Architect", description: "EC2, S3, Lambda, VPC design, IAM policies, and architecting for reliability and cost optimisation.",               logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", logoAlt: "AWS",          duration: "60 min", questions: 40, difficulty: "Advanced",     price: 1799, categoryId: "cloud", tags: ["EC2","Lambda","IAM"] },
      { id: "kubernetes", title: "Kubernetes Operations",   description: "Pod scheduling, Helm charts, RBAC, ingress controllers, and cluster autoscaling strategies.",                      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg", logoAlt: "Kubernetes",   duration: "55 min", questions: 36, difficulty: "Advanced",     price: 1699, categoryId: "cloud", tags: ["Pods","Helm","RBAC"] },
      { id: "azure",      title: "Microsoft Azure Core",    description: "Azure services, ARM templates, AKS, Azure AD, and hybrid cloud connectivity patterns.",                            logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",         logoAlt: "Azure",        duration: "55 min", questions: 35, difficulty: "Intermediate", price: 1299, categoryId: "cloud", tags: ["AKS","ARM","AD"] },
      { id: "docker",     title: "Docker & Containers",     description: "Image layers, multi-stage builds, Docker Compose orchestration and container security hardening.",                 logo: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",                logoAlt: "Docker",       duration: "40 min", questions: 28, difficulty: "Intermediate", price: 899,  categoryId: "cloud", tags: ["Images","Compose","Security"] },
      { id: "terraform",  title: "Terraform IaC",           description: "HCL syntax, state management, modules, workspaces, and CI/CD integration for Infrastructure as Code.",            logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Terraform_Logo.svg",          logoAlt: "Terraform",    duration: "50 min", questions: 32, difficulty: "Intermediate", price: 999,  categoryId: "cloud", tags: ["HCL","State","Modules"] },
    ],
  },
  {
    id: "ai", name: "AI Products & Machine Learning",
    assessments: [
      { id: "python-ml",  title: "Python for ML",           description: "NumPy, Pandas, Scikit-learn pipelines, data preprocessing, and model evaluation techniques.",                     logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",     logoAlt: "Python",       duration: "50 min", questions: 34, difficulty: "Intermediate", price: 999,  categoryId: "ai", tags: ["NumPy","Pandas","Sklearn"] },
      { id: "pytorch",    title: "PyTorch Deep Learning",   description: "Tensor operations, autograd, custom datasets, training loops, and model deployment workflows.",                   logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/PyTorch_logo_icon.svg",      logoAlt: "PyTorch",      duration: "60 min", questions: 38, difficulty: "Advanced",     price: 1799, categoryId: "ai", tags: ["Tensors","Autograd","CUDA"] },
      { id: "openai",     title: "OpenAI API Mastery",      description: "Prompt engineering, function calling, embeddings, RAG pipelines, and production LLM integration.",               logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",            logoAlt: "OpenAI",       duration: "45 min", questions: 30, difficulty: "Intermediate", price: 1199, categoryId: "ai", tags: ["Prompts","RAG","APIs"] },
      { id: "langchain",  title: "LangChain Workflows",     description: "Chains, agents, memory management, vector stores, and building production-ready AI applications.",               logo: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",                     logoAlt: "LangChain",    duration: "50 min", questions: 33, difficulty: "Intermediate", price: 1299, categoryId: "ai", tags: ["Chains","Agents","Memory"] },
      { id: "huggingface",title: "Hugging Face Hub",        description: "Transformers, fine-tuning with PEFT, model cards, datasets, and the Inference API ecosystem.",                   logo: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",               logoAlt: "Hugging Face", duration: "55 min", questions: 35, difficulty: "Advanced",     price: 1699, categoryId: "ai", tags: ["Transformers","PEFT","HF Hub"] },
    ],
  },
  {
    id: "backend", name: "Backend & Databases",
    assessments: [
      { id: "nodejs",     title: "Node.js Performance",     description: "Event loop internals, streams, clustering, worker threads, and building high-throughput APIs.",                   logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",            logoAlt: "Node.js",      duration: "50 min", questions: 32, difficulty: "Intermediate", price: 899,  categoryId: "backend", tags: ["Event Loop","Streams","APIs"] },
      { id: "postgresql", title: "PostgreSQL Advanced",     description: "Query optimisation, indexing strategies, JSONB, CTEs, window functions and replication setup.",                  logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",    logoAlt: "PostgreSQL",   duration: "55 min", questions: 36, difficulty: "Advanced",     price: 1299, categoryId: "backend", tags: ["Query","JSONB","Indexes"] },
      { id: "graphql",    title: "GraphQL API Design",      description: "Schema design, resolvers, DataLoader, subscriptions, federation and persisted queries.",                         logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg",            logoAlt: "GraphQL",      duration: "45 min", questions: 28, difficulty: "Intermediate", price: 899,  categoryId: "backend", tags: ["Schema","Resolvers","Federation"] },
      { id: "redis",      title: "Redis & Caching",         description: "Data structures, pub/sub, Lua scripting, cluster mode, and distributed caching patterns.",                       logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Redis_logo.svg",              logoAlt: "Redis",        duration: "40 min", questions: 26, difficulty: "Intermediate", price: 799,  categoryId: "backend", tags: ["Pub/Sub","Cluster","Cache"] },
      { id: "go",         title: "Go Concurrency",          description: "Goroutines, channels, sync primitives, profiling and writing idiomatic performant Go services.",                 logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg",            logoAlt: "Go",           duration: "55 min", questions: 34, difficulty: "Advanced",     price: 1499, categoryId: "backend", tags: ["Goroutines","Channels","Sync"] },
    ],
  },
];

const ALL_TAGS = Array.from(
  new Set(CATEGORIES.flatMap((c) => c.assessments.flatMap((a) => a.tags)))
).sort();

const PRICE_BRACKETS = [
  { id: "under500",   label: "Under ₹500",      min: 0,    max: 499 },
  { id: "500to999",   label: "₹500 – ₹999",     min: 500,  max: 999 },
  { id: "1000to1499", label: "₹1,000 – ₹1,499", min: 1000, max: 1499 },
  { id: "above1500",  label: "₹1,500 & above",  min: 1500, max: Infinity },
];

const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced"] as const;

const DIFF_CFG = {
  Beginner:     { color: "#16a34a", bg: "rgba(22,163,74,0.08)" },
  Intermediate: { color: "#d97706", bg: "rgba(217,119,6,0.08)" },
  Advanced:     { color: "#dc2626", bg: "rgba(220,38,38,0.08)" },
};

const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

/* ─────────────────────────────────────────────
   FILTER LOGIC
───────────────────────────────────────────── */
function applyFilters(cats: Category[], query: string, f: FilterState): Category[] {
  const q = query.toLowerCase().trim();
  return cats
    .map((cat) => {
      if (f.categories.length > 0 && !f.categories.includes(cat.id))
        return { ...cat, assessments: [] };
      const filtered = cat.assessments.filter((a) => {
        if (q && ![a.title, a.description, a.logoAlt, ...a.tags].some((s) => s.toLowerCase().includes(q))) return false;
        if (f.difficulty.length > 0 && !f.difficulty.includes(a.difficulty)) return false;
        if (f.priceBracket.length > 0 && !f.priceBracket.some((bid) => {
          const b = PRICE_BRACKETS.find((p) => p.id === bid)!;
          return a.price >= b.min && a.price <= b.max;
        })) return false;
        if (f.tags.length > 0 && !f.tags.some((t) => a.tags.includes(t))) return false;
        return true;
      });
      return { ...cat, assessments: filtered };
    })
    .filter((c) => c.assessments.length > 0);
}

/* ─────────────────────────────────────────────
   SEARCH BAR
───────────────────────────────────────────── */
function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
      <div style={{ pointerEvents: "none", position: "absolute", left: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", paddingLeft: 12, color: focused ? "#1D6EF5" : "#94A3B8", transition: "color 200ms" }}>
        <Search size={15} strokeWidth={2} />
      </div>
      <input
        id={id} type="search" value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search assessments…"
        style={{
          width: "100%", height: 42, paddingLeft: 38, paddingRight: value ? 36 : 14,
          borderRadius: 12, border: `1.5px solid ${focused ? "rgba(29,110,245,0.5)" : "rgba(200,210,230,0.7)"}`,
          background: "#fff", fontFamily: "DM Sans, sans-serif", fontSize: 14,
          color: "var(--color-navy)", outline: "none",
          boxShadow: focused ? "0 0 0 3px rgba(29,110,245,0.10)" : "0 1px 4px rgba(10,22,40,0.05)",
          transition: "border-color 200ms, box-shadow 200ms",
        }}
      />
      {value && (
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", paddingRight: 11, color: "#1D6EF5", pointerEvents: "none" }}>
          <ArrowRight size={14} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FILTER BUTTON + DROPDOWN
───────────────────────────────────────────── */
function FilterButton({ filters, onChange }: { filters: FilterState; onChange: (f: FilterState) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const activeCount = Object.values(filters).flat().length;

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const toggle = <K extends keyof FilterState>(key: K, val: string) => {
    const arr = filters[key] as string[];
    onChange({ ...filters, [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val] });
  };
  const reset = () => onChange({ categories: [], difficulty: [], priceBracket: [], tags: [] });

  /* ── Reusable row ── */
  const CheckRow = ({ label, checked, onClick, color }: { label: string; checked: boolean; onClick: () => void; color?: string }) => (
    <button onClick={onClick}
      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "7px 14px", background: checked ? "rgba(29,110,245,0.06)" : "transparent", border: "none", borderRadius: 8, cursor: "pointer", textAlign: "left", transition: "background 140ms" }}
      onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = "rgba(29,110,245,0.03)"; }}
      onMouseLeave={(e) => { if (!checked) e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ width: 16, height: 16, borderRadius: 4, border: checked ? "none" : "1.5px solid rgba(200,210,230,0.8)", background: checked ? "#1D6EF5" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 140ms" }}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: checked ? 600 : 400, color: color || (checked ? "#1D6EF5" : "#475569"), transition: "color 140ms" }}>{label}</span>
    </button>
  );

  const Divider = () => <div style={{ height: 1, background: "rgba(200,210,230,0.4)", margin: "4px 14px 12px" }} />;
  const SectionLabel = ({ t }: { t: string }) => (
    <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 11, color: "#94A3B8", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 4px", padding: "0 14px" }}>{t}</p>
  );

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      {/* Circular trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open filters"
        style={{
          width: 42, height: 42, borderRadius: 999,
          border: `1.5px solid ${open || activeCount > 0 ? "rgba(29,110,245,0.55)" : "rgba(200,210,230,0.7)"}`,
          background: open || activeCount > 0 ? "rgba(29,110,245,0.07)" : "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative", transition: "all 200ms ease",
          boxShadow: open ? "0 0 0 3px rgba(29,110,245,0.1)" : "0 1px 4px rgba(10,22,40,0.05)",
          color: open || activeCount > 0 ? "#1D6EF5" : "#64748B",
        }}
        onMouseEnter={(e) => { if (!open && !activeCount) { e.currentTarget.style.borderColor = "rgba(29,110,245,0.35)"; e.currentTarget.style.color = "#1D6EF5"; } }}
        onMouseLeave={(e) => { if (!open && !activeCount) { e.currentTarget.style.borderColor = "rgba(200,210,230,0.7)"; e.currentTarget.style.color = "#64748B"; } }}
      >
        <SlidersHorizontal size={16} strokeWidth={2} />
        {activeCount > 0 && (
          <span style={{ position: "absolute", top: -4, right: -4, width: 17, height: 17, borderRadius: 999, background: "#1D6EF5", color: "#fff", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #F8F9FF" }}>
            {activeCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 300, background: "#fff", borderRadius: 16, border: "1.5px solid rgba(200,210,230,0.6)", boxShadow: "0 16px 48px rgba(10,22,40,0.12), 0 2px 8px rgba(10,22,40,0.06)", zIndex: 300, overflow: "hidden", animation: "dropIn 180ms cubic-bezier(0.34,1.56,0.64,1)" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 14px 10px", borderBottom: "1px solid rgba(200,210,230,0.45)" }}>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 14, color: "var(--color-navy)" }}>Filters</span>
            {activeCount > 0 && (
              <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#1D6EF5", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 12, padding: "4px 8px", borderRadius: 6 }}>
                <RotateCcw size={11} />Reset all
              </button>
            )}
          </div>

          <div style={{ padding: "12px 0", maxHeight: 440, overflowY: "auto" }}>

            {/* Category */}
            <SectionLabel t="Category" />
            {CATEGORIES.map((cat) => (
              <CheckRow key={cat.id} label={cat.name} checked={filters.categories.includes(cat.id)} onClick={() => toggle("categories", cat.id)} />
            ))}

            <Divider />

            {/* Difficulty */}
            <SectionLabel t="Difficulty" />
            {DIFFICULTY_OPTIONS.map((d) => (
              <CheckRow key={d} label={d} checked={filters.difficulty.includes(d)} onClick={() => toggle("difficulty", d)} color={DIFF_CFG[d].color} />
            ))}

            <Divider />

            {/* Price */}
            <SectionLabel t="Price" />
            {PRICE_BRACKETS.map((b) => (
              <CheckRow key={b.id} label={b.label} checked={filters.priceBracket.includes(b.id)} onClick={() => toggle("priceBracket", b.id)} />
            ))}

            <Divider />

            {/* Technology tags */}
            <SectionLabel t="Technology" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "4px 14px" }}>
              {ALL_TAGS.map((tag) => {
                const active = filters.tags.includes(tag);
                return (
                  <button key={tag} onClick={() => toggle("tags", tag)}
                    style={{ padding: "4px 10px", borderRadius: 999, border: `1.5px solid ${active ? "#1D6EF5" : "rgba(200,210,230,0.7)"}`, background: active ? "rgba(29,110,245,0.08)" : "#fff", fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: active ? 600 : 400, color: active ? "#1D6EF5" : "#64748B", cursor: "pointer", transition: "all 140ms" }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {activeCount > 0 && (
            <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(200,210,230,0.45)", background: "rgba(29,110,245,0.03)" }}>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#64748B" }}>{activeCount} filter{activeCount !== 1 ? "s" : ""} active</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ASSESSMENT CARD
───────────────────────────────────────────── */
function AssessmentCard({ assessment: a, onAddToCart, inCart }: { assessment: Assessment; onAddToCart: (a: Assessment) => void; inCart: boolean }) {
  const [hovered, setHovered] = useState(false);
  const diff = DIFF_CFG[a.difficulty];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 300, flexShrink: 0, borderRadius: 20,
        background: "#F8FAFF",
        border: `1.5px solid ${hovered ? "rgba(29,110,245,0.55)" : "rgba(200,210,230,0.6)"}`,
        boxShadow: hovered ? "0 0 0 4px rgba(29,110,245,0.10), 0 8px 40px rgba(29,110,245,0.14)" : "0 2px 16px rgba(10,22,40,0.07)",
        transition: "border-color 260ms, box-shadow 260ms, transform 200ms",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        overflow: "hidden", cursor: "pointer",
      }}
    >
      {/* Logo area */}
      <div style={{ position: "relative", height: 160, background: hovered ? "linear-gradient(135deg,#EEF4FF,#F0F7FF)" : "linear-gradient(135deg,#F2F6FF,#F8FBFF)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 260ms", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(29,110,245,0.05)", top: -30, right: -20 }} />
        <div style={{ position: "absolute", width: 80,  height: 80,  borderRadius: "50%", background: "rgba(29,110,245,0.04)", bottom: -10, left: -10 }} />

        <img src={a.logo} alt={a.logoAlt} width={72} height={72}
          style={{ objectFit: "contain", transition: "transform 300ms cubic-bezier(0.34,1.56,0.64,1)", transform: hovered ? "scale(0.85)" : "scale(1)", filter: "drop-shadow(0 4px 12px rgba(10,22,40,0.1))", position: "relative", zIndex: 1 }}
        />

        {/* Add to cart overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(248,250,255,0.93)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity 220ms", zIndex: 2 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(a); }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", borderRadius: 999, border: "none", background: inCart ? "linear-gradient(135deg,#16a34a,#15803d)" : "linear-gradient(135deg,#1D6EF5,#0050E6)", color: "#fff", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13, cursor: inCart ? "default" : "pointer", boxShadow: inCart ? "0 4px 16px rgba(22,163,74,0.35)" : "0 4px 16px rgba(29,110,245,0.4)", transition: "transform 150ms, box-shadow 150ms" }}
            onMouseEnter={(e) => { if (!inCart) { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(29,110,245,0.5)"; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = inCart ? "0 4px 16px rgba(22,163,74,0.35)" : "0 4px 16px rgba(29,110,245,0.4)"; }}
          >
            {inCart ? <><CheckCircle size={15} />Added</> : <><ShoppingCart size={15} />Add to Cart</>}
          </button>
        </div>

        {/* Difficulty badge */}
        <span style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 999, background: diff.bg, color: diff.color, fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 11, zIndex: 3, border: `1px solid ${diff.color}22` }}>
          {a.difficulty}
        </span>
        {/* Price badge */}
        <span style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(255,255,255,0.92)", color: "var(--color-navy)", fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 13, zIndex: 3, boxShadow: "0 2px 8px rgba(10,22,40,0.08)", border: "1px solid rgba(200,210,230,0.5)" }}>
          {fmt(a.price)}
        </span>
      </div>

      {/* Text content */}
      <div style={{ padding: "18px 20px 20px" }}>
        <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--color-navy)", margin: "0 0 6px", lineHeight: 1.3 }}>{a.title}</h3>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "#64748B", margin: "0 0 14px", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.description}</p>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, padding: "10px 12px", background: "rgba(29,110,245,0.04)", borderRadius: 10, border: "1px solid rgba(29,110,245,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} color="#1D6EF5" /><span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 500, color: "#475569" }}>{a.duration}</span></div>
          <div style={{ width: 1, height: 12, background: "rgba(29,110,245,0.15)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}><BarChart2 size={12} color="#1D6EF5" /><span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, fontWeight: 500, color: "#475569" }}>{a.questions} Qs</span></div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {a.tags.map((tag) => (
            <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 999, background: "rgba(29,110,245,0.06)", border: "1px solid rgba(29,110,245,0.12)", fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 11, color: "#1D6EF5" }}>
              <Tag size={9} />{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY CAROUSEL
───────────────────────────────────────────── */
function CategoryCarousel({ category, cartItems, onAddToCart }: { category: Category; cartItems: CartItem[]; onAddToCart: (a: Assessment) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  const scroll = (dir: "left" | "right") => {
    trackRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
    setTimeout(checkScroll, 400);
  };

  const isInCart = (id: string) => cartItems.some((c) => c.id === id);

  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, padding: "0 2px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 4, height: 22, borderRadius: 2, background: "linear-gradient(180deg,#1D6EF5,#0050E6)" }} />
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 17, color: "var(--color-navy)", margin: 0, letterSpacing: "-0.01em" }}>{category.name}</h2>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 12, color: "#1D6EF5" }}>{category.assessments.length} assessments</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {([{ dir: "left" as const, Icon: ChevronLeft, can: canLeft }, { dir: "right" as const, Icon: ChevronRight, can: canRight }]).map(({ dir, Icon, can }) => (
            <button key={dir} onClick={() => scroll(dir)} disabled={!can}
              style={{ width: 36, height: 36, borderRadius: 999, border: "1.5px solid", borderColor: can ? "rgba(29,110,245,0.3)" : "rgba(200,210,230,0.5)", background: can ? "rgba(29,110,245,0.05)" : "rgba(248,250,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: can ? "pointer" : "not-allowed", transition: "all 200ms", color: can ? "#1D6EF5" : "#94A3B8" }}
              onMouseEnter={(e) => { if (can) { e.currentTarget.style.background = "rgba(29,110,245,0.12)"; e.currentTarget.style.borderColor = "rgba(29,110,245,0.5)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = can ? "rgba(29,110,245,0.05)" : "rgba(248,250,255,0.5)"; e.currentTarget.style.borderColor = can ? "rgba(29,110,245,0.3)" : "rgba(200,210,230,0.5)"; }}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 40, background: "linear-gradient(to right,#F8F9FF,transparent)", zIndex: 10, pointerEvents: "none", opacity: canLeft ? 1 : 0, transition: "opacity 200ms" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 40, background: "linear-gradient(to left,#F8F9FF,transparent)", zIndex: 10, pointerEvents: "none", opacity: canRight ? 1 : 0, transition: "opacity 200ms" }} />
        <div ref={trackRef} onScroll={checkScroll} className="no-scrollbar" style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 12, paddingTop: 4, scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {category.assessments.map((a) => (
            <AssessmentCard key={a.id} assessment={a} onAddToCart={onAddToCart} inCart={isInCart(a.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CART DRAWER
───────────────────────────────────────────── */
function CartDrawer({ items, onRemove, onClose }: { items: CartItem[]; onRemove: (id: string) => void; onClose: () => void }) {
  const total = items.reduce((s, i) => s + i.price, 0);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.35)", zIndex: 200, backdropFilter: "blur(2px)", animation: "fadeIn 200ms ease" }} />
      <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 420, maxWidth: "95vw", background: "#fff", zIndex: 201, display: "flex", flexDirection: "column", boxShadow: "-8px 0 48px rgba(10,22,40,0.12)", animation: "slideInRight 280ms cubic-bezier(0.4,0,0.2,1)" }}>
        {/* Header */}
        <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(200,210,230,0.5)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1D6EF5,#0050E6)", display: "flex", alignItems: "center", justifyContent: "center" }}><ShoppingCart size={18} color="#fff" /></div>
            <div>
              <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--color-navy)", margin: 0 }}>Your Cart</h2>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#64748B", margin: 0 }}>{items.length} assessment{items.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(200,210,230,0.6)", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748B" }}><X size={16} /></button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, color: "#94A3B8" }}>
              <ShoppingCart size={48} strokeWidth={1.2} />
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, margin: 0 }}>Your cart is empty</p>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, margin: 0, textAlign: "center", color: "#CBD5E1" }}>Add an assessment to get started</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 14, background: "#F8FAFF", border: "1px solid rgba(200,210,230,0.5)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#EEF4FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <img src={item.logo} alt={item.logoAlt} width={28} height={28} style={{ objectFit: "contain" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: "var(--color-navy)", margin: "0 0 3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                    <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#64748B" }}>{item.duration} · {item.questions} Qs</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 15, color: "var(--color-navy)" }}>{fmt(item.price)}</span>
                    <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex", padding: 0, transition: "color 150ms" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")} onMouseLeave={(e) => (e.currentTarget.style.color = "#94A3B8")}><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "20px 24px 28px", borderTop: "1px solid rgba(200,210,230,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "12px 14px", background: "rgba(29,110,245,0.04)", borderRadius: 12, border: "1px solid rgba(29,110,245,0.08)" }}>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#64748B" }}>Total ({items.length} items)</span>
              <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 22, color: "var(--color-navy)" }}>{fmt(total)}</span>
            </div>
            <button
              style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#1D6EF5,#0050E6)", color: "#fff", fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 6px 24px rgba(29,110,245,0.35)", transition: "all 200ms", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(29,110,245,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(29,110,245,0.35)"; }}
            >
              <ShoppingCart size={16} />Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes slideInRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   FLOATING CART BUTTON
───────────────────────────────────────────── */
function FloatingCartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ position: "fixed", bottom: 32, right: 32, width: 58, height: 58, borderRadius: 999, background: "linear-gradient(135deg,#1D6EF5,#0050E6)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 28px rgba(29,110,245,0.42)", zIndex: 150, transition: "transform 200ms, box-shadow 200ms" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(29,110,245,0.52)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(29,110,245,0.42)"; }}
    >
      <ShoppingCart size={22} color="#fff" />
      {count > 0 && (
        <span style={{ position: "absolute", top: 6, right: 6, width: 18, height: 18, borderRadius: 999, background: "#F43F5E", color: "#fff", fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #fff" }}>
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MAIN CART PAGE
───────────────────────────────────────────── */
export function Cart() {
  const [cartItems,   setCartItems]   = useState<CartItem[]>([]);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [], difficulty: [], priceBracket: [], tags: [],
  });

  const addToCart    = (a: Assessment) => setCartItems((p) => p.some((i) => i.id === a.id) ? p : [...p, { ...a, quantity: 1 }]);
  const removeFromCart = (id: string) => setCartItems((p) => p.filter((i) => i.id !== id));

  const filteredCats = applyFilters(CATEGORIES, searchQuery, filters);
  const totalResults = filteredCats.reduce((s, c) => s + c.assessments.length, 0);
  const isFiltering  = searchQuery.trim() !== "" || Object.values(filters).some((v) => v.length > 0);

  return (
    <div style={{ minHeight: "100vh", background: "#F0F2F5" }}>
      <Navbar />

      <main style={{ paddingTop: 88 }}>
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "40px max(4vw,20px) 80px" }}>

          {/* ── Header row: title left | search+filter right ── */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, marginBottom: 44, flexWrap: "wrap" }}>

            {/* Left */}
            <div style={{ flex: "1 1 320px", minWidth: 0 }}>
              <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,42px)", color: "var(--color-navy)", margin: "0 0 10px", letterSpacing: "-0.025em", lineHeight: 1.2 }}>
                Prove Your Skills.<br />
                <span style={{ color: "#1D6EF5" }}>Get Certified.</span>
              </h1>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, color: "#64748B", margin: 0, maxWidth: 480, lineHeight: 1.65 }}>
                Browse assessments across every tech domain. Add to cart and unlock your certificates when you pass.
              </p>

              {cartItems.length > 0 && (
                <div style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 16, padding: "10px 18px", borderRadius: 14, background: "rgba(29,110,245,0.06)", border: "1px solid rgba(29,110,245,0.15)" }}>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 500, fontSize: 14, color: "#475569" }}>{cartItems.length} in cart</span>
                  <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 16, color: "var(--color-navy)" }}>{fmt(cartItems.reduce((s, i) => s + i.price, 0))}</span>
                  <button onClick={() => setDrawerOpen(true)} style={{ padding: "6px 14px", borderRadius: 999, border: "none", background: "#1D6EF5", color: "#fff", fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Review Cart</button>
                </div>
              )}
            </div>

            {/* Right: search + filter button */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 8, flexShrink: 0 }}>
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
              <FilterButton filters={filters} onChange={setFilters} />
            </div>
          </div>

          {/* Results context bar */}
          {isFiltering && (
            <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "#64748B" }}>
                {totalResults === 0 ? "No assessments match your filters." : `Showing ${totalResults} assessment${totalResults !== 1 ? "s" : ""}`}
              </span>
              <button onClick={() => { setSearchQuery(""); setFilters({ categories: [], difficulty: [], priceBracket: [], tags: [] }); }} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", color: "#1D6EF5", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 13, padding: 0 }}>
                <RotateCcw size={12} />Clear all
              </button>
            </div>
          )}

          {/* Carousels */}
          {filteredCats.length > 0 ? (
            filteredCats.map((cat) => (
              <CategoryCarousel key={cat.id} category={cat} cartItems={cartItems} onAddToCart={addToCart} />
            ))
          ) : isFiltering ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", color: "#94A3B8", gap: 14 }}>
              <Search size={52} strokeWidth={1.2} />
              <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 18, margin: 0, color: "#CBD5E1" }}>No results found</p>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, margin: 0 }}>Try adjusting your search or clearing the filters</p>
            </div>
          ) : null}

        </section>
      </main>

      <FloatingCartButton count={cartItems.length} onClick={() => setDrawerOpen(true)} />

      {drawerOpen && <CartDrawer items={cartItems} onRemove={removeFromCart} onClose={() => setDrawerOpen(false)} />}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-decoration { appearance: none; -webkit-appearance: none; }
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.95) translateY(-6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  );
}