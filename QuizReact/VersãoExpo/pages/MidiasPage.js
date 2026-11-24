import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { theme } from '../visual/theme'

export function MidiasPage() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>MÍDIAS</Text>
      <Text style={styles.title}>Vídeos e músicas</Text>
      <View style={styles.empty}>
        <View style={styles.flagBar}><View style={styles.flagRed} /><View style={styles.flagBlue} /><View style={styles.flagWhite} /></View>
        <Text style={styles.emptyTitle}>Conteúdo em desenvolvimento</Text>
        <Text style={styles.emptyCopy}>Esta área receberá vídeos, músicas e links de estudo sem alterar a navegação atual.</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 40 },
  eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  title: { marginTop: 8, marginBottom: 18, color: theme.ink, fontFamily: 'serif', fontSize: 32, lineHeight: 38 },
  empty: { padding: 20, borderWidth: 1, borderColor: theme.line, borderRadius: 8, backgroundColor: theme.white },
  flagBar: { height: 8, marginBottom: 18, flexDirection: 'row' },
  flagRed: { flex: 1, backgroundColor: theme.red },
  flagBlue: { flex: 1, backgroundColor: theme.navy },
  flagWhite: { flex: 1, backgroundColor: theme.cream },
  emptyTitle: { color: theme.ink, fontSize: 17, fontWeight: '900' },
  emptyCopy: { marginTop: 8, color: theme.muted, fontSize: 14, lineHeight: 21 },
})
