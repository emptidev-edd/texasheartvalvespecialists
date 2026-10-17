export const practice = {
  name: "Texas Heart & Valve Specialists",
  phone: "(346) 242-8344",
  phoneHref: "tel:+13462428344",
  fax: "(866) 531-9603",
  email: "info@texasheartvalvespecialist.org",
  hours: ["Mon – Fri: 8:30 am – 5pm", "Saturday: Closed", "Sunday: Closed"],
  hcaProfile:
    "https://www.hcahoustonhealthcare.com/physicians/profile/Dr-Mushtaque-Ahmed-MD",
  newPatientForms:
    "https://static1.squarespace.com/static/673a91723674b61d29dfa4c4/t/67450b6ae30184590c43b60e/1732578156480/Adobe+Scan+Nov+20%2C+2024+%281%29.pdf",
  echocardiogram: "http://www.cardiosmart.org/Healthwise/hw21/2692/hw212692",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/biography", label: "Biography" },
  { href: "/patient-info", label: "Patient Info" },
  { href: "/contact", label: "Contact" },
] as const;

export const locations = [
  {
    name: "Conroe",
    lines: ["600 River Pointe Dr.", "Suite 100", "Conroe, TX 77304"],
    map: "https://maps.google.com/?q=600+River+Pointe+Dr+Suite+100+Conroe+TX+77304",
  },
  {
    name: "The Woodlands",
    lines: ["128 Vision Park Blvd.", "Suite 130", "Shenandoah, TX 77384"],
    map: "https://maps.google.com/?q=128+Vision+Park+Blvd+Suite+130+Shenandoah+TX+77384",
  },
] as const;

export const featuredProcedures = [
  "AICD Generator Procedures",
  "AICD Lead Procedures",
  "Audioelectric Cardiography",
];

export const conditions = [
  "Angina & chest pain",
  "Heart attack",
  "Breathing difficulties",
  "Blackouts",
];

export const procedures = [
  "AICD Generator Procedures",
  "AICD Lead Procedures",
  "Audioelectric Cardiography",
  "Balloon Angioplasty",
  "Cardiac CT Angiogram",
  "Cardiac Catheterization",
  "Cardiovascular Stress Test",
  "Cardioversion",
];

export const tests = [
  { name: "Echocardiogram", href: practice.echocardiogram },
  { name: "Ambulatory ECG" },
  { name: "Exercise test" },
  { name: "Chest X-Ray" },
  { name: "24 hour monitoring" },
  { name: "Cardiac MRI" },
  { name: "Nuclear imaging" },
  { name: "Cardiac catheterisation" },
];

export const recordPolicies = [
  {
    title: "Review medical records",
    text: "Patients may review their medical records by scheduling an appointment. The first 15 minutes are free; additional time is billed at $25 per 15 minutes.",
  },
  {
    title: "Request chart revisions",
    text: "Patients may request chart revisions in writing. Approved changes or reasons for denial will be documented in their record.",
  },
  {
    title: "Sending records",
    text: "Records can be sent to physicians free of charge with patient authorization. Written consent is preferred, though phone authorization may be accepted in urgent cases.",
  },
  {
    title: "Insurance companies and attorneys",
    text: "Insurance companies and attorneys must provide signed authorization and prepay fees based on chart size before records are released.",
  },
  {
    title: "How to get copies of records",
    text: "Patients may request copies of their records. The first 25 pages cost $25, with additional pages charged at $0.10 each. Processing typically takes up to two weeks.",
  },
];
