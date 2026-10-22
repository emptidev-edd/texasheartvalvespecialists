import { FileText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { TestAccordion } from "@/components/test-accordion";
import { Locations } from "@/components/locations";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  conditions,
  procedures,
  recordPolicies,
  specifiedProcedures,
} from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Patient Info",
  description:
    "Referrals, medical records, conditions, procedures, and tests at Texas Heart & Valve Specialists.",
};

export default function PatientInfoPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid w-full min-w-0 max-w-[1360px] items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.7fr]">
          <Reveal>
            <Badge
              variant="outline"
              className="h-7 border-line px-3 text-crimson-deep"
            >
              Now accepting new referrals
            </Badge>
            <h1 className="mt-4 text-5xl text-navy sm:text-6xl">Patient Info</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft">
              Texas Heart & Valve Specialists is now accepting new referrals.
              Our experienced team provides comprehensive cardiovascular care
              using advanced technology and a patient-centered approach. We
              welcome healthcare providers to partner with us in delivering
              excellence in cardiac care. For referral inquiries, please contact
              our office.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/patient-info/forms"
                className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
              >
                <FileText />
                New Patient Forms
              </a>
              <a
                href="/patient-info/no-show"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 px-5"
                )}
              >
                <FileText />
                No-Show Fee Policy
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="bg-paper-raised p-6">
              <Image
                src="/images/patient-care.jpg"
                alt="Anatomical illustration of the heart"
                width={900}
                height={1100}
                className="h-auto w-full object-contain"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="rounded-t-[40px] bg-white px-5 py-16 sm:px-8 sm:py-20 md:rounded-t-[60px] md:py-28">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <h2 className="text-center text-4xl leading-none tracking-tight text-balance text-navy uppercase sm:text-5xl md:text-7xl">
              Medical Record Access & Requests
            </h2>
            <p className="mt-6 text-center text-base text-stone">
              For more details, please contact our office.
            </p>
          </Reveal>
          <div className="mt-16 md:mt-24">
            {recordPolicies.map((policy, index) => (
              <Reveal key={policy.title} delay={index * 0.08}>
                <div
                  className={cn(
                    "flex min-w-0 items-start gap-4 border-b border-navy/15 py-8 sm:gap-6 sm:py-10 md:gap-12 md:py-12",
                    index === 0 && "border-t"
                  )}
                >
                  <span className="shrink-0 text-5xl leading-none text-navy sm:text-6xl md:text-8xl">
                    0{index + 1}
                  </span>
                  <div className="flex min-w-0 flex-col gap-3 pt-1 sm:pt-2">
                    <h3 className="text-lg leading-tight text-balance text-navy uppercase sm:text-xl md:text-3xl">
                      {policy.title}
                    </h3>
                    <p className="max-w-2xl text-base leading-7 text-ink-soft">
                      {policy.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto w-full min-w-0 max-w-[1360px] px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <h2 className="text-4xl text-navy">Specified Procedures</h2>
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {specifiedProcedures.map((item) => (
              <li
                key={item}
                className="bg-paper px-4 py-4 text-base text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            <Reveal>
              <h2 className="text-3xl text-navy">Conditions</h2>
              <ul className="mt-6 space-y-3">
                {conditions.map((item) => (
                  <li
                    key={item}
                    className="border-b border-line pb-3 text-base text-ink-soft"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-2">
              <h2 className="text-3xl text-navy">Procedures</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {procedures.map((item) => (
                  <li
                    key={item}
                    className="bg-paper px-4 py-4 text-base text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:py-28">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <h2 className="text-center text-4xl leading-none tracking-tight text-balance text-navy uppercase sm:text-5xl md:text-7xl">
              Tests
            </h2>
            <p className="mt-6 text-center text-base text-stone">
              Common tests used to look at the heart. Tap a name to read more.
            </p>
          </Reveal>
          <TestAccordion />
        </div>
      </section>

      <Locations />
    </>
  );
}
