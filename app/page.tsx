import { Activity, ArrowRight, HeartPulse, Stethoscope } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeroBeat } from "@/components/hero-beat";
import { HeroHeartbeat } from "@/components/hero-heartbeat";
import { Locations } from "@/components/locations";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { featuredProcedures, practice } from "@/lib/content";
import { cn } from "@/lib/utils";

const focus = [
  { icon: HeartPulse, title: "Interventional cardiology" },
  { icon: Stethoscope, title: "Peripheral vascular disease" },
  { icon: Activity, title: "Structural heart disease" },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-[1360px] items-center gap-12 px-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <Reveal>
          <Badge variant="outline" className="h-7 border-line px-3 text-crimson-deep">
            Conroe · The Woodlands
          </Badge>
          <h1 className="mt-6 max-w-xl text-[4.4rem] leading-[0.95] tracking-tight text-navy">
            Where your heart, matters.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-ink-muted">
            Combining compassion with technology, Texas Heart & Valve
            Specialists are here for all of your cardiac needs.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
            >
              Contact the office
              <ArrowRight />
            </Link>
            <Link
              href="/patient-info"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 border-line-soft bg-transparent px-5"
              )}
            >
              Patient info
            </Link>
            <HeroBeat className="ml-10" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <HeroHeartbeat>
            <Image
              src="/images/hero-consult.jpg"
              alt="Doctor and Patient, Take care of your heart with Dr. Mushtaque Ahmed, Texas Heart & Valve Specialist, Conroe, The Woodlands, Texas"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </HeroHeartbeat>
        </Reveal>
      </section>

      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto grid w-full max-w-[1360px] md:grid-cols-3">
          {focus.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 border-line px-8 py-8 md:border-r last:md:border-r-0"
            >
              <item.icon className="size-5 shrink-0 text-crimson" />
              <h2 className="text-xl text-navy">{item.title}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1360px] items-center gap-14 px-8 py-24 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl">
            <Image
              src="/Mushtaque Ahmed.JPG"
              alt="Photo of Dr. Mushtaque Ahmed, Texas Heart & Valve Specialist, Conroe, The Woodlands, Texas"
              width={1500}
              height={1800}
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-[11px] tracking-[0.2em] text-crimson-deep uppercase">
            Physicians
          </p>
          <h2 className="mt-3 text-5xl text-navy">About Dr. Ahmed</h2>
          <div className="mt-6 space-y-4 text-base leading-7 text-ink-soft">
            <p>
              Mushtaque Ahmed, MD, brings expertise and training to Texas Heart
              & Valve Specialists. With a focus on interventional cardiology,
              peripheral vascular disease, and structural heart disease, Dr.
              Ahmed & Dr. Mobley are committed to providing exceptional care to
              patients throughout Conroe and The Woodlands, Texas.
            </p>
            <p>
              With a passion for improving patient outcomes and a dedication to
              ongoing research, Dr. Ahmed is focused on providing excellent
              patient care. His expertise, coupled with a compassionate approach
              to patient care, ensures that each individual receives the highest
              standard of treatment. Dr. Ahmed is affiliated with{" "}
              <a
                href={practice.hcaProfile}
                target="_blank"
                rel="noreferrer"
                className="text-crimson-deep underline decoration-blush underline-offset-4"
              >
                HCA Houston Healthcare
              </a>{" "}
              Conroe, Houston Methodist the Woodlands, and Memorial Herman the
              Woodlands, as well as accepting all major insurances.
            </p>
          </div>
          <Link
            href="/biography"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-5")}
          >
            Read More
            <ArrowRight />
          </Link>
        </Reveal>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-deep text-cream">
        <Image
          src="/images/heart-detail.jpg"
          alt=""
          fill
          className="object-cover opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-deep/55" />
        <div className="relative mx-auto w-full max-w-[1360px] px-8 py-24">
          <Reveal>
            <p className="text-[11px] tracking-[0.2em] text-blush-soft uppercase">
              Care
            </p>
            <h2 className="mt-3 text-5xl">Areas of Expertise</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {featuredProcedures.map((procedure, index) => (
              <Reveal key={procedure} delay={index * 0.08}>
                <div className="border border-white/20 bg-white/10 px-6 py-8 backdrop-blur-sm">
                  <p className="text-xs tracking-[0.16em] text-blush-soft uppercase">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 text-2xl leading-snug">{procedure}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/patient-info"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "mt-8 h-11 px-5"
              )}
            >
              View All
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <Locations />
    </>
  );
}
