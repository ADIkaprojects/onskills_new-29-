"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CircleDot, GitBranch, MousePointerClick, ShieldCheck, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssessmentCard {
  id: string;
  stack: string;
  title: string;
  image: string;
  flow: string;
  criteria: string[];
}

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: Tab[];
  defaultTab?: string;
  className?: string;
}

const cardBase =
  "rounded-2xl border border-white/10 bg-slate-950/65 p-3 shadow-[0_14px_28px_rgba(2,6,23,0.5)] backdrop-blur";

const AssessmentItem = ({ card }: { card: AssessmentCard }) => {
  return (
    <article className={cn(cardBase, "grid gap-3 md:grid-cols-[140px_1fr]")}>
      <img
        src={card.image}
        alt={`${card.stack} stack`}
        className="h-32 w-full rounded-xl object-cover md:h-full"
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-200">
            {card.stack}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-slate-300">
            <CircleDot className="h-3.5 w-3.5 text-cyan-300" />
            Proving Ground
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-100">{card.title}</h3>

        <div className="flex items-start gap-2 text-xs text-slate-300">
          <GitBranch className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-300" />
          <span>{card.flow}</span>
        </div>

        <ul className="space-y-1.5">
          {card.criteria.map((item) => (
            <li key={`${card.id}-${item}`} className="flex items-start gap-2 text-xs text-slate-200/90">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-slate-300">
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
            Badge verified on pass
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-sky-300">
            <Target className="h-3.5 w-3.5" />
            View brief
          </span>
        </div>
      </div>
    </article>
  );
};

const defaultCards: AssessmentCard[] = [
  {
    id: "aws",
    stack: "AWS",
    title: "AWS Solutions Architect",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1600&auto=format&fit=crop",
    flow: "Scenario kickoff -> architecture draft -> resiliency checks -> cost review",
    criteria: ["VPC topology decisions", "High availability strategy", "Cost/performance tradeoff notes"],
  },
  {
    id: "azure",
    stack: "Azure",
    title: "Azure Fundamentals",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    flow: "Service mapping -> identity baseline -> governance quiz -> final validation",
    criteria: ["Core services understanding", "Identity and access clarity", "Security defaults selection"],
  },
  {
    id: "k8s",
    stack: "Kubernetes",
    title: "Kubernetes CKAD",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1600&auto=format&fit=crop",
    flow: "Deploy baseline app -> wire networking -> debug failures under timer",
    criteria: ["Deployment correctness", "Service networking", "Troubleshooting speed"],
  },
  {
    id: "security",
    stack: "Security",
    title: "Security+ Core",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600&auto=format&fit=crop",
    flow: "Threat scenario -> control mapping -> incident trace -> audit response",
    criteria: ["Threat model quality", "Access control coverage", "Auditability and evidence"],
  },
  {
    id: "system",
    stack: "System Design",
    title: "System Design",
    image:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?q=80&w=1600&auto=format&fit=crop",
    flow: "Requirement intake -> architecture proposal -> scale stress -> tradeoff defense",
    criteria: ["Scalability strategy", "Caching and consistency plan", "Decision rationale quality"],
  },
];

const defaultTabs: Tab[] = [
  {
    id: "aws",
    label: "AWS",
    content: (
      <div className="grid gap-3">
        <AssessmentItem card={defaultCards[0]} />
      </div>
    ),
  },
  {
    id: "azure",
    label: "AZURE",
    content: (
      <div className="grid gap-3">
        <AssessmentItem card={defaultCards[1]} />
      </div>
    ),
  },
  {
    id: "kubernetes",
    label: "KUBERNETES",
    content: (
      <div className="grid gap-3">
        <AssessmentItem card={defaultCards[2]} />
      </div>
    ),
  },
  {
    id: "security",
    label: "SECURITY",
    content: (
      <div className="grid gap-3">
        <AssessmentItem card={defaultCards[3]} />
      </div>
    ),
  },
  {
    id: "system-design",
    label: "SYSTEM DESIGN",
    content: (
      <div className="grid gap-3">
        <AssessmentItem card={defaultCards[4]} />
      </div>
    ),
  },
];

const AnimatedTabs = ({ tabs = defaultTabs, defaultTab, className }: AnimatedTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  if (!tabs?.length) return null;

  return (
    <div className={cn("w-full max-w-4xl flex flex-col gap-y-2", className)}>
      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-sky-200">
        <MousePointerClick className="h-3.5 w-3.5" />
        Click a tab to switch assessment groups
      </div>

      <div className="flex flex-wrap gap-1.5 rounded-xl border border-white/20 bg-slate-900/80 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative cursor-pointer rounded-lg border px-2.5 py-1.5 text-xs font-semibold text-white outline-none transition-all",
              "hover:scale-[1.02] hover:border-sky-300/50 hover:bg-slate-800",
              "focus-visible:ring-2 focus-visible:ring-sky-300/70",
              activeTab === tab.id
                ? "border-sky-300/50 bg-sky-500/15 shadow-[0_0_0_1px_rgba(125,211,252,0.25)]"
                : "border-white/15 bg-slate-900/70",
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-lg bg-sky-500/10"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="min-h-60 rounded-xl border border-white/10 bg-[#11111198] p-4 text-white shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm">
        {tabs.map(
          (tab) =>
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, x: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "circInOut", type: "spring" }}
              >
                {tab.content}
              </motion.div>
            ),
        )}
      </div>
    </div>
  );
};

export { AnimatedTabs, type Tab };
