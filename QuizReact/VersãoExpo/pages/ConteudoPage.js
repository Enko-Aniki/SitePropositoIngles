import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { theme } from '../visual/theme'

export function ConteudoPage({ onNavigate }) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>CONTEÚDO</Text>
      <Text style={styles.title}>Escolha por onde estudar</Text>
      <Text style={styles.copy}>Material de apoio organizado para praticar inglês no seu ritmo.</Text>
      <Pressable onPress={() => onNavigate('midias')} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
        <View style={[styles.symbol, { backgroundColor: theme.navy }]}><Text style={styles.symbolText}>V</Text></View>
        <View style={styles.itemText}><Text style={styles.itemTitle}>Vídeos e músicas</Text><Text style={styles.itemCopy}>Conteúdo audiovisual para ouvir, acompanhar e praticar.</Text></View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
      <Pressable onPress={() => onNavigate('livros')} style={({ pressed }) => [styles.item, pressed && styles.pressed]}>
        <View style={[styles.symbol, { backgroundColor: theme.red }]}><Text style={styles.symbolText}>L</Text></View>
        <View style={styles.itemText}><Text style={styles.itemTitle}>Livros</Text><Text style={styles.itemCopy}>Textos e materiais para ampliar vocabulário e leitura.</Text></View>
        <Text style={styles.arrow}>›</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 24, paddingBottom: 40 },
  eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  title: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 32, lineHeight: 38 },
  copy: { marginTop: 10, marginBottom: 20, color: theme.muted, fontSize: 15, lineHeight: 22 },
  item: { minHeight: 94, marginBottom: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: theme.line, borderRadius: 8, backgroundColor: theme.white },
  pressed: { opacity: 0.82 },
  symbol: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 24 },
  symbolText: { color: theme.white, fontFamily: 'serif', fontSize: 20, fontWeight: '900' },
  itemText: { flex: 1 },
  itemTitle: { color: theme.ink, fontSize: 16, fontWeight: '900' },
  itemCopy: { marginTop: 5, color: theme.muted, fontSize: 13, lineHeight: 18 },
  arrow: { color: theme.red, fontSize: 28, lineHeight: 30 },
})
