import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { MEDICATION_ROWS, ROS_ITEMS, type PacketForm } from "@/lib/new-patient-form-data";

const black = rgb(0, 0, 0);
const LEFT = 46;
const RIGHT = 566;

type Fonts = { regular: PDFFont; bold: PDFFont };

function clean(value: string) {
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
}

function center(page: PDFPage, text: string, y: number, font: PDFFont, size: number) {
  const width = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (612 - width) / 2, y, size, font, color: black });
}

function rule(page: PDFPage, x1: number, x2: number, y: number, thickness = 0.7) {
  page.drawLine({
    start: { x: x1, y },
    end: { x: x2, y },
    thickness,
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

function labeled(
  page: PDFPage,
  fonts: Fonts,
  label: string,
  value: string,
  x: number,
  y: number,
  end: number,
) {
  const size = 8;
  page.drawText(label, { x, y, size, font: fonts.bold, color: black });
  const start = x + fonts.bold.widthOfTextAtSize(label, size) + 5;
  if (start < end - 8) {
    rule(page, start, end, y - 1);
    onLine(page, fonts.regular, value, start + 2, y - 1, end - start - 6);
  }
}

function box(page: PDFPage, font: PDFFont, on: boolean, x: number, y: number) {
  page.drawRectangle({
    x,
    y: y - 1,
    width: 9,
    height: 9,
    borderWidth: 0.8,
    borderColor: black,
  });
  if (on) page.drawText("X", { x: x + 1.6, y: y + 0.5, size: 8, font, color: black });
}

function check(
  page: PDFPage,
  font: PDFFont,
  on: boolean,
  label: string,
  x: number,
  y: number,
) {
  box(page, font, on, x, y);
  page.drawText(label, { x: x + 13, y, size: 8, font, color: black });
  return x + 13 + font.widthOfTextAtSize(label, 8) + 12;
}

function wrap(
  page: PDFPage,
  font: PDFFont,
  text: string,
  x: number,
  y: number,
  width: number,
  size = 8,
  leading = 11,
) {
  const words = clean(text).split(" ").filter(Boolean);
  let line = "";
  let cursor = y;
  const paint = (value: string) => {
    page.drawText(value, { x, y: cursor, size, font, color: black });
    cursor -= leading;
  };
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) > width && line) {
      paint(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) paint(line);
  return cursor;
}

function letterhead(page: PDFPage, fonts: Fonts, title: string) {
  let y = 746;
  center(page, "TEXAS HEART & VALVE SPECIALIST", y, fonts.bold, 12);
  y -= 16;
  center(page, "Mushtaque Ahmed, MD, FACC, FSCAI", y, fonts.bold, 10);
  y -= 13;
  center(page, "600 River Pointe Drive, Suite 100, Conroe, Texas 77304", y, fonts.regular, 8);
  y -= 12;
  center(page, "Ph# (346) 242-8344     Fax# (866) 531-9603", y, fonts.regular, 8);
  y -= 24;
  center(page, title, y, fonts.bold, 11);
  return y - 26;
}

async function signature(
  doc: PDFDocument,
  page: PDFPage,
  fonts: Fonts,
  dataUrl: string,
  date: string,
  label: string,
  y: number,
  drop = 36,
) {
  page.drawText(label, { x: LEFT, y, size: 8, font: fonts.bold, color: black });
  const lineY = y - drop;
  rule(page, LEFT, 380, lineY);
  rule(page, 420, RIGHT, lineY);
  page.drawText("Date", { x: 390, y: lineY + 3, size: 8, font: fonts.bold, color: black });
  onLine(page, fonts.regular, date, 424, lineY, RIGHT - 428);
  if (dataUrl.startsWith("data:image/png")) {
    const bytes = Uint8Array.from(atob(dataUrl.split(",")[1] ?? ""), (char) => char.charCodeAt(0));
    const image = await doc.embedPng(bytes);
    page.drawImage(image, { x: LEFT + 4, y: lineY + 2, width: 160, height: 24 });
  }
  return lineY - 18;
}

function patientPage(page: PDFPage, fonts: Fonts, form: PacketForm) {
  let y = letterhead(page, fonts, "PATIENT INFORMATION FORM");
  const gap = 32;

  labeled(page, fonts, "WHO IS YOUR PRIMARY/FAMILY/REFERRING DOCTOR?", form.referringDoctor, LEFT, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "LAST NAME:", form.lastName, LEFT, y, 250);
  labeled(page, fonts, "FIRST NAME:", form.firstName, 258, y, 450);
  labeled(page, fonts, "MIDDLE INIT", form.middleInit, 458, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "ADDRESS:", form.address, LEFT, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "CITY:", form.city, LEFT, y, 280);
  labeled(page, fonts, "STATE:", form.state, 292, y, 430);
  labeled(page, fonts, "ZIP CODE:", form.zip, 442, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "PHONE: HOME", form.phoneHome, LEFT, y, 210);
  labeled(page, fonts, "CELL", form.phoneCell, 220, y, 360);
  labeled(page, fonts, "WORK", form.phoneWork, 370, y, 480);
  labeled(page, fonts, "EXT", form.phoneExt, 490, y, RIGHT);
  y -= gap;

  page.drawText("SEX:", { x: LEFT, y, size: 8, font: fonts.bold, color: black });
  let x = check(page, fonts.regular, form.sexMale, "MALE", LEFT + 32, y);
  x = check(page, fonts.regular, form.sexFemale, "FEMALE", x, y);
  labeled(page, fonts, "D.O.B.", form.dob, x, y, 400);
  labeled(page, fonts, "SOC SEC #", form.ssn, 408, y, RIGHT);
  y -= gap;

  x = check(page, fonts.regular, form.student, "STUDENT", LEFT, y);
  x = check(page, fonts.regular, form.retired, "RETIRED", x, y);
  x = check(page, fonts.regular, form.employed, "EMPLOYED", x, y);
  labeled(page, fonts, "WHERE:", form.employedWhere, x, y, 430);
  labeled(page, fonts, "MARITAL STATUS", form.maritalStatus, 438, y, RIGHT);
  y -= gap + 4;

  labeled(page, fonts, "SPOUSE NAME:", form.spouseName, LEFT, y, 300);
  labeled(page, fonts, "D.O.B.", form.spouseDob, 310, y, 420);
  labeled(page, fonts, "SOC SEC #", form.spouseSsn, 430, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "SPOUSE EMPLOYER:", form.spouseEmployer, LEFT, y, 320);
  labeled(page, fonts, "SPOUSE WORK PHONE", form.spouseWorkPhone, 330, y, RIGHT);
  y -= gap + 6;
  labeled(page, fonts, "LOCAL PHARMACY", form.localPharmacy, LEFT, y, 320);
  labeled(page, fonts, "LOCAL PHARMACY PHONE", form.localPharmacyPhone, 330, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "MAIL ORDER PHARMACY", form.mailPharmacy, LEFT, y, 320);
  labeled(page, fonts, "MAIL ORDER PHARMACY PHONE", form.mailPharmacyPhone, 330, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "E-MAIL ADDRESS:", form.email, LEFT, y, RIGHT);
  y -= 16;
  rule(page, LEFT, RIGHT, y, 1.4);
  y -= 22;

  labeled(page, fonts, "PRIMARY INS", form.primaryIns, LEFT, y, 360);
  labeled(page, fonts, "PHONE", form.primaryInsPhone, 372, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "CLAIM ADDRESS", form.primaryClaimAddress, LEFT, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "ID#", form.primaryId, LEFT, y, 300);
  labeled(page, fonts, "GROUP #", form.primaryGroup, 312, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "INSURED NAME", form.primaryInsured, LEFT, y, 360);
  labeled(page, fonts, "D.O.B.", form.primaryInsuredDob, 372, y, RIGHT);
  y -= gap + 4;
  labeled(page, fonts, "SECONDARY INS", form.secondaryIns, LEFT, y, 360);
  labeled(page, fonts, "PHONE", form.secondaryInsPhone, 372, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "CLAIM ADDRESS", form.secondaryClaimAddress, LEFT, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "ID#", form.secondaryId, LEFT, y, 300);
  labeled(page, fonts, "GROUP #", form.secondaryGroup, 312, y, RIGHT);
  y -= gap;
  labeled(page, fonts, "INSURED NAME", form.secondaryInsured, LEFT, y, 360);
  labeled(page, fonts, "D.O.B.", form.secondaryInsuredDob, 372, y, RIGHT);
}

function medicationPage(page: PDFPage, fonts: Fonts, form: PacketForm) {
  let y = 746;
  center(page, "Patient Medication List", y, fonts.bold, 13);
  y -= 28;
  labeled(page, fonts, "Date:", form.medDate, LEFT, y, 220);
  y -= 24;
  labeled(page, fonts, "Patient name/Date of birth:", form.medPatient, LEFT, y, RIGHT);
  y -= 24;
  labeled(page, fonts, "Known allergies/sensitivities:", form.allergies, LEFT, y, RIGHT);
  y -= 18;

  const cols = [LEFT, 250, 400, RIGHT];
  const rows = Math.max(form.medications.length, MEDICATION_ROWS);
  const tableTop = y;
  const rowH = (tableTop - 48) / (rows + 1);
  const tableBottom = tableTop - rowH * (rows + 1);
  page.drawRectangle({
    x: LEFT,
    y: tableBottom,
    width: RIGHT - LEFT,
    height: tableTop - tableBottom,
    borderWidth: 0.8,
    borderColor: black,
  });
  for (const col of cols.slice(1, -1)) {
    page.drawLine({
      start: { x: col, y: tableTop },
      end: { x: col, y: tableBottom },
      thickness: 0.6,
      color: black,
    });
  }
  const headers = ["Medication:", "Dosage:", "Taken how often:"];
  headers.forEach((header, index) => {
    page.drawText(header, {
      x: cols[index] + 6,
      y: tableTop - rowH * 0.62,
      size: 8,
      font: fonts.bold,
      color: black,
    });
  });
  rule(page, LEFT, RIGHT, tableTop - rowH);
  for (let index = 0; index < rows; index += 1) {
    const rowTop = tableTop - rowH * (index + 1);
    if (index < rows - 1) rule(page, LEFT, RIGHT, rowTop - rowH, 0.5);
    const row = form.medications[index];
    if (!row) continue;
    const textY = rowTop - rowH * 0.62;
    onLine(page, fonts.regular, row.medication, cols[0] + 6, textY - 3, cols[1] - cols[0] - 12);
    onLine(page, fonts.regular, row.dosage, cols[1] + 6, textY - 3, cols[2] - cols[1] - 12);
    onLine(page, fonts.regular, row.often, cols[2] + 6, textY - 3, cols[3] - cols[2] - 12);
  }
}

function reviewPage(page: PDFPage, fonts: Fonts, form: PacketForm) {
  let y = 746;
  labeled(page, fonts, "Name:", form.rosName, LEFT, y, 340);
  labeled(page, fonts, "Date:", form.rosDate, 380, y, RIGHT);
  y -= 22;
  center(page, "REVIEW OF SYSTEMS", y, fonts.bold, 11);
  y -= 18;
  page.drawText("Please check below all symptoms that you are having:", {
    x: LEFT,
    y,
    size: 8,
    font: fonts.regular,
    color: black,
  });
  const boxTop = y - 8;
  const groups: string[] = [];
  for (const item of ROS_ITEMS) {
    if (!groups.includes(item.group)) groups.push(item.group);
  }
  const columns = [LEFT + 12, 312];
  const columnGroups = [groups.slice(0, 5), groups.slice(5)];
  const lineCount = (names: string[]) =>
    names.reduce((count, group) => {
      const items = ROS_ITEMS.filter((entry) => entry.group === group).length;
      return count + 1 + items + (group === "Cardiovascular" ? 1 : 0);
    }, 0);
  const step = (boxTop - 16 - 52) / Math.max(lineCount(columnGroups[0]), lineCount(columnGroups[1]));
  const cursors = [boxTop - 16, boxTop - 16];
  columnGroups.forEach((names, column) => {
    let cursor = cursors[column];
    const spare = (Math.max(...columnGroups.map(lineCount)) - lineCount(names)) * step;
    const groupGap = names.length > 1 ? spare / (names.length - 1) : 0;
    names.forEach((group, index) => {
      page.drawText(group, {
        x: columns[column],
        y: cursor,
        size: 8,
        font: fonts.bold,
        color: black,
      });
      cursor -= step;
      for (const item of ROS_ITEMS.filter((entry) => entry.group === group)) {
        check(page, fonts.regular, form.ros[item.key], item.label, columns[column] + 4, cursor);
        cursor -= step;
      }
      if (group === "Cardiovascular") {
        labeled(page, fonts, "Other", form.rosOther, columns[column] + 4, cursor, columns[column] + 230);
        cursor -= step;
      }
      if (index < names.length - 1) cursor -= groupGap;
    });
    cursors[column] = cursor;
  });
  const bottom = Math.min(...cursors) - 6;
  page.drawRectangle({
    x: LEFT,
    y: bottom,
    width: RIGHT - LEFT,
    height: boxTop - bottom,
    borderWidth: 0.8,
    borderColor: black,
  });
}

async function releaseToPage(doc: PDFDocument, page: PDFPage, fonts: Fonts, form: PacketForm) {
  let y = letterhead(page, fonts, "Authorization for Release of Medical Records To:");
  const line =
    "By signing this form, I " +
    (clean(form.releaseName) || "________________") +
    " authorize TEXAS HEART & VALVE SPECIALIST to release confidential health information about me, by releasing a copy of my medical records, or a summary or narrative of my protected health information, to the person(s) or entity listed below.";
  y = wrap(page, fonts.regular, line, LEFT, y, RIGHT - LEFT, 9, 13);
  y -= 16;
  y = wrap(
    page,
    fonts.regular,
    "HIV/AIDS: I consent to the release of any positive or negative test result for AIDS or HIV infection, antibodies to AIDS, or infection with any other causative agent of AIDS, with the rest of my medical records.",
    LEFT,
    y,
    RIGHT - LEFT,
    9,
    13,
  );
  y -= 16;
  labeled(page, fonts, "Initial:", form.hivInitial, LEFT, y, 220);
  labeled(page, fonts, "Date:", form.hivDate, 240, y, 400);
  y -= 32;
  y = wrap(
    page,
    fonts.regular,
    "Limitations on the information you may release subject to this Release Form are as follows:",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  labeled(page, fonts, "", form.releaseLimits, LEFT, y, RIGHT);
  y -= 22;
  rule(page, LEFT, RIGHT, y);
  y -= 36;
  page.drawText("Release my protected health information to the following person(s)/entity:", {
    x: LEFT,
    y,
    size: 8,
    font: fonts.bold,
    color: black,
  });
  y -= 28;
  labeled(page, fonts, "Name:", form.releaseToName, LEFT, y, RIGHT);
  y -= 28;
  labeled(page, fonts, "Street:", form.releaseToStreet, LEFT, y, RIGHT);
  y -= 28;
  labeled(page, fonts, "City:", form.releaseToCity, LEFT, y, 300);
  labeled(page, fonts, "State:", form.releaseToState, 312, y, 420);
  labeled(page, fonts, "Zip Code:", form.releaseToZip, 432, y, RIGHT);
  y -= 32;
  y = wrap(
    page,
    fonts.regular,
    "The reasons or purpose for this release of information are as follows:",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  labeled(page, fonts, "", form.releasePurpose, LEFT, y, RIGHT);
  y -= 20;
  rule(page, LEFT, RIGHT, y);
  y -= 28;
  y = await signature(
    doc,
    page,
    fonts,
    form.releaseSignature,
    form.releaseDate,
    "Patient Signature (or parent, guardian or legal representative):",
    y,
    52,
  );
  y -= 150;
  wrap(
    page,
    fonts.regular,
    "I understand that you will provide this information within 15 days from receipt of request and that a fee for preparing and furnishing this information may be charged according to rulings set forth by the Texas State Board of Medical Examiners.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
}

async function phiPage(doc: PDFDocument, page: PDFPage, fonts: Fonts, form: PacketForm) {
  let y = letterhead(page, fonts, "Authorization Form for Release of Protected Health Information");
  labeled(page, fonts, "Patient Name:", form.phiPatientName, LEFT, y, 360);
  labeled(page, fonts, "Contact:", form.phiContact, 372, y, RIGHT);
  y -= 26;
  page.drawText("May we leave messages in your voicemail", {
    x: LEFT,
    y,
    size: 8,
    font: fonts.regular,
    color: black,
  });
  let x = check(page, fonts.regular, form.voicemailYes, "Yes", 280, y);
  check(page, fonts.regular, form.voicemailNo, "No", x, y);
  y -= 24;
  y = wrap(
    page,
    fonts.bold,
    "Below please list any family member or Physician we may share your medical information with:",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  page.drawText("Release my protected health information to the following person(s)/entity:", {
    x: LEFT,
    y,
    size: 8,
    font: fonts.regular,
    color: black,
  });
  y -= 22;
  form.shares.forEach((person) => {
    labeled(page, fonts, "Name:", person.name, LEFT, y, 300);
    labeled(page, fonts, "Phone:", person.phone, 312, y, RIGHT);
    y -= 22;
    labeled(page, fonts, "Street:", person.street, LEFT, y, 250);
    labeled(page, fonts, "City:", person.city, 258, y, 390);
    labeled(page, fonts, "State:", person.state, 398, y, 470);
    labeled(page, fonts, "Zip:", person.zip, 478, y, RIGHT);
    y -= 22;
  });
  labeled(page, fonts, "This authorization shall be in force and effective until:", form.phiUntil, LEFT, y, RIGHT);
  y -= 24;
  y = wrap(
    page,
    fonts.regular,
    "The reasons or purposes for this release of information are as follows:",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  labeled(page, fonts, "", form.phiPurpose, LEFT, y, RIGHT);
  y -= 22;
  y = wrap(
    page,
    fonts.regular,
    "I understand that I have the right to revoke this authorization, in writing, at any time by sending written notification to Dr. Mushtaque Ahmed, M.D. A revocation is not effective to the extent the practice has relied on this authorization, or if it was obtained as a condition of obtaining insurance coverage. Information disclosed may be subject to redisclosure and may no longer be protected by federal HIPAA privacy regulations. The practice will not condition treatment, payment, enrollment, or eligibility for benefits on whether I provide this authorization.",
    LEFT,
    y,
    RIGHT - LEFT,
    7.5,
    9.5,
  );
  y -= 8;
  y = await signature(
    doc,
    page,
    fonts,
    form.phiSignature,
    form.phiDate,
    "Signature of Patient or Personal Representative",
    y,
  );
  labeled(page, fonts, "Name:", form.phiSignerName, LEFT, y, 320);
  labeled(page, fonts, "Authority:", form.phiAuthority, 330, y, RIGHT);
  y -= 22;
  center(page, "Acknowledgement of Review of Notice of Privacy Practices", y, fonts.bold, 9);
  y -= 14;
  y = wrap(
    page,
    fonts.regular,
    "I have reviewed this office's Notice of Privacy Practices, which explains how my medical information will be used and disclosed. I understand that I am entitled to receive a copy of this document.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 4;
  y = await signature(
    doc,
    page,
    fonts,
    form.privacySignature,
    form.privacyDate,
    "Signature of Patient or Personal Representative",
    y,
  );
  labeled(page, fonts, "Name:", form.privacyName, LEFT, y, 320);
  labeled(page, fonts, "Authority:", form.privacyAuthority, 330, y, RIGHT);
  y -= 64;
  page.drawText("For Office Staff Use Only:", {
    x: LEFT,
    y,
    size: 8,
    font: fonts.bold,
    color: black,
  });
  y -= 12;
  y = wrap(
    page,
    fonts.regular,
    "If the patient refuses to sign a written acknowledgement of the Notice of Privacy Practice, please indicate your comments:",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  rule(page, LEFT, RIGHT, y);
  y -= 16;
  rule(page, LEFT, 280, y);
  rule(page, 320, RIGHT, y);
  page.drawText("Name", { x: LEFT, y: y + 4, size: 7, font: fonts.regular, color: black });
  page.drawText("Date", { x: 320, y: y + 4, size: 7, font: fonts.regular, color: black });
}

async function facilityPage(doc: PDFDocument, page: PDFPage, fonts: Fonts, form: PacketForm) {
  let y = 730;
  center(page, "Authorization for Release of Medical Records from Another Facility to THV", y, fonts.bold, 11);
  y -= 48;
  labeled(page, fonts, "Patient Name", form.facilityPatient, LEFT, y, RIGHT);
  y -= 36;
  labeled(page, fonts, "DOB", form.facilityDob, LEFT, y, 240);
  labeled(page, fonts, "Social Security Number", form.facilitySsn, 260, y, RIGHT);
  y -= 40;
  y = wrap(
    page,
    fonts.regular,
    "I hereby authorize the release of information contained in my medical records to:",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 18;
  center(page, "TEXAS HEART & VALVE SPECIALIST", y, fonts.bold, 10);
  y -= 18;
  center(page, "MUSHTAQUE AHMED, M.D., FACC, FSCAI", y, fonts.bold, 9);
  y -= 16;
  center(page, "600 River Pointe Dr. Suite 100", y, fonts.regular, 8);
  y -= 14;
  center(page, "PH# (346) 242-8344    FAX# (866) 531-9603", y, fonts.regular, 8);
  y -= 40;
  const choices: [boolean, string][] = [
    [form.facilityAll, "All Medical Records"],
    [form.facilityCardiac, "Cardiac Testing"],
    [form.facilityEkg, "EKG"],
    [form.facilityLabs, "Recent Labs"],
    [form.facilityNotes, "Recent Progress Notes"],
  ];
  for (const [on, label] of choices) {
    check(page, fonts.regular, on, label, LEFT, y);
    y -= 48;
  }
  y -= 36;
  y = wrap(
    page,
    fonts.regular,
    "The information being released will be used for medical purposes. The authorization is valid for one year from the date of signing. The patient or his/her representative may revoke this consent at any time.",
    LEFT,
    y,
    RIGHT - LEFT,
  );
  y -= 70;
  await signature(doc, page, fonts, form.facilitySignature, form.facilityDate, "Patient Signature", y, 56);
}

async function medicarePage(doc: PDFDocument, page: PDFPage, fonts: Fonts, form: PacketForm) {
  let y = 730;
  center(page, "MEDICARE AND COMMERCIAL INSURANCE", y, fonts.bold, 12);
  y -= 16;
  center(page, "SIGNATURE ON FILE", y, fonts.bold, 12);
  y -= 28;
  y = wrap(
    page,
    fonts.regular,
    "I hereby request that payment of authorized Commercial Insurance and/or Medicare benefits be made on my behalf to TEXAS HEART & VALVE SPECIALIST, Dr. Mushtaque Ahmed, for any services furnished me. I authorize any holder of medical information about me to release to Medicare and/or Commercial Insurance and its agents any information needed to determine these benefits or the benefits payable for related services.",
    LEFT,
    y,
    RIGHT - LEFT,
    10,
    15,
  );
  y -= 22;
  y = wrap(
    page,
    fonts.regular,
    "I understand my signature below requests that payment be made and authorizes release of medical information necessary to pay the claim. If other health insurance is indicated in Block 9 of the HCFA-1500 form or elsewhere on other approved claim forms or electronically submitted claims, my signature authorizes releasing that information to the insurer or agency shown. In Medicare assigned cases, the provider or supplier agrees to accept the charge determined by the Medicare carrier as full charge, and the patient is responsible only for the deductible, co-insurance, and non-covered services.",
    LEFT,
    y,
    RIGHT - LEFT,
    10,
    15,
  );
  y -= 310;
  labeled(page, fonts, "Patient's Printed Name:", form.medicarePrinted, LEFT, y, RIGHT);
  y -= 80;
  await signature(doc, page, fonts, form.medicareSignature, form.medicareDate, "Patient's Signature:", y, 56);
}

export async function buildPacketPdf(form: PacketForm) {
  const doc = await PDFDocument.create();
  const fonts: Fonts = {
    regular: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
  };
  const add = () => doc.addPage([612, 792]);
  patientPage(add(), fonts, form);
  medicationPage(add(), fonts, form);
  reviewPage(add(), fonts, form);
  await releaseToPage(doc, add(), fonts, form);
  await phiPage(doc, add(), fonts, form);
  await facilityPage(doc, add(), fonts, form);
  await medicarePage(doc, add(), fonts, form);
  return doc.save();
}
