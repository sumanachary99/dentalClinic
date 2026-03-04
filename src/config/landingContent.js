import nufaceLogo from '../assets/logo.jpg';
import doctorManoj from '../assets/ManojKumarDoctor.jpeg';
import doctorSheetal from '../assets/sheetalDoctor.jpeg';
import clinicLounge from '../assets/clinic-reception-lounge.png';
import clinicTreatment from '../assets/clinic-treatment-room.png';
import heroBanner from '../assets/hero-banner.png';
import { CLINIC_INFO } from './constants';

export const BRAND_ASSETS = {
  logo: nufaceLogo,
  heroImage: heroBanner,
  galleryLink: CLINIC_INFO.mapLink,
};

export const SPECIALTY_PILLARS = [
  {
    id: 'dental',
    title: 'Precision Dental',
    subtitle: 'Advanced oral surgery & rehabilitation',
    icon: '🦷',
    colorClass: 'track-dental',
    points: [
      'Digital Smile Designing',
      'Painless Root Canal (RCT)',
      'Immediate Dental Implants',
      'Orthodontic Alignment',
    ],
    bookingServiceId: 'dental-consultation',
  },
  {
    id: 'hair',
    title: 'Hair Restoration',
    subtitle: 'Follicular precision & regrowth',
    icon: '💇',
    colorClass: 'track-hair',
    points: [
      'FUE Hair Transplantation',
      'PRP & GFC Therapy',
      'Beard & Eyebrow Restores',
      'Scalp Micropigmentation',
    ],
    bookingServiceId: 'hair-consultation',
  },
  {
    id: 'skin',
    title: 'Aesthetic Skin',
    subtitle: 'Scientific laser protocols',
    icon: '✨',
    colorClass: 'track-skin',
    points: [
      'Laser Acne/Scar Removal',
      'Hydra & Carbon Peels',
      'Skin Brightening (GFC)',
      'Anti-Aging Injectables',
    ],
    bookingServiceId: 'skin-consultation',
  },
];

export const EXPERIENCE_POINTS = [
  { label: 'Specialty Verticals', value: '3', note: 'Dental | Hair | Skin' },
  { label: 'Clinical Protocols', value: '15+', note: 'Standardized pathways' },
  { label: 'Patient Satisfaction', value: '4.8/5', note: 'Across reviews' },
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

export const TEAM_MEMBERS = [
  {
    id: 'doctor-1',
    name: 'Dr. Manoj Kumar',
    role: 'Maxillofacial Surgeon & Implantologist',
    credentials: 'BDS, MDS',
    description:
      'Passionate Indian board Certified Maxillofacial Surgeon, Implantologist, Aesthetic Physician & Trichologist … AIPG 15th Rank …. Serving since 2008.',
    expertise: [
      'Maxillofacial Surgery',
      'Dental Implantology',
      'Full Mouth Rehabilitation',
      'Advanced Bone Grafting',
    ],
    image: doctorManoj,
  },
  {
    id: 'doctor-2',
    name: 'Dr. Sheetal',
    role: 'Aesthetic Physician & Cosmetologist',
    credentials: 'MBBS, PGD (Medical Cosmetology)',
    image: doctorSheetal,
    expertise: [
      'Laser Skin Treatments',
      'Hair Restoration Protocols',
      'Medical Peel Systems',
      'Anti-Aging & Injectables',
    ],
  },
];

export const CLINIC_GALLERY = [
  {
    id: 'gallery-1',
    title: 'Patient Lounge',
    caption: 'Comfort-focused waiting space',
    image: clinicLounge,
  },
  {
    id: 'gallery-2',
    title: 'Treatment Area',
    caption: 'Procedure-ready clinical setup',
    image: clinicTreatment,
  },
];
