// Profile pictures for the eight reviewers who uploaded one, taken from the
// same public Google listing as the reviews and served from our own origin —
// Google's image URLs expire, and self-hosting keeps the clinic's page off a
// third-party request on every visit. Everyone else renders a monogram, so
// there is no file here for them.
import avKalpesh from '../assets/reviewers/kalpesh.webp';
import avLuckyHubli from '../assets/reviewers/lucky-hubli.webp';
import avPrajwal from '../assets/reviewers/prajwal.webp';
import avSomesh from '../assets/reviewers/somesh.webp';
import avAanchal from '../assets/reviewers/aanchal.webp';
import avKhan from '../assets/reviewers/khan.webp';
import avAyush from '../assets/reviewers/ayush.webp';
import avSupreeth from '../assets/reviewers/supreeth.webp';

const AVATARS = {
  'gr-kalpesh': avKalpesh,
  'gr-lucky-hubli': avLuckyHubli,
  'gr-prajwal': avPrajwal,
  'gr-somesh': avSomesh,
  'gr-aanchal': avAanchal,
  'gr-khan': avKhan,
  'gr-ayush': avAyush,
  'gr-supreeth': avSupreeth,
};

const withAvatar = (list) =>
  list.map((r) => ({ ...r, avatar: AVATARS[r.id] || null }));

// ───────────────────────────────────────────────────────────────
// Verified Google reviews for Nuface Sumukha Clinic, Hassan.
//
// Pulled from the clinic's public Google Business listing on
// 26 July 2026. Quotes are verbatim; long reviews are trimmed at a
// sentence boundary and marked with an ellipsis. Do not paraphrase —
// these are real patients' words.
//
// `from` is only set where the reviewer themselves named the town or
// city they travelled in from. That detail is the point: a Hassan
// clinic pulling patients across four states.
// ───────────────────────────────────────────────────────────────

export const GOOGLE_RATING = {
  score: 4.9,
  total: 434,
  scale: 5,
  sourceLabel: 'Google Reviews',
  profileUrl:
    'https://www.google.com/maps/place/?q=place_id:ChIJ04eHpaVJpTsR42pJNS-C4fQ',
  lastSynced: 'July 2026',
};

