import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { theme } from '../visual/theme'

const levels = ['English A1', 'English B1', 'English C1']

const gameModes = [
  { id: 'quiz', icon: 'ABC', title: 'Múltipla Escolha', description: 'Escolha a alternativa correta', accent: theme.red },
  { id: 'drag', icon: '≡', title: 'Monte a Frase', description: 'Selecione as palavras na ordem correta', accent: theme.navy },
  { id: 'hangman', icon: 'A–Z', title: 'Forca', description: 'Descubra a palavra letra por letra', accent: '#B78732' },
]

export function GameSelectionPage({ onStartGame }) {
  const [selection, setSelection] = useState(null)

  const startSelectedGame = () => {
    if (selection && onStartGame) {
      onStartGame(selection.modeId, selection.level)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.heading}>
        <Text style={styles.eyebrow}>QUIZ DE INGLÊS</Text>
        <Text style={styles.title}>Escolha seu nível de inglês</Text>
        <Text style={styles.copy}>Escolha o nível e o modo de jogo</Text>
      </View>

      <View style={styles.modeContainer}>
        {gameModes.map((mode) => (
          <View key={mode.id} style={styles.modeBox}>
            <View style={[styles.icon, { backgroundColor: mode.accent }]}>
              <Text style={styles.iconText}>{mode.icon}</Text>
            </View>
            <Text style={styles.modeTitle}>{mode.title}</Text>
            <Text style={styles.modeDescription}>{mode.description}</Text>

            <View style={styles.levelContainer}>
              {levels.map((level) => {
                const isSelected = selection?.mode === mode.title && selection?.level === level
                return (
                  <Pressable
                    key={level}
                    accessibilityRole="button"
                    accessibilityLabel={`${mode.title} - ${level}`}
                    onPress={() => {
                      setSelection({ modeId: mode.id, mode: mode.title, level })
                      if (onStartGame) onStartGame(mode.id, level)
                    }}
                    style={({ pressed }) => [styles.levelButton, isSelected && styles.levelButtonSelected, pressed && styles.buttonPressed]}
                  >
                    <Text style={[styles.levelText, isSelected && styles.levelTextSelected]}>{level}</Text>
                  </Pressable>
                )
              })}
            </View>
          </View>
        ))}
      </View>

      {selection && (
        <Pressable onPress={startSelectedGame} style={styles.startButton}>
          <Text style={styles.startButtonText}>Começar {selection.mode}</Text>
          <Text style={styles.startButtonArrow}>›</Text>
        </Pressable>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 14, paddingBottom: 30 },
  heading: { alignItems: 'center', paddingVertical: 18, paddingHorizontal: 10 },
  eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  title: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 30, lineHeight: 36, textAlign: 'center' },
  copy: { marginTop: 8, color: theme.navy, fontSize: 14, textAlign: 'center' },
  modeContainer: { gap: 12 },
  modeBox: { alignItems: 'center', padding: 18, borderWidth: 2, borderColor: '#D0DCF2', borderRadius: 12, backgroundColor: '#F5F8FF' },
  icon: { width: 58, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 29 },
  iconText: { color: theme.white, fontFamily: 'serif', fontSize: 16, fontWeight: '900' },
  modeTitle: { marginTop: 12, color: theme.navy, fontSize: 17, fontWeight: '900', textAlign: 'center' },
  modeDescription: { marginTop: 6, marginBottom: 10, color: theme.muted, fontSize: 13, lineHeight: 18, textAlign: 'center' },
  levelContainer: { width: '100%', gap: 8 },
  levelButton: { minHeight: 46, width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CAD7E9', borderRadius: 7, backgroundColor: theme.white },
  levelButtonSelected: { borderColor: theme.navy, borderWidth: 2, backgroundColor: '#EAF0F8' },
  buttonPressed: { opacity: 0.75 },
  levelText: { color: theme.navy, fontSize: 14, fontWeight: '900' },
  levelTextSelected: { color: theme.red },
  startButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: theme.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: { color: theme.white, fontSize: 16, fontWeight: '900' },
  startButtonArrow: { marginLeft: 8, color: theme.white, fontSize: 16 },
})