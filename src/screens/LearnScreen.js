// ─────────────────────────────────────────────────────────────
// Dear Akka — LearnScreen.js
// Editorial content screen with phase-filtered articles
// ─────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { C, phaseColors } from '../theme/colors';
import { T } from '../theme';
import { MiniPetal } from '../components/NaadhiArc';

// ── Full article data ──────────────────────────────────────────
const ARTICLES = [
  {
    id: '1',
    phase: 'menstrual',
    title: 'Rest Is Not Weakness: Honouring Your Menstrual Phase',
    readTime: '4 min read',
    body: `There is an old Tamil saying — உடல் கோவில், "the body is a temple." And like any sacred space, it deserves quiet reverence, especially during times of deep renewal. The menstrual phase is that time.\n\nDuring the first one to five days of your cycle, your body is releasing the uterine lining it spent weeks preparing. This is an act of extraordinary biological intelligence — not failure, not inconvenience, but renewal. Progesterone and estrogen are both at their lowest, which means energy is naturally lower too. Fighting this with caffeine and overwork is not resilience; it is resistance.\n\nWhat does the menstrual phase actually ask of us? Warmth. Stillness. Nourishment. Traditional South Indian practices have long honoured this — the concept of period rest (often misrepresented in modern discourse as restriction) was originally a gift of time. Time away from communal cooking, from fields, from labour. Time to be.\n\nPractically speaking, this is when your pain sensitivity is higher, your immune response slightly altered, and your need for iron is real. Foods like horsegram (kollu), sesame seeds, dark leafy greens, and warm rice porridges support your body beautifully right now. Cold foods and raw salads can increase cramping for some women — listen to your own body, always.\n\nGentle movement — restorative yoga, slow walks, light stretching — is far more supportive than intense cardio. But even doing nothing is doing something: you are giving your nervous system what it craves.\n\nAnd emotionally? The menstrual phase often brings crystal-clear insight. Journal. Reflect. The things you've been pushing away tend to surface now. Rather than running from them, let them land. Many women find their most honest thinking happens here, in the quiet of their bleeding days.\n\nYou are not broken in your menstrual phase. You are whole — just in a different register.`,
  },
  {
    id: '2',
    phase: 'follicular',
    title: 'Your Follicular Phase: A Season of New Beginnings',
    readTime: '5 min read',
    body: `Spring doesn't announce itself with fireworks. It simply begins — quietly, tenderly — as seeds stir underground. Your follicular phase is your body's spring.\n\nBeginning the day after your period ends and lasting until ovulation (roughly days 6–13 in a 28-day cycle), the follicular phase is characterised by rising estrogen as multiple follicles in your ovaries begin maturing. One of them will eventually release an egg. This invisible, extraordinary process changes everything — your mood, your skin, your energy, your appetite for life.\n\nEstrogen acts on the brain's prefrontal cortex, enhancing clarity, verbal fluency, and emotional openness. This is why many women find that their sharpest thinking, their most creative ideas, and their most comfortable social interactions happen in this phase. You're not imagining it. The biology is real.\n\nFor movement, the follicular phase is the time to try something new — a new class at the gym, a long hike, a dance style you've been curious about. Your body tolerates exercise well, recovers faster, and gains strength more efficiently when estrogen is rising. Push yourself a little here, and you'll thank yourself later.\n\nFor food, lighter and fresher works beautifully now. Sprouts, fermented foods like idli and dosa, salads, and colourful vegetables align with your metabolism's needs. Your digestion is strong. Eat with variety and curiosity.\n\nFor your inner life, start things. Write the first page. Send the email. Make the plan. The follicular phase is when action feels less effortful, when optimism is genuinely sustainable, when the world seems like it might actually cooperate with your dreams.\n\nThis isn't toxic positivity — it's biology meeting intention. Ride it wisely, akka.`,
  },
  {
    id: '3',
    phase: 'ovulation',
    title: 'Ovulation: Your Body at Its Most Radiant',
    readTime: '4 min read',
    body: `For approximately 24–48 hours each cycle, your body achieves a remarkable feat: it releases a mature egg, primed and ready, into the fallopian tube. This moment — ovulation — is the biological peak of your cycle. But its effects ripple far beyond fertility.\n\nOvulation is triggered by a surge in luteinising hormone (LH), which happens roughly in the middle of your cycle (around days 12–16 in a 28-day cycle). In the days surrounding this surge, estrogen peaks too, and together they create what many women describe as their "superpower window."\n\nYour voice becomes slightly more melodic. Your skin often has a natural luminosity. Your verbal confidence surges. Research has found that women tend to feel more sociable, more attractive, and more assertive around ovulation — and interestingly, others notice too. This is your most magnetic phase.\n\nFor communication: have the important conversations now. Whether it's a difficult talk with a partner, a salary negotiation at work, or a vulnerable moment with a friend — the clarity, warmth, and confidence you bring to communication is at its annual peak. Use it.\n\nFor fertility awareness: if you're tracking your cycle for contraception or conception, ovulation is your most fertile window. Cervical mucus typically becomes clear and stretchy — like egg white — around this time. Basal body temperature rises slightly after ovulation. These are your body's honest signals.\n\nA note on Mittelschmerz: some women feel a distinct twinge or cramping on one side of the lower abdomen during ovulation. This is completely normal and simply signals which ovary released the egg this month. Not all women feel it — both experiences are normal.\n\nHonour this peak, akka. Your body is doing something extraordinary.`,
  },
  {
    id: '4',
    phase: 'luteal',
    title: 'Understanding Your Luteal Phase (and PMS With Kindness)',
    readTime: '6 min read',
    body: `The luteal phase often gets a bad reputation. It's the phase we associate with mood swings, cravings, bloating, and tears at unexpected moments. But understanding what's actually happening in your body during this phase transforms it from something to endure into something to respect.\n\nAfter ovulation, the ruptured follicle (now called the corpus luteum) begins producing progesterone. This hormone rises through the second half of your cycle, preparing the uterine lining for a potential pregnancy. If no fertilisation occurs, the corpus luteum breaks down, progesterone falls, and your period begins. Simple. But the journey there is complex.\n\nProgesterone has a calming, sedative effect on the brain — which is wonderful for sleep but can make you feel slightly foggy or slower than usual. Serotonin, your mood-stabilising neurotransmitter, also tends to dip in the luteal phase. This is the biological basis of PMS — it's not weakness, it's neuroscience.\n\nWhat helps? Magnesium is remarkable for luteal symptoms — it reduces cramping, supports sleep, and stabilises mood. You'll find it in dark chocolate (yes, this is real medicine), pumpkin seeds, almonds, bananas, and dark leafy greens. Vitamin B6 supports serotonin production. Reducing salt and refined sugar in the second half of your cycle can significantly reduce bloating and irritability.\n\nFor movement, the luteal phase calls for gentleness. Restorative yoga, pilates, swimming, and long walks are more supportive than high-intensity training, especially in the final days before your period.\n\nEmotionally, this is your most inward phase. The things that bother you during the luteal phase are often things that genuinely need addressing — PMS has a way of stripping politeness from truth. Rather than dismissing these feelings as hormonal, try journalling them. They often contain real wisdom.\n\nYou're not falling apart in your luteal phase. You're integrating. There's a difference, akka.`,
  },
  {
    id: '5',
    phase: null,
    title: 'Cycle Syncing: Aligning Your Life With Your Body',
    readTime: '5 min read',
    body: `The idea of cycle syncing — aligning your diet, exercise, work, and social calendar with the four phases of your cycle — has gained significant attention in recent years. But is it practical? And is it actually supported by research?\n\nThe short answer: yes, with nuance.\n\nThe evidence is clear that hormonal fluctuations across the menstrual cycle do affect strength, cognition, mood, metabolism, and social behaviour. Studies from sports science show that women's strength and power output varies by cycle phase. Research in cognitive psychology confirms that verbal and spatial memory shift across the cycle. These are real, measurable effects — not imagined inconveniences.\n\nCycle syncing, at its most practical, simply means this: pay attention to how you feel in each phase, and stop fighting your body's natural rhythms. During the menstrual and late luteal phases, schedule rest and reflection. During the follicular and ovulation phases, schedule launches, meetings, and collaborations. This isn't magical thinking — it's working with biology rather than against it.\n\nFor South Indian women specifically, some traditional practices around the menstrual cycle were intuitive versions of exactly this. The rhythm of rest after bleeding, the emphasis on warm, nourishing foods, the social pause — these were crude but often correct accommodations to the biological reality of the luteal-to-menstrual transition.\n\nThe key is personalisation. No two cycles are identical. What cycle syncing really means is becoming fluent in your own rhythms — noticing your personal patterns of energy, creativity, appetite, and emotion across the month, then making small adjustments that honour what you notice.\n\nStart small. Track your mood alongside your cycle for three months. Patterns will emerge. Then you'll know your own body better than any generic advice could teach you. That knowledge is power, akka.`,
  },
  {
    id: '6',
    phase: null,
    title: 'Breast Health: What Every Woman Should Know',
    readTime: '4 min read',
    body: `Breast health is something many women think about only during times of worry — but proactive, consistent awareness is one of the most powerful things you can do for yourself.\n\nBreasts change throughout the menstrual cycle. In the luteal phase, rising progesterone often causes the breasts to feel fuller, heavier, or more tender. This is normal. Some women notice lumpiness or general sensitivity that resolves after menstruation. Becoming familiar with how your breasts feel at different points in your cycle makes you much better equipped to notice anything unusual.\n\nBreast self-examination (BSE) is recommended once a month, ideally a few days after your period ends, when breasts are least likely to be tender or swollen. The technique involves both looking and feeling: standing before a mirror to check for visible changes in shape or skin, and then palpating gently in a circular pattern covering the entire breast, armpit included.\n\nWhat to look for: a new lump or thickening, changes in skin texture (dimpling, puckering), changes to the nipple (inversion, discharge that isn't breast milk), redness or warmth, or changes in size or shape that appear suddenly. Most lumps are not cancerous — cysts and fibroadenomas are extremely common — but all new lumps should be evaluated by a doctor.\n\nClinical breast examinations by a doctor are recommended every one to three years in your twenties and thirties, and annually after 40. Mammograms are typically recommended from age 40 onwards, or earlier if there is a family history of breast cancer.\n\nFor South Indian women, awareness matters deeply. Family conversations about breast health remain taboo in many households. Break that silence, akka — with your mother, your sister, your friends. Awareness shared is awareness multiplied.\n\nYour monthly self-check is an act of self-love. Make it a ritual, not a chore.`,
  },
];

