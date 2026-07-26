import caseOrthoDebond from '../assets/case-ortho-debond.webp';
import caseOrthoPrePost from '../assets/case-ortho-prepost.webp';
import caseImplantAnterior from '../assets/case-implant-anterior.webp';
import caseSmileMakeover from '../assets/case-smile-makeover.webp';
import caseCrownBridge from '../assets/case-crown-bridge.webp';
import caseFullMouthRehab from '../assets/case-full-mouth-rehab.webp';
import caseHairTransplant from '../assets/case-hair-transplant.webp';
import caseTongueTie from '../assets/case-tongue-tie.webp';

// ───────────────────────────────────────────────────────────────
// Case records — real treatments performed at Sumukha Nuface.
//
// Every fact below is taken from the clinical photograph itself or
// the label the clinic wrote on it. Where a duration or technique is
// not documented in the record, it is not claimed here.
// ───────────────────────────────────────────────────────────────

export const CASE_STUDIES = [
  {
    id: 'ortho-debond-7-months',
    discipline: 'Orthodontics',
    title: 'Crowding corrected, braces off in seven months',
    image: caseOrthoDebond,
    imageAlt:
      'Upper and lower teeth with fixed metal braces, and the same teeth aligned after the braces were removed',
    note: 'The patient came in with crowded upper front teeth and an uneven bite line. Fixed metal braces brought the arch into alignment, and the appliance came off in seven months — faster than the year-plus most crowding cases take.',
    facts: [
      { label: 'Appliance', value: 'Fixed metal braces' },
      { label: 'Treatment time', value: '7 months to debond' },
      { label: 'Record', value: 'In-treatment and post-debond' },
    ],
  },
  {
    id: 'ortho-pre-post',
    discipline: 'Orthodontics',
    title: 'Full arch alignment, start to finish',
    image: caseOrthoPrePost,
    imageAlt:
      'Side-by-side pre-treatment view with braces bonded and post-treatment view of the aligned bite',
    note: 'A complete orthodontic record: brackets bonded across both arches at the start, and the settled bite at the end. Both photographs use the same retracted view so the change is measured, not staged.',
    facts: [
      { label: 'Appliance', value: 'Fixed metal braces' },
      { label: 'Scope', value: 'Upper and lower arch' },
      { label: 'Record', value: 'Pre-treatment and post-debond' },
    ],
  },
  {
    id: 'implant-anterior',
    discipline: 'Implantology',
    title: 'Two missing front teeth, replaced with implants',
    image: caseImplantAnterior,
    imageAlt:
      'Upper front tooth gap before treatment, implant fixtures in place, and the finished crowns',
    note: 'Two upper front teeth were missing, leaving open sockets in the most visible part of the smile. Titanium fixtures were placed into the ridge, allowed to integrate, then restored with crowns matched to the neighbouring teeth.',
    facts: [
      { label: 'Site', value: 'Upper anterior' },
      { label: 'Stages shown', value: 'Before · fixtures · final crowns' },
      { label: 'Restoration', value: 'Implant-supported crowns' },
    ],
  },
  {
    id: 'smile-makeover',
    discipline: 'Cosmetic Dentistry',
    title: 'Worn, discoloured teeth rebuilt in ceramic',
    image: caseSmileMakeover,
    imageAlt:
      'Discoloured and uneven front teeth before treatment, new ceramic restorations, and the finished smile',
    note: 'Years of wear had left the upper front teeth mismatched in shade and shape, with an old metal band still in place. The arch was rebuilt in ceramic to a single shade and contour, and the last frame shows how it sits in the patient’s natural smile.',
    facts: [
      { label: 'Concern', value: 'Shade mismatch and wear' },
      { label: 'Work', value: 'Ceramic restorations' },
      { label: 'Record', value: 'Before · restored · in smile' },
    ],
  },
  {
    id: 'crown-and-bridge',
    discipline: 'Prosthodontics',
    title: 'A gap in the smile line, closed with a bridge',
    image: caseCrownBridge,
    imageAlt:
      'Patient smiling with missing upper front teeth before treatment, and the same smile after crown and bridge work',
    note: 'The patient was missing upper front teeth and had been holding her smile back because of it. Crown and bridge work restored the arch, and the two full-face frames show what actually changed — not just the teeth, but the smile she was willing to give.',
    facts: [
      { label: 'Concern', value: 'Missing upper anterior teeth' },
      { label: 'Work', value: 'Crown and bridge' },
      { label: 'Record', value: 'Full-face and retracted views' },
    ],
  },
  {
    id: 'full-mouth-rehabilitation',
    discipline: 'Full Mouth Rehabilitation',
    title: 'Full mouth rehabilitation, across many patients',
    image: caseFullMouthRehab,
    imageAlt:
      'A grid of finished full mouth rehabilitation results from several different patients',
    note: 'Full mouth rehabilitation rebuilds every functioning surface — bite height, chewing function and appearance together. This is a set of finished cases rather than one patient, which is the honest way to show what the clinic does at volume.',
    facts: [
      { label: 'Scope', value: 'Both arches, complete rebuild' },
      { label: 'Shown', value: 'Several completed patients' },
      { label: 'Outcome', value: 'Restored function and appearance' },
    ],
  },
  {
    id: 'hair-transplant-fue',
    discipline: 'Hair Restoration',
    title: 'Receding hairline rebuilt by transplant',
    image: caseHairTransplant,
    imageAlt:
      'Thinning crown and receding hairline before surgery, the scalp on graft day, and restored density afterwards',
    note: 'Recession at the temples with thinning through the crown. The middle frames are the operative day — grafts placed across the recipient area — and the lower frames show the hairline once it had grown through. Density is judged at the front, where it is hardest to fake.',
    facts: [
      { label: 'Pattern', value: 'Frontal recession with crown thinning' },
      { label: 'Stages shown', value: 'Before · graft day · after' },
      { label: 'Goal', value: 'Restored frontal hairline' },
    ],
  },
  {
    id: 'tongue-tie-release',
    discipline: 'Paediatric Oral Surgery',
    title: 'Tongue tie released in a child',
    image: caseTongueTie,
    imageAlt:
      'A child’s restricted tongue before surgery, the sutured site, and the freed tongue afterwards',
    note: 'Ankyloglossia — a short lingual frenum tethering the tongue to the floor of the mouth — restricts speech and feeding in children. The frenum was released and sutured, and the final frame shows the tongue lifting freely.',
    facts: [
      { label: 'Condition', value: 'Ankyloglossia (tongue tie)' },
      { label: 'Procedure', value: 'Frenal release with sutures' },
      { label: 'Record', value: 'Before · intra-operative · after' },
    ],
  },
];

export const CASE_DISCIPLINES = [
  ...new Set(CASE_STUDIES.map((c) => c.discipline)),
];
