import { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { AppHeader } from './visual/AppHeader'
import { HomePage } from './pages/HomePage'
import { ConteudoPage } from './pages/ConteudoPage'
import { MidiasPage } from './pages/MidiasPage'
import { LivrosPage } from './pages/LivrosPage'
import { SobrePage } from './pages/SobrePage'
import { theme } from './visual/theme'

export default function App() {
  const [activePage, setActivePage] = useState('home')

  const navigate = (page) => setActivePage(page)

  const renderPage = () => {
    if (activePage === 'conteudo') return <ConteudoPage onNavigate={navigate} />
    if (activePage === 'midias') return <MidiasPage />
    if (activePage === 'livros') return <LivrosPage />
    if (activePage === 'sobre') return <SobrePage />
    return <HomePage />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <AppHeader activePage={activePage} onNavigate={navigate} />
      <View style={styles.page}>{renderPage()}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.cream },
  page: { flex: 1 },
})
