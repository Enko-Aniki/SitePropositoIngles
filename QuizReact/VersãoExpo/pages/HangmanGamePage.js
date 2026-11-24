import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { gameDataService } from '../services/gameData'
import { theme } from '../visual/theme'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const MAX_WRONG = 6

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

export function HangmanGamePage({ category, onBack }) {
  const [words, setWords] = useState([])
  const [index, setIndex] = useState(0)
  const [guessed, setGuessed] = useState([])
  const [wrong, setWrong] = useState([])
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true); setError('')
    gameDataService.getHangmanWords()
      .then((data) => {
        const found = data.find((item) => item.category === category)
        setWords(shuffle(found?.words || []).slice(0, 5)); setLoading(false)
      })
      .catch((cause) => { setError(cause.message); setLoading(false) })
  }

  useEffect(load, [category])

  if (loading) return <View style={styles.center}><ActivityIndicator color={theme.red} /><Text style={styles.status}>Carregando palavras...</Text></View>
  if (error) return <View style={styles.center}><Text style={styles.errorTitle}>Não foi possível iniciar</Text><Text style={styles.errorCopy}>{error}</Text><Pressable onPress={load} style={styles.secondaryButton}><Text style={styles.buttonText}>Tentar novamente</Text></Pressable><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Voltar</Text></Pressable></View>
  if (!words.length) return <View style={styles.center}><Text style={styles.errorTitle}>Nenhuma palavra encontrada</Text><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Voltar</Text></Pressable></View>

  if (index >= words.length) {
    return <View style={styles.center}><Text style={styles.eyebrow}>RESULTADO</Text><Text style={styles.finishedTitle}>Forca concluída</Text><Text style={styles.score}>{score} pontos</Text><Pressable onPress={() => { setIndex(0); setGuessed([]); setWrong([]); setScore(0); load() }} style={styles.primaryButton}><Text style={styles.buttonText}>Jogar novamente</Text></Pressable><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Escolher outro jogo</Text></Pressable></View>
  }

  const current = words[index]
  const word = current.word.toUpperCase()
  const uniqueLetters = [...new Set(word.split(''))]
  const won = uniqueLetters.every((letter) => guessed.includes(letter))
  const lost = wrong.length >= MAX_WRONG
  const ended = won || lost

  const guess = (letter) => {
    if (ended || guessed.includes(letter) || wrong.includes(letter)) return
    if (word.includes(letter)) setGuessed((value) => [...value, letter])
    else setWrong((value) => [...value, letter])
  }

  const next = () => {
    if (won) setScore((value) => value + 100)
    setGuessed([]); setWrong([]); setIndex((value) => value + 1)
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.topRow}><Pressable onPress={onBack}><Text style={styles.back}>‹ Voltar</Text></Pressable><Text style={styles.progress}>{index + 1} de {words.length}</Text></View>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>Descubra a palavra</Text>
      <Text style={styles.hint}>{current.hint}</Text>

      <View style={styles.wordRow}>{word.split('').map((letter, position) => <View key={`${letter}-${position}`} style={styles.letterBox}><Text style={styles.letterText}>{guessed.includes(letter) || lost ? letter : ''}</Text></View>)}</View>

      <View style={styles.statusRow}><Text style={styles.lives}>Erros: {wrong.length}/{MAX_WRONG}</Text><Text style={styles.wrongLetters}>{wrong.join(' · ')}</Text></View>

      <View style={styles.keyboard}>{alphabet.map((letter) => {
        const used = guessed.includes(letter) || wrong.includes(letter)
        return <Pressable key={letter} disabled={used || ended} onPress={() => guess(letter)} style={[styles.key, used && styles.keyUsed]}><Text style={[styles.keyText, used && styles.keyTextUsed]}>{letter}</Text></Pressable>
      })}</View>

      {ended && <View style={styles.feedback}><Text style={styles.feedbackTitle}>{won ? 'Você acertou!' : 'Fim de tentativas'}</Text><Text style={styles.tip}>Palavra: {word}</Text><Pressable onPress={next} style={styles.primaryButton}><Text style={styles.buttonText}>{index + 1 === words.length ? 'Ver resultado' : 'Próxima palavra'}</Text></Pressable></View>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 40 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }, status: { marginTop: 12, color: theme.muted }, eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, back: { color: theme.navy, fontSize: 16, fontWeight: '800' }, progress: { color: theme.muted, fontSize: 13, fontWeight: '700' }, category: { marginTop: 24, color: theme.red, fontSize: 11, fontWeight: '900', letterSpacing: 1 }, title: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 28 }, hint: { marginTop: 10, color: theme.muted, fontSize: 15, lineHeight: 22 }, wordRow: { marginTop: 24, minHeight: 48, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 }, letterBox: { width: 36, height: 42, alignItems: 'center', justifyContent: 'flex-end', borderBottomWidth: 2, borderBottomColor: theme.navy }, letterText: { color: theme.ink, fontSize: 20, fontWeight: '900' }, statusRow: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }, lives: { color: theme.red, fontWeight: '900' }, wrongLetters: { color: theme.muted, fontWeight: '700' }, keyboard: { marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 7 }, key: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#CAD7E9', borderRadius: 7, backgroundColor: '#F5F8FF' }, keyUsed: { opacity: 0.45, backgroundColor: theme.line }, keyText: { color: theme.navy, fontSize: 14, fontWeight: '900' }, keyTextUsed: { color: theme.muted }, feedback: { marginTop: 18, padding: 14, borderRadius: 8, backgroundColor: '#EEF3F8' }, feedbackTitle: { color: theme.navy, fontSize: 16, fontWeight: '900' }, tip: { marginTop: 5, color: theme.muted }, primaryButton: { minHeight: 48, marginTop: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: theme.navy }, secondaryButton: { minHeight: 48, marginTop: 16, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: theme.red }, buttonText: { color: theme.white, fontWeight: '900' }, linkButton: { marginTop: 16, padding: 10 }, linkText: { color: theme.navy, fontWeight: '900' }, errorTitle: { color: theme.ink, fontFamily: 'serif', fontSize: 24, textAlign: 'center' }, errorCopy: { marginTop: 8, color: theme.muted, textAlign: 'center' }, finishedTitle: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 30 }, score: { marginTop: 10, color: theme.red, fontFamily: 'serif', fontSize: 36, fontWeight: '900' },
})