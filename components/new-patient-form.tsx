"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  emptyPacket,
  ROS_ITEMS,
  type PacketForm,
  type RosKey,
} from "@/lib/new-patient-form-data";
import { buildPacketPdf } from "@/lib/new-patient-pdf";
import { cn } from "@/lib/utils";

const inputClass =
  "h-10 w-full border border-line bg-paper-raised px-3 text-base text-ink outline-none focus:border-navy";

function Field({
  label,
  value,
  onChange,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-base text-ink">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-base text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-crimson"
      />
      {label}
    </label>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border border-line bg-paper-raised p-4 sm:p-6">
      <h2 className="text-2xl text-navy">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SignatureField({
  label,
  onChange,
}: {
  label: string;
  onChange: (value: string) => void;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  function point(event: PointerEvent<HTMLCanvasElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - box.left) / box.width) * event.currentTarget.width,
      y: ((event.clientY - box.top) / box.height) * event.currentTarget.height,
    };
  }

  function start(event: PointerEvent<HTMLCanvasElement>) {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    drawing.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const next = point(event);
    context.strokeStyle = "#16324a";
    context.lineWidth = 2.5;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(next.x, next.y);
  }

  function move(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    const next = point(event);
    context.lineTo(next.x, next.y);
    context.stroke();
  }

  function end() {
    if (!drawing.current || !canvas.current) return;
    drawing.current = false;
    onChange(canvas.current.toDataURL("image/png"));
  }

  function clear() {
    const current = canvas.current;
    if (!current) return;
    current.getContext("2d")?.clearRect(0, 0, current.width, current.height);
    onChange("");
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-base text-ink">{label}</span>
        <button
          type="button"
          onClick={clear}
          className="text-base text-crimson-deep underline-offset-2 hover:underline"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvas}
        width={480}
        height={96}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="h-24 w-full touch-none border border-line bg-paper"
      />
    </div>
  );
}

async function packetBlob(form: PacketForm) {
  const bytes = await buildPacketPdf(form);
  return new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
}

