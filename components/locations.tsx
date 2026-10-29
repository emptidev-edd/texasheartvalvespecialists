import { MapPin, Phone, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { locations, practice } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function Locations({
  title = "Practice Locations",
}: {
  title?: string;
}) {
  return (
    <section className="bg-paper py-20">
      <div className="mx-auto w-full min-w-0 max-w-[1360px] px-5 sm:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.2em] text-crimson-deep uppercase">
            Conroe, The Woodlands, Willis & Spring
          </p>
          <h2 className="mt-3 text-4xl text-navy">{title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {locations.map((location, index) => (
            <Reveal key={location.name} delay={index * 0.08} className="h-full w-full">
              <Card className="h-full w-full gap-0 border-line bg-paper-raised py-0 shadow-none ring-line">
                <CardHeader className="px-6 pt-6">
                  <CardTitle className="font-heading text-2xl text-navy">
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pt-2 pb-5 text-base leading-6 text-ink-soft">
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
                </CardContent>
                <div className="grid grid-cols-2 border-t border-line text-base text-ink-soft">
                  <a
                    href={practice.phoneHref}
                    className="flex items-center gap-2 border-r border-line px-6 py-4 hover:text-crimson-deep"
                  >
                    <Phone className="size-4 text-crimson" />
                    {practice.phone}
                  </a>
                  <p className="flex items-center gap-2 px-6 py-4">
                    <Printer className="size-4 text-crimson" />
                    {practice.fax}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
