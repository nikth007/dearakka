// ─────────────────────────────────────────────────────────────
// Dear Akka — ChatScreen.js
// Warm chat interface with Akka as AI companion
// Phase-scripted responses, no live AI needed
// ─────────────────────────────────────────────────────────────

import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { C, phaseColors } from '../theme/colors';
import { T } from '../theme';
import { useApp } from '../data/AppContext';
import { MiniPetal } from '../components/NaadhiArc';
import Akka from '../components/Akka';
import { getCyclePhase, currentCycleDay } from '../utils/cycleCalc';

// ── Scripted responses keyed by phase ──────────────────────────
const SCRIPTED_RESPONSES = {
  menstrual: {
    en: [
      "Rest is medicine right now, akka. Your body is doing deep, powerful work — shedding and renewing. Give yourself permission to slow down, eat warm foods, and say no to things that drain you. You don't have to earn rest.",
      "Menstrual phase is a time of heightened intuition. Many women feel more reflective and inward during this time. That 'low energy' feeling isn't weakness — it's your body asking for gentleness. Honour it.",
      "Warmth is your best friend this week. Ginger tea, a warm water bottle on your lower belly, light stretching like child's pose — these small acts of care add up. You're not being lazy; you're being wise.",
      "Cramps and heavy flow can feel so isolating. But remember — this is a deeply natural rhythm. If the pain is severe, please do speak with a doctor. And in the meantime, know that I'm here with you.",
      "Iron-rich foods like lentils, spinach, and sesame seeds can help replenish what your body loses this week. Try to avoid cold drinks and raw foods if you can — your digestion appreciates warmth right now.",
    ],
    ta: [
      "இப்போது ஓய்வு என்பது மருந்து, அக்கா. உன் உடல் ஆழமான, சக்திவாய்ந்த வேலை செய்கிறது. உன்னை மெதுவாக்கிட உன்னை அனுமதி கொடு.",
      "மாதவிடாய் காலத்தில் உள்ளுணர்வு அதிகமாக இருக்கும். அந்த 'சோர்வு' உணர்வு பலவீனம் அல்ல — உன் உடல் மென்மை கேட்கிறது.",
      "இஞ்சி தேநீர், வெதுவெதுப்பான நீர் பாட்டில், மென்மையான நீட்சி — இந்த சிறு அக்கறை செயல்கள் மிகவும் உதவும்.",
      "வலி மற்றும் அதிக ஓட்டம் தனிமையாக உணர வைக்கலாம். ஆனால் இது இயற்கையான ஒரு தாளம். நான் உன்னோடு இருக்கிறேன்.",
      "பருப்பு, கீரை, எள் போன்ற இரும்புச்சத்து நிறைந்த உணவுகள் இந்த வாரம் உன் உடலுக்கு மிகவும் நல்லது.",
    ],
  },
  follicular: {
    en: [
      "You're entering such a beautiful phase, akka! Energy is starting to rise, your mind feels clearer, and creativity is waking up. This is the best time to start new projects, learn something new, or plan your month ahead.",
      "The follicular phase is spring energy — fresh, curious, expansive. Your estrogen is rising and with it comes a natural confidence. Say yes to social plans, try a new recipe, take a dance class. The world feels lighter now.",
      "Your metabolism is primed right now, which means you can handle a bit more — heavier workouts, complex meals, mental challenges. It's a great week to tackle things you've been putting off. Ride this wave!",
      "Skin tends to glow during the follicular phase thanks to rising estrogen. If you've been wanting to try a new skincare routine or refresh your look, now's the time. You'll feel great about whatever you try.",
      "This phase is wonderful for social connection. Reach out to a friend you've been missing, say yes to that gathering, or start a conversation you've been nervous about. Your warmth and openness are at their peak.",
    ],
    ta: [
      "அக்கா, நீ அழகான ஒரு கட்டத்தில் நுழைகிறாய்! ஆற்றல் உயர ஆரம்பிக்கிறது, மனம் தெளிவாக இருக்கிறது. புதிய திட்டங்களை தொடங்க இது சிறந்த நேரம்.",
      "ஃபாலிகுலர் கட்டம் வசந்த காலத்தின் ஆற்றல் போன்றது — புதுமையானது, ஆர்வமானது. உன் ஈஸ்ட்ரோஜன் உயர்கிறது, இயற்கையான நம்பிக்கை வருகிறது.",
      "இப்போது உன் வளர்சிதை மாற்றம் தயாராக இருக்கிறது. கடினமான உடற்பயிற்சி, சிக்கலான உணவுகள், மன சவால்கள் — எல்லாம் சாதிக்கலாம்!",
      "உயரும் ஈஸ்ட்ரோஜன் காரணமாக சருமம் பளபளக்கும். புதிய தோல் பராமரிப்பு முயற்சி செய்ய இது நல்ல நேரம்.",
      "இந்த கட்டம் சமூக தொடர்புக்கு அருமையானது. மறந்த நண்பரை அழை, கூட்டத்தில் கலந்துகோ — உன் அன்பும் திறமையும் உச்சத்தில் இருக்கும்.",
    ],
  },
  ovulation: {
    en: [
      "You're at peak energy and peak magnetism right now, akka! Ovulation phase brings out your most radiant self. People are drawn to you — your communication is clear, your warmth is infectious. Make the most of this window!",
      "This is the time to have important conversations, give presentations, or lead that meeting. Your verbal fluency and emotional intelligence are at their highest. Whatever needs saying, say it now — with love and confidence.",
      "Fertility awareness: if you're not trying to conceive, be mindful that this is your most fertile window (typically cycle days 12–16). If you are hoping for a baby, this is the time nature is most on your side.",
      "The surge of LH (luteinising hormone) makes you feel more adventurous. Say yes to spontaneous plans, try something bold, push your workout a little harder. Your body is at its most resilient right now.",
      "Ovulation can sometimes bring mid-cycle spotting or a twinge on one side — this is called Mittelschmerz and it's completely normal. It's your body's little signal that things are working beautifully.",
    ],
    ta: [
      "அக்கா, நீ உச்ச ஆற்றல் மற்றும் கவர்ச்சியில் இருக்கிறாய்! அண்டவிடுப்பு கட்டம் உன்னை மிகவும் பிரகாசமாக ஆக்குகிறது.",
      "முக்கியமான உரையாடல்கள், வழிமுறைகள், தலைமை — இது செய்ய சிறந்த நேரம். உன் தொடர்பாடல் திறன் உச்சத்தில் இருக்கிறது.",
      "கருவுறுதல் விழிப்புணர்வு: இது உன் மிகவும் கருவுறக்கூடிய காலம். உன் நோக்கத்திற்கு ஏற்ப இதை கவனத்தில் வை.",
      "LH அலை உன்னை தைரியமாக உணர வைக்கிறது. தன்னிச்சையான திட்டங்களுக்கு ஆம் சொல், துணிச்சலான ஒன்று முயற்சி செய்.",
      "சில நேரங்களில் ஒரு பக்கத்தில் வலி வரலாம் — இது Mittelschmerz என்று அழைக்கப்படுகிறது, முற்றிலும் சாதாரணமானது.",
    ],
  },
  luteal: {
    en: [
      "The luteal phase is a turning inward time, akka. It's natural to feel less social, more introspective. This isn't a flaw — it's your wisdom. Use this energy for deep work, creative projects, and meaningful self-care.",
      "If you're feeling more emotional or irritable, please be gentle with yourself. Progesterone is high and serotonin can dip — this is biology, not drama. Some magnesium, dark chocolate, and early nights go a long way.",
      "Bloating and breast tenderness during the luteal phase are very common. Reducing salt and caffeine a little, and choosing anti-inflammatory foods like turmeric, berries, and leafy greens can ease these symptoms gently.",
      "Your inner critic can get louder in the luteal phase. When those self-critical thoughts arise, try to notice them without believing them. What would you say to a dear friend feeling this way? Say that to yourself.",
      "Sleep is especially important right now. Your body temperature rises slightly during the luteal phase, which can disrupt sleep. Try a cool room, light linen, and winding down an hour before bed. Rest is not a luxury — it's repair.",
    ],
    ta: [
      "லுட்டியல் கட்டம் உள்நோக்கும் நேரம், அக்கா. குறைவான சமூக உணர்வு, அதிக ஆழ்நிலை — இது உன் ஞானம், குறை அல்ல.",
      "அதிக உணர்ச்சி அல்லது எரிச்சல் உணர்ந்தால், உன்னிடம் மென்மையாக இரு. புரோஜெஸ்டிரோன் உயர்ந்திருக்கிறது — இது உயிரியல், நாடகம் அல்ல.",
      "வீக்கம் மற்றும் மார்பக வலி மிகவும் சாதாரணம். உப்பு, காஃபின் குறைத்து, மஞ்சள், பெர்ரி, கீரை சாப்பிடு.",
      "லுட்டியல் கட்டத்தில் தன்னை விமர்சிக்கும் குரல் அதிகமாகலாம். அந்த எண்ணங்களை கவனி, ஆனால் நம்பாதே.",
      "தூக்கம் இப்போது மிக முக்கியம். குளிர்ந்த அறை, லினன் துணி, படுக்கை நேரத்திற்கு முன் ஒரு மணி நேரம் ஓய்வு — இவை உதவும்.",
    ],
  },
  none: {
    en: [
      "I'm here with you, akka. Log your cycle so I can give you more personalised advice — but even without that, know that I'm always rooting for you.",
      "Every body is different and every cycle tells its own story. Once you start tracking, patterns will emerge that help you understand yourself so much better. Start whenever you're ready.",
      "Self-care looks different for everyone. What matters is that you're tuning in to how you feel. Even asking 'how am I today?' is an act of self-love. Keep going, akka.",
      "Rest when you need to. Move when it feels good. Eat with kindness. These simple acts compound into real wellbeing over time. I believe in the small, consistent choices you make.",
      "It takes courage to pay attention to your own body in a world that asks women to push through everything. You're doing something radical by showing up here. I see you, akka.",
    ],
    ta: [
      "நான் உன்னோடு இருக்கிறேன், அக்கா. உன் சுழற்சியை பதிவு செய் — நான் மிகவும் தனிப்பயனாக்கப்பட்ட ஆலோசனை கொடுக்க முடியும்.",
      "ஒவ்வொரு உடலும் தனித்துவமானது. நீ கண்காணிக்கத் தொடங்கியதும், உன்னை நீயே இன்னும் நன்றாக புரிந்துகொள்வாய்.",
      "சுய-பராமரிப்பு ஒவ்வொருவருக்கும் வேறுபட்டது. நீ 'இன்று எப்படி இருக்கிறேன்?' என்று கேட்பதுகூட சுய-அன்பின் செயல்.",
      "தேவைப்படும்போது ஓய். நன்றாக உணரும்போது அசை. இந்த எளிய செயல்கள் நாளடைவில் உண்மையான நலனாக மாறும்.",
      "உன் சொந்த உடலை கவனிக்க தைரியம் தேவை. நீ இங்கே வந்திருப்பது ஒரு தைரியமான செயல். நான் உன்னை பார்க்கிறேன், அக்கா.",
    ],
  },
};

