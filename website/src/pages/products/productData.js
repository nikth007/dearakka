// All copy as [English, Tamil] tuples. Tamil provided for hero-level strings;
// falls back to English elsewhere.

const C = {
  rose:   { accent: '#c0457a', accentDeep: '#9b1d54', soft: 'rgba(192,69,122,0.12)', tintTop: '#fdf2f8', blob: '#fbe3ee', glow: 'rose' },
  teal:   { accent: '#0d9488', accentDeep: '#0a7468', soft: 'rgba(13,148,136,0.12)', tintTop: '#eefaf8', blob: '#d6f0ec', glow: 'teal' },
  amber:  { accent: '#d97706', accentDeep: '#b45309', soft: 'rgba(245,158,11,0.14)', tintTop: '#fff7ed', blob: '#fde9cf', glow: 'amber' },
  lav:    { accent: '#7c4d8a', accentDeep: '#5b2d6e', soft: 'rgba(124,77,138,0.12)', tintTop: '#f7f1fa', blob: '#ecdcf2', glow: 'teal' },
};

export const periodTracking = {
  ...C.rose, path: '/products/period-tracking', screen: 'home', screen2: 'track',
  title: ['Period Tracking'],
  metaDesc: ['Log your period in seconds and see your whole cycle at a glance with Dear Akka — private, gentle and free.'],
  eyebrow: ['Period Tracking'],
  heroTitle: ['Your whole cycle, in one calm view', 'உங்கள் முழு சுழற்சி, ஒரே அமைதியான பார்வையில்'],
  heroBody: ['Log your period with a single tap and watch your signature cycle bloom into view. Dear Akka shows you exactly where you are today — and what gentle changes are coming next.',
             'ஒரே தட்டலில் உங்கள் மாதவிடாயைப் பதிவு செய்யுங்கள். இன்று நீங்கள் எங்கே இருக்கிறீர்கள் என்பதை Dear Akka காட்டுகிறது.'],
  howTitle: ['Tracking that respects your time', 'உங்கள் நேரத்தை மதிக்கும் கண்காணிப்பு'],
  steps: [
    { title: ['Tap to log', 'பதிவு செய்ய தட்டவும்'], body: ['Mark the day your period starts and its flow — light, medium or heavy — in seconds. No long forms, ever.'] },
    { title: ['See your rhythm', 'உங்கள் தாளத்தைப் பாருங்கள்'], body: ['Your cycle appears as a flowing visual, with today gently glowing so you always know your place in the month.'] },
    { title: ['Look ahead with ease', 'எளிதாக முன்னோக்கிப் பாருங்கள்'], body: ['Akka highlights the days before your next period so you can plan, rest and prepare without surprises.'] },
  ],
  benefitsTitle: ['Period care that feels like a friend, not a chart', 'நண்பரைப் போல உணரும் மாதவிடாய் பராமரிப்பு'],
  benefits: [
    ['Know your next period without doing the maths yourself.'],
    ['Spot irregular cycles early — a useful signal to share with a doctor.'],
    ['Gentle reminders so pads and plans are never a last-minute panic.'],
    ['A calendar view that respects your privacy and your culture.'],
  ],
  faq: [
    { q: ['Is my period data private?'], a: ['Completely. Your tracking stays on your own device. We never sell or share it, and there are no advertising trackers anywhere in Dear Akka.'] },
    { q: ['What if my cycle is irregular?'], a: ['That is exactly when tracking helps most. Akka adapts to your real pattern rather than forcing a 28-day template, and flags wide swings that may be worth discussing with a doctor.'] },
    { q: ['Do I need to log every day?'], a: ['No. Logging your period start is enough for predictions. Anything more — mood, symptoms — simply makes Akka’s insights richer, but it is always optional.'] },
  ],
  ctaTitle: ['Start understanding your cycle today', 'இன்றே உங்கள் சுழற்சியைப் புரிந்துகொள்ளத் தொடங்குங்கள்'],
  ctaBody: ['It takes one tap to begin. Akka will take care of the rest.', 'தொடங்க ஒரே தட்டல் போதும்.'],
};

