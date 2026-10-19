"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { tests } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TestAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-10 sm:mt-14">
      {tests.map((test, index) => {
        const isOpen = open === index;
        return (
          <div
            key={test.name}
            className={cn(
              "border-b border-navy/15",
              index === 0 && "border-t"
            )}
          >
            <button
              type="button"
              className="flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-8"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="min-w-0 flex-1 text-lg leading-tight text-balance text-navy uppercase sm:text-2xl">
                {test.name}
              </span>
              <ChevronDown
                className={cn(
                  "size-5 shrink-0 text-navy transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-5 text-base leading-7 text-ink-soft sm:pb-8">
                  {test.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
