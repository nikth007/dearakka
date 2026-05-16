// Full conditions data ported from Dear Akka WhatsApp bot, extended for app UX
// Each condition has: emoji, gradient, overview, questions, healthTips, breastExamSteps (for breast only)

export const CONDITIONS = {
  pcos: {
    id: 'pcos',
    emoji: '🔄',
    gradient: ['#CCFBF1', '#F0FDFA'],
    accentColor: '#0D9488',
    tagColor: '#0D9488',
    name: { en: 'PCOS', ta: 'PCOS' },
    fullName: { en: 'Polycystic Ovary Syndrome', ta: 'PCOS (பாலிசிஸ்டிக் ஓவரி சிண்ட்ரோம்)' },
    tagline: {
      en: 'Hormonal disorder affecting 10–20% of Indian women',
      ta: '10–20% இந்திய பெண்களை பாதிக்கும் ஹார்மோன் குறைபாடு'
    },
    overview: [
      {
        label: { en: 'What it is', ta: 'என்னவென்றால்' },
        value: { en: 'Hormonal disorder causing irregular periods, excess androgens, fertility issues', ta: 'மாதவிடாய் சீர்மாறல், அதிக ஆண் வகை ஹார்மோன்கள், கருத்தரிப்பு சிக்கல்கள்' }
      },
      {
        label: { en: 'How common', ta: 'எவ்வளவு பொதுவானது' },
        value: { en: '1 in 5 Indian women have PCOS', ta: '5 இந்திய பெண்களில் 1 பேருக்கு PCOS உள்ளது' }
      },
      {
        label: { en: 'Good news', ta: 'நல்ல செய்தி' },
        value: { en: 'Highly manageable with lifestyle changes and medical treatment', ta: 'வாழ்க்கைமுறை மாற்றங்கள் மற்றும் சிகிச்சையால் நன்கு நிர்வகிக்கலாம்' }
      },
    ],
    questions: [
      {
        id: 1,
        text: { en: 'Do you have irregular periods (cycle longer than 35 days or shorter than 21 days)?', ta: 'உங்கள் மாதவிடாய் சுழற்சி சீரற்றதா (35 நாட்களுக்கு மேல் அல்லது 21 நாட்களுக்கும் குறைவு)?' },
        yesResponse: { en: 'Irregular periods are a primary sign of PCOS due to hormonal imbalances affecting ovulation.', ta: 'ஹார்மோன் சமநிலையின்மை கருமுட்டை விடுதலைத் தடுப்பதால் மாதவிடாய் சீர்மாறல் PCOS-இன் முதன்மை அறிகுறி.' },
        noResponse: { en: 'Regular cycles are a good sign, though PCOS can still be present with other symptoms.', ta: 'சீரான சுழற்சி நல்லது; இருப்பினும் பிற அறிகுறிகளுடன் PCOS இருக்கக்கூடும்.' },
        severity: 'MODERATE'
      },
      {
        id: 2,
        text: { en: 'Do you have excessive facial or body hair growth?', ta: 'முகம் அல்லது உடலில் அதிகமான முடி வளர்ச்சி உள்ளதா?' },
        yesResponse: { en: 'Excess hair growth indicates elevated androgen (male hormone) levels — a key feature of PCOS.', ta: 'அதிக முடி வளர்ச்சி ஆண் ஹார்மோன் அதிகரிப்பைக் குறிக்கிறது — PCOS-இன் முக்கிய அம்சம்.' },
        noResponse: { en: 'The absence of hirsutism is positive, though some women with PCOS may not have visible excess hair growth.', ta: 'Hirsutism இல்லாதது நல்லது; சில PCOS பெண்களுக்கு வெளிப்படையான அதிக முடி இருக்காது.' },
        severity: 'MODERATE'
      },
      {
        id: 3,
        text: { en: 'Do you have persistent acne, especially on face, chest, or upper back?', ta: 'முகம், மார்பு அல்லது மேல் முதுகில் நீடித்த பருக்கள் உள்ளதா?' },
        yesResponse: { en: 'Hormonal acne is common in PCOS — increased androgens stimulate oil glands.', ta: 'PCOS-இல் அதிகமான ஆண்ட்ரோஜன் எண்ணெய் சுரப்பிகளைத் தூண்டி பருக்களை ஏற்படுத்தும்.' },
        noResponse: { en: 'Clear skin is great! PCOS can still manifest through other symptoms.', ta: 'தோல் தெளிவாக இருப்பது நல்லது! PCOS பிற அறிகுறிகள் மூலம் வெளிப்படலாம்.' },
        severity: 'MILD'
      },
      {
        id: 4,
        text: { en: 'Have you experienced unexplained weight gain or difficulty losing weight?', ta: 'விளக்கமில்லாத எடை அதிகரிப்பு அல்லது எடை குறைக்க சிரமம் உள்ளதா?' },
        yesResponse: { en: 'Weight challenges in PCOS are linked to insulin resistance — making it harder to lose weight through diet alone.', ta: 'PCOS-இல் இன்சுலின் எதிர்ப்பு காரணமாக எடை நிர்வகிப்பதில் சிரமம் ஏற்படலாம்.' },
        noResponse: { en: 'Maintaining a healthy weight is beneficial. Some women with PCOS are lean — weight alone isn\'t diagnostic.', ta: 'ஆரோக்கியமான எடை நல்லது. சில PCOS பெண்கள் மெலிந்தவர்களாக இருக்கலாம்.' },
        severity: 'MODERATE'
      },
      {
        id: 5,
        text: { en: 'Do you notice dark, velvety skin patches on neck, armpits, or groin?', ta: 'கழுத்து, அக்குள் அல்லது இடுப்புப் பகுதியில் கருமையான தோல் திட்டுகள் உள்ளதா?' },
        yesResponse: { en: 'Dark skin patches (acanthosis nigricans) indicate insulin resistance — a serious metabolic concern needing medical attention.', ta: 'கருமையான தோல் திட்டுகள் இன்சுலின் எதிர்ப்பைக் குறிக்கின்றன — மருத்துவ கவனம் தேவை.' },
        noResponse: { en: 'Good! This symptom, when present, indicates significant insulin resistance.', ta: 'நல்லது! இந்த அறிகுறி குறிப்பிடத்தக்க இன்சுலின் எதிர்ப்பைக் குறிக்கும்.' },
        severity: 'HIGH'
      },
      {
        id: 6,
        text: { en: 'Are you experiencing hair thinning or scalp hair loss?', ta: 'தலையில் முடி மெலிவடைதல் அல்லது முடி உதிர்வு உள்ளதா?' },
        yesResponse: { en: 'Scalp hair thinning in PCOS is caused by elevated androgens affecting hair follicles.', ta: 'PCOS-இல் அதிகமான ஆண் ஹார்மோன்கள் முடி நுண்ணுறுப்புகளைப் பாதிப்பதால் முடி உதிர்வு ஏற்படலாம்.' },
        noResponse: { en: 'Healthy hair growth is a positive sign.', ta: 'ஆரோக்கியமான முடி வளர்ச்சி நல்ல அறிகுறி.' },
        severity: 'MODERATE'
      },
      {
        id: 7,
        text: { en: 'Have you been trying to conceive for over a year without success?', ta: 'ஒரு வருடத்திற்கு மேல் கருத்தரிக்க முயற்சித்தும் வெற்றி பெறவில்லையா?' },
        yesResponse: { en: 'PCOS is the leading cause of anovulatory infertility. Irregular ovulation prevents conception.', ta: 'PCOS கருமுட்டை விடுதலின்மை காரணமாக கருத்தரிப்பின்மைக்கு முதன்மைக் காரணம்.' },
        noResponse: { en: 'If you\'re not trying to conceive or haven\'t had difficulties, this is not a current concern.', ta: 'நீங்கள் கருத்தரிக்க முயற்சிக்கவில்லை அல்லது சிரமம் இல்லை என்றால் கவலையில்லை.' },
        severity: 'HIGH'
      }
    ],
    healthTips: [
      { en: 'Eat low glycemic index foods — brown rice, whole grains, vegetables', ta: 'குறைந்த glycemic index உணவுகள் — பழ அரிசி, தானியங்கள், காய்கறிகள்' },
      { en: 'Exercise at least 150 minutes per week', ta: 'வாரத்திற்கு குறைந்தது 150 நிமிடம் உடற்பயிற்சி செய்யுங்கள்' },
      { en: 'Manage stress through yoga or meditation', ta: 'யோகா அல்லது தியானம் மூலம் மன அழுத்தத்தைக் கையாளுங்கள்' },
      { en: 'Regular gynecological check-ups', ta: 'தொடர்ந்து மகப்பேறு மருத்துவ பரிசோதனை செய்யுங்கள்' },
      { en: 'Track your cycle regularly — patterns help your doctor', ta: 'உங்கள் சுழற்சியைத் தொடர்ந்து கண்காணிக்கவும் — இது மருத்துவருக்கு உதவும்' }
    ],
    riskLevels: {
      high: { threshold: 3, highSeverity: 2 },
      medium: { threshold: 2 },
    }
  },

  breast: {
    id: 'breast',
    emoji: '🎗️',
    gradient: ['#FCE7F3', '#FFF0F5'],
    accentColor: '#EC4899',
    tagColor: '#DB2777',
    name: { en: 'Breast Cancer', ta: 'மார்பகப் புற்றுநோய்' },
    fullName: { en: 'Breast Cancer Awareness & Screening', ta: 'மார்பகப் புற்றுநோய் விழிப்புணர்வு' },
    tagline: {
      en: 'Early detection gives >90% survival — check yourself monthly',
      ta: 'ஆரம்பத்தில் கண்டறிந்தால் >90% உயிர்வாழ்வு — மாதந்தோறும் சுய பரிசோதனை செய்யுங்கள்'
    },
    overview: [
      { label: { en: 'Prevalence', ta: 'பரவல்' }, value: { en: '27% of all cancers in Indian women', ta: 'இந்திய பெண்களின் அனைத்து புற்றுநோய்களிலும் 27%' } },
      { label: { en: 'Early detection', ta: 'ஆரம்பத்தில் கண்டறிதல்' }, value: { en: '>90% survival when detected early', ta: 'ஆரம்பத்தில் கண்டறிந்தால் >90% உயிர்வாழ்வு' } },
      { label: { en: 'Reality', ta: 'யதார்த்தம்' }, value: { en: '60% diagnosed at advanced stages in India', ta: 'இந்தியாவில் 60% பேர் மேம்பட்ட நிலைகளில் கண்டறியப்படுகிறார்கள்' } },
      { label: { en: 'Risk', ta: 'ஆபத்து' }, value: { en: '1 in 28 urban Indian women', ta: 'நகர்ப்புற இந்திய பெண்களில் 28-ல் 1 பேருக்கு ஆபத்து' } }
    ],
    questions: [
      {
        id: 1,
        text: { en: 'Have you noticed a new lump or thickening in your breast or underarm?', ta: 'மார்பு அல்லது அக்குள் பகுதியில் புதிய கட்டி அல்லது தடிப்பு கவனித்துள்ளீர்களா?' },
        yesResponse: { en: 'A new breast lump is the most common sign of breast cancer. Most lumps are benign, but immediate medical evaluation is essential.', ta: 'புதிய மார்பு கட்டி மிகப் பொதுவான அறிகுறி — உடனடி மதிப்பீடு தேவை.' },
        noResponse: { en: 'No lumps is reassuring. Continue monthly self-breast examinations.', ta: 'கட்டிகள் இல்லாதது நம்பிக்கையளிக்கிறது. மாதாந்திர சுய மார்பகப் பரிசோதனை தொடருங்கள்.' },
        severity: 'HIGH'
      },
      {
        id: 2,
        text: { en: 'Have you noticed any change in the size, shape, or appearance of your breast?', ta: 'மார்பின் அளவு, வடிவம் அல்லது தோற்றத்தில் மாற்றம் கவனித்துள்ளீர்களா?' },
        yesResponse: { en: 'Visible changes in breast shape can indicate underlying tumors affecting breast tissue structure. Medical evaluation is necessary.', ta: 'மார்பக மாற்றங்கள் கட்டிகள் திசு அமைப்பைப் பாதிப்பதைக் குறிக்கலாம். மருத்துவ மதிப்பீடு அவசியம்.' },
        noResponse: { en: 'Stable breast appearance is good. Continue monitoring.', ta: 'மாறாத தோற்றம் நல்லது. தொடர்ந்து கவனியுங்கள்.' },
        severity: 'HIGH'
      },
      {
        id: 3,
        text: { en: 'Do you have any spontaneous nipple discharge (especially bloody or from one breast)?', ta: 'தானாக முலைக்காம்பிலிருந்து திரவம் வெளியேறுகிறதா (ரத்தம் கலந்த அல்லது ஒரு மார்பிலிருந்து)?' },
        yesResponse: { en: 'Spontaneous nipple discharge, especially if bloody or from one breast, is a warning sign needing urgent investigation.', ta: 'தானாக வெளியேற்றம், குறிப்பாக ரத்தம் கலந்ததாக இருந்தால் — உடனடி ஆய்வு தேவை.' },
        noResponse: { en: 'No discharge is a positive sign.', ta: 'வெளியேற்றம் இல்லாதது நல்லது.' },
        severity: 'HIGH'
      },
      {
        id: 4,
        text: { en: 'Has your nipple turned inward (new inversion) or changed?', ta: 'முலைக்காம்பு உள்ளே வளைந்திருப்பது (புதிதாக) அல்லது மாற்றம் கவனித்துள்ளீர்களா?' },
        yesResponse: { en: 'New nipple inversion can indicate breast tissue being pulled inward by a tumor. Prompt medical attention needed.', ta: 'புதிய முலைக்காம்பு உள்ளிழுப்பு கட்டியால் திசு இழுக்கப்படுவதைக் குறிக்கலாம். மருத்துவ கவனம் தேவை.' },
        noResponse: { en: 'Normal nipple appearance is reassuring.', ta: 'சாதாரண முலைக்காம்பு தோற்றம் நம்பிக்கையளிக்கிறது.' },
        severity: 'HIGH'
      },
      {
        id: 5,
        text: { en: 'Do you see dimpling, puckering, or orange-peel texture on your breast skin?', ta: 'மார்பகத் தோலில் குழி விழுதல், சுருக்கம் அல்லது ஆரஞ்சு தோல் போன்ற தோற்றம் உள்ளதா?' },
        yesResponse: { en: 'Skin changes like dimpling or orange-peel texture suggest advanced breast changes. Seek immediate care.', ta: 'இது போன்ற தோல் மாற்றங்கள் நிணநீர் வடிகால் பாதிப்பைக் குறிக்கலாம் — உடனடியாக மருத்துவமனைக்குச் செல்லுங்கள்.' },
        noResponse: { en: 'Smooth, normal skin texture is a good sign.', ta: 'மென்மையான, சாதாரண தோல் அமைப்பு நல்லது.' },
        severity: 'HIGH'
      },
      {
        id: 6,
        text: { en: 'Is there redness, warmth, or swelling in your breast?', ta: 'மார்பில் சிவப்பு நிறம், வெப்பம் அல்லது வீக்கம் உள்ளதா?' },
        yesResponse: { en: 'These symptoms may indicate inflammatory breast cancer or an infection. Both require urgent evaluation.', ta: 'இவை inflammatory breast cancer அல்லது தொற்றைக் குறிக்கலாம் — உடனடி மதிப்பீடு தேவை.' },
        noResponse: { en: 'No inflammation is positive. Continue to monitor your breasts regularly.', ta: 'அழற்சி இல்லாதது நல்லது; தொடர்ந்து மார்புகளைக் கவனியுங்கள்.' },
        severity: 'HIGH'
      },
      {
        id: 7,
        text: { en: 'Do you have persistent breast pain or discomfort in one specific area?', ta: 'ஒரு குறிப்பிட்ட பகுதியில் நீடித்த மார்பு வலி அல்லது அசௌகரியம் உள்ளதா?' },
        yesResponse: { en: 'Persistent localized pain should be evaluated, especially alongside other symptoms.', ta: 'நீடித்த இடம்சார்ந்த வலி, பிற அறிகுறிகளுடன் மதிப்பிடப்பட வேண்டும்.' },
        noResponse: { en: 'The absence of pain is normal. Most early breast cancers are painless.', ta: 'வலி இல்லாமல் இருப்பது சாதாரணம். ஆரம்ப நிலை புற்றுநோய்கள் வலியற்றவை.' },
        severity: 'MODERATE'
      }
    ],
    healthTips: [
      { en: 'Do a breast self-exam every month, 3–5 days after your period ends', ta: 'மாதந்தோறும் மாதவிடாய் முடிந்த 3–5 நாட்களுக்குப் பிறகு சுய மார்பகப் பரிசோதனை செய்யுங்கள்' },
      { en: 'Annual clinical breast examinations by a doctor', ta: 'வருடாந்திர மருத்துவ மார்பகப் பரிசோதனை செய்யுங்கள்' },
      { en: 'Mammography recommended after age 40', ta: '40 வயதுக்குப் பிறகு மேமோகிராபி பரிந்துரைக்கப்படுகிறது' },
      { en: 'Maintain healthy weight and exercise regularly', ta: 'ஆரோக்கியமான எடை மற்றும் உடற்பயிற்சி பராமரிக்கவும்' },
      { en: 'Limit alcohol; avoid smoking', ta: 'மது குறைக்கவும்; புகையிலையை தவிர்க்கவும்' }
    ],
    riskLevels: {
      high: { threshold: 2, highSeverity: 1 },
      medium: { threshold: 1 },
    }
  },

  uti: {
    id: 'uti',
    emoji: '💧',
    gradient: ['#DBEAFE', '#EFF6FF'],
    accentColor: '#3B82F6',
    tagColor: '#1D4ED8',
    name: { en: 'UTI', ta: 'UTI' },
    fullName: { en: 'Urinary Tract Infection', ta: 'சிறுநீர்ப் பாதை தொற்று (UTI)' },
    tagline: {
      en: 'Affects >50% of women at least once — easily treatable when caught early',
      ta: '>50% பெண்கள் வாழ்நாளில் குறைந்தது ஒரு முறை அனுபவிப்பார்கள் — ஆரம்பத்தில் கண்டறிந்தால் சுலபமாக சிகிச்சையளிக்கலாம்'
    },
    overview: [
      { label: { en: 'Prevalence', ta: 'பரவல்' }, value: { en: '>50% of women experience at least one UTI in their lifetime', ta: '>50% பெண்கள் தம் வாழ்நாளில் குறைந்தது ஒரு UTI-ஐ அனுபவிப்பார்கள்' } },
      { label: { en: 'Recurrence', ta: 'மறுநிகழ்வு' }, value: { en: '20–30% have repeat infections', ta: '20–30% பேர் மீண்டும் தொற்று அடைகிறார்கள்' } },
      { label: { en: 'Risk factors', ta: 'ஆபத்து காரணிகள்' }, value: { en: 'Poor hydration, hygiene, diabetes, sexual activity', ta: 'நீர் குறைவு, சுகாதாரமின்மை, நீரிழிவு, பாலியல் செயல்பாடு' } },
      { label: { en: 'Warning', ta: 'எச்சரிக்கை' }, value: { en: 'Can cause kidney damage if left untreated', ta: 'சிகிச்சையளிக்கப்படாவிட்டால் சிறுநீரகச் சேதம் ஏற்படலாம்' } }
    ],
    questions: [
      { id: 1, text: { en: 'Do you have a burning sensation or pain while urinating?', ta: 'சிறுநீர் கழிக்கும்போது எரிச்சல் அல்லது வலி உள்ளதா?' }, yesResponse: { en: 'Burning during urination is the hallmark symptom of UTI caused by bacterial infection of the urinary tract.', ta: 'சிறுநீர் கழிக்கும்போது எரிச்சல் UTI-இன் முதன்மை அறிகுறி.' }, noResponse: { en: 'No burning is a good sign.', ta: 'எரிச்சல் இல்லை என்றால் நல்லது.' }, severity: 'MODERATE' },
      { id: 2, text: { en: 'Are you urinating more frequently than usual, even in small amounts?', ta: 'சிறிய அளவுகளாக இருந்தாலும், வழக்கத்தைவிட அதிகமாக சிறுநீர் கழிக்கிறீர்களா?' }, yesResponse: { en: 'Increased frequency with small volumes indicates bladder irritation from infection.', ta: 'குறைந்த அளவில் அடிக்கடி சிறுநீர் கழிப்பது தொற்று காரணமாக சிறுநீர்ப்பை எரிச்சலடைவதைக் குறிக்கிறது.' }, noResponse: { en: 'Normal urination patterns are reassuring.', ta: 'சாதாரண சிறுநீர் முறைகள் நம்பிக்கையளிக்கின்றன.' }, severity: 'MODERATE' },
      { id: 3, text: { en: 'Do you feel a sudden, strong urge to urinate that\'s difficult to control?', ta: 'கட்டுப்படுத்த முடியாத திடீர் வலுவான சிறுநீர் அவசரம் உள்ளதா?' }, yesResponse: { en: 'Urgent need to urinate results from bladder muscle irritation by bacteria.', ta: 'திடீர் சிறுநீர் அவசரம் பாக்டீரியாவால் சிறுநீர்ப்பை தசை எரிச்சலடைவதால் ஏற்படுகிறது.' }, noResponse: { en: 'No urgency is positive.', ta: 'அவசரமின்மை நல்லது.' }, severity: 'MODERATE' },
      { id: 4, text: { en: 'Do you have pain or pressure in your lower abdomen or pelvic area?', ta: 'கீழ் வயிறு அல்லது இடுப்புப் பகுதியில் வலி அல்லது அழுத்தம் உள்ளதா?' }, yesResponse: { en: 'Lower abdominal pain indicates bladder inflammation (cystitis) from infection.', ta: 'கீழ் வயிற்று வலி தொற்று காரணமாக சிறுநீர்ப்பை அழற்சியை (cystitis) குறிக்கிறது.' }, noResponse: { en: 'No abdominal pain is good.', ta: 'வயிற்று வலி இல்லையெனில் நல்லது.' }, severity: 'MODERATE' },
      { id: 5, text: { en: 'Is your urine cloudy, dark, or has a strong odor?', ta: 'உங்கள் சிறுநீர் கலங்கலாகவோ, கருமையாகவோ அல்லது கடுமையான நாற்றத்துடனோ உள்ளதா?' }, yesResponse: { en: 'Cloudy, malodorous urine contains bacteria and white blood cells indicating active infection.', ta: 'கலங்கலான, நாற்றமுள்ள சிறுநீரில் பாக்டீரியா மற்றும் வெள்ளை அணுக்கள் — செயலில் உள்ள தொற்றைக் குறிக்கிறது.' }, noResponse: { en: 'Clear, odorless urine is healthy.', ta: 'தெளிவான, நாற்றமில்லாத சிறுநீர் ஆரோக்கியமானது.' }, severity: 'MODERATE' },
      { id: 6, text: { en: 'Have you noticed blood in your urine?', ta: 'சிறுநீரில் ரத்தம் கவனித்துள்ளீர்களா?' }, yesResponse: { en: 'Blood in urine (hematuria) suggests significant bladder or urethral inflammation and requires medical attention.', ta: 'சிறுநீரில் ரத்தம் சிறுநீர்ப்பை அழற்சியைக் குறிக்கலாம் — மருத்துவ கவனம் தேவை.' }, noResponse: { en: 'No blood in urine is reassuring.', ta: 'சிறுநீரில் ரத்தமின்மை நம்பிக்கையளிக்கிறது.' }, severity: 'HIGH' },
      { id: 7, text: { en: 'Do you have fever, chills, or pain in your back or side?', ta: 'காய்ச்சல், குளிர்வேட்டு அல்லது முதுகு/பக்கவாட்டில் வலி உள்ளதா?' }, yesResponse: { en: '⚠️ Fever with back pain indicates possible kidney infection (pyelonephritis) — immediate medical care needed.', ta: '⚠️ காய்ச்சலுடன் முதுகு வலி சிறுநீரகத் தொற்றை (pyelonephritis) குறிக்கலாம் — உடனடி மருத்துவ சிகிச்சை அவசியம்.' }, noResponse: { en: 'Excellent! These symptoms absent suggests infection hasn\'t spread to kidneys.', ta: 'மிக நல்லது! தொற்று சிறுநீரகத்திற்குப் பரவவில்லை என்று பொருள்.' }, severity: 'CRITICAL' }
    ],
    healthTips: [
      { en: 'Drink 2.5–3 litres of water daily', ta: 'தினமும் 2.5–3 லிட்டர் தண்ணீர் குடிக்கவும்' },
      { en: 'Urinate after sexual intercourse', ta: 'பாலியல் உறவுக்குப் பிறகு சிறுநீர் கழிக்கவும்' },
      { en: 'Wipe front to back after using the toilet', ta: 'கழிவறை பயன்படுத்திய பின் முன்னிருந்து பின்னால் துடைக்கவும்' },
      { en: 'Don\'t hold urine for long periods', ta: 'நீண்ட நேரம் சிறுநீர் அடக்கி வைக்க வேண்டாம்' },
      { en: 'Wear cotton underwear, avoid tight clothing', ta: 'பருத்தி உள்ளாடை அணியுங்கள், இறுக்கமான ஆடைகளைத் தவிர்க்கவும்' }
    ],
    riskLevels: { high: { threshold: 3, highSeverity: 1 }, medium: { threshold: 1 } }
  },

  ovarian: {
    id: 'ovarian',
    emoji: '🌸',
    gradient: ['#EDE9FE', '#F5F3FF'],
    accentColor: '#8B5CF6',
    tagColor: '#6D28D9',
    name: { en: 'Ovarian Cancer', ta: 'சினைப்பை புற்றுநோய்' },
    fullName: { en: 'Ovarian Cancer', ta: 'சினைப்பை புற்றுநோய் (Ovarian Cancer)' },
    tagline: { en: 'Silent but detectable — know the signs', ta: 'மௌனமாக இருக்கும் ஆனால் கண்டறியக்கூடியது — அறிகுறிகளை அறிக' },
    overview: [
      { label: { en: 'Ranking', ta: 'தரவரிசை' }, value: { en: '3rd among gynecological cancers in India', ta: 'இந்தியாவில் பெண்கள் சார்ந்த புற்றுநோய்களில் 3வது' } },
      { label: { en: 'Cases', ta: 'வழக்குகள்' }, value: { en: '~47,000 new cases annually in India', ta: 'இந்தியாவில் ஆண்டுக்கு ~47,000 புதிய வழக்குகள்' } },
      { label: { en: 'Hope', ta: 'நம்பிக்கை' }, value: { en: '>90% survival with early detection', ta: 'ஆரம்பத்தில் கண்டறிந்தால் >90% உயிர்வாழ்வு' } }
    ],
    questions: [
      { id: 1, text: { en: 'Have you had persistent abdominal bloating or fullness for more than 2 weeks?', ta: '2 வாரங்களுக்கு மேல் நீடித்த வயிற்று வீக்கம் அல்லது நிறைவு உணர்வு உள்ளதா?' }, yesResponse: { en: 'Persistent bloating can indicate fluid accumulation (ascites) or tumor growth in the abdomen.', ta: 'நீடித்த வீக்கம் திரவ சேகரிப்பு அல்லது கட்டி வளர்ச்சியைக் குறிக்கலாம்.' }, noResponse: { en: 'Occasional bloating is normal. Persistent bloating lasting weeks is more concerning.', ta: 'அவ்வப்போது வீக்கம் சாதாரணம். வாரங்களுக்கு நீடிக்கும் வீக்கம் கவலைக்குரியது.' }, severity: 'MODERATE' },
      { id: 2, text: { en: 'Do you have persistent pelvic or abdominal pain?', ta: 'நீடித்த இடுப்பு அல்லது வயிற்று வலி உள்ளதா?' }, yesResponse: { en: 'Ongoing pelvic pain may indicate ovarian tumor pressing on surrounding organs.', ta: 'தொடர் இடுப்பு வலி சினைப்பைக் கட்டி சுற்றியுள்ள உறுப்புகளை அழுத்துவதைக் குறிக்கலாம்.' }, noResponse: { en: 'No persistent pain is reassuring.', ta: 'நீடித்த வலி இல்லையெனில் நம்பிக்கையளிக்கிறது.' }, severity: 'MODERATE' },
      { id: 3, text: { en: 'Do you feel full quickly when eating or have difficulty eating normal amounts?', ta: 'சாப்பிடும்போது விரைவில் நிறைவடைகிறீர்களா?' }, yesResponse: { en: 'Early satiety occurs when abdominal tumors press on the stomach, reducing its capacity.', ta: 'வயிற்றில் கட்டிகள் வயிற்றை அழுத்தும்போது விரைவான நிறைவு ஏற்படும்.' }, noResponse: { en: 'Normal appetite and eating capacity is a good sign.', ta: 'சாதாரண பசி நல்லது.' }, severity: 'MODERATE' },
      { id: 4, text: { en: 'Have you experienced unexplained weight loss or loss of appetite?', ta: 'விளக்கமில்லாத எடை குறைவு அல்லது பசியின்மை உள்ளதா?' }, yesResponse: { en: 'Unintentional weight loss is concerning and may indicate advanced disease affecting metabolism.', ta: 'நோக்கமில்லாத எடை குறைவு கவலைக்குரியது — மேம்பட்ட நோயைக் குறிக்கலாம்.' }, noResponse: { en: 'Stable weight is reassuring.', ta: 'எடை நிலையாக இருந்தால் நம்பிக்கையளிக்கிறது.' }, severity: 'HIGH' },
      { id: 5, text: { en: 'Has your abdomen become increasingly swollen or distended?', ta: 'உங்கள் வயிறு அதிகமாக வீங்குவதை கவனித்துள்ளீர்களா?' }, yesResponse: { en: 'Progressive abdominal swelling can indicate tumor growth or ascites — immediate medical assessment needed.', ta: 'படிப்படியாக அதிகரிக்கும் வீக்கம் கட்டி வளர்ச்சி அல்லது திரவ சேகரிப்பைக் குறிக்கலாம்.' }, noResponse: { en: 'No abdominal swelling is good.', ta: 'வயிற்று வீக்கம் இல்லையெனில் நல்லது.' }, severity: 'HIGH' },
      { id: 6, text: { en: 'Are you experiencing unusual, persistent fatigue not relieved by rest?', ta: 'ஓய்வு எடுத்தாலும் நீங்காத அசாதாரண, நீடித்த சோர்வு உள்ளதா?' }, yesResponse: { en: 'Chronic fatigue in ovarian cancer results from the body fighting disease and possible anemia.', ta: 'நீடித்த சோர்வு உடல் நோயுடன் போராடுவதாலும் இரத்தசோகையாலும் ஏற்படலாம்.' }, noResponse: { en: 'Normal energy levels are positive.', ta: 'சாதாரண ஆற்றல் நிலை நல்லது.' }, severity: 'MODERATE' }
    ],
    healthTips: [
      { en: 'Know your family history of ovarian/breast cancer', ta: 'குடும்ப வரலாற்றை (சினைப்பை/மார்பகப் புற்றுநோய்) அறிக' },
      { en: 'Annual pelvic examinations recommended', ta: 'ஆண்டுதோறும் இடுப்புப் பரிசோதனை பரிந்துரை' },
      { en: 'Be aware of symptoms lasting more than 2 weeks', ta: '2 வாரங்களுக்கு மேல் நீடிக்கும் அறிகுறிகளைக் கவனிக்கவும்' },
      { en: 'Maintain healthy weight and active lifestyle', ta: 'ஆரோக்கியமான எடை மற்றும் செயல்பாட்டு வாழ்க்கை முறை பராமரிக்கவும்' }
    ],
    riskLevels: { high: { threshold: 3, highSeverity: 2 }, medium: { threshold: 2 } }
  },

  menopause: {
    id: 'menopause',
    emoji: '🌺',
    gradient: ['#FEF3C7', '#FFFBEB'],
    accentColor: '#F59E0B',
    tagColor: '#D97706',
    name: { en: 'Menopause', ta: 'மாதவிடாய் நிறுத்தம்' },
    fullName: { en: 'Menopause & Perimenopause', ta: 'மாதவிடாய் நிறுத்தம் (Menopause & Perimenopause)' },
    tagline: { en: 'A natural transition — manageable with the right support', ta: 'ஒரு இயற்கையான மாறுதல் — சரியான ஆதரவால் நிர்வகிக்கலாம்' },
    overview: [
      { label: { en: 'Age in India', ta: 'இந்தியாவில் வயது' }, value: { en: 'Average onset: 45–46 years (earlier than global average)', ta: 'சராசரி தொடக்கம்: 45–46 ஆண்டுகள்' } },
      { label: { en: 'Scale', ta: 'அளவு' }, value: { en: '43 million Indian women in menopausal age group', ta: '43 மில்லியன் இந்திய பெண்கள் மாதவிடாய் நிறுத்த வயதில்' } },
      { label: { en: 'Duration', ta: 'காலம்' }, value: { en: 'Perimenopause can begin 4–8 years before menopause', ta: 'Perimenopause 4–8 ஆண்டுகளுக்கு முன் தொடங்கலாம்' } }
    ],
    questions: [
      { id: 1, text: { en: 'Are you experiencing hot flashes or sudden intense heat?', ta: 'திடீர் வெப்ப அலைகள் (hot flashes) அல்லது கடுமையான வெப்ப உணர்வு உள்ளதா?' }, yesResponse: { en: 'Hot flashes affect 46–56% of Indian menopausal women — they result from hormonal fluctuations affecting body temperature regulation.', ta: 'வெப்ப அலைகள் 46–56% இந்திய பெண்களைப் பாதிக்கிறது.' }, noResponse: { en: 'Not everyone experiences hot flashes. Other symptoms may still be present.', ta: 'அனைவருக்கும் வெப்ப அலைகள் ஏற்படுவதில்லை.' }, severity: 'MODERATE' },
      { id: 2, text: { en: 'Do you have night sweats that disrupt your sleep?', ta: 'இரவு வியர்வை உங்கள் தூக்கத்தைப் பாதிக்கிறதா?' }, yesResponse: { en: 'Night sweats significantly impact sleep quality and daily functioning — affecting 45–52% of menopausal women in India.', ta: 'இரவு வியர்வைகள் 45–52% இந்திய மாதவிடாய் நிறுத்த பெண்களில் காணப்படுகிறது.' }, noResponse: { en: 'Good sleep quality is important.', ta: 'நல்ல தூக்கம் முக்கியம்.' }, severity: 'MODERATE' },
      { id: 3, text: { en: 'Have you noticed irregular periods or changes in menstrual flow over the past year?', ta: 'கடந்த ஒரு ஆண்டில் மாதவிடாய் சீர்மாறல் அல்லது மாற்றம் கவனித்துள்ளீர்களா?' }, yesResponse: { en: 'Irregular periods are often the first sign of perimenopause as hormone levels fluctuate.', ta: 'மாதவிடாய் சீர்மாறல் பெரும்பாலும் perimenopause-இன் முதல் அறிகுறி.' }, noResponse: { en: 'Regular cycles may continue for some time.', ta: 'சீரான சுழற்சிகள் சிலகாலம் தொடரலாம்.' }, severity: 'MILD' },
      { id: 4, text: { en: 'Have you noticed mood changes like irritability, anxiety, or feeling depressed?', ta: 'எரிச்சல், பதற்றம் அல்லது மனச்சோர்வு போன்ற மனநிலை மாற்றங்கள் உள்ளதா?' }, yesResponse: { en: 'Mood changes are common due to hormonal fluctuations. About 32% of women experience depression or sadness during menopause.', ta: 'ஹார்மோன் மாற்றங்கள் காரணமாக மனநிலை மாற்றங்கள் பொதுவானவை. சுமார் 32% பெண்கள் மனச்சோர்வை அனுபவிக்கின்றனர்.' }, noResponse: { en: 'Stable mood is positive.', ta: 'நிலையான மனநிலை நல்லது.' }, severity: 'MODERATE' },
      { id: 5, text: { en: 'Are you experiencing vaginal dryness or discomfort during intercourse?', ta: 'யோனி வறட்சி அல்லது உறவின்போது அசௌகரியம் உள்ளதா?' }, yesResponse: { en: 'Vaginal dryness affects 42–75% of menopausal women. This is treatable — discussing with a doctor can improve quality of life.', ta: '42–75% பெண்களுக்கு யோனி வறட்சி ஏற்படும். இது சிகிச்சையால் சரிசெய்யக்கூடியது.' }, noResponse: { en: 'Good vaginal health is important for overall wellbeing.', ta: 'நல்ல யோனி ஆரோக்கியம் முக்கியம்.' }, severity: 'MODERATE' },
      { id: 6, text: { en: 'Have you noticed memory problems or difficulty concentrating?', ta: 'நினைவாற்றல் குறைவு அல்லது கவனம் செலுத்துவதில் சிரமம் உள்ளதா?' }, yesResponse: { en: 'Cognitive changes affect many women during menopause. These are usually temporary and related to hormonal fluctuations.', ta: 'தற்காலிக நினைவுக் குறைவு அல்லது brain fog ஏற்படலாம்; பெரும்பாலும் தற்காலிகமானது.' }, noResponse: { en: 'Clear thinking is positive.', ta: 'தெளிவான சிந்தனை நல்லது.' }, severity: 'MILD' }
    ],
    healthTips: [
      { en: 'Maintain calcium (1200mg) and vitamin D (600–800 IU) intake daily', ta: 'தினமும் கால்சியம் (1200mg) மற்றும் வைட்டமின் D (600–800 IU) எடுக்கவும்' },
      { en: 'Regular weight-bearing exercises for bone health', ta: 'எலும்பு நலனுக்கான எடை தாங்கும் உடற்பயிற்சி செய்யுங்கள்' },
      { en: 'Practice stress management techniques', ta: 'மன அழுத்தக் கையாளுதல் நுட்பங்களைப் பயிற்சி செய்யுங்கள்' },
      { en: 'Regular health screenings', ta: 'வழக்கமான சுகாதாரப் பரிசோதனைகள்' }
    ],
    riskLevels: { high: { threshold: 5, highSeverity: 1 }, medium: { threshold: 3 } }
  },

  thyroid: {
    id: 'thyroid',
    emoji: '🦋',
    gradient: ['#DDD6FE', '#EDE9FE'],
    accentColor: '#7C3AED',
    tagColor: '#5B21B6',
    name: { en: 'Thyroid & Anemia', ta: 'தைராய்டு & இரத்தசோகை' },
    fullName: { en: 'Thyroid Disorders & Iron Deficiency Anemia', ta: 'தைராய்டு & இரத்தசோகை' },
    tagline: { en: '57% of Indian women have anemia — are you one?', ta: '57% இந்திய பெண்களுக்கு இரத்தசோகை உள்ளது — நீங்களும் ஒருவரா?' },
    overview: [
      { label: { en: 'Thyroid', ta: 'தைராய்டு' }, value: { en: '42 million Indians affected; women 5x more likely', ta: '42 மில்லியன் இந்தியர்களுக்கு தைராய்டு குறைபாடுகள்; பெண்கள் 5 மடங்கு அதிகம்' } },
      { label: { en: 'Anemia', ta: 'இரத்தசோகை' }, value: { en: '57% of Indian women have anemia (NFHS-5)', ta: '57% இந்திய பெண்களுக்கு இரத்தசோகை உள்ளது (NFHS-5)' } },
      { label: { en: 'Overlap', ta: 'ஒருங்கிணைப்பு' }, value: { en: 'Both conditions often co-exist and share similar symptoms', ta: 'இரு நிலைகளும் பெரும்பாலும் ஒன்றாக இருக்கலாம்' } }
    ],
    questions: [
      { id: 1, text: { en: 'Do you have persistent fatigue or weakness despite adequate rest?', ta: 'போதுமான ஓய்வு எடுத்தாலும் நீடித்த சோர்வு அல்லது பலவீனம் உள்ளதா?' }, yesResponse: { en: 'Chronic fatigue is a hallmark of both hypothyroidism and anemia.', ta: 'நீடித்த சோர்வு hypothyroidism மற்றும் இரத்தசோகை இரண்டின் முதன்மை அறிகுறி.' }, noResponse: { en: 'Good energy levels are positive.', ta: 'நல்ல ஆற்றல் நிலை நல்லது.' }, severity: 'MODERATE' },
      { id: 2, text: { en: 'Have you noticed unexplained weight gain or difficulty losing weight?', ta: 'விளக்கமில்லாத எடை அதிகரிப்பு அல்லது எடை குறைக்க சிரமம் உள்ளதா?' }, yesResponse: { en: 'Unexplained weight gain is a classic sign of hypothyroidism where slowed metabolism makes weight management difficult.', ta: 'விளக்கமில்லாத எடை அதிகரிப்பு hypothyroidism-இன் உன்னதமான அறிகுறி.' }, noResponse: { en: 'Stable weight is good.', ta: 'எடை நிலையாக இருந்தால் நல்லது.' }, severity: 'MODERATE' },
      { id: 3, text: { en: 'Do you feel cold intolerance or always cold hands and feet?', ta: 'குளிரைத் தாங்க முடியாமை அல்லது கை-கால்கள் எப்போதும் குளிராக உள்ளதா?' }, yesResponse: { en: 'Cold intolerance is a key symptom of hypothyroidism. In anemia, poor circulation causes cold extremities.', ta: 'குளிர் சகிப்புத்தன்மையின்மை hypothyroidism-இன் முக்கிய அறிகுறி.' }, noResponse: { en: 'Normal temperature regulation is positive.', ta: 'சாதாரண வெப்பநிலை நல்லது.' }, severity: 'MODERATE' },
      { id: 4, text: { en: 'Are you experiencing hair loss, dry skin, or brittle nails?', ta: 'முடி உதிர்வு, வறண்ட தோல் அல்லது உடையக்கூடிய நகங்கள் உள்ளதா?' }, yesResponse: { en: 'These symptoms indicate both thyroid dysfunction and iron deficiency.', ta: 'இந்த அறிகுறிகள் தைராய்டு செயலிழப்பு மற்றும் இரும்புச் சத்துக் குறைபாடு இரண்டையும் குறிக்கலாம்.' }, noResponse: { en: 'Healthy hair and skin are good signs.', ta: 'ஆரோக்கியமான முடி மற்றும் தோல் நல்ல அறிகுறிகள்.' }, severity: 'MODERATE' },
      { id: 5, text: { en: 'Have you noticed a swelling or lump in your neck?', ta: 'கழுத்தில் வீக்கம் அல்லது கட்டி கவனித்துள்ளீர்களா?' }, yesResponse: { en: 'Visible neck swelling indicates thyroid gland enlargement (goiter) — requires immediate medical evaluation.', ta: 'கழுத்து வீக்கம் தைராய்டு சுரப்பி பெருக்கத்தைக் குறிக்கிறது — உடனடி மதிப்பீடு தேவை.' }, noResponse: { en: 'No visible swelling is reassuring.', ta: 'வீக்கம் இல்லாதது நம்பிக்கையளிக்கிறது.' }, severity: 'HIGH' },
      { id: 6, text: { en: 'Have you noticed pale skin, pale conjunctiva, or pale nail beds?', ta: 'வெளிர்ந்த தோல், கண் உள்பகுதி அல்லது நகப்படுகை வெளிர்ந்திருப்பது கவனித்துள்ளீர்களா?' }, yesResponse: { en: 'Pallor is a direct sign of anemia, indicating insufficient hemoglobin and red blood cells.', ta: 'வெளிர்ச்சி இரத்தசோகையின் நேரடி அறிகுறி — போதுமான ஹீமோகுளோபின் இல்லாதது.' }, noResponse: { en: 'Normal skin color is reassuring.', ta: 'சாதாரண தோல் நிறம் நம்பிக்கையளிக்கிறது.' }, severity: 'MODERATE' }
    ],
    healthTips: [
      { en: 'Get thyroid function tests (TSH, T3, T4) and CBC done', ta: 'தைராய்டு பரிசோதனை (TSH, T3, T4) மற்றும் CBC செய்யுங்கள்' },
      { en: 'Ensure adequate iodine intake through iodized salt', ta: 'அயோடின் கலந்த உப்பு பயன்படுத்தி போதுமான அயோடின் உட்கொள்ளுங்கள்' },
      { en: 'Consume iron-rich foods: green leafy vegetables, meat, legumes', ta: 'இரும்புச் சத்து நிறைந்த உணவுகள்: கீரைகள், இறைச்சி, பருப்பு வகைகள்' },
      { en: 'Take vitamin C with iron-rich foods to enhance absorption', ta: 'இரும்புச் சத்து உணவுகளுடன் வைட்டமின் C எடுக்கவும்' }
    ],
    riskLevels: { high: { threshold: 4, highSeverity: 1 }, medium: { threshold: 3 } }
  },

  cervical: {
    id: 'cervical',
    emoji: '🎀',
    gradient: ['#FFE4E6', '#FFF0F5'],
    accentColor: '#E11D48',
    tagColor: '#9F1239',
    name: { en: 'Cervical Cancer', ta: 'கர்ப்பப்பை வாய் புற்றுநோய்' },
    fullName: { en: 'Cervical Cancer', ta: 'கர்ப்பப்பை வாய் புற்றுநோய் (Cervical Cancer)' },
    tagline: { en: 'Only 1.9% of eligible Indian women have been screened — don\'t wait', ta: 'தகுதியான இந்திய பெண்களில் 1.9% மட்டுமே பரிசோதனை செய்துள்ளனர்' },
    overview: [
      { label: { en: 'Statistics', ta: 'புள்ளிவிவரம்' }, value: { en: '127,526 new cases annually in India (2022)', ta: 'இந்தியாவில் ஆண்டுக்கு 1,27,526 புதிய வழக்குகள் (2022)' } },
      { label: { en: 'Burden', ta: 'சுமை' }, value: { en: 'India accounts for 19% of global cases', ta: 'உலகளவில் 19% வழக்குகள் இந்தியாவில்' } },
      { label: { en: 'Hope', ta: 'நம்பிக்கை' }, value: { en: '>85% survival when detected at Stage I', ta: 'Stage I-இல் கண்டறிந்தால் >85% உயிர்வாழ்வு' } },
      { label: { en: 'Prevention', ta: 'தடுப்பு' }, value: { en: 'HPV vaccine now FREE for 14-year-old girls at all government health centres', ta: '14 வயது பெண்களுக்கு அரசு மையங்களில் HPV தடுப்பூசி இலவசம்' } }
    ],
    questions: [
      { id: 1, text: { en: 'Have you noticed bleeding from your vagina after intercourse (more than once)?', ta: 'பாலியல் உறவுக்குப் பிறகு யோனியிலிருந்து ரத்தம் வரும் நிகழ்வு ஒன்றுக்கு மேல் நடந்துள்ளதா?' }, yesResponse: { en: 'Post-coital bleeding is one of the earliest warning signs of cervical cancer. Recurrent post-coital bleeding always requires medical evaluation.', ta: 'உறவுக்குப் பிறகு ரத்தப்போக்கு கர்ப்பப்பை வாய் புற்றுநோயின் ஆரம்ப எச்சரிக்கை அறிகுறி.' }, noResponse: { en: 'No bleeding after intercourse is reassuring. Early cervical cancer is often silent — get screened every 5 years.', ta: 'உறவுக்குப் பிறகு ரத்தப்போக்கு இல்லை என்றால் நம்பிக்கையளிக்கிறது. 5 ஆண்டுக்கு ஒருமுறை திரையிடல் அவசியம்.' }, severity: 'HIGH' },
      { id: 2, text: { en: 'Have you had unusual bleeding or spotting between periods?', ta: 'மாதவிடாய் இடையில் வழக்கத்திற்கு மாறான ரத்தக்கசிவு ஏற்பட்டுள்ளதா?' }, yesResponse: { en: 'Unexpected bleeding between periods can be an early indicator of cervical changes requiring gynaecological check-up.', ta: 'மாதவிடாய் இடையிலான ரத்தக்கசிவு கர்ப்பப்பை வாய் மாற்றங்களின் ஆரம்ப குறிகாட்டியாக இருக்கலாம்.' }, noResponse: { en: 'No unusual bleeding between periods is a good sign.', ta: 'இடைக்காலத்தில் ரத்தப்போக்கு இல்லாதது நல்லது.' }, severity: 'MODERATE' },
      { id: 3, text: { en: 'Have you had any vaginal bleeding after menopause?', ta: 'மாதவிடாய் முழுமையாக நின்ற பிறகு யோனியிலிருந்து ரத்தப்போக்கு ஏற்பட்டதா?' }, yesResponse: { en: '⚠️ Any vaginal bleeding after menopause is always abnormal and requires urgent medical investigation. Consult a gynaecologist without delay.', ta: '⚠️ மாதவிடாய் நிறுத்தத்திற்குப் பிறகு எந்தவிதமான ரத்தப்போக்கும் அசாதாரணம் — உடனடி மருத்துவ ஆய்வு தேவை.' }, noResponse: { en: 'Good. Any future post-menopausal bleeding must be reported to a doctor immediately.', ta: 'நல்லது. எதிர்காலத்தில் மாதவிடாய் நிறுத்தத்திற்குப் பிறகு ரத்தப்போக்கு ஏற்பட்டால் உடனே மருத்துவரைத் தொடர்பு கொள்ளவும்.' }, severity: 'CRITICAL' },
      { id: 4, text: { en: 'Have you noticed unusual vaginal discharge (watery, blood-tinged, or foul-smelling)?', ta: 'நீர் போன்ற, ரத்தம் கலந்த அல்லது துர்நாற்றமுள்ள யோனி வெளியேற்றம் உள்ளதா?' }, yesResponse: { en: 'Unusual vaginal discharge can be a sign of cervical cancer or a precancerous condition. Persistent or unusual discharge should be evaluated.', ta: 'வழக்கத்திற்கு மாறான வெளியேற்றம் கர்ப்பப்பை வாய் புற்றுநோய் அல்லது புற்றுநோய்க்கு முந்தைய நிலையின் அறிகுறியாக இருக்கலாம்.' }, noResponse: { en: 'No unusual discharge is reassuring.', ta: 'வழக்கத்திற்கு மாறான வெளியேற்றம் இல்லை என்றால் நம்பிக்கையளிக்கிறது.' }, severity: 'HIGH' },
      { id: 5, text: { en: 'Do you experience persistent pelvic pain unrelated to your period?', ta: 'மாதவிடாய் தொடர்பில்லாத நீடித்த கீழ் வயிறு அல்லது இடுப்பு வலி உள்ளதா?' }, yesResponse: { en: 'Persistent pelvic pain unrelated to menstruation can occur when a cervical tumour presses on surrounding tissue.', ta: 'மாதவிடாய் தொடர்பில்லாத நீடித்த இடுப்பு வலி கர்ப்பப்பை வாய்க் கட்டி திசுக்களை அழுத்தும்போது ஏற்படலாம்.' }, noResponse: { en: 'No persistent pelvic pain is reassuring.', ta: 'நீடித்த இடுப்பு வலி இல்லையெனில் நம்பிக்கையளிக்கிறது.' }, severity: 'MODERATE' }
    ],
    healthTips: [
      { en: 'Get screened — free VIA screening at government centres for women aged 30–65, every 5 years', ta: '30–65 வயது பெண்களுக்கு அரசு மையங்களில் 5 ஆண்டுக்கு ஒருமுறை இலவச VIA திரையிடல்' },
      { en: 'HPV vaccine is FREE for 14-year-old girls at government facilities', ta: '14 வயது பெண்களுக்கு அரசு வசதிகளில் HPV தடுப்பூசி இலவசம்' },
      { en: 'Quit all tobacco — cigarettes, bidis, gutka all double cervical cancer risk', ta: 'அனைத்து வகை புகையிலைப் பொருட்களையும் நிறுத்துங்கள்' },
      { en: 'Do not ignore unusual bleeding or discharge', ta: 'வழக்கத்திற்கு மாறான ரத்தப்போக்கு அல்லது வெளியேற்றத்தை புறக்கணிக்காதீர்கள்' }
    ],
    riskLevels: { high: { threshold: 2, highSeverity: 1 }, medium: { threshold: 1 } }
  },
};

