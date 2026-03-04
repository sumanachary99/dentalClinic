import nufaceLogo from '../assets/nuface-logo-mark.svg';
import doctorArun from '../assets/doctor-arun-placeholder.svg';
import doctorNeha from '../assets/doctor-neha-placeholder.svg';
import doctorZara from '../assets/doctor-zara-placeholder.svg';
import clinicLounge from '../assets/clinic-lounge-placeholder.svg';
import clinicTreatment from '../assets/clinic-treatment-placeholder.svg';
import clinicReception from '../assets/clinic-reception-placeholder.svg';
import { CLINIC_INFO } from './constants';

export const BRAND_ASSETS = {
  logo: nufaceLogo,
  galleryLink: CLINIC_INFO.mapLink,
};

export const SPECIALTY_PILLARS = [
  {
    id: 'dental',
    title: 'Dental Treatment',
    subtitle: 'Precision dentistry with modern tools',
    icon: '🦷',
    points: ['Digital diagnostics', 'Root canal and restorative care', 'Implant and smile rehabilitation'],
    bookingServiceId: 'consultation',
  },
  {
    id: 'hair',
    title: 'Hair Transplant & Restoration',
    subtitle: 'Evidence-led approach for scalp and follicles',
    icon: '🧬',
    points: ['Hair transplant planning', 'PRP-based support', 'Long-term follow-up and timeline tracking'],
    bookingServiceId: 'hair-transplant',
  },
  {
    id: 'skin',
    title: 'Skincare, Acne & Laser',
    subtitle: 'Protocol-based skin and acne procedures',
    icon: '✨',
    points: ['Laser rejuvenation programs', 'Pigmentation and scar pathways', 'Pre-care and post-care instructions'],
    bookingServiceId: 'skin-laser',
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
      'Share full medical history and current medicines before the appointment.',
      'Eat before treatment unless your doctor gives a sedation-specific instruction.',
      'Plan enough time because treatment may involve multiple steps or visits.',
    ],
    post: [
      'Wait for numbness to wear off before chewing and avoid hard foods initially.',
      'Take medicines exactly as advised and complete any prescribed course.',
      'Contact the clinic if pain, swelling, or fever worsens instead of improving.',
    ],
    caution:
      'Guidance is generalized. Your dentist may modify instructions based on infection severity, restoration type, and medical history.',
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
      'Expect detailed evaluation, including oral examination and imaging for planning.',
      'Discuss smoking habits and medical conditions; healing outcomes depend on these factors.',
      'Understand timeline: implant treatment usually requires staged visits and healing periods.',
    ],
    post: [
      'Follow oral hygiene instructions carefully around the implant area.',
      'Attend all review visits to track osseointegration and gum healing.',
      'Avoid tobacco during healing as it can increase implant failure risk.',
    ],
    caution:
      'Final protocol depends on bone quality, grafting needs, and the immediate or delayed implant approach.',
    sources: [
      { label: 'Cleveland Clinic - Dental Implants', url: 'https://my.clevelandclinic.org/health/treatments/10959-dental-implants' },
    ],
  },
  {
    id: 'hair-transplant',
    title: 'Hair Transplant',
    department: 'Hair',
    pre: [
      'Schedule a suitability consultation for scalp assessment and donor-area planning.',
      'Avoid smoking around the procedure window; it can affect blood flow and healing.',
      'Set recovery expectations in advance since regrowth takes months, not days.',
    ],
    post: [
      'Protect grafted scalp from trauma and direct sun during early healing.',
      'Follow wash-care instructions exactly and do not scratch scabs.',
      'Expect temporary shedding before visible regrowth, and keep follow-up visits.',
    ],
    caution:
      'Recovery and density outcomes vary by graft count, hair characteristics, and adherence to aftercare.',
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
      'Avoid excessive sun exposure and tanning before laser-based treatment.',
      'Tell your doctor about photosensitive medicines and recurrent cold sores.',
      'Stop smoking in the peri-procedure period when advised for better recovery.',
    ],
    post: [
      'Use gentle cleansing, moisturization, and broad-spectrum sunscreen daily.',
      'Avoid harsh products or heat exposure until your doctor clears you.',
      'Mild redness or swelling can occur; report severe discomfort immediately.',
    ],
    caution:
      'Downtime differs by laser type and skin type. Personalized post-care always takes priority over generic guidance.',
    sources: [
      { label: 'Mayo Clinic - Laser Resurfacing', url: 'https://www.mayoclinic.org/tests-procedures/laser-resurfacing/about/pac-20385114' },
      { label: 'Mayo Clinic - Laser Hair Removal', url: 'https://www.mayoclinic.org/tests-procedures/laser-hair-removal/about/pac-20392765' },
    ],
  },
];

export const TEAM_MEMBERS = [
  {
    id: 'doctor-1',
    name: 'Dr. Profile 01',
    role: 'Dental & Implant Specialist',
    credentials: 'BDS, MDS',
    expertise: ['Root canal planning', 'Implant restorations', 'Comprehensive smile care'],
    image: doctorArun,
  },
  {
    id: 'doctor-2',
    name: 'Dr. Profile 02',
    role: 'Aesthetic & Laser Specialist',
    credentials: 'Aesthetic Medicine',
    expertise: ['Skin laser pathways', 'Pigmentation management', 'Procedure safety protocols'],
    image: doctorNeha,
  },
  {
    id: 'doctor-3',
    name: 'Dr. Profile 03',
    role: 'Hair Restoration Consultant',
    credentials: 'Hair Science & Transplant Care',
    expertise: ['Transplant suitability', 'Graft-care timelines', 'PRP-supported maintenance'],
    image: doctorZara,
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
  {
    id: 'gallery-3',
    title: 'Reception Desk',
    caption: 'Assisted booking and follow-up support',
    image: clinicReception,
  },
];
