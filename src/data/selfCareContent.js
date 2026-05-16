// Breast self-exam steps and cycle phase insights

export const BREAST_EXAM_STEPS = [
  {
    id: 1,
    icon: '🪞',
    title: { en: 'Stand before a mirror', ta: 'கண்ணாடியில் நிற்கவும்' },
    instruction: {
      en: 'With your arms relaxed at your sides, look for any changes in breast size, shape, skin texture, or nipple position.',
      ta: 'கைகளை பக்கத்தில் வைத்து, மார்பகங்களின் அளவு, வடிவம், தோல் மாற்றங்கள் அல்லது முலைக்காம்பு நிலையில் மாற்றம் ஏதாவது கவனியுங்கள்.'
    },
    tip: { en: 'Look for dimpling, puckering, or skin that looks like orange peel', ta: 'குழி விழுதல், சுருக்கம் அல்லது ஆரஞ்சு தோல் போன்ற தோற்றத்தை கவனியுங்கள்' }
  },
  {
    id: 2,
    icon: '🙌',
    title: { en: 'Raise your arms', ta: 'கைகளை மேலே உயர்த்துங்கள்' },
    instruction: {
      en: 'Raise both arms above your head. Look for the same changes — shape, size, skin changes, or any discharge from the nipples.',
      ta: 'இரு கைகளையும் தலைக்கு மேலே உயர்த்துங்கள். வடிவம், அளவு, தோல் மாற்றங்கள் அல்லது முலைக்காம்பிலிருந்து வெளியேற்றம் ஏதாவது கவனியுங்கள்.'
    },
    tip: { en: 'Any new nipple inversion or discharge is worth mentioning to your doctor', ta: 'புதிய முலைக்காம்பு உள்ளிழுப்பு அல்லது வெளியேற்றம் மருத்துவரிடம் சொல்லுங்கள்' }
  },
  {
    id: 3,
    icon: '🛁',
    title: { en: 'Lie down to feel', ta: 'படுத்துக்கொண்டு உணருங்கள்' },
    instruction: {
      en: 'Lie on your back. Place a pillow under your right shoulder and put your right hand behind your head. Use the pads of your three middle fingers on your left hand to feel your right breast.',
      ta: 'மல்லாக்கப் படுங்கள். வலது தோள்பட்டையின் கீழ் தலையணை வைக்கவும், வலது கையை தலைக்கு பின்னால் வைக்கவும். இடது கையின் மூன்று விரல் நுனிகளால் வலது மார்பை உணருங்கள்.'
    },
    tip: { en: 'Use small, circular motions with firm but gentle pressure', ta: 'சிறிய, வட்ட இயக்கங்களுடன் நிலையான ஆனால் மெதுவான அழுத்தம் கொடுங்கள்' }
  },
  {
    id: 4,
    icon: '🔄',
    title: { en: 'Cover the entire breast', ta: 'முழு மார்பையும் சரிபாருங்கள்' },
    instruction: {
      en: 'Move around the entire breast in an up-and-down pattern, starting from under your arm and moving across to your breastbone. Feel for any lumps, hard knots, or thickening.',
      ta: 'அக்குளின் கீழிருந்து தொடங்கி, மேல்-கீழ் முறையில் முழு மார்பையும் சரிபாருங்கள். கட்டிகள், கடினமான முடிச்சுகள் அல்லது தடிப்புகளை உணருங்கள்.'
    },
    tip: { en: 'Don\'t miss the area between breast and armpit — feel your armpit too', ta: 'மார்பிற்கும் அக்குளுக்கும் இடையேயான பகுதியை தவிர்க்காதீர்கள்' }
  },
  {
    id: 5,
    icon: '✋',
    title: { en: 'Check while standing', ta: 'நின்றுகொண்டு சரிபாருங்கள்' },
    instruction: {
      en: 'Repeat the same exam while standing or sitting. Many women find it easiest to do in the shower when skin is wet. Check both breasts and the underarm area.',
      ta: 'நின்றுகொண்டு அல்லது உட்கார்ந்துகொண்டு அதே பரிசோதனையை மீண்டும் செய்யுங்கள். குளிக்கும்போது செய்வது எளிது. இரு மார்புகளையும் அக்குள் பகுதியையும் சரிபாருங்கள்.'
    },
    tip: { en: 'Use soap or shower gel for easier movement of fingers', ta: 'விரல்கள் சுலபமாக நகர சோப்பு அல்லது ஷவர் ஜெல் பயன்படுத்துங்கள்' }
  },
];

