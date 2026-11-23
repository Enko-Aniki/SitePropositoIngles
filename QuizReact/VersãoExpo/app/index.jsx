import { useRef, useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const benefits = [
  ['01', 'Turmas reduzidas', 'Mais atenção individual e espaço para praticar.'],
  ['02', 'Horários acessíveis', 'Aulas à noite e aos sábados.'],
  ['03', 'Material incluso', 'Apostilas e materiais sem custo para os alunos.'],
  ['04', 'Ambiente acolhedor', 'Um lugar respeitoso para aprender em qualquer nível.'],
]

export default function HomeScreen() {
  const scrollRef = useRef(null)
  const [courseOffset, setCourseOffset] = useState(0)

  const showCourse = () => {
    scrollRef.current?.scrollTo({ y: courseOffset, animated: true })
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brand}>
            <View style={styles.brandMark}>
              <Text style={styles.brandInitial}>P</Text>
            </View>
            <View>
              <Text style={styles.brandName}>PROPÓSITO</Text>
              <Text style={styles.brandSubname}>DO INGLÊS</Text>
            </View>
          </View>
          <Text style={styles.freeLabel}>100% GRATUITO</Text>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroTopline}>
            <View style={styles.heroDot} />
            <Text style={styles.heroEyebrow}>PROJETO SOCIAL · SÃO PAULO</Text>
          </View>
          <Text style={styles.heroTitle}>Inglês para abrir novos caminhos.</Text>
          <Text style={styles.heroCopy}>
            Aprendizado acessível, prática de verdade e uma comunidade que cresce junto.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={showCourse}
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
          <View style={styles.stat}>
            <Text style={styles.statNumber}>+300</Text>
            <Text style={styles.statLabel}>alunos atendidos</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>gratuito</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNumber}>2 anos</Text>
            <Text style={styles.statLabel}>de projeto</Text>
          </View>
        </View>

        <View
          onLayout={(event) => setCourseOffset(event.nativeEvent.layout.y)}
          style={styles.courseSection}
        >
          <Text style={styles.eyebrow}>APRENDER MUDA PERSPECTIVAS</Text>
          <Text style={styles.sectionTitle}>Um curso feito para a comunidade.</Text>
          <Text style={styles.bodyCopy}>
            Professores voluntários e uma comunidade comprometida tornam o inglês mais acessível, com acolhimento e apoio em cada etapa.
          </Text>
        </View>

        <View style={styles.verseSection}>
          <View style={styles.verseHeading}>
            <Text style={styles.eyebrowLight}>UMA MENSAGEM EM DOIS IDIOMAS</Text>
            <Text style={styles.verseReference}>JOÃO 3:16 · NVI</Text>
          </View>
          <Text style={styles.verseLanguage}>PORTUGUÊS</Text>
          <Text style={styles.verseText}>
            “Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo aquele que nele crer não pereça, mas tenha a vida eterna.”
          </Text>
          <View style={styles.verseRule} />
          <Text style={styles.verseLanguage}>ENGLISH</Text>
          <Text style={styles.verseText}>
            “For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.”
          </Text>
        </View>

        <View style={styles.offerSection}>
          <Text style={styles.eyebrow}>O QUE OFERECEMOS</Text>
          <Text style={styles.sectionTitle}>Aprender com apoio em cada etapa.</Text>
          {benefits.map(([number, title, description]) => (
            <View key={number} style={styles.benefitRow}>
              <Text style={styles.benefitNumber}>{number}</Text>
              <View style={styles.benefitText}>
                <Text style={styles.benefitTitle}>{title}</Text>
                <Text style={styles.benefitDescription}>{description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Propósito do Inglês</Text>
          <Text style={styles.footerCopy}>Um projeto comunitário da Igreja Batista.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F0',
  },
  content: {
    paddingBottom: 28,
  },
  header: {
    minHeight: 76,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1C665D',
    borderRadius: 21,
  },
  brandInitial: {
    color: '#1C665D',
    fontFamily: 'serif',
    fontSize: 24,
  },
  brandName: {
    color: '#202923',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  brandSubname: {
    marginTop: 2,
    color: '#65716A',
    fontSize: 10,
    letterSpacing: 2.2,
  },
  freeLabel: {
    color: '#1C665D',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  hero: {
    marginHorizontal: 14,
    marginTop: 8,
    paddingHorizontal: 25,
    paddingTop: 32,
    paddingBottom: 20,
    overflow: 'hidden',
    borderTopLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: '#175D54',
  },
  heroTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8B64D',
  },
  heroEyebrow: {
    color: '#E3E9DF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heroTitle: {
    maxWidth: 340,
    marginTop: 28,
    color: '#FFFFFF',
    fontFamily: 'serif',
    fontSize: 42,
    lineHeight: 47,
  },
  heroCopy: {
    maxWidth: 310,
    marginTop: 14,
    color: '#DCE9E2',
    fontSize: 16,
    lineHeight: 24,
  },
  heroButton: {
    minHeight: 50,
    marginTop: 25,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 18,
    borderRadius: 6,
    backgroundColor: '#E9B84F',
  },
  buttonPressed: {
    opacity: 0.82,
  },
  heroButtonText: {
    color: '#20352F',
    fontSize: 14,
    fontWeight: '800',
  },
  heroButtonArrow: {
    color: '#20352F',
    fontSize: 20,
  },
  heroFooter: {
    marginTop: 30,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  heroFooterText: {
    color: '#C6D9D0',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  stats: {
    marginHorizontal: 22,
    paddingVertical: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#D9DFD6',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#B74437',
    fontFamily: 'serif',
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 4,
    color: '#5D6962',
    fontSize: 10,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 34,
    backgroundColor: '#D9DFD6',
  },
  courseSection: {
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 32,
  },
  eyebrow: {
    color: '#B74437',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  sectionTitle: {
    marginTop: 10,
    color: '#202923',
    fontFamily: 'serif',
    fontSize: 30,
    lineHeight: 36,
  },
  bodyCopy: {
    marginTop: 12,
    color: '#59665E',
    fontSize: 15,
    lineHeight: 23,
  },
  verseSection: {
    marginHorizontal: 14,
    padding: 22,
    borderTopRightRadius: 26,
    borderBottomLeftRadius: 26,
    backgroundColor: '#253D53',
  },
  verseHeading: {
    marginBottom: 23,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  eyebrowLight: {
    color: '#F0C568',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  verseReference: {
    color: '#D5DFE5',
    fontSize: 9,
    letterSpacing: 0.8,
  },
  verseLanguage: {
    color: '#F0C568',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  verseText: {
    marginTop: 8,
    color: '#FFFFFF',
    fontFamily: 'serif',
    fontSize: 17,
    lineHeight: 25,
  },
  verseRule: {
    height: 1,
    marginVertical: 19,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  offerSection: {
    paddingHorizontal: 24,
    paddingTop: 36,
  },
  benefitRow: {
    minHeight: 88,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D9DFD6',
  },
  benefitNumber: {
    paddingTop: 2,
    color: '#B74437',
    fontFamily: 'serif',
    fontSize: 16,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    color: '#202923',
    fontSize: 16,
    fontWeight: '700',
  },
  benefitDescription: {
    marginTop: 5,
    color: '#647068',
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    marginTop: 26,
    paddingHorizontal: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#D9DFD6',
  },
  footerTitle: {
    color: '#202923',
    fontFamily: 'serif',
    fontSize: 17,
  },
  footerCopy: {
    marginTop: 5,
    color: '#647068',
    fontSize: 12,
  },
})