"use client";

import * as React from "react";

export interface TechFloatingCardsProps {
  className?: string;
  onHover?: (key: "aws" | "azure" | "k8s") => void;
  onLeave?: () => void;
}

type TechCard = {
  key: "aws" | "azure" | "k8s";
  label: string;
  src: string;
  alt: string;
  delay: string;
  top: number;
  right: number;
};

const CARDS: TechCard[] = [
  {
    key: "aws",
    label: "AWS",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    alt: "AWS logo",
    delay: "0s",
    top: 0,
    right: 0,
  },
  {
    key: "azure",
    label: "Azure",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
    alt: "Microsoft Azure logo",
    delay: "0.4s",
    top: 130,
    right: -20,
  },
  {
    key: "k8s",
    label: "Kubernetes",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
    alt: "Kubernetes logo",
    delay: "0.7s",
    top: 260,
    right: 10,
  },
];

export const TechFloatingCards = ({ className, onHover, onLeave }: TechFloatingCardsProps) => {
  return (
    <div className={className} aria-hidden="true">
      <style>{`
        @keyframes techFloatBob {
          0%, 100% { transform: translateY(-6px); }
          50% { transform: translateY(6px); }
        }
        .techFloatWrap {
          position: relative;
          width: 230px;
          height: 420px;
          pointer-events: none;
        }
        .techTilePose {
          position: absolute;
          z-index: 10;
          pointer-events: auto;
        }
        .techTile {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 20px;
          background: #FFFFFF;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          border: none;
          display: grid;
          place-items: center;
          transition: transform 180ms ease, box-shadow 180ms ease;
          will-change: transform;
          user-select: none;
        }
        .techTilePose:hover .techTile {
          transform: scale(1.06);
          box-shadow: 0 20px 50px rgba(0,0,0,0.18);
        }
        .techTileFloat {
          animation: techFloatBob 3.4s ease-in-out infinite;
        }
        .techTileInner {
          display: grid;
          place-items: center;
          gap: 8px;
          transform: translateZ(0);
        }
        .techTileImg {
          width: 58px;
          height: 58px;
          object-fit: contain;
          filter: saturate(1.02);
        }
        .techTileLabel {
          font-size: 11px;
          font-weight: 600;
          color: #333;
          letter-spacing: 0.01em;
          text-align: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .techTileFloat { animation: none !important; }
          .techTile, .techTilePose:hover .techTile { transition: none !important; }
        }
      `}</style>

      <div className="techFloatWrap">
        {CARDS.map((c) => (
          <div
            key={c.key}
            className="techTilePose"
            style={{
              top: c.top,
              right: c.right,
            }}
          >
            <div
              className="techTile"
              onMouseEnter={() => onHover && onHover(c.key)}
              onMouseLeave={() => onLeave && onLeave()}
            >
              <div
                className="techTileFloat"
              style={{
                animationDelay: c.delay,
              }}
              >
                <div className="techTileInner">
                  <img className="techTileImg" src={c.src} alt={c.alt} width={58} height={58} loading="lazy" />
                  <div className="techTileLabel">{c.label}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

