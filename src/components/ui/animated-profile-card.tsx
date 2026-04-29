"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { forwardRef, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   SECTION 1 — Original exports (do not modify)
───────────────────────────────────────────── */

export type SocialItem = {
  id: string;
  url: string;
  icon: React.ReactNode;
  label: string;
};

export interface IdentityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  fullName: string;
  place: string;
  about: string;
  avatarUrl: string;
  avatarText: string;
  scheme?: "plain" | "accented";
  socials?: SocialItem[];
  displayAvatar?: boolean;
  titleCss?: React.CSSProperties;
  cardCss?: React.CSSProperties;
  descClass?: string;
  bioClass?: string;
  footerClass?: string;
}

export const IdentityCardBody = forwardRef<HTMLDivElement, IdentityCardProps>(
  (
    {
      fullName,
      place,
      about,
      avatarUrl,
      avatarText,
      scheme = "plain",
      socials = [],
      displayAvatar = true,
      titleCss,
      cardCss,
      descClass,
      bioClass,
      footerClass,
      className,
      ...rest
    },
    ref
  ) => {
    const isAccent = scheme === "accented";
    return (
      <Card
        ref={ref}
        style={cardCss}
        className={cn(
          "flex flex-col rounded-3xl border-0 p-8",
          isAccent ? "text-[var(--on-accent-foreground)]" : "bg-card text-card-foreground",
          className
        )}
        {...rest}
      >
        <CardHeader className="p-0">
          <div className={cn(!displayAvatar && "invisible")}>
            <Avatar
              className="h-16 w-16 ring-2 ring-offset-4 ring-offset-card"
              style={{ "--tw-ring-color": "var(--accent-color)" } as React.CSSProperties}
            >
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{avatarText}</AvatarFallback>
            </Avatar>
          </div>
          <CardDescription
            className={cn("pt-6 text-left", !isAccent && "text-muted-foreground", descClass)}
            style={isAccent ? { color: "var(--on-accent-muted-foreground)" } : {}}
          >
            {place}
          </CardDescription>
          <CardTitle
            className="text-3xl text-left"
            style={{ ...(isAccent ? { color: "var(--on-accent-foreground)" } : {}), ...titleCss }}
          >
            {fullName}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6 flex-grow p-0">
          <p
            className={cn("text-base leading-relaxed text-left", !isAccent && "text-foreground/80", bioClass)}
            style={isAccent ? { opacity: 0.9 } : {}}
          >
            {about}
          </p>
        </CardContent>
        {socials.length > 0 && (
          <CardFooter className={cn("mt-6 p-0", footerClass)}>
            <div
              className={cn("flex items-center gap-4", !isAccent && "text-muted-foreground")}
              style={isAccent ? { color: "var(--on-accent-muted-foreground)" } : undefined}
            >
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("transition-opacity", isAccent ? "hover:opacity-75" : "hover:text-foreground")}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  }
);
IdentityCardBody.displayName = "IdentityCardBody";

export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  base: React.ReactNode;
  overlay: React.ReactNode;
  accent?: string;
  textOnAccent?: string;
  mutedOnAccent?: string;
  overlayClassName?: string;
}

export const RevealCardContainer = forwardRef<HTMLDivElement, RevealCardProps>(
  (
    {
      base,
      overlay,
      accent = "var(--primary)",
      textOnAccent = "#fff",
      mutedOnAccent = "rgba(255,255,255,0.8)",
      overlayClassName,
      className,
      ...rest
    },
    ref
  ) => {
    const holderRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();
    const overlayMode = resolvedTheme === "dark" ? "light" : "dark";

    const assignRef = useCallback(
      (el: HTMLDivElement | null) => {
        holderRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
      },
      [ref]
    );

    const startClip = "circle(42px at 52px 52px)";
    const expandClip = "circle(180% at 52px 52px)";

    useGSAP(() => {
      gsap.set(overlayRef.current, { clipPath: startClip });
    }, { scope: holderRef });

    const reveal = () => {
      gsap.to(overlayRef.current, {
        clipPath: expandClip,
        duration: 0.78,
        ease: "expo.inOut",
      });
    };
    const conceal = () => {
      gsap.to(overlayRef.current, {
        clipPath: startClip,
        duration: 0.92,
        ease: "expo.out(1, 1)",
      });
    };

    return (
      <div
        ref={assignRef}
        onMouseEnter={reveal}
        onMouseLeave={conceal}
        style={
          {
            "--accent-color": accent,
            "--on-accent-foreground": textOnAccent,
            "--on-accent-muted-foreground": mutedOnAccent,
            borderColor: "var(--accent-color)",
          } as React.CSSProperties
        }
        className={cn("relative w-[350px] overflow-hidden rounded-3xl border-2", className)}
        {...rest}
      >
        <div>{base}</div>
        <div
          ref={overlayRef}
          className={cn("absolute inset-0 h-full w-full will-change-[clip-path]", overlayMode, overlayClassName)}
        >
          {overlay}
        </div>
      </div>
    );
  }
);
RevealCardContainer.displayName = "RevealCardContainer";

/* ─────────────────────────────────────────────
   SECTION 2 — Proving Ground Assessment Grid
   New exports — appended below original code
───────────────────────────────────────────── */

export interface AssessmentCardItemProps {
  name: string;
  category: string;
  description: string;
  topics: [string, string, string];
  accent: string;
}

export const ASSESSMENT_CARDS: AssessmentCardItemProps[] = [
  {
    name: "AWS Solutions Architect",
    category: "AWS",
    description: "Design resilient cloud systems with real production constraints.",
    topics: ["VPC topology", "High availability", "Cost control"],
    accent: "#F59E0B",
  },
  {
    name: "Azure Fundamentals",
    category: "Azure",
    description: "Prove core cloud literacy across compute, storage, and identity.",
    topics: ["Core services", "Identity basics", "Security defaults"],
    accent: "#3B82F6",
  },
  {
    name: "GCP DevOps",
    category: "GCP",
    description: "Ship safely with real-world release engineering scenarios.",
    topics: ["CI/CD pipelines", "SRE practices", "Incident response"],
    accent: "#22C55E",
  },
  {
    name: "Kubernetes CKAD",
    category: "Kubernetes",
    description: "Build, deploy, and debug workloads under time pressure.",
    topics: ["Deployments", "Networking", "Troubleshooting"],
    accent: "#06B6D4",
  },
  {
    name: "Terraform IaC",
    category: "IaC",
    description: "Automate infrastructure with clean, reusable modules.",
    topics: ["Modules", "State mgmt", "CI validation"],
    accent: "#8B5CF6",
  },
  {
    name: "Security+ Core",
    category: "Security",
    description: "Validate security fundamentals with scenario-based tasks.",
    topics: ["Threat modeling", "Access control", "Audit logs"],
    accent: "#EF4444",
  },
  {
    name: "Data Engineering",
    category: "Data",
    description: "Build robust pipelines across batch and streaming data.",
    topics: ["Pipelines", "Storage layers", "Batch vs stream"],
    accent: "#EC4899",
  },
  {
    name: "System Design",
    category: "System",
    description: "Architect scale-ready systems with tradeoff analysis.",
    topics: ["Scalability", "Caching", "Data consistency"],
    accent: "#14B8A6",
  },
];

export interface ProvingGroundAssessmentGridProps {
  className?: string;
}

export function AssessmentCardItem({ name, category, description, topics, accent }: AssessmentCardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const gsapScope = cardRef as React.RefObject<HTMLElement>;

  useGSAP(() => {
    gsap.set(detailRef.current, { opacity: 0, y: 10 });
  }, { scope: gsapScope });

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -14,
      scale: 1.045,
      rotateX: 6,
      rotateY: 0,
      z: 40,
      boxShadow: `0 28px 56px -8px rgba(0,0,0,0.65), 0 0 0 1px ${accent}55, 0 0 32px 0px ${accent}33`,
      duration: 0.38,
      ease: "power2.out",
    });
    gsap.to(detailRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      z: 0,
      boxShadow: "0 10px 22px -18px rgba(0,0,0,0.45)",
      duration: 0.55,
      ease: "expo.out",
    });
    gsap.to(detailRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.22,
      ease: "power2.in",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        padding: 18,
        borderRadius: "var(--radius-xl)",
        background: "rgba(13, 19, 32, 0.86)",
        border: `1px solid ${accent}33`,
        boxShadow: "0 10px 22px -18px rgba(0,0,0,0.45)",
        transformStyle: "preserve-3d",
        willChange: "transform",
        minHeight: 150,
        overflow: "visible",
        cursor: "default",
      }}
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "var(--radius-xl)",
          background: `radial-gradient(circle at 80% 20%, ${accent}20, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Resting content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          height: "100%",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Sora, sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "rgb(248, 250, 252)",
            lineHeight: 1.2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            width: 34,
            height: 3,
            borderRadius: 999,
            background: accent,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Hover detail overlay */}
      <div
        ref={detailRef}
        style={{
          position: "absolute",
          inset: 12,
          borderRadius: 12,
          background: "rgba(5, 10, 18, 0.92)",
          border: `1px solid ${accent}55`,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          pointerEvents: "none",
          zIndex: 20,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${accent}22`,
        }}
      >
        {/* Detail header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: accent,
            }}
          >
            Proving Ground
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "rgb(248, 250, 252)",
          }}
        >
          {name}
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>

        {/* Topics */}
        <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
          {topics.map((topic) => (
            <li
              key={topic}
              style={{
                fontFamily: "IBM Plex Sans, sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {topic}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: 10,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span>Badge verified on pass</span>
          <span style={{ color: accent, fontWeight: 700 }}>View brief →</span>
        </div>
      </div>
    </div>
  );
}

export function ProvingGroundAssessmentGrid({ className }: ProvingGroundAssessmentGridProps) {
  return (
    /*
     * NOTE: This outer wrapper must NOT have overflow: hidden.
     * The 3D card lift (translate-Z + scale) requires overflow: visible on all ancestors.
     * If any parent in Landing.tsx applies overflow: hidden, the 3D escape effect will be
     * clipped at that boundary. Check ProductSection wrappers if the lift appears cut off.
     */
    <div
      className={className}
      style={{
        position: "relative",
        height: 410,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        overflow: "visible",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div
            style={{
              fontFamily: "IBM Plex Sans, sans-serif",
              fontSize: 11,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Proving Ground
          </div>
          <div
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "rgb(248, 250, 252)",
              marginTop: 6,
            }}
          >
            Live Assessments
          </div>
        </div>
        <div
          style={{
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: 12,
            color: "rgba(255,255,255,0.55)",
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(148,163,184,0.25)",
            padding: "6px 12px",
            borderRadius: 999,
            whiteSpace: "nowrap",
          }}
        >
          Hover any card for details
        </div>
      </div>

      {/*
       * Grid container — overflow: visible is REQUIRED for 3D card escape.
       * perspective creates a shared 3D vanishing point for all child cards.
       * grid-template-columns is responsive: 2-col on tablet, 4-col on desktop.
       */}
      <div
        style={{
          position: "relative",
          display: "grid",
          gap: 16,
          alignContent: "stretch",
          gridAutoRows: "minmax(150px, 1fr)",
          overflow: "visible",
          perspective: "1200px",
          flex: 1,
        }}
        className="grid grid-cols-2 lg:grid-cols-4"
      >
        {ASSESSMENT_CARDS.map((card) => (
          <AssessmentCardItem key={card.name} {...card} />
        ))}
      </div>
    </div>
  );
}