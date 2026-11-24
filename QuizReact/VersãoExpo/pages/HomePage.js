import { useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { theme } from '../visual/theme'
import { FlagMark } from '../visual/FlagMark'

const benefits = [
  ['01', 'Turmas reduzidas', 'Mais atenção individual e espaço para praticar.'],
  ['02', 'Horários acessíveis', 'Aulas à noite e aos sábados.'],
  ['03', 'Material incluso', 'Apostilas e materiais sem custo para os alunos.'],
  ['04', 'Ambiente acolhedor', 'Um lugar respeitoso para aprender em qualquer nível.'],
]

export function HomePage() {
  const scrollRef = useRef(null)
  const [courseOffset, setCourseOffset] = useState(0)
  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroTopline}>
          <FlagMark />
          <Text style={styles.heroEyebrow}>PROJETO SOCIAL · SÃO PAULO</Text>
        </View>
        <Text style={styles.heroTitle}>Inglês para abrir novos caminhos.</Text>
        <Text style={styles.heroCopy}>Aprendizado acessível, prática de verdade e uma comunidade que cresce junto.</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => scrollRef.current?.scrollTo({ y: courseOffset, animated: true })}
          style={({ pressed }) => [styles.heroButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.heroButtonText}>Conheça o projeto</Text>
          <Text style={styles.heroButtonArrow}>↓</Text>
        </Pressable>
        <View style={styles.heroFooter}>
          <Text style={styles.heroFooterText}>DESDE 2020</Text>
          <Text style={styles.heroFooterText}>SÃO MIGUEL PAULISTA</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}><Text style={styles.statNumber}>+300</Text><Text style={styles.statLabel}>alunos atendidos</Text></View>
        <View style={styles.statDivider} />
        <View style={styles.stat}><Text style={styles.statNumber}>100%</Text><Text style={styles.statLabel}>gratuito</Text></View>
        <View style={styles.statDivider} />
        <View style={styles.stat}><Text style={styles.statNumber}>2 anos</Text><Text style={styles.statLabel}>de projeto</Text></View>
      </View>

      <View onLayout={(event) => setCourseOffset(event.nativeEvent.layout.y)} style={styles.courseSection}>
        <Text style={styles.eyebrow}>APRENDER MUDA PERSPECTIVAS</Text>
        <Text style={styles.sectionTitle}>Um curso feito para a comunidade.</Text>
        <Text style={styles.bodyCopy}>Professores voluntários e uma comunidade comprometida tornam o inglês mais acessível, com acolhimento e apoio em cada etapa.</Text>
      </View>

      <View style={styles.verseSection}>
        <View style={styles.verseHeading}><Text style={styles.eyebrowLight}>UMA MENSAGEM EM DOIS IDIOMAS</Text><Text style={styles.verseReference}>JOÃO 3:16 · NVI</Text></View>
        <Text style={styles.verseLanguage}>PORTUGUÊS</Text>
        <Text style={styles.verseText}>“Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo aquele que nele crer não pereça, mas tenha a vida eterna.”</Text>
        <View style={styles.verseRule} />
        <Text style={styles.verseLanguage}>ENGLISH</Text>
        <Text style={styles.verseText}>“For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.”</Text>
      </View>

      <View style={styles.offerSection}>
        <Text style={styles.eyebrow}>O QUE OFERECEMOS</Text>
        <Text style={styles.sectionTitle}>Aprender com apoio em cada etapa.</Text>
        {benefits.map(([number, title, description]) => (
          <View key={number} style={styles.benefitRow}>
            <Text style={styles.benefitNumber}>{number}</Text>
            <View style={styles.benefitText}><Text style={styles.benefitTitle}>{title}</Text><Text style={styles.benefitDescription}>{description}</Text></View>
          </View>
        ))}
      </View>
      <View style={styles.footer}><Text style={styles.footerTitle}>Propósito do Inglês</Text><Text style={styles.footerCopy}>Um projeto comunitário da Igreja Batista.</Text></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 14, paddingBottom: 28 },
  hero: { padding: 24, overflow: 'hidden', borderTopLeftRadius: 24, borderBottomRightRadius: 24, backgroundColor: theme.navy },
  heroTopline: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  heroEyebrow: { flexShrink: 1, color: '#E8EDF3', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { marginTop: 24, color: theme.white, fontFamily: 'serif', fontSize: 40, lineHeight: 46 },
  heroCopy: { marginTop: 12, color: '#DDE7EF', fontSize: 16, lineHeight: 24 },
  heroButton: { minHeight: 50, marginTop: 22, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 16, borderRadius: 6, backgroundColor: theme.gold },
  buttonPressed: { opacity: 0.82 },
  heroButtonText: { color: theme.ink, fontSize: 14, fontWeight: '900' },
  heroButtonArrow: { color: theme.ink, fontSize: 20 },
  heroFooter: { marginTop: 26, paddingTop: 14, flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.18)' },
  heroFooterText: { color: '#C9D7E5', fontSize: 9, fontWeight: '800', letterSpacing: 0.7 },
  stats: { marginHorizontal: 8, paddingVertical: 20, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.line },
  stat: { flex: 1, alignItems: 'center' },
  statNumber: { color: theme.red, fontFamily: 'serif', fontSize: 20, fontWeight: '800' },
  statLabel: { marginTop: 4, color: theme.muted, fontSize: 10, textAlign: 'center' },
  statDivider: { width: 1, height: 34, backgroundColor: theme.line },
  courseSection: { paddingHorizontal: 10, paddingTop: 32, paddingBottom: 28 },
  eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  sectionTitle: { marginTop: 9, color: theme.ink, fontFamily: 'serif', fontSize: 30, lineHeight: 36 },
  bodyCopy: { marginTop: 12, color: theme.muted, fontSize: 15, lineHeight: 23 },
  verseSection: { padding: 22, borderTopRightRadius: 24, borderBottomLeftRadius: 24, backgroundColor: theme.navy },
  verseHeading: { marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 },
  eyebrowLight: { color: theme.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  verseReference: { color: '#D5DFE5', fontSize: 9, letterSpacing: 0.8 },
  verseLanguage: { color: theme.gold, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  verseText: { marginTop: 8, color: theme.white, fontFamily: 'serif', fontSize: 17, lineHeight: 25 },
  verseRule: { height: 1, marginVertical: 18, backgroundColor: 'rgba(255,255,255,0.2)' },
  offerSection: { paddingHorizontal: 10, paddingTop: 34 },
  benefitRow: { minHeight: 88, paddingVertical: 16, flexDirection: 'row', gap: 14, borderBottomWidth: 1, borderBottomColor: theme.line },
  benefitNumber: { color: theme.red, fontFamily: 'serif', fontSize: 16 },
  benefitText: { flex: 1 },
  benefitTitle: { color: theme.ink, fontSize: 16, fontWeight: '800' },
  benefitDescription: { marginTop: 5, color: theme.muted, fontSize: 13, lineHeight: 19 },
  footer: { marginTop: 20, paddingHorizontal: 10, paddingTop: 18, borderTopWidth: 1, borderTopColor: theme.line },
  footerTitle: { color: theme.ink, fontFamily: 'serif', fontSize: 17 },
  footerCopy: { marginTop: 5, color: theme.muted, fontSize: 12 },
})