export const BREAST_EXAM_WARNINGS = [
  { en: 'A new lump or area of thickening', ta: 'புதிய கட்டி அல்லது தடிப்பு பகுதி' },
  { en: 'A change in breast size or shape', ta: 'மார்பக அளவு அல்லது வடிவத்தில் மாற்றம்' },
  { en: 'Dimpling or puckering of the skin', ta: 'தோலில் குழி விழுதல் அல்லது சுருக்கம்' },
  { en: 'Nipple turning inward (new change)', ta: 'முலைக்காம்பு உள்ளே வளைவது (புதிய மாற்றம்)' },
  { en: 'Rash, redness, or swelling', ta: 'சொறி, சிவப்பு அல்லது வீக்கம்' },
  { en: 'Liquid from the nipple (not breast milk)', ta: 'முலைக்காம்பிலிருந்து திரவம் (தாய்ப்பால் இல்லாமல்)' },
];

export const CYCLE_PHASES = {
  menstrual: {
    name: { en: 'Menstrual Phase', ta: 'மாதவிடாய் நிலை' },
    dayRange: { en: 'Days 1–5', ta: 'நாட்கள் 1–5' },
    color: '#EF4444',
    gradient: ['#FEE2E2', '#FFF0F5'],
    emoji: '🔴',
    description: {
      en: 'Your period is here. Your body is shedding the uterine lining. Energy may be lower — be gentle with yourself.',
      ta: 'உங்கள் மாதவிடாய் வந்துள்ளது. ஆற்றல் குறைவாக இருக்கலாம் — உங்களை அன்புடன் கவனித்துக் கொள்ளுங்கள்.'
    },
    tips: [
      { en: 'Hydrate well and eat iron-rich foods', ta: 'நீரேற்றமாக இருக்கவும், இரும்புச் சத்துள்ள உணவு சாப்பிடவும்' },
      { en: 'Light movement like yoga or walking can ease cramps', ta: 'யோகா அல்லது நடைப்பயிற்சி வலியை குறைக்கலாம்' },
      { en: 'Rest is productive — honour your body', ta: 'ஓய்வு எடுத்துக்கொள்வது உங்கள் உடலை மதிப்பிடுவது' },
    ],
    energy: 'low',
    akkaMessage: { en: 'Your body is working hard. Rest up, hydrate, and nourish yourself. 💗', ta: 'உங்கள் உடல் கடினமாக உழைக்கிறது. ஓய்வு எடுங்கள், நீர் குடிக்கவும். 💗' }
  },
  follicular: {
    name: { en: 'Follicular Phase', ta: 'நுண்ணறை நிலை' },
    dayRange: { en: 'Days 6–13', ta: 'நாட்கள் 6–13' },
    color: '#F59E0B',
    gradient: ['#FEF3C7', '#FFFBEB'],
    emoji: '🌱',
    description: {
      en: 'Energy is rising as estrogen increases. A great time to start new projects, exercise more, and be social.',
      ta: 'ஈஸ்ட்ரோஜன் அதிகரிக்கும்போது ஆற்றல் உயர்கிறது. புதிய திட்டங்களைத் தொடங்க, உடற்பயிற்சி செய்ய சிறந்த நேரம்.'
    },
    tips: [
      { en: 'Great time for high-energy workouts', ta: 'அதிக ஆற்றல் உடற்பயிற்சிக்கு சிறந்த நேரம்' },
      { en: 'Explore new ideas and be creative', ta: 'புதிய யோசனைகளை ஆராயுங்கள், படைப்பாற்றலுடன் இருங்கள்' },
      { en: 'Plan and set goals — your mind is sharp', ta: 'திட்டமிடுங்கள் — உங்கள் மனம் கூர்மையாக இருக்கும்' },
    ],
    energy: 'rising',
    akkaMessage: { en: 'Your energy is blooming! This is your power phase — take on challenges! 🌱', ta: 'உங்கள் ஆற்றல் மலர்கிறது! சவால்களை ஏற்றுக்கொள்ளுங்கள்! 🌱' }
  },
  ovulation: {
    name: { en: 'Ovulation Phase', ta: 'கருமுட்டை வெளியீடு' },
    dayRange: { en: 'Days 14–16', ta: 'நாட்கள் 14–16' },
    color: '#10B981',
    gradient: ['#D1FAE5', '#ECFDF5'],
    emoji: '✨',
    description: {
      en: 'You are at peak fertility. Estrogen and testosterone peak, making you feel confident and outgoing. This is the best time for breast self-exam.',
      ta: 'நீங்கள் கருத்தரிப்பு உச்சத்தில் இருக்கிறீர்கள். மார்பக சுய பரிசோதனை செய்ய இது சிறந்த நேரம்.'
    },
    tips: [
      { en: 'Best time to do your breast self-exam!', ta: 'மார்பக சுய பரிசோதனை செய்ய சிறந்த நேரம்!' },
      { en: 'Social butterfly — you feel great communicating', ta: 'சமூக பேச்சுவார்த்தைக்கு ஏற்றது' },
      { en: 'Great time for important conversations', ta: 'முக்கியமான உரையாடல்களுக்கு சிறந்த நேரம்' },
    ],
    energy: 'peak',
    akkaMessage: { en: 'You\'re glowing! Don\'t forget your monthly breast self-exam — Akka reminds you! ✨', ta: 'நீங்கள் பொலிவாக இருக்கிறீர்கள்! மாதாந்திர மார்பக சுய பரிசோதனை மறக்காதீர்கள்! ✨' }
  },
  luteal: {
    name: { en: 'Luteal Phase', ta: 'கார்பஸ் லூட்டியம் நிலை' },
    dayRange: { en: 'Days 17–28', ta: 'நாட்கள் 17–28' },
    color: '#8B5CF6',
    gradient: ['#EDE9FE', '#F5F3FF'],
    emoji: '🌙',
    description: {
      en: 'Progesterone rises to prepare for pregnancy. You may feel more reflective, and PMS symptoms can appear in the last few days.',
      ta: 'கர்ப்பத்திற்கு தயாரிக்க புரோஜெஸ்டரோன் உயர்கிறது. PMS அறிகுறிகள் கடைசி சில நாட்களில் தோன்றலாம்.'
    },
    tips: [
      { en: 'Reduce caffeine to ease PMS symptoms', ta: 'PMS அறிகுறிகளை குறைக்க காபி குறைக்கவும்' },
      { en: 'Prioritise sleep and self-care', ta: 'தூக்கம் மற்றும் சுயகவனிப்பை முன்னுரிமை கொடுங்கள்' },
      { en: 'Track your mood — patterns help you plan', ta: 'உங்கள் மனநிலையை கண்காணிக்கவும் — முறைகள் திட்டமிட உதவும்' },
    ],
    energy: 'declining',
    akkaMessage: { en: 'Be kind to yourself. Your feelings are valid, and rest is part of the process. 🌙', ta: 'உங்களிடம் கனிவாக இருங்கள். உங்கள் உணர்வுகள் உண்மையானவை. 🌙' }
  }
};

