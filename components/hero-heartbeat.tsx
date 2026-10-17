"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

const pad = 10;
const edge = 6;
const radius = 16;

export function HeroHeartbeat({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<SVGPathElement>(null);
  const glowId = useId().replace(/:/g, "");
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [length, setLength] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const outerW = size.w + pad * 2;
  const outerH = size.h + pad * 2;
  const x2 = outerW - edge;
  const y2 = outerH - edge;
  const path =
    size.w > 0
      ? `M ${edge + radius} ${edge} H ${x2 - radius} Q ${x2} ${edge} ${x2} ${edge + radius} V ${y2 - radius} Q ${x2} ${y2} ${x2 - radius} ${y2} H ${edge + radius} Q ${edge} ${y2} ${edge} ${y2 - radius} V ${edge + radius} Q ${edge} ${edge} ${edge + radius} ${edge}`
      : "";

  useEffect(() => {
    if (track.current) setLength(track.current.getTotalLength());
  }, [path]);

  const beat = length
    ? `${length * 0.04} ${length * 0.016} ${length * 0.065} ${length * 0.879}`
    : undefined;

  return (
    <div ref={box} className="relative">
      <div className="relative aspect-[16/11] overflow-hidden bg-navy">{children}</div>
      {path ? (
        <svg
          className="pointer-events-none absolute overflow-visible"
          style={{ left: -pad, top: -pad, width: outerW, height: outerH }}
          viewBox={`0 0 ${outerW} ${outerH}`}
          aria-hidden
        >
          <defs>
            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            ref={track}
            d={path}
            fill="none"
            stroke="#c4372f"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          {length > 0 && !reduce ? (
            <motion.path
              d={path}
              fill="none"
              stroke="#c4372f"
              strokeWidth="1.25"
              strokeLinecap="round"
              filter={`url(#${glowId})`}
              strokeDasharray={beat}
              animate={{ strokeDashoffset: [0, -length] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          ) : null}
        </svg>
      ) : null}
    </div>
  );
}
