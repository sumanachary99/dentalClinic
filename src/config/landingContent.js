import nufaceLogo from '../assets/logo.jpg';
import doctorManoj from '../assets/ManojKumarDoctor.jpeg';
import doctorSheetal from '../assets/sheetalDoctor.jpeg';
import doctorPraveen from '../assets/doctor-praveen.jpeg';
import doctorNirmala from '../assets/doctor-nirmala.jpeg';
import doctorArya from '../assets/doctor-arya.jpeg';
import clinicStorefront from '../assets/clinic-storefront.webp';
import clinicReception from '../assets/clinic-reception.webp';
import clinicMural from '../assets/clinic-mural.webp';
import clinicOperatory1 from '../assets/clinic-operatory-1.webp';
import clinicOperatory2 from '../assets/clinic-operatory-2.webp';
import heroBanner from '../assets/hero-banner.jpg';
import { CLINIC_INFO } from './constants';

export const BRAND_ASSETS = {
  logo: nufaceLogo,
  heroImage: heroBanner,
  storefront: clinicStorefront,
  mural: clinicMural,
  galleryLink: CLINIC_INFO.mapLink,
  brochure: CLINIC_INFO.brochureUrl,
};

export const SPECIALTY_PILLARS = [
  {
    id: 'dental',
    title: 'Precision Dental',
    subtitle: 'General, RCT & rehabilitation',
    icon: '🦷',
    colorClass: 'track-dental',
    points: [
      'Rotary Single-Sitting RCT',
      'Painless Tooth Extractions',
      'Kids Dentistry (Pedodontics)',
      'Gum & Bone Treatment',
    ],
    bookingServiceId: 'consultation',
  },
  {
    id: 'maxillofacial',
    title: 'Oral & Maxillofacial Surgery',
    subtitle: 'Advanced surgical care',
    icon: '🔪',
    colorClass: 'track-maxillofacial',
    points: [
      'Wisdom Tooth Surgery',
      'Cyst & Tumor Removal',
      'Facial Injuries & Trauma',
      'Orofacial Cleft Surgery',
    ],
    bookingServiceId: 'wisdom-tooth',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    subtitle: 'Single to full-mouth rehab',
    icon: '🔧',
    colorClass: 'track-implants',
    points: [
      'Single Tooth Implants',
      'Multiple Tooth Implants',
      'Full Mouth Rehabilitation',
      'Advanced Implantology',
    ],
    bookingServiceId: 'single-implant',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    subtitle: 'Smile design & aesthetics',
    icon: '✨',
    colorClass: 'track-cosmetic',
    points: [
      'Teeth Whitening',
      'Laminates & Veneers',
      'Gummy Smile Correction',
      'Digital Smile Design',
    ],
    bookingServiceId: 'smile-design',
  },
  {
    id: 'hair',
    title: 'Hair / Trichology',
    subtitle: 'Restoration & regrowth',
    icon: '💇',
    colorClass: 'track-hair',
    points: [
      'Hair Transplant (FUE)',
      'PRP / GFC Therapy',
      'Alopecia Treatment',
      'Laser Hair Reduction',
    ],
    bookingServiceId: 'hair-consultation',
  },
  {
    id: 'skin',
    title: 'Cosmetology / Skin',
    subtitle: 'Aesthetic laser & injectables',
    icon: '💫',
    colorClass: 'track-skin',
    points: [
      'Botox & Dermal Fillers',
      'Hydrafacial & Peels',
      'Laser Rejuvenation',
      'Thread Lift & PRP',
    ],
    bookingServiceId: 'skin-consultation',
  },
];

export const EXPERIENCE_POINTS = [
  { label: 'Specialty Verticals', value: '6', note: 'Dental · Surgery · Implants · Cosmetic · Hair · Skin' },
  { label: 'Years of Excellence', value: '17+', note: 'Since 2008, Hassan' },
  { label: 'Patient Satisfaction', value: '4.8/5', note: 'Across Google reviews' },
];

