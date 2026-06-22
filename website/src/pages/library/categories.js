// Category metadata for the Health Library.
// Article bodies live in ./articles/*.js and are aggregated in ./articles/index.js
export const CATEGORIES = [
  {
    id: 'menstrual-cycle',
    title: ['The Menstrual Cycle', 'மாதவிடாய் சுழற்சி'],
    blurb: ['The four phases, what’s normal, and how to read your body’s monthly rhythm.', 'நான்கு கட்டங்கள், எது இயல்பானது, உங்கள் உடலின் மாதாந்திர தாளம்.'],
    accent: '#c0457a', soft: 'rgba(192,69,122,0.12)', icon: 'drop',
  },
  {
    id: 'pcos-conditions',
    title: ['PCOS & Conditions', 'PCOS & நிலைமைகள்'],
    blurb: ['PCOS, endometriosis, fibroids and other common conditions — explained with care.', 'PCOS, எண்டோமெட்ரியோசிஸ் மற்றும் பிற நிலைமைகள்.'],
    accent: '#7c4d8a', soft: 'rgba(124,77,138,0.12)', icon: 'heart',
  },
  {
    id: 'fertility',
    title: ['Fertility', 'கருவுறுதல்'],
    blurb: ['Your fertile window, planning for pregnancy, and understanding conception.', 'உங்கள் கருவளமான காலம், கர்ப்பத்திற்கான திட்டமிடல்.'],
    accent: '#0d9488', soft: 'rgba(13,148,136,0.12)', icon: 'seedling',
  },
  {
    id: 'perimenopause',
    title: ['Perimenopause', 'பெரிமெனோபாஸ்'],
    blurb: ['The years of change before menopause — symptoms, support and what to expect.', 'மெனோபாஸுக்கு முந்தைய மாற்ற ஆண்டுகள்.'],
    accent: '#d97706', soft: 'rgba(245,158,11,0.14)', icon: 'moon',
  },
  {
    id: 'mental-wellbeing',
    title: ['Mental Wellbeing', 'மனநலம்'],
    blurb: ['Hormones, mood, PMS and PMDD, and caring for your mind through every phase.', 'ஹார்மோன்கள், மனநிலை, PMS மற்றும் PMDD.'],
    accent: '#0d9488', soft: 'rgba(13,148,136,0.12)', icon: 'brain',
  },
  {
    id: 'life-culture',
    title: ['Life & Culture', 'வாழ்க்கை & கலாச்சாரம்'],
    blurb: ['Periods, tradition and taboo in India — breaking silence with knowledge and warmth.', 'இந்தியாவில் மாதவிடாய், பாரம்பரியம் மற்றும் தடை.'],
    accent: '#c0457a', soft: 'rgba(192,69,122,0.12)', icon: 'flower',
  },
];

export function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}
