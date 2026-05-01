import { NextRequest } from 'next/server';
import { Mistral } from '@mistralai/mistralai';
import type { GeneratedRoadmap, TechStackNode } from '@/types/roadmap';

const client = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const parseJsonSafely = (text: string | null | undefined, fallback: any) => {
  if (!text) return fallback;
  try {
    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error("JSON Parse Error:", e, text);
    return fallback;
  }
};

interface GenerateRoadmapRequest {
  resumeText: string;
  userGaps: string;
}

export async function POST(request: NextRequest) {
  const { resumeText, userGaps } = (await request.json()) as GenerateRoadmapRequest;

  // ─── STEP 1: Extract tech stacks ───────────────────────────────────────────
  // Ask Mistral to identify all relevant tech stacks from the resume AND user gaps.
  // Output: a flat JSON array of tech stack identifiers.

  const step1Response = await client.chat.complete({
    model: "open-mistral-nemo",
    messages: [
      {
        role: "system",
        content: "You are a senior engineering mentor. You ONLY respond in valid JSON."
      },
      {
        role: "user",
        content: `
You are analyzing a developer's resume and their self-described skill gaps.

Your task: Identify all tech stacks that are relevant to build a personalized skill roadmap for this developer.

Rules:
1. Include ALL tech stacks the user explicitly mentioned in their gaps (mark isUserRequested: true).
2. Include key tech stacks found in their resume that they should also learn to ace (mark isUserRequested: false). Limit to 3-4 max from the resume.
3. Keep each tech stack name concise (e.g. "React", "TypeScript", "Node.js", "AWS S3").
4. Set "level" based on context clues: Beginner / Intermediate / Advanced.
5. For isUserRequested=false nodes, set aceMessage to a 1-sentence explanation.

Respond ONLY with a JSON array matching this schema:
[
  {
    "id": "react",
    "name": "React",
    "level": "Intermediate",
    "isUserRequested": true,
    "aceMessage": null,
    "color": "#2563EB"
  },
  {
    "id": "typescript",
    "name": "TypeScript",
    "level": "Beginner",
    "isUserRequested": false,
    "aceMessage": "You didn't ask for this, but TypeScript is central to your resume — here's how to ace it too.",
    "color": "#F59E0B"
  }
]

Resume:
${resumeText}

User's self-described gaps:
${userGaps || "No specific gaps mentioned. Focus on resume tech stacks."}

ONLY respond with a valid JSON array. No markdown, no explanation.
        `
      }
    ]
  });

  const step1Text = step1Response.choices?.[0]?.message?.content;
  const techStackList: Omit<TechStackNode, 'phases' | 'detailedPath' | 'totalDuration'>[] =
    parseJsonSafely(typeof step1Text === 'string' ? step1Text : null, []);

  // ─── STEP 2: Generate full roadmap per tech stack ──────────────────────────
  // For each tech stack, ask Mistral to generate phases, todos, assessments, and detailed path.
  // Uses Promise.all with staggered delay (same rate-limit mitigation pattern as NAVICA).

  const techNodesWithDetail: TechStackNode[] = await Promise.all(
    techStackList.map(async (tech, index) => {
      await delay(1000 * index);  // stagger to avoid 429 rate limit errors

      const step2Response = await client.chat.complete({
        model: "open-mistral-nemo",
        messages: [
          {
            role: "system",
            content: "You are a senior engineering mentor. You ONLY respond in valid JSON."
          },
          {
            role: "user",
            content: `
You are generating a detailed skill roadmap for a developer who wants to learn or improve: ${tech.name} (${tech.level} level).

Their resume context:
${resumeText.slice(0, 2000)}

Their stated gaps:
${userGaps || "None specified."}

Generate a roadmap with 3-4 phases. Each phase should span 1-2 weeks.

Respond ONLY with JSON matching this exact schema:
{
  "totalDuration": "6 weeks",
  "phases": [
    {
      "phaseNumber": 1,
      "title": "Foundation",
      "weekRange": "Week 1–2",
      "objective": "Understand core concepts and build first project",
      "todos": [
        {
          "task": "Complete the official React docs tutorial",
          "description": "Go through react.dev/learn from start to finish. Focus on rendering, state, and events.",
          "deadline": "End of Week 1",
          "resourceHint": "react.dev/learn (official docs)"
        }
      ],
      "assessments": [
        {
          "name": "React Developer",
          "reason": "Validates your grasp of component architecture before moving to state management."
        }
      ],
      "completionCriteria": "You can build and render a React component that fetches and displays API data."
    }
  ],
  "detailedPath": [
    "① Understand the virtual DOM and how React reconciliation works",
    "② Master JSX syntax and component composition patterns",
    "③ Learn all core hooks: useState, useEffect, useContext, useRef",
    "④ Implement client-side routing with React Router v6",
    "⑤ Connect to a REST API using fetch or axios inside useEffect",
    "⑥ Manage global state with Context API or Zustand",
    "⑦ Optimize performance with useMemo, useCallback, and React.memo",
    "⑧ Write unit tests with Vitest and React Testing Library"
  ]
}

IMPORTANT:
- Assessment names MUST be one of these valid names that exist in our platform:
  JavaScript Fundamentals, React Developer, System Design Pro, Python for Data,
  DevOps Practitioner, UI/UX Foundations, Node.js Backend, TypeScript Mastery,
  SQL & Databases, Git & Version Control, REST API Design, CSS & Responsive Design,
  Next.js Fullstack, Data Structures & Algorithms
- Only reference assessments that are genuinely relevant to ${tech.name}.
- Keep detailedPath to 6-10 actionable steps.
- ONLY respond with valid JSON. No markdown. No explanation.
            `
          }
        ]
      });

      const step2Text = step2Response.choices?.[0]?.message?.content;
      const detail = parseJsonSafely(typeof step2Text === 'string' ? step2Text : null, {});

      return { ...tech, ...detail };
    })
  );

  // ─── STEP 3: Build overall summary ─────────────────────────────────────────

  const totalWeeks = Math.max(
    ...techNodesWithDetail.map(n => parseInt(n.totalDuration || "4"))
  );

  const roadmap: GeneratedRoadmap = {
    summary: `Your personalized roadmap covers ${techNodesWithDetail.length} tech stack${techNodesWithDetail.length > 1 ? 's' : ''} over approximately ${totalWeeks} weeks. Click any node on the canvas to explore its detailed mastery path.`,
    totalDuration: `${totalWeeks} weeks`,
    techNodes: techNodesWithDetail,
  };

  return new Response(JSON.stringify(roadmap), { status: 200 });
}
