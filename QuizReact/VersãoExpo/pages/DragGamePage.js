import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { gameDataService } from '../services/gameData'
import { theme } from '../visual/theme'

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

export function DragGamePage({ category, onBack }) {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState([])
  const [score, setScore] = useState(0)
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true); setError('')
    gameDataService.getDragQuestions()
      .then((data) => {
        const found = data.find((item) => item.category === category)
        setQuestions(shuffle(found?.questions || []).slice(0, 5)); setLoading(false)
      })
      .catch((cause) => { setError(cause.message); setLoading(false) })
  }

  useEffect(load, [category])

  const current = questions[index]
  const words = useMemo(() => current ? shuffle(current.sentence.split(' ')) : [], [current])

  const toggleWord = (word, position) => {
    if (checked) return
    setAnswer((value) => [...value, { word, position }])
  }

  const removeWord = (position) => {
    if (checked) return
    setAnswer((value) => value.filter((item) => item.position !== position))
  }

  const check = () => {
    if (!current || checked) return
    const isCorrect = answer.map((item) => item.word).join(' ').toLowerCase() === current.sentence.toLowerCase()
    if (isCorrect) setScore((value) => value + 100)
    setChecked(true)
  }

  const next = () => {
    setChecked(false); setAnswer([])
    setIndex((value) => value + 1)
  }

  if (loading) return <View style={styles.center}><ActivityIndicator color={theme.navy} /><Text style={styles.status}>Carregando frases...</Text></View>
  if (error) return <View style={styles.center}><Text style={styles.errorTitle}>Não foi possível iniciar</Text><Text style={styles.errorCopy}>{error}</Text><Pressable onPress={load} style={styles.secondaryButton}><Text style={styles.buttonText}>Tentar novamente</Text></Pressable><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Voltar</Text></Pressable></View>
  if (!questions.length) return <View style={styles.center}><Text style={styles.errorTitle}>Nenhuma frase encontrada</Text><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Voltar</Text></Pressable></View>

  if (index >= questions.length) {
    return <View style={styles.center}><Text style={styles.eyebrow}>RESULTADO</Text><Text style={styles.finishedTitle}>Frases concluídas</Text><Text style={styles.score}>{score} pontos</Text><Pressable onPress={() => { setIndex(0); setAnswer([]); setChecked(false); setScore(0); load() }} style={styles.primaryButton}><Text style={styles.buttonText}>Jogar novamente</Text></Pressable><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Escolher outro jogo</Text></Pressable></View>
  }

  const selectedPositions = answer.map((item) => item.position)

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.topRow}><Pressable onPress={onBack}><Text style={styles.back}>‹ Voltar</Text></Pressable><Text style={styles.progress}>{index + 1} de {questions.length}</Text></View>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.title}>Monte a frase</Text>

      <View style={styles.answerBox}>
        {answer.length ? answer.map((item) => <Pressable key={item.position} onPress={() => removeWord(item.position)} style={styles.answerWord}><Text style={styles.answerWordText}>{item.word}</Text></Pressable>) : <Text style={styles.answerPlaceholder}>Toque nas palavras abaixo</Text>}
      </View>

      <View style={styles.wordContainer}>
        {words.map((word, position) => !selectedPositions.includes(position) && (
          <Pressable key={`${word}-${position}`} onPress={() => toggleWord(word, position)} style={styles.word}><Text style={styles.wordText}>{word}</Text></Pressable>
        ))}
      </View>

      {checked && <View style={styles.feedback}><Text style={styles.feedbackTitle}>{answer.map((item) => item.word).join(' ').toLowerCase() === current.sentence.toLowerCase() ? 'Resposta correta!' : 'Resposta incorreta'}</Text><Text style={styles.tip}>Correta: {current.sentence}</Text>{current.tip ? <Text style={styles.tip}>{current.tip}</Text> : null}</View>}

      {!checked ? <Pressable disabled={answer.length !== words.length} onPress={check} style={[styles.primaryButton, answer.length !== words.length && styles.disabled]}><Text style={styles.buttonText}>Conferir frase</Text></Pressable> : <Pressable onPress={next} style={styles.primaryButton}><Text style={styles.buttonText}>{index + 1 === questions.length ? 'Ver resultado' : 'Próxima frase'}</Text></Pressable>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 40 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }, status: { marginTop: 12, color: theme.muted }, eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, back: { color: theme.navy, fontSize: 16, fontWeight: '800' }, progress: { color: theme.muted, fontSize: 13, fontWeight: '700' }, category: { marginTop: 24, color: theme.red, fontSize: 11, fontWeight: '900', letterSpacing: 1 }, title: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 28 }, answerBox: { minHeight: 112, marginTop: 18, padding: 12, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-start', gap: 8, borderWidth: 1, borderColor: '#CAD7E9', borderRadius: 10, backgroundColor: theme.white }, answerPlaceholder: { color: theme.muted, alignSelf: 'center', width: '100%', textAlign: 'center' }, answerWord: { height: 38, paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 6, backgroundColor: theme.navy }, answerWordText: { color: theme.white, fontWeight: '800' }, wordContainer: { marginTop: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, word: { height: 42, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.line, borderRadius: 6, backgroundColor: '#F5F8FF' }, wordText: { color: theme.navy, fontWeight: '800' }, feedback: { marginTop: 16, padding: 12, borderRadius: 8, backgroundColor: '#EEF3F8' }, feedbackTitle: { color: theme.navy, fontWeight: '900' }, tip: { marginTop: 5, color: theme.muted, lineHeight: 18 }, primaryButton: { minHeight: 48, marginTop: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: theme.navy }, secondaryButton: { minHeight: 48, marginTop: 16, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: theme.red }, disabled: { opacity: 0.45 }, buttonText: { color: theme.white, fontWeight: '900' }, linkButton: { marginTop: 16, padding: 10 }, linkText: { color: theme.navy, fontWeight: '900' }, errorTitle: { color: theme.ink, fontFamily: 'serif', fontSize: 24, textAlign: 'center' }, errorCopy: { marginTop: 8, color: theme.muted, textAlign: 'center' }, finishedTitle: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 30 }, score: { marginTop: 10, color: theme.red, fontFamily: 'serif', fontSize: 36, fontWeight: '900' },
})