export function getCyclePhase(dayOfCycle, cycleLength = 28) {
  if (dayOfCycle <= 5) return 'menstrual';
  if (dayOfCycle <= cycleLength - 14 - 1) return 'follicular';
  if (dayOfCycle <= cycleLength - 14 + 2) return 'ovulation';
  return 'luteal';
}

export const HEALTH_MYTHS = [
  {
    myth: { en: 'You only need to see a doctor if you\'re sick', ta: 'நோய்வாய்ப்பட்டால் மட்டுமே மருத்துவரை பார்க்க வேண்டும்' },
    fact: { en: 'Preventive screenings catch conditions like cervical cancer and breast cancer before symptoms appear — when they\'re most treatable.', ta: 'தடுப்புப் பரிசோதனைகள் அறிகுறிகள் தோன்றும் முன்பே புற்றுநோயை கண்டறியலாம்.' },
    emoji: '🔍'
  },
  {
    myth: { en: 'Irregular periods are always normal and nothing to worry about', ta: 'சீரற்ற மாதவிடாய் எப்போதும் சாதாரணம்' },
    fact: { en: 'While occasional irregularity is okay, consistently irregular cycles can signal PCOS, thyroid disorders, or other conditions worth checking.', ta: 'தொடர்ந்து சீரற்ற மாதவிடாய் PCOS அல்லது தைராய்டு குறைபாட்டை குறிக்கலாம்.' },
    emoji: '📅'
  },
  {
    myth: { en: 'Breast cancer only affects older women', ta: 'மார்பகப் புற்றுநோய் வயதான பெண்களுக்கு மட்டுமே வரும்' },
    fact: { en: 'In India, breast cancer increasingly affects women under 40. Monthly self-exams are important for all adult women.', ta: 'இந்தியாவில் 40 வயதுக்கும் குறைவான பெண்களில் மார்பகப் புற்றுநோய் அதிகரிக்கிறது.' },
    emoji: '🎗️'
  },
  {
    myth: { en: 'Pain during periods is something you just have to endure', ta: 'மாதவிடாய் வலியை தாங்கிக்கொள்ள வேண்டும்' },
    fact: { en: 'Severe period pain can indicate endometriosis or other conditions. You don\'t have to suffer — treatment options exist.', ta: 'கடுமையான மாதவிடாய் வலி endometriosis-ஐ குறிக்கலாம். சிகிச்சை விருப்பங்கள் உள்ளன.' },
    emoji: '💊'
  },
  {
    myth: { en: 'UTIs will go away on their own without treatment', ta: 'UTI தானாகவே சரியாகிவிடும்' },
    fact: { en: 'UTIs can spread to kidneys if untreated, causing serious damage. Always see a doctor for confirmed UTI.', ta: 'சிகிச்சையில்லாத UTI சிறுநீரகத்திற்கு பரவி தீவிர சேதம் ஏற்படுத்தலாம்.' },
    emoji: '💧'
  },
  {
    myth: { en: 'Menopause means the end of a woman\'s health and vitality', ta: 'மாதவிடாய் நிறுத்தம் ஆரோக்கியத்தின் முடிவு' },
    fact: { en: 'Menopause is a natural phase. With the right nutrition, exercise, and medical support, many women thrive through and after menopause.', ta: 'மாதவிடாய் நிறுத்தம் ஒரு இயற்கையான கட்டம். சரியான ஆதரவுடன் பெண்கள் செழிக்கலாம்.' },
    emoji: '🌺'
  },
];

