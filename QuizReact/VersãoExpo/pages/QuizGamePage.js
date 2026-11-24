import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { gameDataService } from '../services/gameData'
import { theme } from '../visual/theme'

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

export function QuizGamePage({ category, onBack }) {
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    gameDataService.getQuestions()
      .then((data) => {
        if (!active) return
        const found = data.find((item) => item.category === category)
        setQuestions(shuffle(found?.questions || []).slice(0, 10))
        setLoading(false)
      })
      .catch((cause) => {
        if (!active) return
        setError(cause.message)
        setLoading(false)
      })
    return () => { active = false }
  }, [category])

  const restart = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setLoading(true)
    setError('')
    gameDataService.getQuestions()
      .then((data) => {
        const found = data.find((item) => item.category === category)
        setQuestions(shuffle(found?.questions || []).slice(0, 10))
        setLoading(false)
      })
      .catch((cause) => { setError(cause.message); setLoading(false) })
  }

  if (loading) return <View style={styles.center}><ActivityIndicator color={theme.red} /><Text style={styles.status}>Carregando perguntas...</Text></View>
  if (error) return <View style={styles.center}><Text style={styles.errorTitle}>Não foi possível iniciar</Text><Text style={styles.errorCopy}>{error}</Text><Pressable onPress={restart} style={styles.secondaryButton}><Text style={styles.secondaryButtonText}>Tentar novamente</Text></Pressable><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Voltar</Text></Pressable></View>
  if (!questions.length) return <View style={styles.center}><Text style={styles.errorTitle}>Nenhuma pergunta encontrada</Text><Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Voltar</Text></Pressable></View>

  const finished = index >= questions.length
  if (finished) {
    return (
      <View style={styles.center}>
        <Text style={styles.eyebrow}>RESULTADO</Text>
        <Text style={styles.finishedTitle}>Quiz concluído</Text>
        <Text style={styles.score}>{score} pontos</Text>
        <Pressable onPress={restart} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Jogar novamente</Text></Pressable>
        <Pressable onPress={onBack} style={styles.linkButton}><Text style={styles.linkText}>Escolher outro jogo</Text></Pressable>
      </View>
    )
  }

  const question = questions[index]
  const choose = (option) => {
    if (selected) return
    setSelected(option)
    if (option === question.answer) setScore((value) => value + 100)
  }

  const next = () => {
    setSelected(null)
    setIndex((value) => value + 1)
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.topRow}><Pressable onPress={onBack}><Text style={styles.back}>‹ Voltar</Text></Pressable><Text style={styles.progress}>{index + 1} de {questions.length}</Text></View>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.question}>{question.question}</Text>
      <View style={styles.options}>
        {shuffle(question.options).map((option) => {
          const isCorrect = selected && option === question.answer
          const isWrong = selected === option && option !== question.answer
          return (
            <Pressable key={option} onPress={() => choose(option)} style={[styles.option, isCorrect && styles.correct, isWrong && styles.wrong]}>
              <Text style={[styles.optionText, (isCorrect || isWrong) && styles.optionTextSelected]}>{option}</Text>
            </Pressable>
          )
        })}
      </View>
      {selected && <View style={styles.feedback}><Text style={styles.feedbackText}>{selected === question.answer ? 'Resposta correta!' : `Resposta correta: ${question.answer}`}</Text>{question.tip ? <Text style={styles.tip}>{question.tip}</Text> : null}<Pressable onPress={next} style={styles.primaryButton}><Text style={styles.primaryButtonText}>{index + 1 === questions.length ? 'Ver resultado' : 'Próxima'}</Text></Pressable></View>}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 40 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }, status: { marginTop: 12, color: theme.muted }, eyebrow: { color: theme.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, back: { color: theme.navy, fontSize: 16, fontWeight: '800' }, progress: { color: theme.muted, fontSize: 13, fontWeight: '700' }, category: { marginTop: 24, color: theme.red, fontSize: 11, fontWeight: '900', letterSpacing: 1 }, question: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 25, lineHeight: 32 }, options: { marginTop: 24, gap: 10 }, option: { minHeight: 54, paddingHorizontal: 16, justifyContent: 'center', borderWidth: 1, borderColor: theme.line, borderRadius: 8, backgroundColor: theme.white }, correct: { borderColor: '#2E7D32', backgroundColor: '#EAF6EC' }, wrong: { borderColor: theme.red, backgroundColor: '#FBEAEC' }, optionText: { color: theme.ink, fontSize: 15, fontWeight: '700' }, optionTextSelected: { fontWeight: '900' }, feedback: { marginTop: 18 }, feedbackText: { color: theme.navy, fontSize: 15, fontWeight: '900' }, tip: { marginTop: 5, color: theme.muted, fontSize: 13, lineHeight: 19 }, primaryButton: { minHeight: 48, marginTop: 16, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: theme.navy }, primaryButtonText: { color: theme.white, fontWeight: '900' }, secondaryButton: { minHeight: 48, marginTop: 16, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 7, backgroundColor: theme.red }, secondaryButtonText: { color: theme.white, fontWeight: '900' }, linkButton: { marginTop: 16, padding: 10 }, linkText: { color: theme.navy, fontWeight: '900' }, errorTitle: { color: theme.ink, fontFamily: 'serif', fontSize: 24, textAlign: 'center' }, errorCopy: { marginTop: 8, color: theme.muted, textAlign: 'center' }, finishedTitle: { marginTop: 8, color: theme.ink, fontFamily: 'serif', fontSize: 30 }, score: { marginTop: 10, color: theme.red, fontFamily: 'serif', fontSize: 36, fontWeight: '900' },
})