export const moodMind = {
  ...C.teal, path: '/products/mood-mind', screen: 'mood', screen2: 'mood',
  title: ['Mood & Mind'],
  metaDesc: ['See how your menstrual cycle shapes your mood and energy with Dear Akka — and be gentler with yourself.'],
  eyebrow: ['Mood & Mind'],
  heroTitle: ['Your feelings, finally explained', 'உங்கள் உணர்வுகள், இறுதியாக விளக்கப்பட்டது'],
  heroBody: ['That low mood before your period isn’t in your head — it’s in your hormones. Dear Akka reveals the link between your cycle and your emotions, so the ups and downs finally make sense.',
             'மாதவிடாய்க்கு முன் வரும் சோர்வு உங்கள் கற்பனை அல்ல — அது உங்கள் ஹார்மோன்களில் உள்ளது.'],
  howTitle: ['From confusion to clarity', 'குழப்பத்திலிருந்து தெளிவுக்கு'],
  steps: [
    { title: ['Log how you feel', 'நீங்கள் எப்படி உணர்கிறீர்கள்'], body: ['Tap a mood — joyful, calm, anxious, low — whenever it suits you. It takes a moment and judges nothing.'] },
    { title: ['See the pattern emerge', 'வடிவத்தைப் பாருங்கள்'], body: ['Akka maps your moods onto your cycle, revealing the rhythms you may have felt but never quite seen.'] },
    { title: ['Plan with self-compassion', 'தன்னிரக்கத்துடன் திட்டமிடுங்கள்'], body: ['Once you know your tender days are coming, you can soften your schedule and treat yourself kindly.'] },
  ],
  benefitsTitle: ['Understanding why brings real relief', 'ஏன் என்பதைப் புரிந்துகொள்வது நிம்மதியைத் தருகிறது'],
  benefits: [
    ['Recognise PMS and premenstrual low mood for what they are — hormonal, not a personal failing.'],
    ['Time important decisions and conversations for when you feel most steady.'],
    ['Notice early if low mood is deeper or longer than usual — worth raising with a doctor.'],
    ['Replace self-blame with self-knowledge, one cycle at a time.'],
  ],
  faq: [
    { q: ['Can Dear Akka diagnose depression or PMDD?'], a: ['No — and it never pretends to. Akka can help you notice patterns and gently suggest when something may be worth professional attention, but only a qualified clinician can diagnose conditions like depression or PMDD.'] },
    { q: ['Why does my mood change so much across the month?'], a: ['Oestrogen and progesterone rise and fall through your cycle, and they influence brain chemicals like serotonin. This is normal biology. Seeing it mapped out helps many women feel less alone and more in control.'] },
    { q: ['Is my mood data shared with anyone?'], a: ['Never. Your emotional life is deeply personal and stays entirely on your device. No selling, no sharing, no exceptions.'] },
  ],
  ctaTitle: ['Be gentler with yourself, starting now', 'இப்போதே உங்களிடம் மென்மையாக இருங்கள்'],
  ctaBody: ['Let Akka show you the rhythm behind your feelings.', 'உங்கள் உணர்வுகளுக்குப் பின்னால் உள்ள தாளத்தை Akka காட்டட்டும்.'],
};

