"use client";

import { useReducedMotion } from "framer-motion";

const trace =
  "M 0 200 l 40 0 l 5 -40 l 5 40 l 10 0 l 5 15 l 10 -140 l 10 220 l 5 -95 l 10 0 l 5 20 l 5 -20 l 30 0";

export function HeroBeat({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative size-16 shrink-0 ${className ?? ""}`} aria-hidden>
      <style>{`
        @keyframes hero-ecg {
          to { stroke-dashoffset: 0; }
        }
        @keyframes hero-inner {
          0% { transform: scale(1); }
          10% { transform: scale(1); }
          50% { transform: scale(1.15); }
          60% { transform: scale(1.05); }
          75% { transform: scale(1.2); }
        }
        @keyframes hero-outer {
          0% { transform: scale(1.2); }
          10% { transform: scale(1.2); }
          50% { transform: scale(1.3); }
          60% { transform: scale(1.25); }
          75% { transform: scale(1.3); }
        }
      `}</style>
      <div
        className="absolute inset-0 rounded-full bg-[rgba(230,92,92,0.77)] opacity-90"
        style={{
          transform: "scale(1.2)",
          animation: reduce ? undefined : "hero-outer 1.5s linear infinite forwards",
        }}
      />
      <div
        className="absolute inset-0 rounded-full bg-[rgba(209,28,28,0.7)] opacity-90"
        style={{
          animation: reduce ? undefined : "hero-inner 1.5s linear infinite forwards",
        }}
      />
      <svg
        viewBox="0 0 150 400"
        className="absolute inset-0 size-full scale-140 overflow-visible"
      >
        <path
          d={trace}
          fill="transparent"
          stroke="rgba(3, 3, 3, 0.95)"
          strokeWidth="4"
          strokeDasharray="1000"
          strokeDashoffset={reduce ? 0 : 1000}
          style={{
            animation: reduce
              ? undefined
              : "hero-ecg 1.5s linear infinite forwards",
            animationDelay: "0.1s",
          }}
        />
      </svg>
    </div>
  );
}
