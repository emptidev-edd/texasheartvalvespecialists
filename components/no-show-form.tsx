"use client";

import { useRef, useState, type PointerEvent } from "react";
import { buttonVariants } from "@/components/ui/button";
import { buildNoShowPdf } from "@/lib/no-show-pdf";
import { cn } from "@/lib/utils";

const inputClass =
  "h-10 w-full border border-line bg-paper-raised px-3 text-base text-ink outline-none focus:border-navy";

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

export function NoShowForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [signature, setSignature] = useState("");
  const [busy, setBusy] = useState<"download" | "print" | null>(null);
  const [error, setError] = useState("");

  async function openForm(mode: "download" | "print") {
    setBusy(mode);
    setError("");
    try {
      const bytes = await buildNoShowPdf({ name, signature, date });
      const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      if (mode === "download") {
        const link = document.createElement("a");
        link.href = url;
        link.download = "texas-heart-no-show-fee-policy.pdf";
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

  return (
    <form
      className="mt-8 space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        void openForm("download");
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
          onClick={() => void openForm("print")}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 px-5")}
        >
          {busy === "print" ? "Preparing…" : "Print"}
        </button>
        <p className="text-base text-ink-muted">
          Leave any line blank. You can print the form and finish it with a pen.
          Nothing is sent or saved.
        </p>
      </div>
      {error ? <p className="text-base text-crimson-deep">{error}</p> : null}

      <section className="border border-line bg-paper-raised p-4 sm:p-6">
        <h2 className="text-2xl text-navy">Missed Appointment and No-Show Fee Policy</h2>
        <div className="mt-6 space-y-4 text-base leading-7 text-ink-soft">
          <p className="font-medium text-navy">Appointment Cancellation and Rescheduling</p>
          <p>
            I understand that timely notice of cancellation is necessary to ensure efficient scheduling and availability of care for all patients. If I am unable to keep a scheduled appointment, I agree to provide at least twenty-four (24) hours&apos; notice to cancel or reschedule.
          </p>
          <p>To cancel or reschedule an appointment, please contact our office:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Phone: (346) 242-8344</li>
            <li>Email: texasheart24@gmail.com</li>
          </ul>
          <p className="font-medium text-navy">No-Show Fee</p>
          <p>
            Failure to attend a scheduled appointment without providing the required notice, or arriving so late that the appointment cannot be completed, may be considered a no-show.
          </p>
          <p>
            I understand and agree that a $30.00 no-show fee may be assessed for each missed appointment. This fee is not billable to insurance and is my sole financial responsibility.
          </p>
          <p>
            For scheduled diagnostic testing appointments, I understand and agree that a $50.00 no-show fee may be assessed if I fail to attend without providing the required notice. This fee is not billable to insurance and is my sole financial responsibility.
          </p>
          <p>
            We understand that emergencies and unforeseen circumstances can arise. In such cases, patients may contact our office to request a fee waiver.
          </p>
          <p className="font-medium text-navy">Acknowledgment</p>
          <p>
            By signing below, I acknowledge that I have read, understand, and agree to comply with this Missed Appointment and No-Show Fee Policy.
          </p>
        </div>
        <div className="mt-6 grid gap-4">
          <label className="block">
            <span className="mb-1.5 block text-base text-ink">Patient name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} className={inputClass} />
          </label>
          <div className="grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
            <SignatureField label="Signature" onChange={setSignature} />
            <label className="block">
              <span className="mb-1.5 block text-base text-ink">Date</span>
              <input value={date} onChange={(event) => setDate(event.target.value)} className={inputClass} />
            </label>
          </div>
        </div>
      </section>
    </form>
  );
}
