"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: {
  duration?: string;
  delay?: string;
  threshold?: number;
} = {}) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = `fadeUp ${options.duration || "0.6s"} cubic-bezier(0.4,0,0.2,1) ${options.delay || "0s"} forwards`;
          el.style.opacity = "1";
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