export const CARE_PROTOCOLS = [
  {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    department: 'Dental',
    pre: [
      'Inform your dentist about all current medications, allergies, and medical conditions.',
      'Eat a full meal 2–3 hours before the appointment.',
      'Avoid alcohol and smoking for at least 24 hours before.',
      'Take prescribed antibiotics or anti-inflammatories as directed.',
      'Plan enough time — sessions can take 60–90 minutes.',
      'Brush and floss thoroughly before arriving.',
    ],
    post: [
      'Wait for numbness to wear off (2–4 hours) before eating hot items.',
      'Avoid chewing on the treated side for 48–72 hours.',
      'Take prescribed painkillers and antibiotics exactly on schedule.',
      'Stick to soft foods for 2–3 days.',
      'Apply cold compress if swelling occurs.',
      'Contact clinic immediately for severe pain beyond 48 hours.',
    ],
    caution:
      'Guidance is generalized. Your dentist may modify instructions based on case severity.',
    sources: [
      { label: 'Cleveland Clinic - Root Canal', url: 'https://my.clevelandclinic.org/health/treatments/21758-root-canal' },
      { label: 'AAE - Post-Op Instructions', url: 'https://www.aae.org/patients/treatments-and-procedures/root-canal-treatment/post-op-instructions/' },
    ],
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    department: 'Dental',
    pre: [
      'Undergo a comprehensive oral exam and CBCT bone density scan.',
      'Stop smoking at least 2 weeks before surgery for better healing.',
      'Avoid aspirin and blood thinners 7 days before surgery (if advised).',
      'Eat a nutritious meal before arriving.',
      'Arrange someone to accompany you if sedation is planned.',
      'Prepare a soft-food meal plan for the first week.',
    ],
    post: [
      'Apply ice packs (20 min on/off) for the first 24 hours.',
      'Take all prescribed antibiotics and painkillers on time.',
      'Eat cold or lukewarm soft foods only for the first 72 hours.',
      'Do not brush the site for 48 hours; use prescribed mouthwash.',
      'Avoid strenuous exercise and heavy lifting for 5–7 days.',
      'Avoid tobacco completely for 3–6 months for implant stability.',
    ],
    caution:
      'Final protocol depends on bone quality and medical history.',
    sources: [
      { label: 'Cleveland Clinic - Dental Implants', url: 'https://my.clevelandclinic.org/health/treatments/10959-dental-implants' },
    ],
  },
  {
    id: 'hair-transplant',
    title: 'Hair Transplant',
    department: 'Hair',
    pre: [
      'Schedule a scalp assessment for donor evaluation and graft planning.',
      'Stop smoking and alcohol at least 2 weeks before.',
      'Discontinue blood thinners and aspirin 10 days before.',
      'Wash hair with mild shampoo the morning of the procedure.',
      'Wear a button-down shirt (do not pull over the head).',
      'Eat a proper breakfast as sessions take 6–8 hours.',
    ],
    post: [
      'Sleep upright (45°) for 5–7 nights to minimize scalp swelling.',
      'Do not touch or scratch the grafts for 10–14 days.',
      'Use prescribed saline spray to keep grafts moist every 2–3 hours.',
      'Avoid direct sun exposure for 4 weeks; wear a loose cap.',
      'Gentle hair washing only after 72 hours with surgeon’s technique.',
      'Avoid gym and heavy exercise for 2–3 weeks.',
    ],
    caution:
      'Outcomes vary by graft count and adherence to aftercare.',
    sources: [
      { label: 'NHS - Hair Transplant', url: 'https://www.nhs.uk/conditions/cosmetic-procedures/hair-transplant/' },
      { label: 'Cleveland Clinic - Hair Transplant', url: 'https://my.clevelandclinic.org/health/treatments/24434-hair-transplant' },
    ],
  },
  {
    id: 'laser-skin',
    title: 'Laser Skin Procedures',
    department: 'Skin',
    pre: [
      'Avoid direct sun and tanning beds for 2–4 weeks before.',
      'Stop retinoids and exfoliants 5–7 days before.',
      'Inform your doctor of any active skin infections or herpes history.',
      'Arrive with clean skin — no makeup, sunscreen, or lotions.',
      'Stop smoking — it significantly delays skin healing.',
      'Discuss expected downtime to plan social/work commitments.',
    ],
    post: [
      'Apply only prescribed soothing creams; avoid DIY remedies.',
      'Use broad-spectrum SPF 50+ daily (reapply every 2 hours).',
      'Avoid hot showers, saunas, and steam for 72 hours.',
      'Do not pick or peel any flaking skin.',
      'Use only gentle, fragrance-free cleansers for 2 weeks.',
      'Stay out of direct sun to avoid hyperpigmentation.',
    ],
    caution:
      'Downtime differs by laser type. Post-care is priority.',
    sources: [
      { label: 'Mayo Clinic - Laser Resurfacing', url: 'https://www.mayoclinic.org/tests-procedures/laser-resurfacing/about/pac-20385114' },
      { label: 'Mayo Clinic - Laser Hair Removal', url: 'https://www.mayoclinic.org/tests-procedures/laser-hair-removal/about/pac-20392765' },
    ],
  },
];