const STARTERS = [
  "How am I feeling today?",
  "What should I eat this week?",
  "Why do I feel this way?",
];

let msgId = 0;
const makeId = () => { msgId++; return String(msgId); };

export default function ChatScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { cycleData, lang } = useApp();
  const scrollRef = useRef(null);

  const cycleDay = currentCycleDay(cycleData?.lastPeriodStart);
  const phase = cycleDay ? getCyclePhase(cycleDay, cycleData?.cycleLength || 28) : 'none';
  const pc = phaseColors(phase);
  const responses = SCRIPTED_RESPONSES[phase] || SCRIPTED_RESPONSES.none;
  const langResponses = responses[lang === 'ta' ? 'ta' : 'en'];

  const [messages, setMessages] = useState([
    {
      id: makeId(),
      from: 'akka',
      text: lang === 'ta'
        ? 'வணக்கம் அக்கா! நான் இங்கே இருக்கிறேன். உன்னோடு பேசுவதில் மகிழ்ச்சி. இன்று எப்படி இருக்கிறாய்?'
        : 'Hello akka! I\'m so glad you\'re here. How are you feeling today? I\'m always listening.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const responseIndexRef = useRef(0);

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setInputText('');

    const userMsg = { id: makeId(), from: 'user', text: trimmed };
    const typingMsg = { id: 'typing', from: 'akka', text: '...', typing: true };

    setMessages(prev => [...prev, userMsg, typingMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const idx = responseIndexRef.current % langResponses.length;
      responseIndexRef.current += 1;
      const reply = langResponses[idx];

      setMessages(prev => {
        const without = prev.filter(m => m.id !== 'typing');
        return [...without, { id: makeId(), from: 'akka', text: reply }];
      });
      setIsTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 900);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }, [isTyping, langResponses]);

  const handleStarter = (starter) => sendMessage(starter);

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingBottom: insets.bottom + 88 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Akka phase={phase} size={40} />
        <View style={styles.headerMeta}>
          <Text style={styles.headerTitle}>Akka</Text>
          <View style={styles.headerSub}>
            <View style={[styles.onlineDot, { backgroundColor: pc.accent }]} />
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
        <MiniPetal phase={phase} size={24} />
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} phase={phase} pc={pc} />
        ))}
      </ScrollView>

      {/* Conversation starters */}
      <View style={styles.startersRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.startersContent}>
          {STARTERS.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.starterChip, { borderColor: pc.accent }]}
              onPress={() => handleStarter(s)}
              activeOpacity={0.7}
            >
              <Text style={[styles.starterText, { color: pc.accent }]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Input row */}
      <View style={[styles.inputRow, { borderTopColor: C.divider }]}>
        <TextInput
          style={[styles.input, { borderColor: C.dividerMid }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder={lang === 'ta' ? 'அக்காவிடம் பேசுங்கள்...' : 'Talk to Akka...'}
          placeholderTextColor={C.textHint}
          multiline
          maxLength={400}
          returnKeyType="send"
          onSubmitEditing={() => sendMessage(inputText)}
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: pc.accent }]}
          onPress={() => sendMessage(inputText)}
          activeOpacity={0.8}
        >
          <Ionicons name="send" size={18} color={C.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function MessageBubble({ msg, phase, pc }) {
  const isAkka = msg.from === 'akka';
  return (
    <View style={[styles.bubbleRow, isAkka ? styles.bubbleRowLeft : styles.bubbleRowRight]}>
      {isAkka && (
        <View style={[styles.akkaMini, { backgroundColor: pc.soft, borderColor: pc.mid }]}>
          <Akka phase={phase} size={20} />
        </View>
      )}
      <View style={[
        styles.bubble,
        isAkka ? styles.bubbleAkka : styles.bubbleUser,
      ]}>
        <Text style={[
          styles.bubbleText,
          { color: isAkka ? C.textPrimary : C.white, opacity: msg.typing ? 0.5 : 1 },
        ]}>
          {msg.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
    gap: 12,
  },
  headerMeta: {
    flex: 1,
  },
  headerTitle: {
    ...T.h4,
    fontSize: 16,
    fontWeight: '700',
  },
  headerSub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 1,
  },
  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  headerStatus: {
    ...T.caption,
    fontSize: 12,
    color: C.textSecondary,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  bubbleRowLeft: {
    justifyContent: 'flex-start',
    gap: 8,
  },
  bubbleRowRight: {
    justifyContent: 'flex-end',
  },
  akkaMini: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleAkka: {
    backgroundColor: C.bgMid,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: C.bgElevated,
    borderBottomRightRadius: 4,
  },
  bubbleText: {
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 22,
  },
  startersRow: {
    borderTopWidth: 1,
    borderTopColor: C.divider,
    paddingVertical: 10,
  },
  startersContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  starterChip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
  },
  starterText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: C.bgElevated,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: C.textPrimary,
    fontFamily: 'Inter',
    fontSize: 15,
    lineHeight: 22,
    maxHeight: 110,
  },
  sendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
