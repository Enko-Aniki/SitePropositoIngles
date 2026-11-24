const OWNER = 'AldrickScholarOfSorrow'
const REPOSITORY = 'DadosJogosPropositoIngles'
const BRANCH = 'main'

const files = {
  quiz: 'questionsfull.js',
  drag: 'drag_and_drop.js',
  hangman: 'hangmanWords.js',
}

export const githubGamesUrls = {
  quiz: `https://raw.githubusercontent.com/${OWNER}/${REPOSITORY}/${BRANCH}/${files.quiz}`,
  drag: `https://raw.githubusercontent.com/${OWNER}/${REPOSITORY}/${BRANCH}/${files.drag}`,
  hangman: `https://raw.githubusercontent.com/${OWNER}/${REPOSITORY}/${BRANCH}/${files.hangman}`,
}

function parseJavaScriptArray(source, fileName) {
  const start = source.indexOf('[')
  const end = source.lastIndexOf(']')

  if (start < 0 || end <= start) {
    throw new Error(`Não foi possível encontrar o array em ${fileName}.`)
  }

  const arraySource = source.slice(start, end + 1)
    .replace(/,\s*([}\]])/g, '$1')

  try {
    return JSON.parse(arraySource)
  } catch (error) {
    throw new Error(`O conteúdo de ${fileName} não está em um formato JSON válido.`)
  }
}

async function fetchGameFile(fileName) {
  const response = await fetch(githubGamesUrls[fileName], {
    headers: { Accept: 'text/plain' },
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar ${files[fileName]}: ${response.status}`)
  }

  return parseJavaScriptArray(await response.text(), files[fileName])
}

export async function loadRemoteGameData() {
  const [quiz, drag, hangman] = await Promise.all([
    fetchGameFile('quiz'),
    fetchGameFile('drag'),
    fetchGameFile('hangman'),
  ])

  return { quiz, drag, hangman }
}

export function getCategoryData(data, categoryName) {
  return data.find((item) => item.category === categoryName) || null
}

export function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5)
}
