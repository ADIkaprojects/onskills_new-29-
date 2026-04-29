"use client";

import { type FC, type ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

interface AssessmentCardProps {
  title: string;
  techIcon: ReactNode;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  shortDescription: string;
  fullDescription: string;
  price: string;
}

const difficultyBars: Record<
  AssessmentCardProps["difficulty"],
  [boolean, boolean, boolean]
> = {
  Beginner: [true, false, false],
  Intermediate: [true, true, false],
  Advanced: [true, true, true],
};

const AssessmentCard: FC<AssessmentCardProps> = ({
  title,
  techIcon,
  difficulty,
  shortDescription,
  fullDescription,
  price,
}) => {
  const router = useRouter();
  const bars = useMemo(() => difficultyBars[difficulty], [difficulty]);
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setAnimateBars(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className="group relative w-full max-w-[540px] cursor-pointer">
      <Card
        className="
          relative flex h-full min-h-[230px] w-full flex-col overflow-hidden
          rounded-[var(--radius-lg)]
          border border-white/[0.12]
          bg-gradient-to-br from-[#1e293b] to-[#0f172a]
          shadow-[0_24px_48px_rgba(15,23,42,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
          transition-all duration-500 ease-out
          hover:border-white/[0.25]
          hover:shadow-[0_32px_64px_rgba(15,23,42,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]
        "
        style={{ padding: "20px 22px" }}
      >
        <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[var(--color-accent)] to-[#60A5FA]" />

        <div className="flex items-center gap-3">
          <div
            className="
              relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full
              bg-[var(--color-accent-light)] text-[var(--color-accent)]
              transition-all duration-500
              group-hover:rotate-[360deg] group-hover:scale-110
            "
          >
            <div
              className="
                absolute inset-0 rounded-full border border-white/20
                opacity-0 transition-opacity duration-300
                group-hover:animate-ping group-hover:opacity-100
              "
            />
            {techIcon}
          </div>

          <div>
            <h4
              className="text-base font-semibold leading-snug text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {title}
            </h4>

            <span
              className="
                mt-1 inline-flex items-center gap-1.5
                rounded-md border border-blue-600/[0.19] bg-blue-600/[0.08]
                px-2 py-0.5
              "
            >
              <span className="flex h-[11px] items-end gap-0.5">
                {bars.map((active, i) => (
                  <span
                    key={i}
                    className="block w-[3px] rounded-sm transition-all duration-[420ms]"
                    style={{
                      height: `${5 + i * 3}px`,
                      background: active
                        ? "rgb(37,99,235)"
                        : "rgba(37,99,235,0.16)",
                      transform: animateBars && active ? "scaleY(1)" : "scaleY(0.35)",
                      transformOrigin: "bottom",
                    }}
                  />
                ))}
              </span>
              <span
                className="text-[11px] font-semibold tracking-wide text-blue-600"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {difficulty}
              </span>
            </span>
          </div>
        </div>

        <p
          className="
            mt-2.5 max-h-[48px] overflow-hidden text-[13px] leading-relaxed text-white/70
            transition-all duration-[400ms] ease-out
            line-clamp-2
            group-hover:mt-0 group-hover:max-h-0 group-hover:opacity-0
          "
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {shortDescription}
        </p>

        <div
          className="
            max-h-0 overflow-hidden opacity-0
            transition-all duration-500 ease-out
            group-hover:mt-2.5 group-hover:max-h-[200px] group-hover:opacity-100
          "
        >
          <p
            className="text-[13px] leading-relaxed text-white/80"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {fullDescription}
          </p>

          <button
            className="
              mt-4 w-full rounded-lg py-2.5 text-sm font-semibold tracking-wide text-white
              bg-gradient-to-r from-[var(--color-accent)] to-[#60A5FA]
              shadow-[0_4px_16px_rgba(37,99,235,0.35)]
              transition-all duration-300 ease-out
              hover:scale-[1.02] hover:shadow-[0_6px_24px_rgba(37,99,235,0.55)]
              active:scale-[0.98]
            "
            style={{ fontFamily: "Inter, sans-serif" }}
            onClick={(event) => {
              event.stopPropagation();
              router.push("/auth");
            }}
          >
            Start Assessment →
          </button>
        </div>

        <div
          className="
            mt-auto flex items-end justify-between
            transition-all duration-[400ms] ease-out
            group-hover:pointer-events-none group-hover:opacity-0
          "
        >
          <div
            className="text-[26px] font-bold text-[var(--color-accent)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {price}
          </div>
          <span
            className="text-[12px] italic text-[var(--color-gray-light)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Tap to see details
          </span>
        </div>

        <div
          className="
            pointer-events-none absolute inset-0
            -skew-x-12 translate-x-full
            bg-gradient-to-r from-transparent via-white/[0.04] to-transparent
            transition-transform duration-1000 ease-in-out
            group-hover:translate-x-[-200%]
          "
        />
      </Card>
    </div>
  );
};

export default AssessmentCard;