export const HEALTH_BADGES = [
  { id: 'first_log', icon: '📅', title: { en: 'First Log', ta: 'முதல் பதிவு' }, description: { en: 'Logged your health for the first time', ta: 'முதன்முறையாக ஆரோக்கியம் பதிவு செய்தீர்கள்' } },
  { id: 'week_streak', icon: '🔥', title: { en: '7-Day Streak', ta: '7-நாள் தொடர்' }, description: { en: '7 consecutive days of logging', ta: '7 தொடர் நாட்கள் பதிவு செய்தீர்கள்' } },
  { id: 'first_exam', icon: '🎗️', title: { en: 'Self-Exam Done', ta: 'சுய பரிசோதனை முடிந்தது' }, description: { en: 'Completed your first breast self-exam', ta: 'முதல் மார்பக சுய பரிசோதனை முடித்தீர்கள்' } },
  { id: 'first_assessment', icon: '✅', title: { en: 'Health Check', ta: 'ஆரோக்கிய பரிசோதனை' }, description: { en: 'Completed your first health assessment', ta: 'முதல் ஆரோக்கிய மதிப்பீடு முடித்தீர்கள்' } },
  { id: 'month_streak', icon: '⭐', title: { en: '30-Day Streak', ta: '30-நாள் தொடர்' }, description: { en: '30 consecutive days of logging', ta: '30 தொடர் நாட்கள் பதிவு செய்தீர்கள்' } },
  { id: 'all_assessments', icon: '🏆', title: { en: 'Health Champion', ta: 'ஆரோக்கிய சாம்பியன்' }, description: { en: 'Completed all 7 health assessments', ta: 'அனைத்து 7 மதிப்பீடுகளும் முடித்தீர்கள்' } },
];