const REVIEW_RECORDS = [
  {
    id: 'gr-manjunatha',
    name: 'Manjunatha Dm',
    rating: 5,
    when: 'a month ago',
    treatment: 'Facial trauma surgery',
    from: null,
    text: 'Got operated for complex facial injury (multiple facial bone fractures) by maxillofacial surgeon dr manoj jain. Thank you for saving my life and giving good results. Surgery went for nearly 6 hours and the journey of postop care was so challenging but dr was so kind that he always gave positivity and encouragement which helped in faster recovery.',
  },
  {
    id: 'gr-kalpesh',
    photo: true,
    name: 'Kalpesh Jain',
    rating: 5,
    when: '8 months ago',
    treatment: 'Hair transplant',
    from: null,
    text: 'I had a very positive experience with Dr. Manoj Kumar Jain for my hair transplant. Dr. Jain explained every step in detail and ensured I was comfortable throughout the procedure. After the procedure the results have been outstanding and look completely natural.',
  },
  {
    id: 'gr-neelmani',
    name: 'Neelmani Surana',
    rating: 5,
    when: '6 months ago',
    treatment: 'Dental treatment',
    from: 'Vijayawada',
    text: 'The clinic is clean, hygienic & well maintained. The treatment was done with great attention, smoothly & pain-free. I traveled from Vijayawada to Hassan for the treatment & I am happy with the results & would definitely visit again if needed.',
  },
  {
    id: 'gr-lucky-hubli',
    photo: true,
    name: 'Lucky Opticians hubli',
    rating: 5,
    when: 'a year ago',
    treatment: 'Re-RCT · Implant · Hair transplant',
    from: 'Hubli',
    text: 'Came from Hubli for multiple treatments (Re-RCT, dental implant, hair transplant). Neat and hygienic clinic with advanced equipments & above all provides all services under one roof. Doctor explains each procedure in detail before they start our treatment.',
  },
  {
    id: 'gr-aruna',
    name: 'aruna jain',
    rating: 5,
    when: '10 months ago',
    treatment: 'Ear lobe repair',
    from: 'Madurai',
    text: 'I had a big ear hole and came all the way from Madurai to Nuface Sumukha Clinic to get it stitched. The results are amazing and the treatment was smooth. Hardly any scar is visible. I also trust this clinic for my dental and hair and skin care needs — truly a one-stop solution.',
  },
  {
    id: 'gr-yashwanth',
    name: 'yashwanth yash',
    rating: 5,
    when: 'a month ago',
    treatment: 'Root canal · Crown',
    from: null,
    text: 'Had a root canal and a permanent crown fixed here. Doctor is highly skilled, gentle, and very professional. The treatment was seamless, fast, and remarkably pain-free. The pricing was transparent, and the crown fits perfectly.',
  },
  {
    id: 'gr-shankar',
    name: 'Shankar Patel',
    rating: 5,
    when: '9 months ago',
    treatment: 'Wisdom tooth surgery',
    from: null,
    text: 'Had got my wisdom teeth removed which was very complicated as told by many doctors whom I consulted, hence I was in search of a good maxillofacial surgeon and reached this clinic. Dr Manoj Jain performed the procedure so well it made my complicated procedure feel very easy.',
  },
  {
    id: 'gr-murthy',
    name: 'MURTHY KSN',
    rating: 5,
    when: 'a month ago',
    treatment: 'Multiple implants · Zirconia crowns',
    from: null,
    text: "I'm taking treatment here since 3 months. Today multiple dental implants with zirconia crown process got completed. I'm very happy and most satisfied. Clinic is very hygienic with advanced technology and affordable too.",
  },
  {
    id: 'gr-ujwala',
    name: 'Ujwala Ganeshmull',
    rating: 5,
    when: '8 months ago',
    treatment: 'Implant · RCT · Crowns',
    from: 'Bangalore',
    text: 'Came from Bangalore for multiple dental treatments — dental implant, RCT, crowns and wisdom tooth removal. Had a great experience, thank you Dr Sheetal Jain for great treatment and nice care.',
  },
  {
    id: 'gr-ashok',
    name: 'Ashok Dp',
    rating: 5,
    when: 'a year ago',
    treatment: 'Maxillofacial reconstruction',
    from: null,
    text: 'He is a very caring and very experienced doctor, especially in maxillofacial. He has given a re-birth to my younger brother by operating more than 10 hours in a very serious condition after his road traffic accident injuries of jaw, maxilla and palate split. Thanks a lot sir.',
  },
  {
    id: 'gr-farzana',
    name: 'Farzana Jabeen',
    rating: 5,
    when: '5 months ago',
    treatment: 'PRP / GFC for skin',
    from: null,
    text: 'The treatment of PRP / GFC made my face clear from acne and acne scars. Best clinic and doctor for skin problems.',
  },
  {
    id: 'gr-noorulhuda',
    name: 'Noorulhuda',
    rating: 5,
    when: '11 months ago',
    treatment: 'Laser hair reduction',
    from: 'Kunigal',
    text: 'Came from Kunigal for laser hair reduction treatment. Got good results — they have an advanced diode laser which gives good result.',
  },
  {
    id: 'gr-shahid',
    name: 'Shahid Hussan',
    rating: 5,
    when: '8 months ago',
    treatment: 'Clear aligners',
    from: null,
    text: 'I had been to Nuface Sumukha clinic in Hassan for my tooth alignment and I received my aligners today. With affordable amount and with best treatment. Do please visit this clinic for any treatments.',
  },
  {
    id: 'gr-prajwal',
    photo: true,
    name: 'Prajwal N S',
    rating: 5,
    when: '11 months ago',
    treatment: 'RCT · Zirconia crown',
    from: null,
    text: 'Went to a dental college for treatment, they gave an appointment after 1 month. In this clinic they completed my RCT, extraction and placed a zirconia crown in 3 weeks. Very fast, good service with experienced doctors.',
  },
  {
    id: 'gr-somesh',
    photo: true,
    name: 'Somesh Cp',
    rating: 5,
    when: '6 months ago',
    treatment: 'Root canal · Implant · Crowns',
    from: 'Belur',
    text: 'Came from Belur. Got multiple dental treatments done — root canal, dental implant, crowns. Amazing infrastructure, experienced doctors, fantastic treatment with advanced technology. Highly recommended centre in the malnad region.',
  },
  {
    id: 'gr-nagaraj',
    name: 'Nagaraj Agrahara Srinivasamurthy',
    rating: 5,
    when: '4 months ago',
    treatment: '4 years of continuing care',
    from: null,
    text: 'I am visiting this clinic since 3-4 years. They have treated me for root canal, removing of teeth, fixing bridge between 2 teeth and teeth filling. Now I am 69 years, and my teeth are in good condition. Hats off to our doctor for keeping my tooth health in good condition.',
  },
  {
    id: 'gr-vageesh',
    name: 'vageesh B G',
    rating: 5,
    when: '9 months ago',
    treatment: 'Dental care',
    from: null,
    text: 'Professional masterpiece! Dr Manoj & Dr Sheetal — both are another name for quality dental care. An international level of care in a small city. Patience and service at its best.',
  },
  {
    id: 'gr-aanchal',
    photo: true,
    name: 'Aanchal Desharlla',
    rating: 5,
    when: 'a year ago',
    treatment: 'Dental treatment',
    from: 'Chennai',
    text: 'I came all the way from Chennai to get my treatment done. The doctor explained my condition clearly and answered all my questions patiently. They maintain high standards of cleanliness and hygiene, using sterilized equipment.',
  },
  {
    id: 'gr-dhruvanth',
    name: 'Dhruvanth Raj Maurya',
    rating: 5,
    when: '10 months ago',
    treatment: 'Scar revision',
    from: null,
    text: 'Got my scar revision done over the forehead, got good results. Doctors are experienced and explain everything in detail about the procedure before performing. Definitely recommended for maxillofacial and facial cosmetic surgeries.',
  },
  {
    id: 'gr-hemanth',
    name: 'Hemanth Hemath',
    rating: 5,
    when: '4 months ago',
    treatment: 'Hair loss · Pigmentation',
    from: null,
    text: 'Got treatment for hair loss, pigmentation and beard patch with good result. Hygienic clinic, advanced equipment and experienced doctors. Highly recommended.',
  },
  {
    id: 'gr-khan',
    photo: true,
    name: 'khan nawazkhan',
    rating: 5,
    when: '3 months ago',
    treatment: 'Cyst surgery',
    from: null,
    text: 'Got my cyst surgery done — it was a very painless experience and a good outcome. Dr Manoj Jain is a highly experienced maxillofacial surgeon, explains the procedure in detail before performing and performs it very calmly.',
  },
  {
    id: 'gr-yasmin',
    name: 'Yasmin Taj M R',
    rating: 5,
    when: '10 months ago',
    treatment: 'General dentistry',
    from: null,
    text: 'First time I felt secure and with no fear at the dentist. Did not feel pain at all and everything was very clean, quick and well done. A special thanks to Dr. Manoj Kumar Jain sir for your technical and skilled high standard of care.',
  },

  {
    id: 'gr-ayush',
    photo: true,
    name: 'Ayush Bohra',
    rating: 5,
    when: 'a year ago',
    treatment: 'Long-term dental care',
    from: 'Bangalore',
    text: 'I have been coming to Nuface clinic for years now, for all my tooth related problems, and I have never been disappointed by the slightest bit. I come all the way from Bangalore because of their state of the art facility and the experienced doctors.',
  },
  {
    id: 'gr-supreeth',
    photo: true,
    name: 'supreeth k s',
    rating: 5,
    when: 'a year ago',
    treatment: 'Skin & hair treatment',
    from: null,
    text: 'Dr. Manoj Kumar Jain takes the time to understand your concerns, explains every step of the treatment clearly, and ensures you feel completely at ease. Whether it is acne, hair fall, pigmentation, or anti-aging treatments, the results speak for themselves.',
  },
];

