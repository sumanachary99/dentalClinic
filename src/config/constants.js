// App-wide constants
export const CLINIC_INFO = {
  name: 'Suman Dental Clinic',
  tagline: 'Your Smile, Our Priority',
  phone: '9110443004',
  whatsappNumber: '919110443004', // with country code
  email: 'hello@sumandental.in',
  address: 'Ground Floor, Opposite City Mall, MG Road, Bengaluru, Karnataka 560001',
  city: 'Bengaluru',
  timings: {
    weekdays: '9:00 AM – 9:00 PM',
    saturday: '9:00 AM – 9:00 PM',
    sunday: '10:00 AM – 7:00 PM',
  },
  socialLinks: {
    instagram: '#',
    facebook: '#',
    youtube: '#',
    google: '#',
  },
};

export const STATS = [
  { value: 5000, suffix: '+', label: 'Happy Patients', icon: '😊' },
  { value: 8, suffix: '+', label: 'Years Experience', icon: '🏆' },
  { value: 15, suffix: '+', label: 'Expert Doctors', icon: '👨‍⚕️' },
  { value: 4.8, suffix: '/5', label: 'Google Rating', icon: '⭐' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    text: 'Excellent experience! The doctors were very professional and gentle. My root canal was completely painless. Highly recommend SmileCare Dental!',
    rating: 5,
    service: 'Root Canal Treatment',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    text: 'Best dental clinic in the area. The staff is very friendly and the clinic is super clean. Got my teeth cleaned and it looks amazing!',
    rating: 5,
    service: 'Teeth Cleaning',
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    text: 'My kids love coming here! The pediatric dentist is so patient and kind. The whole experience was stress-free for both me and my children.',
    rating: 5,
    service: 'Kids Dentistry',
  },
  {
    id: 4,
    name: 'Mohammed Faisal',
    text: 'Got my dental implant done here. The quality of work is outstanding. Dr. was very thorough in explaining the entire procedure.',
    rating: 5,
    service: 'Dental Implant',
  },
];

export const FAQ_DATA = [
  {
    q: 'What are the clinic timings?',
    a: 'We are open Monday to Saturday from 9 AM to 9 PM, and Sunday from 10 AM to 7 PM. Prior appointments are recommended for early morning and evening slots.',
  },
  {
    q: 'Do I need to book an appointment in advance?',
    a: 'While walk-ins are welcome, we recommend booking an appointment to ensure you get your preferred time slot and minimal waiting time.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Cash, UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking. EMI options are available for major treatments.',
  },
  {
    q: 'Is the treatment painful?',
    a: 'We use modern anesthesia techniques and advanced equipment to ensure all procedures are as painless as possible. Our doctors prioritize patient comfort.',
  },
  {
    q: 'Do you provide emergency dental services?',
    a: 'Yes! We handle dental emergencies including severe toothaches, broken teeth, and infections. Call us immediately and we will prioritize your appointment.',
  },
  {
    q: 'What safety measures do you follow?',
    a: 'We follow strict sterilization protocols, use disposable instruments where possible, and maintain the highest hygiene standards as per dental council guidelines.',
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