const FILTERS = [
  { label: 'All', value: null },
  { label: 'Menstrual', value: 'menstrual' },
  { label: 'Follicular', value: 'follicular' },
  { label: 'Ovulation', value: 'ovulation' },
  { label: 'Luteal', value: 'luteal' },
];

export default function LearnScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);

  const filtered = useMemo(() => {
    let list = ARTICLES;
    if (activeFilter) list = list.filter(a => a.phase === activeFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q)
      );
    }
    return list;
  }, [query, activeFilter]);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Learn</Text>
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={16} color={C.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search articles..."
            placeholderTextColor={C.textHint}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={16} color={C.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Phase filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map((f) => {
          const pc = f.value ? phaseColors(f.value) : null;
          const active = activeFilter === f.value;
          return (
            <TouchableOpacity
              key={f.label}
              style={[
                styles.filterChip,
                active && {
                  backgroundColor: pc ? pc.accent : C.textPrimary,
                  borderColor: pc ? pc.accent : C.textPrimary,
                },
                !active && { borderColor: C.dividerMid },
              ]}
              onPress={() => setActiveFilter(f.value)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterText,
                active && { color: C.white, fontWeight: '600' },
              ]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Articles list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyText}>No articles found</Text>
          </View>
        }
        ListFooterComponent={
          filtered.length > 0 ? (
            <View style={styles.footer}>
              <Text style={styles.footerText}>More articles coming soon, akka 💛</Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            onPress={() => navigation.navigate('ArticleScreen', { article: item })}
          />
        )}
      />
    </View>
  );
}

function ArticleCard({ article, onPress }) {
  const pc = article.phase ? phaseColors(article.phase) : phaseColors('follicular');
  const gradStart = pc.deep;
  const gradEnd = pc.accent;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={[gradStart, gradEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Phase pill */}
        {article.phase && (
          <View style={styles.phasePill}>
            <Text style={styles.phasePillText}>{article.phase.charAt(0).toUpperCase() + article.phase.slice(1)}</Text>
          </View>
        )}

        {/* Corner petal */}
        <View style={styles.cornerPetal}>
          <MiniPetal phase={article.phase || 'follicular'} size={28} />
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{article.title}</Text>
          <View style={styles.cardMeta}>
            <Ionicons name="time-outline" size={13} color="rgba(255,255,255,0.75)" />
            <Text style={styles.cardReadTime}>{article.readTime}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 12,
  },
  headerTitle: {
    ...T.h1,
    marginTop: 8,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgElevated,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: C.dividerMid,
  },
  searchIcon: {
    opacity: 0.7,
  },
  searchInput: {
    flex: 1,
    color: C.textPrimary,
    fontFamily: 'Inter',
    fontSize: 15,
    padding: 0,
  },
  filterRow: {
    flexGrow: 0,
    marginBottom: 8,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 8,
  },
  filterChip: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginRight: 8,
  },
  filterText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '500',
    color: C.textSecondary,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 14,
    paddingTop: 4,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 180,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  cardGradient: {
    flex: 1,
    padding: 18,
    justifyContent: 'space-between',
  },
  phasePill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  phasePillText: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
    color: C.white,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  cornerPetal: {
    position: 'absolute',
    top: 14,
    right: 14,
    opacity: 0.85,
  },
  cardContent: {
    gap: 6,
  },
  cardTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 17,
    color: C.white,
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardReadTime: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    ...T.bodySmall,
    color: C.textHint,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: C.textSecondary,
    fontStyle: 'italic',
  },
});
