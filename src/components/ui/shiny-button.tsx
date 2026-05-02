"use client";

import type React from "react";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShinyButton({ children, className = "", type = "button", ...props }: ShinyButtonProps) {
  return (
    <>
      <style jsx>{`
        .shiny-cta {
          --shiny-cta-bg: #2563eb;
          --shiny-cta-bg-hover: #1d4ed8;
          --shiny-cta-fg: #ffffff;
          --transition: 600ms cubic-bezier(0.25, 1, 0.5, 1);

          position: relative;
          overflow: hidden;
          cursor: pointer;
          padding: 1rem 2rem;
          font-family: "Inter", sans-serif;
          font-size: 1rem;
          font-weight: 500;
          border: none;
          border-radius: 9999px;
          color: var(--shiny-cta-fg);
          background: var(--shiny-cta-bg);
          transition: background var(--transition), transform 80ms ease,
            box-shadow var(--transition);
          box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
        }

        .shiny-cta:hover {
          background: var(--shiny-cta-bg-hover);
          box-shadow: 0 4px 24px rgba(37, 99, 235, 0.45);
        }

        .shiny-cta:active {
          transform: translateY(1px);
        }

        .shiny-cta::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          pointer-events: none;
        }

        .shiny-cta:hover::before {
          animation: sweep 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .shiny-cta span {
          position: relative;
          z-index: 1;
          letter-spacing: 0.01em;
        }

        @keyframes sweep {
          0% {
            left: -75%;
          }

          100% {
            left: 125%;
          }
        }
      `}</style>

      <button type={type} className={`shiny-cta ${className}`.trim()} {...props}>
        <span>{children}</span>
      </button>
    </>
  );
}