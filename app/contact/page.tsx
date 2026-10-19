import { Clock, Mail, MapPin, Phone, Printer, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { locations, practice } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, fax, or visit Texas Heart & Valve Specialists in Conroe, The Woodlands, and Willis.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate min-h-[320px] overflow-hidden bg-navy-deep">
        <Image
          src="/images/contact-care.jpg"
          alt="Medical office exterior"
          fill
          priority
          className="object-cover opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/45 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-[1360px] flex-col justify-end px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-[11px] tracking-[0.2em] text-blush-soft uppercase">
            We are here
          </p>
          <h1 className="mt-3 text-5xl text-cream sm:text-6xl">Contact</h1>
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 max-w-[1360px] px-5 py-12 sm:px-8 sm:py-16">
        <Reveal>
          <h2 className="text-4xl text-navy">Practice Locations</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {locations.map((location, index) => (
            <Reveal key={location.name} delay={index * 0.08} className="h-full w-full">
              <Card className="h-full w-full border-line bg-paper-raised shadow-none ring-line">
                <CardHeader>
                  <CardTitle className="font-heading text-3xl text-navy">
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8 text-base leading-7 text-ink-soft sm:grid-cols-2">
                  <a
                    href={location.map}
                    target="_blank"
                    rel="noreferrer"
                    className="flex gap-2 hover:text-crimson-deep"
                  >
                    <MapPin className="mt-1 size-4 shrink-0 text-crimson" />
                    <span>
                      {location.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                  <div className="space-y-4">
                    <a
                      href={practice.phoneHref}
                      className="flex items-center gap-2 hover:text-crimson-deep"
                    >
                      <Phone className="size-4 text-crimson" />
                      Tel: {practice.phone}
                    </a>
                    <p className="flex items-center gap-2">
                      <Printer className="size-4 text-crimson" />
                      Fax: {practice.fax}
                    </p>
                    <div>
                      <p className="flex items-center gap-2 font-medium text-navy">
                        <Clock className="size-4 text-crimson" />
                        Reception Hours
                      </p>
                      <ul className="mt-2 space-y-1 pl-6">
                        {practice.hours.map((hour) => (
                          <li key={hour}>{hour}</li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={`mailto:${practice.email}`}
                      className="flex items-center gap-2 text-crimson-deep"
                    >
                      <Mail className="size-4" />
                      {practice.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8">
          <Reveal>
            <div className="flex items-start gap-4 border border-line bg-navy px-5 py-8 text-cream sm:gap-5 sm:px-8">
              <ShieldCheck className="mt-1 size-6 shrink-0 text-blush" />
              <div>
                <h2 className="text-3xl">Insurance</h2>
                <p className="mt-3 text-base leading-7 text-cream/85">
                  Please Contact us to Verify Your Insurance Is Accepted
                </p>
                <a
                  href={practice.phoneHref}
                  className="mt-4 inline-flex items-center gap-2 text-base text-blush-soft"
                >
                  <Phone className="size-4" />
                  {practice.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
