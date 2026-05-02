"use client"
import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export interface TextSegment {
  text: string;
  color?: string;      // Optional text color (e.g. "#0050E6")
  highlight?: boolean; // If true, wraps segment in a visible border box using the segment color
  newline?: boolean;   // If true, forces the segment to start on a new line
  glow?: boolean;      // If true, applies a subtle glow effect to the highlighted text
}

export interface MagicTextProps {
  segments: TextSegment[];
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
  color?: string;
  glow?: boolean;
}

const Word: React.FC<WordProps> = ({ children, progress, range, color, glow }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative inline-block text-3xl font-normal" style={{ fontFamily: "Inter, sans-serif" }}>
      <span className="absolute opacity-10" style={color ? { color } : {}}>{children}</span>
      <motion.span 
        style={{ 
          opacity, 
          ...(color ? { color } : {}),
          ...(glow ? { textShadow: "0 0 16px rgba(255,255,255,0.7), 0 0 32px rgba(255,255,255,0.4)" } : {})
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ segments }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.75"],
  });

  // Pre-calculate total word count for accurate scroll-progress ranges
  const totalWords = segments.reduce((acc, seg) => acc + seg.text.trim().split(" ").length, 0);
  let wordIndex = 0;

  return (
    <p ref={container} className="block text-justify leading-[1.6] p-4">
      {segments.map((segment, segIdx) => {
        const words = segment.text.trim().split(" ");
        const segmentStart = wordIndex;
        wordIndex += words.length;

        const wordElements = words.map((word, i) => {
          const globalIndex = segmentStart + i;
          const start = globalIndex / totalWords;
          // Extend end so that multiple words transition at the same time
          const end = Math.min(start + 4 / totalWords, 1);

          return (
            <React.Fragment key={`${segIdx}-${i}`}>
              <Word
                progress={scrollYProgress}
                range={[start, end]}
                color={segment.color}
                glow={segment.glow}
              >
                {word}
              </Word>
              {i < words.length - 1 ? " " : ""}
            </React.Fragment>
          );
        });

        const content = segment.highlight ? (
          <span
            key={segIdx}
            className="inline-block rounded-lg border-2 px-3 py-2 mt-2"
            style={{ borderColor: segment.color ?? "#0050E6" }}
          >
            {wordElements}
          </span>
        ) : (
          <React.Fragment key={segIdx}>{wordElements}</React.Fragment>
        );

        return (
          <React.Fragment key={`wrap-${segIdx}`}>
            {segment.newline ? (
              <span className="block h-[1.5em]" />
            ) : (
              segIdx > 0 ? " " : ""
            )}
            {content}
          </React.Fragment>
        );
      })}
    </p>
  );
};
