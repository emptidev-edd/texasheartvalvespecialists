import type { Metadata } from "next";
import { NewPatientForm } from "@/components/new-patient-form";

export const metadata: Metadata = {
  title: "New Patient Forms",
  description:
    "Fill the Texas Heart & Valve Specialists new patient packet online, or print it and complete it by hand.",
};

export default function NewPatientFormsPage() {
  return (
    <section className="mx-auto w-full min-w-0 max-w-[1360px] px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-4xl text-navy sm:text-5xl">New Patient Forms</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-soft">
        Type what you want and leave the rest blank. Download and print make a
        clean copy of the packet, in the same style as the office form. Empty
        lines stay blank so they can be filled in with a pen.
      </p>
      <NewPatientForm />
    </section>
  );
}
