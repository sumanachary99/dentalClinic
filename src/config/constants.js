// App-wide constants
export const CLINIC_INFO = {
  name: 'Sumukha Nuface - Dental, Face, Hair & Cosmetic Clinic',
  shortName: 'Sumukha Nuface',
  tagline: 'Dental | Face | Hair | Cosmetic',
  slogan: 'Your Smile, Our Happiness',
  brochureUrl: '/sumukha-nuface-brochure.pdf',
  phone: '07411711098',
  phoneAlt: '9110443004',
  whatsappNumber: '919110443004', // with country code
  email: 'hello@sumukhanuface.in',
  address: 'Sampige Road, 9th Cross, K R Puram, Hassan - 573201',
  addressShort: 'Sampige Road, 9th Cross, K R Puram, Hassan',
  facilities: 'Pharmacy, X-Ray & Lab Facilities Available',
  mapLink: 'https://www.google.com/maps?sca_esv=ccae66869844adf7&sxsrf=ANbL-n7DE2lvLwUiXqapOJYK4qntAnw48g:1772595918545&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiFW51ZmFjZSBzdW11a2hhIGNsaW5pYzIEECMYJzILEC4YgAQYxwEYrwEyCxAAGIAEGIYDGIoFMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEj1BFChAlihAnABeACQAQCYAZMCoAH4A6oBAzItMrgBA8gBAPgBAZgCAqACpwLCAgsQABiABBiwAxiiBMICCBAAGLADGO8FmAMAiAYBkAYFkgcFMS4wLjGgB8kQsgcDMi0xuAefAsIHBTItMS4xyAcNgAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KdOH6NSlSaU7MeNqSTUvguH0&daddr=Sampige+Road,+9th+Cross+Rd,+Hassan,+Karnataka+573201',
  city: 'Hassan',
  timings: {
    weekdays: '10:00 AM – 7:30 PM',
    saturday: '10:00 AM – 7:30 PM',
    sunday: 'Closed',
    display: 'Mon–Sat: 10:00 AM – 7:30 PM',
    note: 'Sundays Closed',
  },
  socialLinks: {
    instagram: '#',
    facebook: '#',
    youtube: '#',
    google: 'https://www.google.com/maps?sca_esv=ccae66869844adf7&sxsrf=ANbL-n7DE2lvLwUiXqapOJYK4qntAnw48g:1772595918545&uact=5&gs_lp=Egxnd3Mtd2l6LXNlcnAiFW51ZmFjZSBzdW11a2hhIGNsaW5pYzIEECMYJzILEC4YgAQYxwEYrwEyCxAAGIAEGIYDGIoFMgsQABiABBiGAxiKBTILEAAYgAQYhgMYigUyCxAAGIAEGIYDGIoFMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIEMggQABiABBiiBEj1BFChAlihAnABeACQAQCYAZMCoAH4A6oBAzItMrgBA8gBAPgBAZgCAqACpwLCAgsQABiABBiwAxiiBMICCBAAGLADGO8FmAMAiAYBkAYFkgcFMS4wLjGgB8kQsgcDMi0xuAefAsIHBTItMS4xyAcNgAgA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KdOH6NSlSaU7MeNqSTUvguH0&daddr=Sampige+Road,+9th+Cross+Rd,+Hassan,+Karnataka+573201',
  },
};

export const STATS = [
  { value: 5000, suffix: '+', label: 'Happy Clients', icon: '😊' },
  { value: 17, suffix: '+', label: 'Years Experience', icon: '🏆' },
  { value: 12000, suffix: '+', label: 'Procedures Delivered', icon: '✅' },
  { value: 4.8, suffix: '/5', label: 'Google Rating', icon: '⭐' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya S.',
    text: 'I visited for a painful molar and the root canal process was smooth. The team explained each step and the pain settled quickly after treatment.',
    rating: 5,
    service: 'Root Canal Treatment',
  },
  {
    id: 2,
    name: 'Arjun K.',
    text: 'The clinic feels modern and organized. I booked through WhatsApp and the reception followed up exactly on time.',
    rating: 5,
    service: 'Dental Consultation',
  },
  {
    id: 3,
    name: 'Sahana R.',
    text: 'I started laser skin sessions here and appreciated how clearly they explained sun-care and recovery. Very professional setup.',
    rating: 5,
    service: 'Laser Skin Care',
  },
  {
    id: 4,
    name: 'Rahul M.',
    text: 'The hair transplant planning felt realistic and transparent. The post-procedure timeline and follow-up support were clearly documented.',
    rating: 5,
    service: 'Hair Restoration',
  },
];

export const FAQ_DATA = [
  {
    q: 'What are the clinic timings?',
    a: 'We are open Monday to Saturday from 10:00 AM to 7:30 PM. Sundays closed. Prior appointments are recommended for peak evening slots.',
  },
  {
    q: 'Do you handle only dental treatments?',
    a: 'No. We provide dental and implant care, hair restoration services, and selected laser skin treatments at the same center.',
  },
  {
    q: 'Can I see pre and post procedural instructions before booking?',
    a: 'Yes. We provide a pre/post care section on the website for key procedures. Final instructions are always personalized by the treating doctor.',
  },
  {
    q: 'Will my appointment be visible to reception after form submission?',
    a: 'Yes. Appointment submissions are synced to our Google Sheets workflow when configured, with local fallback storage as backup.',
  },
  {
    q: 'How do I book quickly?',
    a: 'Select a service, date and time, then submit your details. You will be redirected to WhatsApp for quick confirmation and conversation with our team.',
  },
  {
    q: 'What safety measures do you follow?',
    a: 'We follow strict sterilization, treatment-specific consent protocols, and documented post-procedure care plans for safer recovery.',
  },
];

export const APPOINTMENT_STATUS = {
  BOOKED: 'Booked',
  VISITED: 'Visited',
  NO_SHOW: 'No-Show',
  FOLLOW_UP: 'Follow-Up Required',
  CANCELLED: 'Cancelled',
};

export const FOLLOW_UP_STAGES = {
  NONE: 'None',
  DAY_1: 'Day-1',
  DAY_3: 'Day-3',
  DAY_7: 'Day-7',
  COMPLETED: 'Completed',
};