export const symptomTracking = {
  ...C.rose, path: '/products/symptom-tracking', screen: 'track', screen2: 'track',
  title: ['Symptom Tracking'],
  metaDesc: ['Track cramps, sleep, skin, cravings and energy with Dear Akka and turn everyday symptoms into useful insight.'],
  eyebrow: ['Symptom Tracking'],
  heroTitle: ['Notice the patterns that matter', 'முக்கியமான வடிவங்களைக் கவனியுங்கள்'],
  heroBody: ['Cramps, headaches, sleep, skin, digestion, cravings, energy — your body is always speaking. Dear Akka helps you listen, logging it all in seconds and turning it into patterns you can actually use.',
             'வலி, தலைவலி, தூக்கம், சருமம் — உங்கள் உடல் எப்போதும் பேசுகிறது. Dear Akka கேட்க உதவுகிறது.'],
  howTitle: ['Rich tracking, zero effort', 'விரிவான கண்காணிப்பு, முயற்சி இல்லை'],
  steps: [
    { title: ['Pick what you feel', 'நீங்கள் உணர்வதைத் தேர்வு செய்யுங்கள்'], body: ['Choose from warm, illustrated tiles across ten categories — from cramps and sleep to skin and cravings.'] },
    { title: ['Build your picture', 'உங்கள் படத்தை உருவாக்குங்கள்'], body: ['Each log adds to a clearer picture of how your symptoms move with your cycle, week by week.'] },
    { title: ['Carry it to your doctor', 'உங்கள் மருத்துவரிடம் எடுத்துச் செல்லுங்கள்'], body: ['When something feels off, you’ll have a clear, honest record to share — far better than relying on memory.'] },
  ],
  benefitsTitle: ['Small logs, big understanding', 'சிறிய பதிவுகள், பெரிய புரிதல்'],
  benefits: [
    ['Tell normal cyclical symptoms apart from ones worth checking with a doctor.'],
    ['See which foods, sleep and habits ease or worsen your symptoms.'],
    ['Track conditions like painful periods or PCOS-related signs over time.'],
    ['Walk into appointments prepared, with real data instead of guesswork.'],
  ],
  faq: [
    { q: ['What symptoms can I track?'], a: ['Flow, cramps, headaches, back pain, bloating, mood, energy, sleep, focus, skin, cravings and digestion — across ten gentle categories. You only ever log what’s relevant to you.'] },
    { q: ['When should I see a doctor about a symptom?'], a: ['If pain stops you living normally, bleeding is very heavy, cycles are highly irregular, or anything changes suddenly, please see a doctor. Dear Akka gives you a clear record to bring along, but it doesn’t replace medical care.'] },
    { q: ['Is tracking symptoms really useful?'], a: ['Yes. Patterns that are invisible day to day become obvious over a few cycles — and that insight helps both you and your doctor make better decisions.'] },
  ],
  ctaTitle: ['Turn everyday symptoms into real insight', 'அன்றாட அறிகுறிகளை உண்மையான புரிதலாக மாற்றுங்கள்'],
  ctaBody: ['Start tracking with tiles that take seconds, not minutes.', 'நொடிகளில் பதிவு செய்யத் தொடங்குங்கள்.'],
};

export const predictions = {
  ...C.amber, path: '/products/predictions', screen: 'predict', screen2: 'predict',
  title: ['Personalised Predictions'],
  metaDesc: ['Dear Akka learns your real cycle to predict your period, PMS and fertile window — with honest, personalised confidence.'],
  eyebrow: ['Personalised Predictions'],
  heroTitle: ['Predictions made just for you', 'உங்களுக்காகவே உருவாக்கப்பட்ட கணிப்புகள்'],
  heroBody: ['No two women share the same rhythm, so why use a textbook 28-day average? Dear Akka learns your real cycle and predicts your period, PMS and fertile window — and is always honest about how confident it is.',
             'எந்த இரண்டு பெண்களும் ஒரே தாளத்தைப் பகிர்வதில்லை. Dear Akka உங்கள் உண்மையான சுழற்சியைக் கற்கிறது.'],
  howTitle: ['How Akka learns your rhythm', 'Akka உங்கள் தாளத்தை எப்படிக் கற்கிறது'],
  steps: [
    { title: ['It starts with you', 'அது உங்களுடன் தொடங்குகிறது'], body: ['From your very first logged period, Akka begins building a model of your unique cycle — not a generic average.'] },
    { title: ['It learns every month', 'ஒவ்வொரு மாதமும் கற்கிறது'], body: ['Each cycle you log sharpens the prediction. Akka adapts to changes instead of assuming you’re a textbook.'] },
    { title: ['It’s honest with you', 'அது உங்களிடம் நேர்மையானது'], body: ['Predictions come with a confidence level. When your cycle is irregular, Akka tells you plainly rather than pretending.'] },
  ],
  benefitsTitle: ['Forecasts you can actually trust', 'நீங்கள் உண்மையில் நம்பக்கூடிய கணிப்புகள்'],
  benefits: [
    ['Period, PMS and fertile-window predictions tailored to your own data.'],
    ['Honest confidence levels — no false certainty about an unpredictable body.'],
    ['Predictions that improve the longer you use Akka.'],
    ['Helpful for planning, awareness and fertility — though not a contraceptive method.'],
  ],
  faq: [
    { q: ['How accurate are the predictions?'], a: ['Accuracy grows with every cycle you log, and Akka always shows a confidence level so you know how much to rely on it. For regular cycles it becomes quite reliable; for irregular ones, Akka is honest about the uncertainty.'] },
    { q: ['Can I use Dear Akka for contraception?'], a: ['No. Fertility-window predictions can support awareness, but they are not a reliable contraceptive method on their own. Please speak with a doctor about contraception that suits you.'] },
    { q: ['Why are my predictions a wide range, not one date?'], a: ['Because honesty matters more than false precision. If your cycle varies, Akka shows a window rather than pretending to know an exact day. As your pattern settles, the window narrows.'] },
  ],
  ctaTitle: ['Never be caught off guard again', 'இனி ஒருபோதும் ஆச்சரியப்பட வேண்டாம்'],
  ctaBody: ['Let Akka learn your rhythm and look ahead with you.', 'Akka உங்கள் தாளத்தைக் கற்று உங்களுடன் முன்னோக்கிப் பார்க்கட்டும்.'],
};

