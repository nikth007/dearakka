import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { C, phaseColors } from '../theme/colors';
import { T } from '../theme';
import { useApp } from '../data/AppContext';
import { toDateStr, addDays, fromDateStr, today, formatDateDisplay } from '../utils/cycleCalc';
import { predict } from '../utils/prediction';
import { MiniPetal } from '../components/NaadhiArc';
import { SpottingIcon, LightFlowIcon, MediumFlowIcon, HeavyFlowIcon, IllustratedTile } from '../components/tiles/AllTiles';

const FLOW_TILES = [
  { key: 'spotting', label: 'Spotting', Icon: SpottingIcon },
  { key: 'light',    label: 'Light',    Icon: LightFlowIcon },
  { key: 'medium',   label: 'Medium',   Icon: MediumFlowIcon },
  { key: 'heavy',    label: 'Heavy',    Icon: HeavyFlowIcon },
];

export default function CycleLogScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { lang, cycleData, logPeriod } = useApp();
  const l = lang || 'en';
  const pc = phaseColors('menstrual');

  const [step, setStep] = useState(1);  // 1=date, 2=duration, 3=flow, 4=result
  const [startDate, setStartDate] = useState(today());
  const [duration, setDuration] = useState(5);
  const [flow, setFlow] = useState('medium');
  const [prediction, setPrediction] = useState(null);

  const markedDates = {};
  if (startDate) {
    for (let i = 0; i < duration; i++) {
      const d = toDateStr(addDays(fromDateStr(startDate), i));
      markedDates[d] = {
        color: i === 0 ? C.menstrual : C.menstrualSoft,
        startingDay: i === 0,
        endingDay: i === duration - 1,
        textColor: i === 0 ? C.white : C.menstrual,
      };
    }
  }

  async function handleSave() {
    await logPeriod({ startDate, length: duration, flow });
    const pred = predict(startDate, [...cycleData.periodDates, startDate], duration, [...cycleData.periodLengths, duration]);
    setPrediction(pred);
    setStep(4);
  }

  if (step === 4 && prediction) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}>
          <View style={styles.resultHeader}>
            <MiniPetal phase="menstrual" size={40} />
            <Text style={[T.h2, { marginTop: 12, textAlign: 'center' }]}>
              {l === 'ta' ? 'பதிவு செய்யப்பட்டது 🌸' : 'Logged 🌸'}
            </Text>
          </View>

          {[
            { label: l === 'ta' ? 'அடுத்த மாதவிடாய்' : 'Next period', value: formatDateDisplay(prediction.nextPeriodDate, l), color: C.menstrual },
            { label: l === 'ta' ? 'முடியும் தேதி' : 'Ends around', value: formatDateDisplay(prediction.nextPeriodEndDate, l), color: C.menstrualSoft },
            { label: l === 'ta' ? 'அண்டவிடுப்பு' : 'Ovulation', value: formatDateDisplay(prediction.ovulationDate, l), color: C.ovulation },
            { label: l === 'ta' ? 'கருவுறும் நாட்கள்' : 'Fertile window', value: `${formatDateDisplay(prediction.fertileStart, l)} – ${formatDateDisplay(prediction.fertileEnd, l)}`, color: C.follicular },
            { label: l === 'ta' ? 'PMS தொடக்கம்' : 'PMS start', value: formatDateDisplay(prediction.pmsStart, l), color: C.luteal },
          ].map(item => (
            <View key={item.label} style={[styles.resultCard, { borderLeftColor: item.color }]}>
              <Text style={[styles.resultValue, { color: item.color }]}>{item.value}</Text>
              <Text style={styles.resultLabel}>{item.label}</Text>
            </View>
          ))}

          <View style={[styles.confidencePill, { backgroundColor: C.follicularSoft }]}>
            <Text style={[styles.confidenceText, { color: C.follicular }]}>
              {prediction.confidence === 'high' ? '✦ ' : prediction.confidence === 'medium' ? '◈ ' : '◌ '}
              {prediction.cyclesLogged} {l === 'ta' ? 'சுழற்சிகள் பதிவு' : 'cycles logged'} · {
                prediction.confidence === 'high' ? (l === 'ta' ? 'நம்பகமான கணிப்பு' : 'Confident prediction')
                : prediction.confidence === 'medium' ? (l === 'ta' ? 'மேம்படுகிறது' : 'Getting accurate')
                : (l === 'ta' ? 'ஆரம்ப மதிப்பீடு' : 'Early estimate')
              }
            </Text>
          </View>

          <View style={styles.akkaNote}>
            <Text style={[T.bodySmall, { fontStyle: 'italic', color: C.textSecondary }]}>
              {l === 'ta'
                ? 'ஒவ்வொரு சுழற்சியும் என்னை உங்களை அறிய உதவுகிறது, அக்கா 💛'
                : 'Every cycle helps me understand your rhythm better 💛'}
            </Text>
          </View>

          <TouchableOpacity style={[styles.doneBtn, { backgroundColor: C.menstrual }]} onPress={() => navigation.goBack()}>
            <Text style={styles.doneBtnText}>{l === 'ta' ? 'முடிந்தது' : 'Done'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 1 ? setStep(s => s - 1) : navigation.goBack()} style={styles.backBtn}>
          <Text style={{ color: pc.accent, fontSize: 18 }}>←</Text>
        </TouchableOpacity>
        <Text style={T.h4}>
          {step === 1 ? (l === 'ta' ? 'மாதவிடாய் தேதி' : 'Period start')
          : step === 2 ? (l === 'ta' ? 'எத்தனை நாட்கள்?' : 'How many days?')
          : (l === 'ta' ? 'ஓட்டம் எப்படி?' : 'Flow intensity')}
        </Text>
        <View style={styles.stepDots}>
          {[1,2,3].map(s => (
            <View key={s} style={[styles.dot, step >= s && { backgroundColor: pc.accent }]} />
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 40 }]}>

        {step === 1 && (
          <>
            <Text style={[T.bodySmall, { marginBottom: 16, color: C.textSecondary }]}>
              {l === 'ta' ? 'மாதவிடாய் தொடங்கிய தேதியை தேர்ந்தெடுங்கள்' : 'Select the date your period started'}
            </Text>
            <Calendar
              onDayPress={day => setStartDate(day.dateString)}
              markedDates={{ [startDate]: { selected: true, selectedColor: C.menstrual } }}
              maxDate={today()}
              theme={{
                backgroundColor: C.bgMid,
                calendarBackground: C.bgMid,
                textSectionTitleColor: C.textSecondary,
                selectedDayBackgroundColor: C.menstrual,
                selectedDayTextColor: C.white,
                todayTextColor: C.menstrual,
                dayTextColor: C.textPrimary,
                textDisabledColor: C.textHint,
                arrowColor: C.menstrual,
                monthTextColor: C.textPrimary,
                textDayFontFamily: 'Inter',
                textMonthFontFamily: 'Plus Jakarta Sans',
                textDayHeaderFontFamily: 'Inter',
              }}
              style={{ borderRadius: 20, overflow: 'hidden' }}
            />
            <TouchableOpacity style={[styles.nextBtn, { backgroundColor: C.menstrual }]} onPress={() => setStep(2)}>
              <Text style={styles.nextBtnText}>{l === 'ta' ? 'அடுத்து' : 'Next'} →</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={[T.bodySmall, { marginBottom: 16, color: C.textSecondary }]}>
              {l === 'ta' ? `${formatDateDisplay(startDate, l)} - க்கு எத்தனை நாட்கள்?` : `Starting ${formatDateDisplay(startDate, l)} — how many days?`}
            </Text>
            {/* Period calendar preview */}
            <Calendar
              markedDates={markedDates}
              markingType="period"
              theme={{
                backgroundColor: C.bgMid,
                calendarBackground: C.bgMid,
                textSectionTitleColor: C.textSecondary,
                dayTextColor: C.textPrimary,
                textDisabledColor: C.textHint,
                arrowColor: C.menstrual,
                monthTextColor: C.textPrimary,
                textDayFontFamily: 'Inter',
                textMonthFontFamily: 'Plus Jakarta Sans',
                textDayHeaderFontFamily: 'Inter',
              }}
              style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}
            />
            <View style={styles.durationRow}>
              {[2,3,4,5,6,7,8].map(d => (
                <TouchableOpacity
                  key={d}
                  style={[styles.durationChip, duration === d && { backgroundColor: C.menstrual, borderColor: C.menstrual }]}
                  onPress={() => setDuration(d)}
                >
                  <Text style={[styles.durationText, duration === d && { color: C.white }]}>{d}</Text>
                  <Text style={[{ fontSize: 9, fontFamily: 'Inter', color: duration === d ? 'rgba(255,255,255,0.8)' : C.textSecondary }]}>
                    {l === 'ta' ? 'நாட்' : 'days'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={[styles.nextBtn, { backgroundColor: C.menstrual }]} onPress={() => setStep(3)}>
              <Text style={styles.nextBtnText}>{l === 'ta' ? 'அடுத்து' : 'Next'} →</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={[T.bodySmall, { marginBottom: 20, color: C.textSecondary }]}>
              {l === 'ta' ? 'ஓட்டம் எவ்வளவு?' : 'How heavy was the flow?'}
            </Text>
            <View style={styles.flowGrid}>
              {FLOW_TILES.map(t => (
                <IllustratedTile
                  key={t.key}
                  icon={t.Icon}
                  label={l === 'ta' ? { spotting: 'புள்ளி', light: 'லேசான', medium: 'நடுத்தர', heavy: 'அதிக' }[t.key] : t.label}
                  selected={flow === t.key}
                  color={C.menstrual}
                  onPress={() => setFlow(t.key)}
                  size={88}
                />
              ))}
            </View>
            <TouchableOpacity style={[styles.nextBtn, { backgroundColor: C.menstrual }]} onPress={handleSave}>
              <Text style={styles.nextBtnText}>{l === 'ta' ? 'சேமி' : 'Save'} ✓</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: C.bgMid,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  backBtn: { width: 36, alignItems: 'flex-start' },
  stepDots: { marginLeft: 'auto', flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: C.bgHighlight },

  scroll: { padding: 16 },

  durationRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  durationChip: {
    width: 60, height: 60, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: C.bgMid, borderWidth: 2, borderColor: C.dividerMid,
  },
  durationText: { fontFamily: 'Plus Jakarta Sans', fontWeight: '700', fontSize: 18, color: C.textPrimary },

  flowGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 24 },

  nextBtn: { borderRadius: 20, paddingVertical: 18, alignItems: 'center', marginTop: 8 },
  nextBtnText: { fontFamily: 'Plus Jakarta Sans', fontWeight: '700', fontSize: 17, color: C.white },

  resultHeader: { alignItems: 'center', marginBottom: 24, paddingTop: 16 },
  resultCard: {
    backgroundColor: C.bgMid, borderRadius: 16, padding: 16,
    marginBottom: 12, borderLeftWidth: 4,
  },
  resultValue: { fontFamily: 'Plus Jakarta Sans', fontWeight: '700', fontSize: 18 },
  resultLabel: { fontFamily: 'Inter', fontSize: 12, color: C.textSecondary, marginTop: 4 },

  confidencePill: { borderRadius: 20, padding: 14, marginBottom: 16 },
  confidenceText: { fontFamily: 'Inter', fontWeight: '600', fontSize: 13, textAlign: 'center' },

  akkaNote: { padding: 16, backgroundColor: C.bgMid, borderRadius: 16, marginBottom: 20 },

  doneBtn: { borderRadius: 20, paddingVertical: 18, alignItems: 'center' },
  doneBtnText: { fontFamily: 'Plus Jakarta Sans', fontWeight: '700', fontSize: 17, color: C.white },
});
