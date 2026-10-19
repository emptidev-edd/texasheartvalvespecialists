"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

const slides = [
  {
    src: "/heroimage1.webp",
    alt: "Texas Heart & Valve Specialists office building",
  },
  {
    src: "/images/contact-care.jpg",
    alt: "Medical office exterior",
  },
];

export function HeroSlider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing || reduce) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [playing, reduce]);

  function go(next: number) {
    setIndex((next + slides.length) % slides.length);
  }

  return (
    <section
      className="relative min-h-[36rem] overflow-hidden sm:min-h-[40rem] lg:min-h-[640px]"
      aria-roledescription="carousel"
      aria-label="Practice photos"
    >
      {slides.map((slide, slideIndex) => (
        <motion.div
          key={slideIndex}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: slideIndex === index ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: "easeInOut" }}
        >
          <Image
            src={slide.src}
            alt={slideIndex === index ? slide.alt : ""}
            fill
            priority={slideIndex === 0}
            className="object-cover brightness-75"
            sizes="100vw"
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />

      <div className="relative z-10 mx-auto flex min-h-[36rem] w-full max-w-[1360px] items-center px-5 py-16 pb-28 sm:min-h-[40rem] sm:px-20 sm:pb-24 lg:min-h-[640px] lg:px-24">
        {children}
      </div>

      <button
        type="button"
        className="absolute top-1/2 left-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:inline-flex lg:left-6"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:inline-flex lg:right-6"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
      >
        <ChevronRight className="size-6" />
      </button>

      <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-3 px-5 sm:bottom-8">
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:hidden"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-2.5">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src + slideIndex}
              type="button"
              className={`size-3 rounded-full transition-all ${
                slideIndex === index ? "scale-125 bg-white" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => go(slideIndex)}
            />
          ))}
        </div>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:hidden"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <button
        type="button"
        className="absolute right-5 bottom-5 z-20 inline-flex size-10 items-center justify-center rounded-md border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:right-8 sm:bottom-8"
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        onClick={() => setPlaying((value) => !value)}
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </section>
  );
}