export function NewPatientForm() {
  const [form, setForm] = useState<PacketForm>(emptyPacket);
  const [busy, setBusy] = useState<"download" | "print" | null>(null);
  const [error, setError] = useState("");

  function set<K extends keyof PacketForm>(key: K, value: PacketForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function openPacket(mode: "download" | "print") {
    setBusy(mode);
    setError("");
    try {
      const blob = await packetBlob(form);
      const url = URL.createObjectURL(blob);
      if (mode === "download") {
        const link = document.createElement("a");
        link.href = url;
        link.download = "texas-heart-new-patient-forms.pdf";
        link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      } else {
        const frame = document.createElement("iframe");
        frame.style.position = "fixed";
        frame.style.right = "0";
        frame.style.bottom = "0";
        frame.style.width = "0";
        frame.style.height = "0";
        frame.style.border = "0";
        frame.src = url;
        frame.onload = () => {
          frame.contentWindow?.focus();
          frame.contentWindow?.print();
          window.setTimeout(() => {
            frame.remove();
            URL.revokeObjectURL(url);
          }, 60_000);
        };
        document.body.appendChild(frame);
      }
    } catch {
      setError("The form could not be prepared. Try again.");
    } finally {
      setBusy(null);
    }
  }

  const groups = ROS_ITEMS.reduce<string[]>((names, item) => {
    if (!names.includes(item.group)) names.push(item.group);
    return names;
  }, []);

  return (
    <form
      className="mt-8 space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        void openPacket("download");
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={busy !== null}
          className={cn(buttonVariants({ size: "lg" }), "h-11 px-5")}
        >
          {busy === "download" ? "Preparing…" : "Download"}
        </button>
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => void openPacket("print")}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
        >
          {busy === "print" ? "Preparing…" : "Print"}
        </button>
        <p className="text-base text-ink-muted">
          Leave any line blank. You can print the packet and finish it with a pen.
          Nothing is sent or saved.
        </p>
      </div>
      {error ? <p className="text-base text-crimson-deep">{error}</p> : null}

      <Section title="Patient Information Form">
        <div className="grid gap-4">
          <Field
            label="Who is your primary/family/referring doctor?"
            value={form.referringDoctor}
            onChange={(value) => set("referringDoctor", value)}
          />
          <div className="grid gap-4 sm:grid-cols-[1.2fr_1.2fr_0.5fr]">
            <Field label="Last name" value={form.lastName} onChange={(value) => set("lastName", value)} />
            <Field label="First name" value={form.firstName} onChange={(value) => set("firstName", value)} />
            <Field label="Middle init" value={form.middleInit} onChange={(value) => set("middleInit", value)} />
          </div>
          <Field label="Address" value={form.address} onChange={(value) => set("address", value)} />
          <div className="grid gap-4 sm:grid-cols-[1.4fr_0.8fr_0.6fr]">
            <Field label="City" value={form.city} onChange={(value) => set("city", value)} />
            <Field label="State" value={form.state} onChange={(value) => set("state", value)} />
            <Field label="Zip code" value={form.zip} onChange={(value) => set("zip", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-4">
            <Field label="Phone home" value={form.phoneHome} onChange={(value) => set("phoneHome", value)} />
            <Field label="Cell" value={form.phoneCell} onChange={(value) => set("phoneCell", value)} />
            <Field label="Work" value={form.phoneWork} onChange={(value) => set("phoneWork", value)} />
            <Field label="Ext" value={form.phoneExt} onChange={(value) => set("phoneExt", value)} />
          </div>
          <div className="flex flex-wrap gap-6">
            <Check label="Male" checked={form.sexMale} onChange={(value) => set("sexMale", value)} />
            <Check label="Female" checked={form.sexFemale} onChange={(value) => set("sexFemale", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="D.O.B." value={form.dob} onChange={(value) => set("dob", value)} />
            <Field label="Soc sec #" value={form.ssn} onChange={(value) => set("ssn", value)} />
          </div>
          <div className="flex flex-wrap gap-6">
            <Check label="Student" checked={form.student} onChange={(value) => set("student", value)} />
            <Check label="Retired" checked={form.retired} onChange={(value) => set("retired", value)} />
            <Check label="Employed" checked={form.employed} onChange={(value) => set("employed", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Employed where" value={form.employedWhere} onChange={(value) => set("employedWhere", value)} />
            <Field label="Marital status" value={form.maritalStatus} onChange={(value) => set("maritalStatus", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Spouse name" value={form.spouseName} onChange={(value) => set("spouseName", value)} />
            <Field label="Spouse D.O.B." value={form.spouseDob} onChange={(value) => set("spouseDob", value)} />
            <Field label="Spouse soc sec #" value={form.spouseSsn} onChange={(value) => set("spouseSsn", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Spouse employer" value={form.spouseEmployer} onChange={(value) => set("spouseEmployer", value)} />
            <Field label="Spouse work phone" value={form.spouseWorkPhone} onChange={(value) => set("spouseWorkPhone", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Local pharmacy" value={form.localPharmacy} onChange={(value) => set("localPharmacy", value)} />
            <Field label="Local pharmacy phone" value={form.localPharmacyPhone} onChange={(value) => set("localPharmacyPhone", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Mail order pharmacy" value={form.mailPharmacy} onChange={(value) => set("mailPharmacy", value)} />
            <Field label="Mail order pharmacy phone" value={form.mailPharmacyPhone} onChange={(value) => set("mailPharmacyPhone", value)} />
          </div>
          <Field label="E-mail address" value={form.email} onChange={(value) => set("email", value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary ins" value={form.primaryIns} onChange={(value) => set("primaryIns", value)} />
            <Field label="Primary ins phone" value={form.primaryInsPhone} onChange={(value) => set("primaryInsPhone", value)} />
          </div>
          <Field label="Primary claim address" value={form.primaryClaimAddress} onChange={(value) => set("primaryClaimAddress", value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary ID #" value={form.primaryId} onChange={(value) => set("primaryId", value)} />
            <Field label="Primary group #" value={form.primaryGroup} onChange={(value) => set("primaryGroup", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary insured name" value={form.primaryInsured} onChange={(value) => set("primaryInsured", value)} />
            <Field label="Primary insured D.O.B." value={form.primaryInsuredDob} onChange={(value) => set("primaryInsuredDob", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Secondary ins" value={form.secondaryIns} onChange={(value) => set("secondaryIns", value)} />
            <Field label="Secondary ins phone" value={form.secondaryInsPhone} onChange={(value) => set("secondaryInsPhone", value)} />
          </div>
          <Field label="Secondary claim address" value={form.secondaryClaimAddress} onChange={(value) => set("secondaryClaimAddress", value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Secondary ID #" value={form.secondaryId} onChange={(value) => set("secondaryId", value)} />
            <Field label="Secondary group #" value={form.secondaryGroup} onChange={(value) => set("secondaryGroup", value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Secondary insured name" value={form.secondaryInsured} onChange={(value) => set("secondaryInsured", value)} />
            <Field label="Secondary insured D.O.B." value={form.secondaryInsuredDob} onChange={(value) => set("secondaryInsuredDob", value)} />
          </div>
        </div>
      </Section>

      <Section title="Patient Medication List">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date" value={form.medDate} onChange={(value) => set("medDate", value)} />
          <Field label="Patient name / date of birth" value={form.medPatient} onChange={(value) => set("medPatient", value)} />
        </div>
        <div className="mt-4">
          <Field label="Known allergies/sensitivities" value={form.allergies} onChange={(value) => set("allergies", value)} />
        </div>
        <div className="mt-6 space-y-3">
          {form.medications.map((row, index) => (
            <div key={index} className="grid gap-3 sm:grid-cols-3">
              <Field
                label={index === 0 ? "Medication" : `Medication ${index + 1}`}
                value={row.medication}
                onChange={(value) =>
                  set(
                    "medications",
                    form.medications.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, medication: value } : item,
                    ),
                  )
                }
              />
              <Field
                label={index === 0 ? "Dosage" : `Dosage ${index + 1}`}
                value={row.dosage}
                onChange={(value) =>
                  set(
                    "medications",
                    form.medications.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, dosage: value } : item,
                    ),
                  )
                }
              />
              <Field
                label={index === 0 ? "Taken how often" : `Taken how often ${index + 1}`}
                value={row.often}
                onChange={(value) =>
                  set(
                    "medications",
                    form.medications.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, often: value } : item,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Review of Systems">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" value={form.rosName} onChange={(value) => set("rosName", value)} />
          <Field label="Date" value={form.rosDate} onChange={(value) => set("rosDate", value)} />
        </div>
        <p className="mt-4 text-base text-ink-soft">Please check below all symptoms that you are having.</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group}>
              <h3 className="text-lg text-navy">{group}</h3>
              <div className="mt-3 space-y-2">
                {ROS_ITEMS.filter((item) => item.group === group).map((item) => (
                  <Check
                    key={item.key}
                    label={item.label}
                    checked={form.ros[item.key]}
                    onChange={(checked) =>
                      set("ros", { ...form.ros, [item.key]: checked } as Record<RosKey, boolean>)
                    }
                  />
                ))}
              </div>
              {group === "Cardiovascular" ? (
                <div className="mt-3">
                  <Field label="Other" value={form.rosOther} onChange={(value) => set("rosOther", value)} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Authorization for Release of Medical Records To">
        <p className="text-base leading-7 text-ink-soft">
          By signing this form, I authorize Texas Heart & Valve Specialist to release confidential health information about me, by releasing a copy of my medical records, or a summary or narrative of my protected health information, to the person or entity listed below.
        </p>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          HIV/AIDS: I consent to the release of any positive or negative test result for AIDS or HIV infection, antibodies to AIDS, or infection with any other causative agent of AIDS with the rest of my medical records.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Your name on the authorization" value={form.releaseName} onChange={(value) => set("releaseName", value)} />
          <Field label="HIV/AIDS initial" value={form.hivInitial} onChange={(value) => set("hivInitial", value)} />
          <Field label="HIV/AIDS date" value={form.hivDate} onChange={(value) => set("hivDate", value)} />
        </div>
        <div className="mt-4">
          <Field
            label="Limitations on the information you may release"
            value={form.releaseLimits}
            onChange={(value) => set("releaseLimits", value)}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Release to name" value={form.releaseToName} onChange={(value) => set("releaseToName", value)} />
          <Field label="Street" value={form.releaseToStreet} onChange={(value) => set("releaseToStreet", value)} />
          <Field label="City" value={form.releaseToCity} onChange={(value) => set("releaseToCity", value)} />
          <Field label="State" value={form.releaseToState} onChange={(value) => set("releaseToState", value)} />
          <Field label="Zip code" value={form.releaseToZip} onChange={(value) => set("releaseToZip", value)} />
        </div>
        <div className="mt-4">
          <Field
            label="Reasons or purpose for this release"
            value={form.releasePurpose}
            onChange={(value) => set("releasePurpose", value)}
          />
        </div>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          I understand that you will provide this information within 15 days from receipt of request and that a fee for preparing and furnishing this information may be charged according to rulings set forth by the Texas State Board of Medical Examiners.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
          <SignatureField label="Patient signature (or parent, guardian, or legal representative)" onChange={(value) => set("releaseSignature", value)} />
          <Field label="Date" value={form.releaseDate} onChange={(value) => set("releaseDate", value)} />
        </div>
      </Section>

      <Section title="Authorization for Release of Protected Health Information">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Patient name" value={form.phiPatientName} onChange={(value) => set("phiPatientName", value)} />
          <Field label="Contact information" value={form.phiContact} onChange={(value) => set("phiContact", value)} />
        </div>
        <p className="mt-4 text-base text-ink">May we leave messages in your voicemail</p>
        <div className="mt-2 flex gap-6">
          <Check label="Yes" checked={form.voicemailYes} onChange={(value) => set("voicemailYes", value)} />
          <Check label="No" checked={form.voicemailNo} onChange={(value) => set("voicemailNo", value)} />
        </div>
        <div className="mt-6 space-y-6">
          {form.shares.map((person, index) => (
            <div key={index} className="grid gap-4 sm:grid-cols-2">
              <Field
                label={`Person ${index + 1} name`}
                value={person.name}
                onChange={(value) =>
                  set(
                    "shares",
                    form.shares.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, name: value } : item,
                    ),
                  )
                }
              />
              <Field
                label="Phone"
                value={person.phone}
                onChange={(value) =>
                  set(
                    "shares",
                    form.shares.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, phone: value } : item,
                    ),
                  )
                }
              />
              <Field
                label="Street"
                value={person.street}
                onChange={(value) =>
                  set(
                    "shares",
                    form.shares.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, street: value } : item,
                    ),
                  )
                }
              />
              <Field
                label="City"
                value={person.city}
                onChange={(value) =>
                  set(
                    "shares",
                    form.shares.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, city: value } : item,
                    ),
                  )
                }
              />
              <Field
                label="State"
                value={person.state}
                onChange={(value) =>
                  set(
                    "shares",
                    form.shares.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, state: value } : item,
                    ),
                  )
                }
              />
              <Field
                label="Zip"
                value={person.zip}
                onChange={(value) =>
                  set(
                    "shares",
                    form.shares.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, zip: value } : item,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4">
          <Field
            label="This authorization shall be in force until"
            value={form.phiUntil}
            onChange={(value) => set("phiUntil", value)}
          />
          <Field
            label="Reasons or purposes for this release"
            value={form.phiPurpose}
            onChange={(value) => set("phiPurpose", value)}
          />
        </div>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          I understand that I have the right to revoke this authorization, in writing, at any time by sending written notification to Dr. Mushtaque Ahmed, M.D. A revocation is not effective to the extent that the practice has relied on this authorization, or if this authorization was obtained as a condition of obtaining insurance coverage. Information disclosed may be subject to redisclosure and may no longer be protected by federal HIPAA privacy regulations. The practice will not condition treatment, payment, enrollment, or eligibility for benefits on whether I provide this authorization.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <SignatureField label="Signature of patient or personal representative" onChange={(value) => set("phiSignature", value)} />
          <Field label="Date" value={form.phiDate} onChange={(value) => set("phiDate", value)} />
          <Field label="Name of patient or personal representative" value={form.phiSignerName} onChange={(value) => set("phiSignerName", value)} />
          <Field label="Description of personal representative's authority" value={form.phiAuthority} onChange={(value) => set("phiAuthority", value)} />
        </div>
        <h3 className="mt-8 text-lg text-navy">Acknowledgement of Review of Notice of Privacy Practices</h3>
        <p className="mt-3 text-base leading-7 text-ink-soft">
          I have reviewed this office&apos;s Notice of Privacy Practices, which explains how my medical information will be used and disclosed. I understand that I am entitled to receive a copy of this document.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <SignatureField label="Signature of patient or personal representative" onChange={(value) => set("privacySignature", value)} />
          <Field label="Date" value={form.privacyDate} onChange={(value) => set("privacyDate", value)} />
          <Field label="Name of patient or personal representative" value={form.privacyName} onChange={(value) => set("privacyName", value)} />
          <Field label="Description of personal representative's authority" value={form.privacyAuthority} onChange={(value) => set("privacyAuthority", value)} />
        </div>
      </Section>

      <Section title="Authorization for Release of Medical Records from Another Facility to THV">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Patient name" value={form.facilityPatient} onChange={(value) => set("facilityPatient", value)} />
          <Field label="DOB" value={form.facilityDob} onChange={(value) => set("facilityDob", value)} />
          <Field label="Social Security number" value={form.facilitySsn} onChange={(value) => set("facilitySsn", value)} />
        </div>
        <p className="mt-4 text-base leading-7 text-ink-soft">
          I hereby authorize the release of information contained in my medical records to Texas Heart & Valve Specialist, Mushtaque Ahmed, M.D. The information being released will be used for medical purposes. The authorization is valid for one year from the date of signing. The patient or his/her representative may revoke this consent at any time.
        </p>
        <div className="mt-4 space-y-2">
          <Check label="All Medical Records" checked={form.facilityAll} onChange={(value) => set("facilityAll", value)} />
          <Check label="Cardiac Testing" checked={form.facilityCardiac} onChange={(value) => set("facilityCardiac", value)} />
          <Check label="EKG" checked={form.facilityEkg} onChange={(value) => set("facilityEkg", value)} />
          <Check label="Recent Labs" checked={form.facilityLabs} onChange={(value) => set("facilityLabs", value)} />
          <Check label="Recent Progress Notes" checked={form.facilityNotes} onChange={(value) => set("facilityNotes", value)} />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
          <SignatureField label="Patient signature" onChange={(value) => set("facilitySignature", value)} />
          <Field label="Date" value={form.facilityDate} onChange={(value) => set("facilityDate", value)} />
        </div>
      </Section>

      <Section title="Medicare and Commercial Insurance — Signature on File">
        <p className="text-base leading-7 text-ink-soft">
          I hereby request that payment of authorized Commercial Insurance and/or Medicare benefits be made on my behalf to Texas Heart & Valve Specialist, Dr. Mushtaque Ahmed, for any services furnished me. I authorize any holder of medical information about me to release to Medicare and/or Commercial Insurance and its agents any information needed to determine these benefits or the benefits payable for related services. I understand my signature requests that payment be made and authorizes release of medical information necessary to pay the claim. In Medicare assigned cases, the provider agrees to accept the charge determined by the Medicare carrier as full charge, and the patient is responsible only for the deductible, co-insurance, and non-covered services.
        </p>
        <div className="mt-4 grid gap-4">
          <Field label="Patient's printed name" value={form.medicarePrinted} onChange={(value) => set("medicarePrinted", value)} />
          <div className="grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
            <SignatureField label="Patient's signature" onChange={(value) => set("medicareSignature", value)} />
            <Field label="Date" value={form.medicareDate} onChange={(value) => set("medicareDate", value)} />
          </div>
        </div>
      </Section>
    </form>
  );
}
