import { ArrowUpRight, FileText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Locations } from "@/components/locations";
import { RecordAccordion } from "@/components/record-accordion";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  conditions,
  practice,
  procedures,
  tests,
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
        <div className="mx-auto grid w-full max-w-[1360px] items-center gap-12 px-8 py-16 lg:grid-cols-[1.1fr_0.7fr]">
          <Reveal>
            <Badge
              variant="outline"
              className="h-7 border-line px-3 text-crimson-deep"
            >
              Now accepting new referrals
            </Badge>
            <h1 className="mt-4 text-6xl text-navy">Patient Info</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft">
              Texas Heart & Valve Specialists is now accepting new referrals.
              Our experienced team provides comprehensive cardiovascular care
              using advanced technology and a patient-centered approach. We
              welcome healthcare providers to partner with us in delivering
              excellence in cardiac care. For referral inquiries, please contact
              our office.
            </p>
            <a
              href={practice.newPatientForms}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-5")}
            >
              <FileText />
              New Patient Forms
            </a>
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

      <section className="mx-auto w-full max-w-[1360px] px-8 py-20">
        <Reveal>
          <h2 className="text-4xl text-navy">
            Medical Record Access & Requests
          </h2>
          <p className="mt-3 text-base text-stone">
            For more details, please contact our office.
          </p>
        </Reveal>
        <RecordAccordion />
      </section>

      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto grid w-full max-w-[1360px] gap-12 px-8 py-20 lg:grid-cols-3">
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
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-8 py-20">
        <Reveal>
          <h2 className="text-4xl text-navy">Tests</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tests.map((test, index) => (
            <Reveal key={test.name} delay={(index % 4) * 0.05}>
              <Card className="h-full border-line bg-paper-raised shadow-none ring-line">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-navy">
                    {test.name}
                  </CardTitle>
                </CardHeader>
                {"href" in test && test.href ? (
                  <CardContent>
                    <a
                      href={test.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-base text-crimson-deep"
                    >
                      Echocardiogram
                      <ArrowUpRight className="size-4" />
                    </a>
                  </CardContent>
                ) : null}
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <Locations />
    </>
  );
}