export const CONDITION_ORDER = ['pcos', 'breast', 'uti', 'ovarian', 'menopause', 'thyroid', 'cervical'];

export function getRecommendation(conditionId, yesCount, highSeverityCount, hasCritical, lang) {
  const isEn = lang !== 'ta';
  if (hasCritical) {
    return {
      level: isEn ? '🚨 Urgent' : '🚨 அவசரம்',
      message: isEn ? 'Immediate medical attention required' : 'உடனடி மருத்துவ கவனம் தேவை',
      action: isEn ? 'Please visit a hospital or consult a gynaecologist within 24–48 hours.' : 'தயவுசெய்து 24–48 மணி நேரத்திற்குள் மருத்துவமனை அல்லது மகப்பேறு மருத்துவரை அணுகவும்.',
      color: '#EF4444',
      needsConsultation: true,
    };
  }
  const c = CONDITIONS[conditionId];
  const hl = c.riskLevels.high;
  const ml = c.riskLevels.medium;
  if (yesCount >= hl.threshold || highSeverityCount >= (hl.highSeverity || 99)) {
    return {
      level: isEn ? '⚠️ Consultation Recommended' : '⚠️ ஆலோசனை பரிந்துரை',
      message: isEn ? 'Several symptoms need medical evaluation' : 'பல அறிகுறிகள் மருத்துவ மதிப்பீடு தேவை',
      action: isEn ? 'Please consult a doctor or gynecologist. Use the Care tab to book or request a reminder call.' : 'மருத்துவர் அல்லது மகப்பேறு மருத்துவரை அணுகுங்கள்.',
      color: '#F59E0B',
      needsConsultation: true,
    };
  }
  if (yesCount >= ml.threshold) {
    return {
      level: isEn ? '📋 Monitor' : '📋 கவனியுங்கள்',
      message: isEn ? 'Some symptoms present — watch for changes' : 'சில அறிகுறிகள் உள்ளன — மாற்றங்களைக் கவனியுங்கள்',
      action: isEn ? 'Continue tracking your symptoms. If they worsen, consult a doctor.' : 'அறிகுறிகளைத் தொடர்ந்து கண்காணிக்கவும். மோசமானால் மருத்துவரை அணுகுங்கள்.',
      color: '#0D9488',
      needsConsultation: false,
    };
  }
  return {
    level: isEn ? '✅ Low Risk' : '✅ குறைந்த ஆபத்து',
    message: isEn ? 'Minimal symptoms detected' : 'குறைந்த அறிகுறிகள் கண்டறியப்பட்டன',
    action: isEn ? 'Continue regular check-ups and self-monitoring. Stay aware of changes in your body.' : 'வழக்கமான பரிசோதனை மற்றும் சுய கண்காணிப்பை தொடருங்கள்.',
    color: '#10B981',
    needsConsultation: false,
  };
}
