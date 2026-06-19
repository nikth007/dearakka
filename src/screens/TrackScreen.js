import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, phaseColors } from '../theme/colors';
import { T } from '../theme';
import { useApp } from '../data/AppContext';
import { getCyclePhase, currentCycleDay, today } from '../utils/cycleCalc';
import { MiniPetal } from '../components/NaadhiArc';
import {
  SpottingIcon, LightFlowIcon, MediumFlowIcon, HeavyFlowIcon,
  NoCrampsIcon, MildCrampsIcon, ModerateCrampsIcon, SevereCrampsIcon,
  HeadacheIcon, BackPainIcon, BloatingIcon, BreastTendernessIcon, FatigueIcon,
  JoyIcon, CalmIcon, HopefulIcon, AnxiousIcon, LowMoodIcon, IrritableIcon, OverwhelmedIcon,
  ExhaustedIcon, LowEnergyIcon, OkEnergyIcon, EnergizedIcon,
  TroubleSleepIcon, LightSleepIcon, OkSleepIcon, DeepSleepIcon, RefreshedIcon,
  ForgetfulIcon, BrainFogIcon, CalmMindIcon, StressedIcon,
  SweetCravingIcon, SaltyCravingIcon, SpicyCravingIcon, GreasyCravingIcon, ChocolateCravingIcon,
  ClearSkinIcon, AcneIcon, DrySkinIcon, OilySkinIcon,
  OkDigestionIcon, BloatedDigestionIcon, GassyIcon, ConstipatedIcon,
  IllustratedTile,
} from '../components/tiles/AllTiles';

