import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

const black = rgb(0, 0, 0);
const LEFT = 46;
const RIGHT = 566;

type Fonts = { regular: PDFFont; bold: PDFFont };

export type NoShowForm = {
  name: string;
  signature: string;
  date: string;
};

function clean(value: string) {
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
}

function center(page: PDFPage, text: string, y: number, font: PDFFont, size: number) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (612 - width) / 2, y, size, font, color: black });
}

function rule(page: PDFPage, x1: number, x2: number, y: number) {
  page.drawLine({
    start: { x: x1, y },
    end: { x: x2, y },
    thickness: 0.7,
    color: black,
  });
}

function onLine(page: PDFPage, font: PDFFont, value: string, x: number, y: number, maxWidth: number) {
  const text = clean(value);
  if (!text) return;
  let size = 9;
  while (size > 6 && font.widthOfTextAtSize(text, size) > maxWidth) size -= 0.5;
  page.drawText(text, { x, y: y + 3, size, font, color: black });
}

function labeled(page: PDFPage, fonts: Fonts, label: string, value: string, x: number, y: number, end: number) {
  const size = 8;
  page.drawText(label, { x, y, size, font: fonts.bold, color: black });
  const start = x + fonts.bold.widthOfTextAtSize(label, size) + 5;
  if (start < end - 8) {
    rule(page, start, end, y - 1);
    onLine(page, fonts.regular, value, start + 2, y - 1, end - start - 6);
  }
}

function wrap(page: PDFPage, font: PDFFont, text: string, x: number, y: number, width: number) {
  const words = clean(text).split(" ").filter(Boolean);
  let line = "";
  let cursor = y;
  const paint = (value: string) => {
    page.drawText(value, { x, y: cursor, size: 9, font, color: black });
    cursor -= 12;
  };
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, 9) > width && line) {
      paint(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) paint(line);
  return cursor;
}

function letterhead(page: PDFPage, fonts: Fonts) {
  let y = 746;
  center(page, "TEXAS HEART & VALVE SPECIALIST", y, fonts.bold, 12);
  y -= 16;
  center(page, "Mushtaque Ahmed, MD, FACC, FSCAI", y, fonts.bold, 10);
  y -= 13;
  center(page, "600 River Pointe Drive, Suite 100, Conroe, Texas 77304", y, fonts.regular, 8);
  y -= 12;
  center(page, "Ph# (346) 242-8344     Fax# (866) 531-9603", y, fonts.regular, 8);
  y -= 24;
  center(page, "MISSED APPOINTMENT AND NO-SHOW FEE POLICY", y, fonts.bold, 11);
  return y - 26;
}

async function signatureLine(doc: PDFDocument, page: PDFPage, fonts: Fonts, dataUrl: string, date: string, y: number) {
  page.drawText("Signature:", { x: LEFT, y, size: 8, font: fonts.bold, color: black });
  const lineY = y - 28;
  rule(page, LEFT, 380, lineY);
  rule(page, 420, RIGHT, lineY);
  page.drawText("Date", { x: 390, y: lineY + 3, size: 8, font: fonts.bold, color: black });
  onLine(page, fonts.regular, date, 424, lineY, RIGHT - 428);
  if (dataUrl.startsWith("data:image/png")) {
    const bytes = Uint8Array.from(atob(dataUrl.split(",")[1] ?? ""), (char) => char.charCodeAt(0));
    const image = await doc.embedPng(bytes);
    page.drawImage(image, { x: LEFT + 4, y: lineY + 2, width: 160, height: 24 });
  }
}

export async function buildNoShowPdf(form: NoShowForm) {
  const doc = await PDFDocument.create();
  const fonts: Fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
  const page = doc.addPage([612, 792]);
  let y = letterhead(page, fonts);

  page.drawText("Appointment Cancellation and Rescheduling", {
    x: LEFT,
    y,
    size: 10,
    font: fonts.bold,
    color: black,
  });
  y -= 16;
  y = wrap(
    page,
    fonts.regular,
    "I understand that timely notice of cancellation is necessary to ensure efficient scheduling and availability of care for all patients. If I am unable to keep a scheduled appointment, I agree to provide at least twenty-four (24) hours' notice to cancel or reschedule.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 8;
  y = wrap(
    page,
    fonts.regular,
    "To cancel or reschedule an appointment, please contact our office:",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 4;
  page.drawText("Phone: (346) 242-8344", { x: LEFT + 12, y, size: 9, font: fonts.regular, color: black });
  y -= 13;
  page.drawText("Email: texasheart24@gmail.com", { x: LEFT + 12, y, size: 9, font: fonts.regular, color: black });
  y -= 22;
  page.drawText("No-Show Fee", { x: LEFT, y, size: 10, font: fonts.bold, color: black });
  y -= 16;
  y = wrap(
    page,
    fonts.regular,
    "Failure to attend a scheduled appointment without providing the required notice, or arriving so late that the appointment cannot be completed, may be considered a no-show.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 8;
  y = wrap(
    page,
    fonts.regular,
    "I understand and agree that a $30.00 no-show fee may be assessed for each missed appointment. This fee is not billable to insurance and is my sole financial responsibility.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 8;
  y = wrap(
    page,
    fonts.regular,
    "For scheduled diagnostic testing appointments, I understand and agree that a $50.00 no-show fee may be assessed if I fail to attend without providing the required notice. This fee is not billable to insurance and is my sole financial responsibility.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 8;
  y = wrap(
    page,
    fonts.regular,
    "We understand that emergencies and unforeseen circumstances can arise. In such cases, patients may contact our office to request a fee waiver.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 16;
  page.drawText("Acknowledgment", { x: LEFT, y, size: 10, font: fonts.bold, color: black });
  y -= 16;
  y = wrap(
    page,
    fonts.regular,
    "By signing below, I acknowledge that I have read, understand, and agree to comply with this Missed Appointment and No-Show Fee Policy.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 28;
  labeled(page, fonts, "Patient Name:", form.name, LEFT, y, RIGHT);
  y -= 36;
  await signatureLine(doc, page, fonts, form.signature, form.date, y);
  return doc.save();
}