export const askAkka = {
  ...C.lav, path: '/products/ask-akka', screen: 'chat', screen2: 'chat',
  title: ['Ask Akka'],
  metaDesc: ['Ask Akka anything about your body — a warm, private, science-aware companion for the questions you can’t always ask aloud.'],
  eyebrow: ['Ask Akka'],
  heroTitle: ['The sister you can ask anything', 'எதையும் கேட்கக்கூடிய அக்கா'],
  heroBody: ['Some questions feel too small, too embarrassing, or too personal to ask aloud. Akka is here for exactly those — a warm, private, judgement-free companion whose gentle answers are grounded in real health science.',
             'சில கேள்விகள் உரக்கக் கேட்க முடியாதவை. அவற்றுக்காகவே Akka இங்கே இருக்கிறாள்.'],
  howTitle: ['Like texting a sister who studied medicine', 'மருத்துவம் படித்த அக்காவிடம் பேசுவது போல'],
  steps: [
    { title: ['Ask in your words', 'உங்கள் வார்த்தைகளில் கேளுங்கள்'], body: ['Type whatever’s on your mind, in English or Tamil. There are no silly questions with Akka.'] },
    { title: ['Get a warm, clear answer', 'அன்பான, தெளிவான பதில்'], body: ['Akka responds gently and clearly, in a way that informs without overwhelming or frightening you.'] },
    { title: ['Know when to see a doctor', 'எப்போது மருத்துவரைப் பார்க்க வேண்டும்'], body: ['When something needs real medical attention, Akka will lovingly encourage you to see a doctor.'] },
  ],
  benefitsTitle: ['A safe place for every question', 'ஒவ்வொரு கேள்விக்கும் பாதுகாப்பான இடம்'],
  benefits: [
    ['Ask about periods, cramps, discharge, PCOS, fertility, menopause and more.'],
    ['Answers tuned to your current cycle phase, in warm everyday language.'],
    ['Bilingual support in English and Tamil.'],
    ['Always clear about its limits — Akka guides, doctors diagnose.'],
  ],
  faq: [
    { q: ['Is Akka a real doctor?'], a: ['No. Akka is a caring, science-aware companion, not a clinician. Its guidance is grounded in evidence and reviewed by SMF doctors, but it does not diagnose or prescribe. For that, Akka will always point you to a real doctor.'] },
    { q: ['Are my conversations private?'], a: ['Yes. Your chats are personal and are not sold or shared. Akka is built so your most sensitive questions stay your own.'] },
    { q: ['Can I ask questions in Tamil?'], a: ['Absolutely. Akka understands and replies warmly in both Tamil and English — ask whichever feels most natural to you.'] },
  ],
  ctaTitle: ['No question is too small for Akka', 'எந்தக் கேள்வியும் Akka-விற்கு சிறியதல்ல'],
  ctaBody: ['Ask the things you’ve always wondered, in a space that’s entirely yours.', 'உங்களுக்கே சொந்தமான இடத்தில் கேளுங்கள்.'],
};