// ── Section config ─────────────────────────────────────────────────────────
const SECTIONS = (l, pc) => [
  {
    key: 'period', label: l === 'ta' ? 'மாதவிடாய்' : 'Period', color: C.menstrual,
    tiles: [
      { key: 'none',    label: l === 'ta' ? 'இல்லை' : 'None',     Icon: NoCrampsIcon     },
      { key: 'light',   label: l === 'ta' ? 'லேசான' : 'Light',    Icon: LightFlowIcon    },
      { key: 'medium',  label: l === 'ta' ? 'நடுத்தர' : 'Medium', Icon: MediumFlowIcon   },
      { key: 'heavy',   label: l === 'ta' ? 'அதிக' : 'Heavy',     Icon: HeavyFlowIcon    },
      { key: 'spotting',label: l === 'ta' ? 'புள்ளி' : 'Spotting', Icon: SpottingIcon    },
    ],
  },
  {
    key: 'cramps', label: l === 'ta' ? 'வலி' : 'Cramps', color: C.menstrual,
    tiles: [
      { key: 'none',     label: l === 'ta' ? 'இல்லை' : 'None',     Icon: NoCrampsIcon      },
      { key: 'mild',     label: l === 'ta' ? 'லேசான' : 'Mild',     Icon: MildCrampsIcon    },
      { key: 'moderate', label: l === 'ta' ? 'நடுத்தர' : 'Moderate', Icon: ModerateCrampsIcon },
      { key: 'severe',   label: l === 'ta' ? 'கடுமையான' : 'Severe', Icon: SevereCrampsIcon  },
    ],
  },
  {
    key: 'mood', label: l === 'ta' ? 'மனநிலை' : 'Mood', color: C.follicular,
    tiles: [
      { key: 'joy',        label: l === 'ta' ? 'மகிழ்ச்சி' : 'Joyful',      Icon: JoyIcon       },
      { key: 'calm',       label: l === 'ta' ? 'அமைதி' : 'Calm',             Icon: CalmIcon      },
      { key: 'hopeful',    label: l === 'ta' ? 'நம்பிக்கை' : 'Hopeful',      Icon: HopefulIcon   },
      { key: 'anxious',    label: l === 'ta' ? 'பதற்றம்' : 'Anxious',        Icon: AnxiousIcon   },
      { key: 'low',        label: l === 'ta' ? 'சோர்வு' : 'Low mood',        Icon: LowMoodIcon   },
      { key: 'irritable',  label: l === 'ta' ? 'எரிச்சல்' : 'Irritable',     Icon: IrritableIcon },
      { key: 'overwhelmed',label: l === 'ta' ? 'அதிகமாகிவிட்டது' : 'Overwhelmed', Icon: OverwhelmedIcon },
    ],
  },
  {
    key: 'energy', label: l === 'ta' ? 'ஆற்றல்' : 'Energy', color: C.ovulation,
    tiles: [
      { key: 'exhausted', label: l === 'ta' ? 'மிகவும் சோர்வு' : 'Exhausted', Icon: ExhaustedIcon  },
      { key: 'low',       label: l === 'ta' ? 'குறைவு' : 'Low',                Icon: LowEnergyIcon },
      { key: 'ok',        label: l === 'ta' ? 'சரி' : 'OK',                    Icon: OkEnergyIcon  },
      { key: 'energized', label: l === 'ta' ? 'சுறுசுறுப்பு' : 'Energized',   Icon: EnergizedIcon },
    ],
  },
  {
    key: 'sleep', label: l === 'ta' ? 'தூக்கம்' : 'Sleep', color: C.luteal,
    tiles: [
      { key: 'trouble',   label: l === 'ta' ? 'தூக்கமில்லை' : 'Troubled',  Icon: TroubleSleepIcon },
      { key: 'light',     label: l === 'ta' ? 'லேசான' : 'Light',            Icon: LightSleepIcon   },
      { key: 'ok',        label: l === 'ta' ? 'சரி' : 'OK',                 Icon: OkSleepIcon      },
      { key: 'deep',      label: l === 'ta' ? 'ஆழமான' : 'Deep',            Icon: DeepSleepIcon    },
      { key: 'refreshed', label: l === 'ta' ? 'புத்துணர்வு' : 'Refreshed', Icon: RefreshedIcon    },
    ],
  },
  {
    key: 'mind', label: l === 'ta' ? 'மனம்' : 'Mind', color: C.follicular,
    tiles: [
      { key: 'forgetful', label: l === 'ta' ? 'மறதி' : 'Forgetful', Icon: ForgetfulIcon },
      { key: 'fog',       label: l === 'ta' ? 'மந்தம்' : 'Brain fog', Icon: BrainFogIcon  },
      { key: 'calm',      label: l === 'ta' ? 'அமைதி' : 'Calm mind', Icon: CalmMindIcon  },
      { key: 'stressed',  label: l === 'ta' ? 'அழுத்தம்' : 'Stressed', Icon: StressedIcon  },
    ],
  },
  {
    key: 'pain', label: l === 'ta' ? 'வலி / அசௌகரியம்' : 'Pain & discomfort', color: C.menstrual,
    multi: true,
    tiles: [
      { key: 'headache',         label: l === 'ta' ? 'தலைவலி' : 'Headache',         Icon: HeadacheIcon         },
      { key: 'backPain',         label: l === 'ta' ? 'முதுகுவலி' : 'Back pain',     Icon: BackPainIcon         },
      { key: 'bloating',         label: l === 'ta' ? 'வீக்கம்' : 'Bloating',        Icon: BloatingIcon         },
      { key: 'breastTenderness', label: l === 'ta' ? 'மார்பக மென்மை' : 'Breast tenderness', Icon: BreastTendernessIcon },
      { key: 'fatigue',          label: l === 'ta' ? 'சோர்வு' : 'Fatigue',          Icon: FatigueIcon          },
    ],
  },
  {
    key: 'cravings', label: l === 'ta' ? 'உணவு ஆசை' : 'Cravings', color: C.ovulation,
    multi: true,
    tiles: [
      { key: 'sweet',     label: l === 'ta' ? 'இனிப்பு' : 'Sweet',   Icon: SweetCravingIcon     },
      { key: 'salty',     label: l === 'ta' ? 'உப்பு' : 'Salty',     Icon: SaltyCravingIcon     },
      { key: 'spicy',     label: l === 'ta' ? 'காரம்' : 'Spicy',     Icon: SpicyCravingIcon     },
      { key: 'greasy',    label: l === 'ta' ? 'எண்ணெய்' : 'Greasy',  Icon: GreasyCravingIcon    },
      { key: 'chocolate', label: l === 'ta' ? 'சாக்லேட்' : 'Chocolate', Icon: ChocolateCravingIcon },
    ],
  },
  {
    key: 'skin', label: l === 'ta' ? 'சருமம்' : 'Skin', color: C.menstrual,
    tiles: [
      { key: 'clear', label: l === 'ta' ? 'தெளிவான' : 'Clear',  Icon: ClearSkinIcon },
      { key: 'acne',  label: l === 'ta' ? 'முகப்பரு' : 'Acne',  Icon: AcneIcon      },
      { key: 'dry',   label: l === 'ta' ? 'வறண்ட' : 'Dry',      Icon: DrySkinIcon   },
      { key: 'oily',  label: l === 'ta' ? 'எண்ணெய்' : 'Oily',  Icon: OilySkinIcon  },
    ],
  },
  {
    key: 'digestion', label: l === 'ta' ? 'செரிமானம்' : 'Digestion', color: C.follicular,
    tiles: [
      { key: 'ok',          label: l === 'ta' ? 'சரி' : 'OK',           Icon: OkDigestionIcon      },
      { key: 'bloated',     label: l === 'ta' ? 'வீக்கம்' : 'Bloated', Icon: BloatedDigestionIcon  },
      { key: 'gassy',       label: l === 'ta' ? 'வாயு' : 'Gassy',      Icon: GassyIcon             },
      { key: 'constipated', label: l === 'ta' ? 'மலசிக்கல்' : 'Constipated', Icon: ConstipatedIcon },
    ],
  },
];