export const DAILY_TIPS = [
  { en: 'Drink water first thing in the morning — it jumpstarts your metabolism 💧', ta: 'காலையில் எழுந்தவுடன் தண்ணீர் குடிக்கவும் — இது உங்கள் வளர்சிதை மாற்றத்தை தூண்டுகிறது 💧' },
  { en: 'Even a 20-minute walk today can improve your mood significantly 🚶‍♀️', ta: '20 நிமிட நடைப்பயிற்சி உங்கள் மனநிலையை கணிசமாக மேம்படுத்தும் 🚶‍♀️' },
  { en: 'Tracking your cycle helps you understand your body better over time 📅', ta: 'சுழற்சியை கண்காணிப்பது காலப்போக்கில் உங்கள் உடலை புரிந்துகொள்ள உதவுகிறது 📅' },
  { en: 'Getting 7–8 hours of sleep is essential for hormonal balance 😴', ta: '7–8 மணி நேர தூக்கம் ஹார்மோன் சமநிலைக்கு அவசியம் 😴' },
  { en: 'Iron-rich foods like spinach and lentils help prevent anemia 🥬', ta: 'கீரை மற்றும் பருப்பு போன்ற இரும்புச் சத்துள்ள உணவுகள் இரத்தசோகையை தடுக்கும் 🥬' },
  { en: 'Stress affects your cycle. Take 5 deep breaths — right now 🌸', ta: 'மன அழுத்தம் உங்கள் சுழற்சியை பாதிக்கிறது. இப்போது 5 ஆழமான மூச்சு எடுங்கள் 🌸' },
  { en: 'Your mental health matters as much as your physical health 💜', ta: 'உங்கள் மனநலம் உடல் நலம் போலவே முக்கியம் 💜' },
  { en: 'Early detection saves lives — don\'t skip your yearly check-up 🏥', ta: 'ஆரம்பத்தில் கண்டறிதல் உயிரை காக்கும் — வருடாந்திர பரிசோதனையை தவிர்க்காதீர்கள் 🏥' },
  { en: 'Calcium + vitamin D = strong bones. Are you getting enough? 🦴', ta: 'கால்சியம் + வைட்டமின் D = வலுவான எலும்புகள். நீங்கள் போதுமான அளவு எடுக்கிறீர்களா? 🦴' },
  { en: 'It\'s okay to ask for help — Akka is always here for you 💗', ta: 'உதவி கேட்பது சரியே — அக்கா எப்போதும் உங்களுக்காக இங்கே இருக்கிறார் 💗' },
];
