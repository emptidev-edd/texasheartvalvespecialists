import { Mail, MapPin, Phone, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Copyright } from "@/components/copyright";
import { locations, nav, practice } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-paper">
      <div className="mx-auto grid w-full max-w-[1360px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-mark-white.png"
              alt=""
              width={52}
              height={52}
              className="size-12 object-contain"
            />
            <p className="font-heading text-2xl leading-none">
              Texas Heart
              <span className="mt-1 block text-sm tracking-[0.14em] text-paper/70 uppercase">
                & Valve Specialists
              </span>
            </p>
          </div>
          <p className="mt-6 max-w-sm text-base leading-7 text-paper/75">
            Combining compassion with technology, Texas Heart & Valve
            Specialists are here for all of your cardiac needs.
          </p>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.18em] text-blush uppercase">
            Visit
          </p>
          <ul className="mt-4 space-y-5">
            {locations.map((location) => (
              <li key={location.name}>
                <a
                  href={location.map}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex gap-2 text-base leading-7 hover:text-white"
                >
                  <MapPin className="mt-1 size-4 shrink-0 text-coral" />
                  <span>
                    <span className="block font-medium">{location.name}</span>
                    {location.lines.map((line) => (
                      <span key={line} className="block text-paper/75">
                        {line}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] tracking-[0.18em] text-blush uppercase">
            Reception
          </p>
          <ul className="mt-4 space-y-2 text-base text-paper/80">
            {practice.hours.map((hour) => (
              <li key={hour}>{hour}</li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 text-base">
            <a
              href={practice.phoneHref}
              className="flex items-center gap-2 hover:text-white"
            >
              <Phone className="size-4 text-coral" />
              {practice.phone}
            </a>
            <p className="flex items-center gap-2">
              <Printer className="size-4 text-coral" />
              {practice.fax}
            </p>
            <a
              href={`mailto:${practice.email}`}
              className="flex items-center gap-2 hover:text-white"
            >
              <Mail className="size-4 text-coral" />
              {practice.email}
            </a>
          </div>
          <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10 pb-20 md:pb-0">
        <p className="mx-auto w-full max-w-[1360px] px-5 py-5 pb-24 text-xs tracking-wide text-paper/55 sm:px-8 md:pb-5">
          <Copyright />
        </p>
      </div>
    </footer>
  );
}