export const GOOGLE_REVIEWS = withAvatar(REVIEW_RECORDS);

/**
 * Who appears in the home-page row, in order.
 *
 * Eight of these reviewers uploaded a real Google profile picture. Manjunatha,
 * Ashok, Vageesh and Ujwala did not, but their reviews carry too much weight to
 * leave out — two of them a six-hour facial reconstruction and a ten-hour tumour
 * resection, the other two the only reviews on the listing that name Dr Sheetal
 * Jain. They are in by name and render a branded monogram rather than Google's
 * grey letter circle.
 *
 * The row is a loop, so the four monograms are spaced at least one avatar apart
 * around the whole cycle — including across the wrap from the last back to the
 * first — and never sit side by side.
 *
 * Vageesh and Ujwala are here deliberately: without them the row named Dr Manoj
 * four times and Dr Sheetal not once, which is not what the listing says.
 */
const MARQUEE_IDS = [
  'gr-manjunatha',
  'gr-kalpesh',
  'gr-lucky-hubli',
  'gr-vageesh',
  'gr-khan',
  'gr-somesh',
  'gr-prajwal',
  'gr-ashok',
  'gr-supreeth',
  'gr-aanchal',
  'gr-ujwala',
  'gr-ayush',
];

export const MARQUEE_REVIEWS = MARQUEE_IDS.map((id) =>
  GOOGLE_REVIEWS.find((r) => r.id === id),
).filter(Boolean);

