export const MEDICATION_ROWS = 13;

export const ROS_ITEMS = [
  { group: "Cardiovascular", key: "murmur", label: "Murmur", x: 100, y: 636 },
  { group: "Cardiovascular", key: "irregular", label: "Irregular Heart Rhythm", x: 100, y: 622 },
  { group: "Cardiovascular", key: "palpitations", label: "Palpitations", x: 100, y: 614 },
  { group: "Cardiovascular", key: "squeezing", label: "Squeezing of the chest", x: 100, y: 606 },
  { group: "Cardiovascular", key: "chestPain", label: "Chest Pain", x: 100, y: 598 },
  { group: "Cardiovascular", key: "tightness", label: "Chest tightness or discomfort", x: 100, y: 590 },
  { group: "Cardiovascular", key: "sob", label: "Shortness of breath", x: 100, y: 580 },
  { group: "Cardiovascular", key: "sobExertion", label: "Shortness of breath with exertion", x: 100, y: 571 },
  { group: "Ears, Nose", key: "hearing", label: "Hearing loss", x: 100, y: 544 },
  { group: "Ears, Nose", key: "ringing", label: "Ringing in ears", x: 100, y: 534 },
  { group: "Ears, Nose", key: "mucous", label: "Abnormal mucous membranes", x: 100, y: 526 },
  { group: "Eyes", key: "vision", label: "Blurred or Double Vision", x: 100, y: 508 },
  { group: "Eyes", key: "glasses", label: "Contacts or Glasses", x: 100, y: 498 },
  { group: "Psychiatric", key: "anxiety", label: "Anxiety problems", x: 100, y: 479 },
  { group: "Psychiatric", key: "depressive", label: "Depressive Symptoms", x: 100, y: 470 },
  { group: "Psychiatric", key: "mood", label: "Personality or Mood changes", x: 100, y: 460 },
  { group: "Integumentary", key: "edema", label: "Edema – Swelling", x: 100, y: 444 },
  { group: "Integumentary", key: "sweating", label: "Sweating", x: 100, y: 434 },
  { group: "Integumentary", key: "bruising", label: "Bruising", x: 100, y: 424 },
  { group: "Integumentary", key: "lesions", label: "Skin lesions", x: 100, y: 416 },
  { group: "Integumentary", key: "skinCancer", label: "Skin cancer", x: 100, y: 408 },
  { group: "Integumentary", key: "rash", label: "Rash or itching on skin", x: 100, y: 399 },
  { group: "Gastrointestinal", key: "abdominal", label: "Abdominal pain", x: 100, y: 381 },
  { group: "Gastrointestinal", key: "weightGain", label: "Weight gain", x: 100, y: 370 },
  { group: "Gastrointestinal", key: "weightLoss", label: "Weight loss", x: 100, y: 361 },
  { group: "Gastrointestinal", key: "appetite", label: "Change in Appetite", x: 100, y: 352 },
  { group: "Gastrointestinal", key: "nausea", label: "Nausea or Vomiting", x: 100, y: 345 },
  { group: "Gastrointestinal", key: "diarrhea", label: "Diarrhea or Constipation", x: 100, y: 336 },
  { group: "Gastrointestinal", key: "indigestion", label: "Indigestion or Heartburn", x: 100, y: 326 },
  { group: "Gastrointestinal", key: "reflux", label: "Reflux", x: 100, y: 318 },
  { group: "Musculoskeletal", key: "arthritis", label: "Arthritis", x: 100, y: 300 },
  { group: "Musculoskeletal", key: "back", label: "Back or Neck pain", x: 100, y: 290 },
  { group: "Musculoskeletal", key: "leg", label: "Leg pain", x: 100, y: 280 },
  { group: "Musculoskeletal", key: "arm", label: "Arm pain", x: 100, y: 272 },
  { group: "Musculoskeletal", key: "gout", label: "Gout", x: 100, y: 264 },
  { group: "Neurological", key: "gait", label: "Gait disturbance – trouble walking", x: 100, y: 245 },
  { group: "Neurological", key: "seizures", label: "Seizures", x: 100, y: 236 },
  { group: "Neurological", key: "confusion", label: "Confusion or Memory loss", x: 100, y: 226 },
  { group: "Neurological", key: "weakness", label: "Weakness or Fatigue", x: 100, y: 218 },
  { group: "Neurological", key: "numbness", label: "Numbness or Tingling", x: 100, y: 208 },
  { group: "Neurological", key: "headaches", label: "Headaches", x: 100, y: 199 },
  { group: "Neurological", key: "dizziness", label: "Dizziness", x: 100, y: 190 },
  { group: "Neurological", key: "syncope", label: "Syncope (Passed out)", x: 100, y: 180 },
  { group: "Neurological", key: "swallowing", label: "Swallowing Difficulties", x: 100, y: 170 },
  { group: "Neurological", key: "speech", label: "Difficulties in Speech", x: 100, y: 162 },
  { group: "Respiratory", key: "congestion", label: "Congestion or Wheezing", x: 100, y: 143 },
  { group: "Respiratory", key: "cough", label: "Cough", x: 100, y: 134 },
  { group: "Genitourinary", key: "incontinence", label: "Incontinence", x: 100, y: 117 },
  { group: "Genitourinary", key: "urination", label: "Frequent Urination", x: 100, y: 106 },
  { group: "Genitourinary", key: "burning", label: "Pain or burning with urination", x: 100, y: 99 },
  { group: "Genitourinary", key: "bloodUrine", label: "Blood in urine", x: 100, y: 90 },
] as const;

