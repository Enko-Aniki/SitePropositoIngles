const DATA_BASE_URL = 'https://raw.githubusercontent.com/AldrickScholarOfSorrow/DadosJogosPropositoIngles/main'
const JSDELIVR_BASE_URL = 'https://cdn.jsdelivr.net/gh/AldrickScholarOfSorrow/DadosJogosPropositoIngles@main'

async function fetchJavaScriptArray(filename) {
  let response
  let source

  for (const baseUrl of [DATA_BASE_URL, JSDELIVR_BASE_URL]) {
    try {
      response = await fetch(`${baseUrl}/${filename}`, {
        method: 'GET',
        headers: { Accept: 'text/plain' },
      })

      if (response.ok) {
        source = await response.text()
        break
      }
    } catch (error) {
      // tenta o próximo endereço
    }
  }

  if (!source) {
    throw new Error(`Snack não conseguiu acessar ${filename}. Verifique a rede ou o domínio raw/jsDelivr.`)
  }

  const start = source.indexOf('[')
  const end = source.lastIndexOf(']')

  if (start < 0 || end <= start) {
    throw new Error(`Formato inválido em ${filename}: array não encontrado`)
  }

  let arraySource = source.slice(start, end + 1)
  arraySource = arraySource
    .replace(/([{,]\s*)([A-Za-z_$][A-Za-z0-9_$]*)(\s*:)/g, '$1"$2"$3')
    .replace(/,\s*([}\]])/g, '$1')

  let value
  try {
    value = JSON.parse(arraySource)
  } catch (error) {
    throw new Error(`Dados inválidos em ${filename}: ${error.message}`)
  }

  if (!Array.isArray(value)) {
    throw new Error(`Dados inválidos em ${filename}: resposta não é uma lista`)
  }

  if (!value.every((item) => item && typeof item.category === 'string')) {
    throw new Error(`Dados inválidos em ${filename}: categoria ausente`)
  }

  return value
}

export const gameDataService = {
  getQuestions: () => fetchJavaScriptArray('questionsfull.js'),
  getDragQuestions: () => fetchJavaScriptArray('drag_and_drop.js'),
  getHangmanWords: () => fetchJavaScriptArray('hangmanWords.js'),
}

export async function testAllGameData() {
  const [quiz, drag, hangman] = await Promise.all([
    fetchJavaScriptArray('questionsfull.js'),
    fetchJavaScriptArray('drag_and_drop.js'),
    fetchJavaScriptArray('hangmanWords.js'),
  ])

  return { quiz, drag, hangman }
}
