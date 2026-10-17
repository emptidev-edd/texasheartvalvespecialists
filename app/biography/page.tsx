import { Award, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Locations } from "@/components/locations";
import { Reveal } from "@/components/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Biography",
  description:
    "Meet Mushtaque Ahmed, MD and Alan Mobley, MD of Texas Heart & Valve Specialists in Conroe and The Woodlands.",
};

const ahmedTraining = [
  "MD, Ziauddin Medical University",
  "Residency, Wyckoff Height Medical Center",
  "Fellowship, Vascular, Thomas Jefferson University",
  "Fellowship, Cardiology, Lankenau Medical Center",
];

const mobleyTraining = [
  "MD, University of Kentucky",
  "Residency, Louisville University",
  "Fellowship, St. Luke's Health",
];

const awards = [
  {
    name: "Dr. Ahmed Mushtaque",
    title: "Best Resident Research Award",
  },
  {
    name: "Dr. Ahmed Mushtaque",
    title: "Patient Safety Champion Award",
  },
];

export default function BiographyPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto flex w-full max-w-[1360px] items-end justify-between gap-10 px-8 py-16">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-crimson-deep uppercase">
              Our physicians
            </p>
            <h1 className="mt-3 text-6xl text-navy">Biography</h1>
          </div>
          <p className="max-w-sm text-base leading-7 text-stone-soft">
            Expertise, training, and a compassionate approach to cardiac care
            in Conroe and The Woodlands.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1360px] gap-14 px-8 py-20 lg:grid-cols-[340px_1fr]">
        <Reveal>
          <Image
            src="/Mushtaque Ahmed.JPG"
            alt="Dr. Mushtaque Ahmed, Texas Heart & Valve Specialist, Conroe, The Woodlands, Texas"
            width={1500}
            height={1800}
            className="h-auto w-full rounded-2xl object-cover"
          />
          <p className="mt-4 font-heading text-2xl text-navy">
            Mushtaque Ahmed, MD
          </p>
          <p className="text-base text-stone">
            Interventional cardiology, peripheral vascular disease, and
            structural heart disease
          </p>
        </Reveal>
        <div>
          <Reveal>
            <div className="space-y-4 text-base leading-8 text-ink-soft">
              <p>
                Mushtaque Ahmed, MD, brings expertise and training to Texas
                Heart & Valve Specialists. With a focus on interventional
                cardiology, peripheral vascular disease, and structural heart
                disease, Dr. Ahmed is committed to providing exceptional care
                to patients throughout Conroe and The Woodlands, Texas.
              </p>
              <p>
                Dr. Ahmed completed rigorous fellowship training at several
                notable institutions, including Thomas Jefferson University
                Hospital, Lankenau Medical Center, and Maimonides Medical
                Center. His comprehensive training includes a General Cardiology
                Fellowship and specialized training in Interventional
                Cardiology. Prior to this, Dr. Ahmed pursued Internal Medicine
                Residency programs at Wyckoff Height Medical Center, Ziauddin
                Medical University & Hospital, and National Medical Center
                Karachi, Pakistan.
              </p>
              <p>
                His dedication to advancing medical knowledge is evident through
                extensive research experiences at institutions such as MD
                Anderson Cancer Center and New York-Presbyterian Queens.
              </p>
              <p>
                Dr. Ahmed has contributed to several publications and delivered
                impactful presentations at various conferences worldwide.
              </p>
              <p>
                Dr. Ahmed has received numerous honors and awards for his
                commitment to excellence, including the Best Resident Research
                Award and the Patient Safety Champion Award from Wyckoff Heights
                Medical Center/New York Medical College.
              </p>
              <p>
                With a passion for improving patient outcomes and a dedication
                to ongoing research, Dr. Ahmed is focused on providing excellent
                patient care. His expertise, coupled with a compassionate
                approach to patient care, ensures that each individual receives
                the highest standard of treatment. Dr. Ahmed is affiliated with
                HCA Houston Healthcare Conroe, Houston Methodist the Woodlands,
                and Memorial Herman the Woodlands, as well as accepting all
                major insurances.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <Card className="mt-8 border-line bg-paper-raised shadow-none ring-line">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-heading text-2xl text-navy">
                  <GraduationCap className="size-5 text-crimson" />
                  Education & Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {ahmedTraining.map((item) => (
                    <li
                      key={item}
                      className="border border-line bg-paper px-4 py-3 text-base leading-6"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-paper-raised">
        <div className="mx-auto grid w-full max-w-[1360px] gap-14 px-8 py-20 lg:grid-cols-[1fr_300px]">
          <div>
            <Reveal>
              <p className="font-heading text-3xl text-navy">
                Alan Mobley, MD
              </p>
              <p className="mt-1 text-base text-stone">
                Board-certified cardiovascular disease
              </p>
              <div className="mt-6 space-y-4 text-base leading-8 text-ink-soft">
                <p>
                  Alan Mobley, MD, is a board-certified cardiovascular disease
                  specialist, offering comprehensive diagnostic and treatment
                  services at Heart Care of Conroe in Conroe, Texas. He has a
                  special interest in treating coronary atherosclerotic heart
                  disease and performing minimally invasive coronary angioplasty.
                </p>
                <p>
                  Born and raised in Houston, Texas, Dr. Mobley attended Baylor
                  University in Waco, Texas, and the University of Kentucky in
                  Lexington, where he completed a bachelor’s degree. He finished
                  his medical degree at the University of Louisville in Kentucky
                  and completed his internal medicine residency at Louisville
                  University’s affiliated hospitals.
                </p>
                <p>
                  Dr. Mobley finished his fellowship training in cardiology with
                  a focus in cardiac catheterization at St. Luke’s Health in
                  Houston, Texas. He returned to Houston, where he first opened
                  his private practice in 1980.
                </p>
                <p>
                  Dr. Mobley also specializes in the treatment and ongoing
                  management of congestive heart failure, coronary artery
                  disease, and other cardiovascular issues. He remains committed
                  to taking a complete and compassionate approach to helping
                  others prevent heart disease.
                </p>
                <p>
                  Known for his focused attention to patient care, Dr. Mobley
                  prioritizes his patients’ health. He values the time spent
                  with individuals while he learns about their needs and keeps
                  lines of communication open.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <Card className="mt-8 w-fit max-w-full border-line bg-paper shadow-none ring-line">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-heading text-2xl text-navy">
                    <GraduationCap className="size-7 text-crimson" />
                    Education & Training
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {mobleyTraining.map((item) => (
                      <li key={item} className="text-base leading-6">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <Image
              src="/images/dr-mobley.jpg"
              alt="Dr. Alan Mobley"
              width={300}
              height={450}
              className="h-auto w-full rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1360px] px-8 py-20">
        <Reveal>
          <h2 className="text-4xl text-navy">Awards</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {awards.map((award, index) => (
            <Reveal key={award.title} delay={index * 0.08}>
              <Card className="border-line bg-paper-raised shadow-none ring-line">
                <CardHeader>
                  <Award className="size-5 text-crimson" />
                  <CardTitle className="font-heading text-2xl text-navy">
                    {award.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-base text-stone">
                  {award.name}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <Locations />
    </>
  );
}
