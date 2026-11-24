import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from './theme'
import { FlagMark } from './FlagMark'

const navItems = [
  ['home', 'Início'],
  ['jogos', 'Jogos'],
  ['conteudo', 'Conteúdo'],
  ['sobre', 'Sobre'],
]

export function AppHeader({ activePage, onNavigate }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.brandRow}>
        <View style={styles.brand}>
          <FlagMark compact />
          <View>
            <Text style={styles.brandName}>PROPÓSITO DO INGLÊS</Text>
            <Text style={styles.brandSubname}>CURSO GRATUITO · COMUNIDADE</Text>
          </View>
        </View>
      </View>
      <View style={styles.nav}>
        {navItems.map(([key, label]) => (
          <Pressable
            key={key}
            accessibilityRole="button"
            onPress={() => onNavigate(key)}
            style={[styles.navButton, activePage === key && styles.navButtonActive]}
          >
            <Text style={[styles.navText, activePage === key && styles.navTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: theme.white, borderBottomWidth: 1, borderBottomColor: theme.line },
  brandRow: { minHeight: 64, paddingHorizontal: 18, justifyContent: 'center' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandName: { color: theme.navy, fontSize: 12, fontWeight: '900', letterSpacing: 0.8 },
  brandSubname: { marginTop: 3, color: theme.muted, fontSize: 8, fontWeight: '700', letterSpacing: 1.2 },
  nav: { height: 44, flexDirection: 'row', alignItems: 'stretch', borderTopWidth: 1, borderTopColor: '#EFECE4' },
  navButton: { flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  navButtonActive: { borderBottomColor: theme.red },
  navText: { color: theme.muted, fontSize: 12, fontWeight: '800' },
  navTextActive: { color: theme.navy },
})
