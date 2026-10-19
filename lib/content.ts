export const practice = {
  name: "Texas Heart & Valve Specialists",
  phone: "(346) 242-8344",
  phoneHref: "tel:+13462428344",
  fax: "(866) 531-9603",
  email: "info@texasheartvalvespecialist.org",
  hours: ["Mon – Fri: 8:00 am – 5pm", "Saturday: Closed", "Sunday: Closed"],
  hcaProfile:
    "https://www.hcahoustonhealthcare.com/physicians/profile/Dr-Mushtaque-Ahmed-MD",
  newPatientForms: "/forms/new-patient-forms.pdf",
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
  {
    name: "Willis",
    lines: ["9851 FM 1097 Rd West", "Ste 120", "Willis, TX 77318"],
    map: "https://maps.google.com/?q=9851+FM+1097+Rd+West+Ste+120+Willis+TX+77318",
  },
] as const;

export const featuredProcedures = [
  "AICD Generator Procedures",
  "AICD Lead Procedures",
  "Audioelectric Cardiography",
];

export const specifiedProcedures = [
  "TAVR (Transcatheter Aortic Valve Replacement)",
  "Watchman (LAAO)",
  "Mitral Valve Clip",
];

export const conditions = [
  "Acute Myocardial Infarction",
  "Acute Rheumatic Heart Disease",
  "Adult Congenital Heart Disease",
  "Angina Pectoris",
  "Aortic; Peripheral; And Visceral Artery Aneurysms",
  "Atherosclerosis",
  "Cardiac",
  "Cardiac Arrhythmia & Conduction Disorders",
  "Cardiac Congenital & Valvular Disorders",
  "Connective Tissue Disorders",
  "Essential Hypertension",
  "Heart Failure",
  "High Blood Pressure",
  "Hypertension",
  "Myocarditis And Cardiomyopathy",
  "Other And Ill-Defined Heart Disease",
  "Pericarditis (or Inflammation of the Heart Membrane)",
  "Pericarditis And Pericardial Disease",
  "Peripheral Vascular Disorders",
  "Pulmonary Embolism",
  "Pulmonary Hypertension",
];

export const procedures = [
  "AICD Generator Procedures",
  "AICD Lead Procedures",
  "Audioelectric Cardiography",
  "Balloon Angioplasty",
  "Cardiac Catheterization",
  "Cardiac CT Angiography",
  "Cardiovascular Stress Test",
  "Cardioversion",
  "Diagnostic Cardiac Catheterization",
  "EKG",
  "Electrocardiogram",
  "Electrocardiogram Monitoring",
  "Electrophysiology Study",
  "Endovascular Abdominal Aortic Aneurysm Stent Graft Implant",
  "Intracardiac Echocardiography",
  "Other Transcatheter Vascular Procedure",
  "Pacemaker Implant",
  "Percutaneous Transluminal Balloon Valvuloplasty (Mitral Valve)",
  "Percutaneous Transluminal Coronary Artery Angioplasty",
  "Percutaneous Transluminal Coronary Artery Stent Placement",
  "Peripheral Artery Disease Rehabilitation",
  "Peripheral Interventions",
  "Renal Procedures",
  "Stress Test",
  "Sympathectomy - Radial Artery",
  "TAVR (Transcatheter Aortic Valve Replacement)",
  "Transesophageal Echocardiography",
];

export const tests = [
  {
    name: "Echocardiogram",
    text: "An echocardiogram uses sound waves to make moving pictures of the heart. It shows the size of the chambers, how well the heart pumps, and how the valves open and close. A probe is moved over the chest while you lie still. The test is painless.",
  },
  {
    name: "Ambulatory ECG",
    text: "An ambulatory ECG, often called a Holter monitor, records the heart’s rhythm while you go about your day. You wear a small recorder, usually for 24 hours, so skipped beats or fast rhythms that a short office ECG might miss can be captured.",
  },
  {
    name: "Exercise test",
    text: "An exercise test shows how the heart responds when the body is working. You walk on a treadmill or pedal a bike while your heart rhythm and blood pressure are watched. If you cannot exercise, a medicine may be used to raise the heart rate instead. The test looks for reduced blood flow, rhythm changes, and how much activity you can manage.",
  },
  {
    name: "Chest X-Ray",
    text: "A chest X-ray is a quick picture of the heart and lungs. It can show whether the heart is enlarged or whether there is fluid in the lungs. It is often a first step, and a more detailed test may follow.",
  },
  {
    name: "24 hour monitoring",
    text: "24-hour monitoring records the heartbeat continuously for a full day and night. Patches on the chest connect to a small recorder you wear home. It is used to look for rhythm problems that come and go, during sleep, rest, and activity.",
  },
  {
    name: "Cardiac MRI",
    text: "A cardiac MRI uses magnets and radio waves, not X-rays, to take detailed pictures of the heart muscle, chambers, and valves. It can show scarring, inflammation, and how well the heart pumps. You lie still inside the scanner while the pictures are taken.",
  },
  {
    name: "Nuclear imaging",
    text: "Nuclear imaging uses a small amount of tracer in the bloodstream and a special camera to show blood flow to the heart muscle. Pictures are taken at rest and after exercise, or after medicine that mimics exercise, to look for areas that are not getting enough blood.",
  },
  {
    name: "Cardiac catheterisation",
    text: "Cardiac catheterisation uses a thin, flexible tube placed into a blood vessel in the wrist or groin and guided to the heart. Dye and X-rays can show the coronary arteries and the valves. Treatment, such as opening a narrowed artery, can sometimes be done during the same visit.",
  },
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