export type RosKey = (typeof ROS_ITEMS)[number]["key"];

export type MedRow = { medication: string; dosage: string; often: string };

export type SharePerson = {
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};

export type PacketForm = {
  referringDoctor: string;
  lastName: string;
  firstName: string;
  middleInit: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneHome: string;
  phoneCell: string;
  phoneWork: string;
  phoneExt: string;
  sexMale: boolean;
  sexFemale: boolean;
  dob: string;
  ssn: string;
  student: boolean;
  retired: boolean;
  employed: boolean;
  employedWhere: string;
  maritalStatus: string;
  spouseName: string;
  spouseDob: string;
  spouseSsn: string;
  spouseEmployer: string;
  spouseWorkPhone: string;
  localPharmacy: string;
  localPharmacyPhone: string;
  mailPharmacy: string;
  mailPharmacyPhone: string;
  email: string;
  primaryIns: string;
  primaryInsPhone: string;
  primaryClaimAddress: string;
  primaryId: string;
  primaryGroup: string;
  primaryInsured: string;
  primaryInsuredDob: string;
  secondaryIns: string;
  secondaryInsPhone: string;
  secondaryClaimAddress: string;
  secondaryId: string;
  secondaryGroup: string;
  secondaryInsured: string;
  secondaryInsuredDob: string;
  medDate: string;
  medPatient: string;
  allergies: string;
  medications: MedRow[];
  rosName: string;
  rosDate: string;
  ros: Record<RosKey, boolean>;
  rosOther: string;
  releaseName: string;
  hivInitial: string;
  hivDate: string;
  releaseLimits: string;
  releaseToName: string;
  releaseToStreet: string;
  releaseToCity: string;
  releaseToState: string;
  releaseToZip: string;
  releasePurpose: string;
  releaseSignature: string;
  releaseDate: string;
  phiPatientName: string;
  phiContact: string;
  voicemailYes: boolean;
  voicemailNo: boolean;
  shares: SharePerson[];
  phiUntil: string;
  phiPurpose: string;
  phiSignature: string;
  phiDate: string;
  phiSignerName: string;
  phiAuthority: string;
  privacySignature: string;
  privacyDate: string;
  privacyName: string;
  privacyAuthority: string;
  facilityPatient: string;
  facilityDob: string;
  facilitySsn: string;
  facilityAll: boolean;
  facilityCardiac: boolean;
  facilityEkg: boolean;
  facilityLabs: boolean;
  facilityNotes: boolean;
  facilitySignature: string;
  facilityDate: string;
  medicarePrinted: string;
  medicareSignature: string;
  medicareDate: string;
};

function blankPerson(): SharePerson {
  return { name: "", phone: "", street: "", city: "", state: "", zip: "" };
}

export function emptyPacket(): PacketForm {
  const ros = {} as Record<RosKey, boolean>;
  for (const item of ROS_ITEMS) ros[item.key] = false;
  return {
    referringDoctor: "",
    lastName: "",
    firstName: "",
    middleInit: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneHome: "",
    phoneCell: "",
    phoneWork: "",
    phoneExt: "",
    sexMale: false,
    sexFemale: false,
    dob: "",
    ssn: "",
    student: false,
    retired: false,
    employed: false,
    employedWhere: "",
    maritalStatus: "",
    spouseName: "",
    spouseDob: "",
    spouseSsn: "",
    spouseEmployer: "",
    spouseWorkPhone: "",
    localPharmacy: "",
    localPharmacyPhone: "",
    mailPharmacy: "",
    mailPharmacyPhone: "",
    email: "",
    primaryIns: "",
    primaryInsPhone: "",
    primaryClaimAddress: "",
    primaryId: "",
    primaryGroup: "",
    primaryInsured: "",
    primaryInsuredDob: "",
    secondaryIns: "",
    secondaryInsPhone: "",
    secondaryClaimAddress: "",
    secondaryId: "",
    secondaryGroup: "",
    secondaryInsured: "",
    secondaryInsuredDob: "",
    medDate: "",
    medPatient: "",
    allergies: "",
    medications: Array.from({ length: MEDICATION_ROWS }, () => ({
      medication: "",
      dosage: "",
      often: "",
    })),
    rosName: "",
    rosDate: "",
    ros,
    rosOther: "",
    releaseName: "",
    hivInitial: "",
    hivDate: "",
    releaseLimits: "",
    releaseToName: "",
    releaseToStreet: "",
    releaseToCity: "",
    releaseToState: "",
    releaseToZip: "",
    releasePurpose: "",
    releaseSignature: "",
    releaseDate: "",
    phiPatientName: "",
    phiContact: "",
    voicemailYes: false,
    voicemailNo: false,
    shares: [blankPerson(), blankPerson(), blankPerson()],
    phiUntil: "",
    phiPurpose: "",
    phiSignature: "",
    phiDate: "",
    phiSignerName: "",
    phiAuthority: "",
    privacySignature: "",
    privacyDate: "",
    privacyName: "",
    privacyAuthority: "",
    facilityPatient: "",
    facilityDob: "",
    facilitySsn: "",
    facilityAll: false,
    facilityCardiac: false,
    facilityEkg: false,
    facilityLabs: false,
    facilityNotes: false,
    facilitySignature: "",
    facilityDate: "",
    medicarePrinted: "",
    medicareSignature: "",
    medicareDate: "",
  };
}
