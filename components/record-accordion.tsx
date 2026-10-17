"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { recordPolicies } from "@/lib/content";
import { cn } from "@/lib/utils";

export function RecordAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ol className="mt-8 space-y-3">
      {recordPolicies.map((policy, index) => {
        const isOpen = open === index;
        return (
          <li key={policy.title} className="border border-line bg-paper-raised">
            <button
              type="button"
              className="flex w-full items-center gap-5 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="font-heading text-2xl text-crimson">
                0{index + 1}
              </span>
              <span className="text-base text-navy">{policy.title}</span>
              <ChevronDown
                className={cn(
                  "ml-auto size-5 shrink-0 text-navy transition-transform duration-300",
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
                <p className="px-6 pb-5 pl-[4.75rem] text-base leading-7 text-ink-soft">
                  {policy.text}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