// ───────────────────────────────────────────────────────────────
// Primary doctors — owners / main face of Sumukha Nuface
// ───────────────────────────────────────────────────────────────
export const TEAM_MEMBERS = [
  {
    id: 'doctor-manoj',
    name: 'Dr. Manoj Kumar Jain',
    role: 'Senior Oral & Maxillofacial Surgeon · Co-Founder',
    credentials: 'MDS (PGI), FAMS (Germany), Fellowship in Aesthetic Medicine & Implantology',
    registration: 'KSDC Reg. No. 16162-A',
    description:
      'With nearly 18 years of clinical practice, Dr Manoj Kumar Jain leads Sumukha Nuface as one of the most referred centres for complicated dental work, medically compromised cases, and oral & maxillofacial surgeries. He has performed 1000+ major surgeries including maxillofacial trauma, cysts, tumours, and full-mouth rehabilitation with implants, lasers and scar revisions.',
    expertise: [
      'Maxillofacial Surgery & Trauma',
      'Dental Implantology',
      'Aesthetic Medicine & Surgery',
      'Trichology & Hair Transplant',
      'Orofacial Cosmetology (PRP, Lasers, Botox)',
    ],
    image: doctorManoj,
  },
  {
    id: 'doctor-sheetal',
    name: 'Dr. Sheetal Jain',
    role: 'Senior Periodontist & Implantologist · Co-Founder',
    credentials: 'BDS, MDS (2008) — Periodontics & Implantology',
    registration: 'KSDC Reg. No. 15883-A',
    image: doctorSheetal,
    description:
      'With 18 years of experience, Dr Sheetal Jain is an established expert in full mouth rehabilitation, gum surgeries and dental implants. She has completed thousands of single-sitting root canal treatments, periodontal surgeries, and over 500 implant placements — and is a certified aligner provider.',
    expertise: [
      'Periodontology & Implants',
      'Full Mouth Rehabilitation',
      'Single-Sitting Root Canal',
      'Gum Surgeries & Laser Perio',
      'Certified Aligner Provider',
    ],
  },
];

// ───────────────────────────────────────────────────────────────
// Consultants — visiting specialists who extend the clinic's scope
// ───────────────────────────────────────────────────────────────
export const CONSULTANTS = [
  {
    id: 'dr-praveen',
    name: 'Dr. Praveen Ch Gowda',
    credentials: 'MDS',
    role: 'Orthodontist · Clip Specialist',
    subRole: 'Certified Invisalign Provider',
    availability: 'On Call',
    image: doctorPraveen,
  },
  {
    id: 'dr-nirmala',
    name: 'Dr. Nirmala K.B.',
    credentials: 'MDS',
    role: 'Endodontist',
    subRole: 'Root Canal Specialist',
    availability: 'Visiting',
    image: doctorNirmala,
  },
  {
    id: 'dr-arya',
    name: 'Dr. Prapanna Arya',
    credentials: 'UK Certified',
    role: 'Aesthetic & Hair Transplant Surgeon',
    subRole: 'Cosmetology & Trichology',
    availability: 'Visiting',
    image: doctorArya,
  },
];

export const CLINIC_GALLERY = [
  {
    id: 'gallery-storefront',
    title: 'Sumukha Nuface, Hassan',
    caption: 'Our home at Sampige Road, 9th Cross — K R Puram',
    image: clinicStorefront,
  },
  {
    id: 'gallery-reception',
    title: 'Patient Lounge',
    caption: '“Your smile, our happiness” — a calm place to wait',
    image: clinicReception,
  },
  {
    id: 'gallery-mural',
    title: 'Service Mural',
    caption: 'Every speciality we offer — at a glance',
    image: clinicMural,
  },
  {
    id: 'gallery-operatory-1',
    title: 'Operatory · Chair 1',
    caption: 'Glass-partitioned treatment bay with full sterilisation',
    image: clinicOperatory1,
  },
  {
    id: 'gallery-operatory-2',
    title: 'Operatory · Chair 2',
    caption: 'Digital diagnostics & implant-ready setup',
    image: clinicOperatory2,
  },
];