export default function TrackScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { lang, logDay, dailyLogs, cycleData } = useApp();
  const l = lang || 'en';

  const cycleDay = currentCycleDay(cycleData.lastPeriodStart);
  const phase = cycleDay ? getCyclePhase(cycleDay, cycleData.cycleLength) : 'none';
  const pc = phaseColors(phase);

  const todayStr = today();
  const todayLog = dailyLogs[todayStr] || {};

  // Local state — single-select per section (unless multi: true which allows multi-select array)
  const [selections, setSelections] = useState(() => {
    const init = {};
    SECTIONS(l, pc).forEach(s => {
      init[s.key] = s.multi ? (todayLog[s.key] || []) : (todayLog[s.key] || null);
    });
    return init;
  });
  const [note, setNote] = useState(todayLog.note || '');
  const [saved, setSaved] = useState(false);

  const sections = SECTIONS(l, pc);

  function toggle(sectionKey, tileKey, isMulti) {
    setSelections(prev => {
      if (isMulti) {
        const arr = prev[sectionKey] || [];
        return { ...prev, [sectionKey]: arr.includes(tileKey) ? arr.filter(k => k !== tileKey) : [...arr, tileKey] };
      }
      return { ...prev, [sectionKey]: prev[sectionKey] === tileKey ? null : tileKey };
    });
  }

  async function handleSave() {
    await logDay(todayStr, { ...selections, note, savedAt: new Date().toISOString() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerRow}>
          <MiniPetal phase={phase} size={28} />
          <View style={{ marginLeft: 10 }}>
            <Text style={T.h3}>{l === 'ta' ? 'இன்று பதிவு செய்யுங்கள்' : 'Log today'}</Text>
            <Text style={[T.label, { color: pc.accent }]}>
              {cycleDay ? `${l === 'ta' ? 'நாள்' : 'Day'} ${cycleDay}` : (l === 'ta' ? 'சுழற்சி தொடங்கவில்லை' : 'No cycle tracked')}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.periodBtn, { borderColor: C.menstrual }]}
            onPress={() => navigation.navigate('CycleLog')}
          >
            <Text style={{ color: C.menstrual, fontSize: 11, fontFamily: 'Inter', fontWeight: '600' }}>
              {l === 'ta' ? '+ மாதவிடாய்' : '+ Period'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 130 }]}
        showsVerticalScrollIndicator={false}
      >
        {sections.map(section => (
          <View key={section.key} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionDot, { backgroundColor: section.color }]} />
              <Text style={[T.h4, { marginLeft: 8, color: section.color }]}>{section.label}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.tilesRow}>
                {section.tiles.map(tile => {
                  const sel = section.multi
                    ? (selections[section.key] || []).includes(tile.key)
                    : selections[section.key] === tile.key;
                  return (
                    <IllustratedTile
                      key={tile.key}
                      icon={tile.Icon}
                      label={tile.label}
                      selected={sel}
                      color={section.color}
                      onPress={() => toggle(section.key, tile.key, section.multi)}
                    />
                  );
                })}
              </View>
            </ScrollView>
          </View>
        ))}

        {/* Note */}
        <View style={styles.noteSection}>
          <Text style={[T.h4, { marginBottom: 8 }]}>
            {l === 'ta' ? 'உங்கள் குறிப்பு 🔒' : 'Daily note 🔒'}
          </Text>
          <Text style={[T.label, { marginBottom: 10, color: C.textSecondary }]}>
            {l === 'ta' ? 'இது உங்களுக்கும் எனக்கும் மட்டுமே — அக்கா' : 'This stays between us — Akka'}
          </Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={l === 'ta' ? 'எப்படி இருக்கிறீர்கள்...' : 'How are you feeling...'}
            placeholderTextColor={C.textHint}
            multiline
            numberOfLines={4}
            style={styles.noteInput}
          />
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: saved ? C.follicular : pc.accent }]}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveBtnText}>
            {saved
              ? (l === 'ta' ? '✓ சேமிக்கப்பட்டது' : '✓ Saved')
              : (l === 'ta' ? 'இன்று சேமி' : 'Save today')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },

  header: {
    backgroundColor: C.bgMid,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.divider,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodBtn: {
    marginLeft: 'auto',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  scroll: { paddingHorizontal: 16, paddingTop: 16 },

  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionDot: { width: 6, height: 6, borderRadius: 3 },

  tilesRow: { flexDirection: 'row', gap: 10, paddingRight: 16 },

  noteSection: {
    backgroundColor: C.bgMid,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  noteInput: {
    backgroundColor: C.bgElevated,
    borderRadius: 14,
    padding: 14,
    color: C.textPrimary,
    fontFamily: 'Inter',
    fontSize: 15,
    minHeight: 100,
    textAlignVertical: 'top',
  },

  saveBtn: {
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 8,
  },
  saveBtnText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 17,
    color: C.white,
    letterSpacing: 0.3,
  },
});
