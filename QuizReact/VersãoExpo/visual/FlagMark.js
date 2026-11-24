import { StyleSheet, Text, View } from 'react-native'
import { theme } from './theme'

export function FlagMark({ compact = false }) {
  return (
    <View style={[styles.mark, compact && styles.compact]}>
      <View style={styles.canton}>
        <Text style={[styles.stars, compact && styles.starsCompact]}>✦  ✦</Text>
        <Text style={[styles.stars, compact && styles.starsCompact]}>✦  ✦</Text>
      </View>
      <View style={styles.stripes}>
        {[0, 1, 2, 3].map((item) => (
          <View
            key={item}
            style={[styles.stripe, item % 2 === 0 ? styles.stripeRed : styles.stripeWhite]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mark: { width: 58, height: 38, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(30,42,54,0.12)', borderRadius: 4 },
  compact: { width: 42, height: 28 },
  canton: { position: 'absolute', left: 0, top: 0, zIndex: 1, width: 24, height: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.navy },
  stars: { color: theme.white, fontSize: 7, lineHeight: 8 },
  starsCompact: { fontSize: 5, lineHeight: 6 },
  stripes: { flex: 1 },
  stripe: { flex: 1 },
  stripeRed: { backgroundColor: theme.red },
  stripeWhite: { backgroundColor: theme.white },
})
