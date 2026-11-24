import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { theme } from '../visual/theme'

export function SobrePage() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>QUEM SOMOS</Text>
      <Text style={styles.title}>Sobre o Propósito do Inglês</Text>
      <View style={styles.card}>
        <Text style={styles.body}>Propósito do Inglês é uma organização sem fins lucrativos dedicada a tornar o inglês acessível para pessoas de baixa renda e comunidades vulneráveis.</Text>
        <Text style={styles.body}>Acreditamos que aprender uma nova língua não deve ser exclusivo de quem tem recursos. Nosso trabalho busca ampliar futuras oportunidades profissionais e pessoais.</Text>
        <Text style={styles.body}>Estamos na Rua Arlindo Colaço, 85, São Miguel Paulista, com aulas presenciais e encontros online aos sábados com falantes nativos de inglês.</Text>
      </View>
      <View style={styles.values}>
        {[['MISSÃO', 'Tornar o inglês acessível e prático.'], ['VISÃO', 'Ajudar alunos a se comunicarem com confiança.'], ['VALORES', 'Clareza, apoio e resultados reais.']].map(([label, text]) => (
          <View key={label} style={styles.valueRow}><Text style={styles.valueLabel}>{label}</Text><Text style={styles.valueText}>{text}</Text></View>
        ))}
      </View>
      <Pressable onPress={() => Linking.openURL('https://www.instagram.com/propositodoingles/')} style={styles.linkButton}>
        <Text style={styles.linkText}>Abrir @propositodoingles</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 40 },
  eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  title: { marginTop: 8, marginBottom: 18, color: theme.ink, fontFamily: 'serif', fontSize: 32, lineHeight: 38 },
  card: { padding: 20, borderLeftWidth: 4, borderLeftColor: theme.red, backgroundColor: theme.white },
  body: { marginBottom: 14, color: theme.muted, fontSize: 15, lineHeight: 23 },
  values: { marginTop: 22 },
  valueRow: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.line },
  valueLabel: { color: theme.navy, fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
  valueText: { marginTop: 5, color: theme.ink, fontSize: 16, fontWeight: '700' },
  linkButton: { marginTop: 24, minHeight: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 6, backgroundColor: theme.navy },
  linkText: { color: theme.white, fontSize: 13, fontWeight: '900' },
})
