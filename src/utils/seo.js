import { CLINIC_INFO } from '../config/constants';
import { GOOGLE_RATING } from '../config/googleReviews';

export const SITE_URL = 'https://sumukhanuface.in/';

// Per-route title and description. Titles lead with the treatment and end
// with the town, because that is the order people type the search in:
// "dental implants hassan", not "hassan dental implants".
export const PAGE_SEO = {
  '/': {
    title: 'Dental Clinic in Hassan | Implants, Hair Transplant & Skin — Sumukha Nuface',
    description:
      'Sumukha Nuface is a dental, oral & maxillofacial surgery, hair transplant and skin clinic on Sampige Road, Hassan. Rated 4.9 across 434 Google reviews. Open Mon–Sat, 10 AM – 7:30 PM.',
  },
  '/services': {
    title: 'Treatments in Hassan — Root Canal, Implants, Braces, Hair & Skin | Sumukha Nuface',
    description:
      'Root canal, dental implants, wisdom tooth surgery, braces and aligners, hair transplant, PRP and laser skin treatment in Hassan, with pre and post procedure guidance for every treatment.',
  },
  '/before-after': {
    title: 'Before & After Results — Dental, Implant & Hair Transplant Cases in Hassan',
    description:
      'Real before and after photographs of treatments carried out at Sumukha Nuface, Hassan — braces, dental implants, crown and bridge, full mouth rehabilitation, hair transplant and tongue tie release.',
  },
  '/about': {
    title: 'About Sumukha Nuface — Dental & Maxillofacial Clinic in Hassan Since 2008',
    description:
      'Led by Dr Manoj Kumar Jain, oral & maxillofacial surgeon, and Dr Sheetal Jain, periodontist and implantologist. Serving Hassan since 2008 with in-house pharmacy, digital X-ray and lab facilities.',
  },
  '/contact': {
    title: 'Contact & Directions — Dental Clinic on Sampige Road, Hassan',
    description: `Visit Sumukha Nuface at ${CLINIC_INFO.address}. Call ${CLINIC_INFO.phone} or book on WhatsApp. Open Monday to Saturday, 10:00 AM to 7:30 PM.`,
  },
  '/book': {
    title: 'Book a Dental or Skin Appointment in Hassan | Sumukha Nuface',
    description:
      'Book an appointment at Sumukha Nuface, Hassan. Pick a treatment, date and time — reception confirms on WhatsApp.',
  },
};

/**
 * Schema.org markup for the clinic. This is what lets Google show the star
 * rating, opening hours and map pin in local results, which is where
 * searches like "dental clinic hassan" are actually won.
 */
export function buildClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE_URL}#clinic`,
    name: CLINIC_INFO.name,
    alternateName: [CLINIC_INFO.shortName, 'Nuface Sumukha Clinic', 'Sumukha Nuface Hassan'],
    description:
      'Dental, oral & maxillofacial surgery, dental implant, cosmetic dentistry, hair restoration and aesthetic skin clinic in Hassan, Karnataka.',
    url: SITE_URL,
    // CLINIC_INFO.phone is stored in domestic 0-STD format ('07411711098');
    // strip the leading 0 before prefixing the +91 country code.
    telephone: `+91${CLINIC_INFO.phone.replace(/^0/, '')}`,
    email: CLINIC_INFO.email,
    image: `${SITE_URL}logo.jpg`,
    logo: `${SITE_URL}logo.jpg`,
    foundingDate: '2008',
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sampige Road, 9th Cross, K R Puram',
      addressLocality: 'Hassan',
      addressRegion: 'Karnataka',
      postalCode: '573201',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 13.0094473,
      longitude: 76.1072635,
    },
    hasMap: CLINIC_INFO.mapLink,
    areaServed: [
      { '@type': 'City', name: 'Hassan' },
      { '@type': 'City', name: 'Belur' },
      { '@type': 'City', name: 'Sakleshpur' },
      { '@type': 'City', name: 'Arsikere' },
      { '@type': 'City', name: 'Holenarasipur' },
      { '@type': 'City', name: 'Channarayapatna' },
      { '@type': 'City', name: 'Alur' },
      { '@type': 'AdministrativeArea', name: 'Hassan District' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '19:30',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: GOOGLE_RATING.score,
      reviewCount: GOOGLE_RATING.total,
      bestRating: 5,
      worstRating: 1,
    },
    medicalSpecialty: ['Dentistry', 'OralAndMaxillofacialSurgery', 'Dermatology'],
    availableService: [
      'Root Canal Treatment',
      'Dental Implants',
      'Full Mouth Rehabilitation',
      'Wisdom Tooth Surgery',
      'Oral and Maxillofacial Surgery',
      'Facial Trauma Surgery',
      'Braces and Clear Aligners',
      'Teeth Whitening',
      'Veneers and Smile Design',
      'Kids Dentistry',
      'Gum and Bone Treatment',
      'Hair Transplant',
      'PRP and GFC Therapy',
      'Laser Hair Reduction',
      'Botox and Dermal Fillers',
      'Hydrafacial and Chemical Peels',
    ].map((name) => ({ '@type': 'MedicalProcedure', name })),
    employee: [
      {
        '@type': 'Physician',
        name: 'Dr. Manoj Kumar Jain',
        medicalSpecialty: 'OralAndMaxillofacialSurgery',
        jobTitle: 'Senior Oral & Maxillofacial Surgeon, Co-Founder',
      },
      {
        '@type': 'Dentist',
        name: 'Dr. Sheetal Jain',
        medicalSpecialty: 'Dentistry',
        jobTitle: 'Senior Periodontist & Implantologist, Co-Founder',
      },
    ],
    sameAs: [CLINIC_INFO.socialLinks.google].filter((u) => u && u !== '#'),
  };
}
