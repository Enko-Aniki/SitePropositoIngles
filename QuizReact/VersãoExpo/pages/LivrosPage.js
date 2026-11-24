import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { theme } from '../visual/theme'

export function LivrosPage() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>LEITURA</Text>
      <Text style={styles.title}>Livros</Text>
      <View style={styles.empty}>
        <View style={styles.bookMark}><Text style={styles.bookMarkText}>A+</Text></View>
        <Text style={styles.emptyTitle}>Conteúdo em desenvolvimento</Text>
        <Text style={styles.emptyCopy}>Esta área receberá livros e materiais de leitura em inglês.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 40 },
  eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  title: { marginTop: 8, marginBottom: 18, color: theme.ink, fontFamily: 'serif', fontSize: 32, lineHeight: 38 },
  empty: { minHeight: 180, alignItems: 'center', justifyContent: 'center', padding: 20, borderWidth: 1, borderColor: theme.line, borderRadius: 8, backgroundColor: theme.white },
  bookMark: { width: 62, height: 62, marginBottom: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 31, backgroundColor: theme.navy },
  bookMarkText: { color: theme.white, fontFamily: 'serif', fontSize: 18, fontWeight: '900' },
  emptyTitle: { color: theme.ink, fontSize: 17, fontWeight: '900', textAlign: 'center' },
  emptyCopy: { marginTop: 8, color: theme.muted, fontSize: 14, lineHeight: 21, textAlign: 'center' },
})