// ───────────────────────────────────────────────────────────────
// Longer patient stories, kept separate from the marquee so the
// same quote never appears twice on one page. Also verbatim.
// ───────────────────────────────────────────────────────────────
const STORY_RECORDS = [
  {
    id: 'story-afsar',
    name: 'Afsar Kodlipete',
    rating: 5,
    when: 'a year ago',
    service: 'Maxillofacial surgery',
    text: 'By the grace of the Creator, my daughter has recovered and has been discharged from the hospital. I am sincerely thankful for the excellent surgical treatment and compassionate care provided by you, doctor. Finding a doctor who combines skill with empathy and personal attention is truly rare. Every time I had a concern, your reassuring response gave us strength.',
  },
  {
    id: 'story-ayush',
    name: 'Ayush Bohra',
    rating: 5,
    when: 'a year ago',
    service: 'Long-term dental care · from Bangalore',
    text: 'I have been coming to Nuface clinic for years now, for all my tooth related problems, and I have never been disappointed by the slightest bit. I come all the way from Bangalore to get my treatment done here because of their state of the art facility and the experienced doctors. A special thanks to Dr. Manoj Kumar Jain and Dr. Sheetal Jain for always making sure I could smile without the slightest hesitation.',
  },
  {
    id: 'story-supreeth',
    name: 'supreeth k s',
    rating: 5,
    when: 'a year ago',
    service: 'Skin & hair treatment',
    text: 'From the moment you walk into the clinic, you are welcomed with warmth and professionalism. Dr. Manoj Kumar Jain takes the time to understand your concerns, explains every step of the treatment clearly, and ensures you feel completely at ease. Whether it is acne, hair fall, pigmentation, or anti-aging treatments, the results speak for themselves — visible improvements, healthier skin, and restored confidence.',
  },
  {
    id: 'story-srinivasan',
    name: 'SRINIVASAN J V',
    rating: 5,
    when: '10 months ago',
    service: 'Dental treatment',
    text: 'Sheetal Madam and Manoj Sir clearly explain the problem, give the best treatment plan and are supportive throughout the procedure. The moment you enter the clinic, you feel a sense of warmth and comfort — the environment is clean, hygienic, peaceful and highly well equipped.',
  },
];

export const FEATURED_STORIES = withAvatar(STORY_RECORDS);

// Distinct towns and cities patients named in their own reviews.
export const REVIEW_TRAVEL_CITIES = [
  'Bangalore',
  'Chennai',
  'Madurai',
  'Vijayawada',
  'Hubli',
  'Mysore',
  'Belur',
  'Kunigal',
  'Bangarpet',
  'Alur',
];
