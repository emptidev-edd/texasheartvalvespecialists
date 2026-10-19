"use client";

import { Mail, MapPin, Menu, Phone, Printer, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useColors } from "@/hooks/use-colors";
import { locations, nav, practice } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const palette = useColors();
  const [open, setOpen] = useState(false);
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowDock(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40">
        <div className="hidden bg-black text-white md:block">
          <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-6 px-8 py-2 text-sm">
            <a
              href={locations[0].map}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-white/80"
            >
              <MapPin className="size-4 shrink-0 text-white" />
              <span>
                <span className="font-medium">Main Office</span>
                <span className="mx-2 text-white/40">|</span>
                600 River Pointe Dr. Suite 100, Conroe, TX 77304
              </span>
            </a>
            <div className="flex items-center gap-6">
              <a
                href={practice.phoneHref}
                className="flex items-center gap-2 hover:text-white/80"
              >
                <Phone className="size-4 shrink-0 text-white" />
                <span>Tel {practice.phone}</span>
              </a>
              <span className="flex items-center gap-2">
                <Printer className="size-4 shrink-0 text-white" />
                <span>Fax {practice.fax}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="border-b border-line bg-paper-raised">
          <div className="mx-auto flex h-20 w-full max-w-[1360px] items-center gap-8 px-5 md:h-[88px] md:px-8">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <Image
                src="/images/logo-mark.png"
                alt="Texas Heart & Valve Specialists"
                width={56}
                height={56}
                className="size-12 object-contain md:size-14"
                priority
              />
              <span className="leading-tight">
                <span className="block font-heading text-[1.05rem] tracking-tight text-navy">
                  Texas Heart
                </span>
                <span className="block text-[11px] tracking-[0.16em] text-crimson-deep uppercase">
                  & Valve Specialists
                </span>
              </span>
            </Link>

            <nav
              aria-label="Site"
              className="ml-auto hidden items-center gap-1 md:flex"
            >
              {nav.map((item) => {
                const active = pathname === item.href;
                if (item.href === "/contact") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        buttonVariants(),
                        "ml-3 h-10 px-5",
                        active && "ring-2 ring-crimson ring-offset-2"
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-3 py-2 text-[15px] text-ink transition-colors hover:text-crimson-deep"
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute right-3 bottom-1 left-3 h-px"
                        style={{ backgroundColor: palette.crimson }}
                      />
                    ) : null}
                  </Link>
                );
              })}
            </nav>

            <button
              type="button"
              className="ml-auto inline-flex size-10 items-center justify-center text-navy md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

          {open ? (
            <nav
              aria-label="Mobile"
              className="border-t border-line bg-paper-raised px-5 py-3 md:hidden"
            >
              {nav.map((item) => {
                const active = pathname === item.href;
                if (item.href === "/contact") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(buttonVariants(), "mt-3 h-11 w-full")}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block border-b border-line py-3 text-base",
                      active ? "text-crimson-deep" : "text-ink"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          ) : null}
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-black text-white transition-transform duration-300 md:hidden",
          showDock ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-around px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a
            href={`mailto:${practice.email}`}
            className="flex flex-col items-center text-white"
          >
            <Mail className="size-5 text-white" />
            <span className="mt-1 text-xs">Email</span>
          </a>
          <a
            href={practice.phoneHref}
            className="flex flex-col items-center text-white"
          >
            <Phone className="size-5 text-white" />
            <span className="mt-1 text-xs">Call</span>
          </a>
          <a
            href={locations[0].map}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center text-white"
          >
            <MapPin className="size-5 text-white" />
            <span className="mt-1 text-xs">Directions</span>
          </a>
        </div>
      </div>
    </>
  );
}
