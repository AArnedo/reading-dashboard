const OPEN_LIBRARY_URL = 'https://openlibrary.org'
const MAX_DESCRIPTION_LENGTH = 320

// Corta el texto en el último punto antes del límite, para que quede "muy breve" pero prolijo
const shorten = (text, max) => {
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const lastDot = cut.lastIndexOf('. ')
  if (lastDot > max * 0.5) return cut.slice(0, lastDot + 1)
  return cut.slice(0, cut.lastIndexOf(' ')) + '…'
}

// Open Library devuelve la descripción como string o como { value }, y a veces con links en markdown
export const cleanDescription = (raw) => {
  let text = typeof raw === 'string' ? raw : raw?.value
  if (!text) return ''

  text = text
    .split(/\n\s*-{3,}|\n\s*\*{3,}/)[0]        // saca pies tipo "----------\nContiene..."
    .replace(/^\s*\[\d+\]:.*$/gm, '')          // líneas de referencias "[1]: https://..."
    .replace(/\[([^\]]+)\]\[\d+\]/g, '$1')     // [texto][1] -> texto
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')   // [texto](url) -> texto
    .replace(/\(\s*(source|fuente)[^)]*\)/gi, '')
    .replace(/(\*{1,2}|_{1,2})([^*_]+)\1/g, '$2') // *cursiva* / **negrita** -> texto
    .replace(/\s+/g, ' ')
    .trim()

  return shorten(text, MAX_DESCRIPTION_LENGTH)
}

const findWorkKey = async (title, author) => {
  // Primero probamos con título + autor; si no aparece, solo con el título
  const attempts = author ? [{ title, author }, { title }] : [{ title }]

  for (const attempt of attempts) {
    const params = new URLSearchParams({ title: attempt.title, limit: '1', fields: 'key' })
    if (attempt.author) params.set('author', attempt.author)

    const response = await fetch(`${OPEN_LIBRARY_URL}/search.json?${params}`)
    if (!response.ok) throw new Error('Open Library no respondió')
    const data = await response.json()
    if (data.docs?.[0]?.key) return data.docs[0].key
  }
  return null
}

// Devuelve { olKey, description }. Si el libro no tiene olKey (libros viejos), lo busca por título y autor.
export const fetchBookDescription = async ({ olKey, title, author }) => {
  const validAuthor = author && author !== 'autor desconocido' ? author : undefined
  const key = olKey || (await findWorkKey(title, validAuthor))
  if (!key) return { olKey: null, description: '' }

  const response = await fetch(`${OPEN_LIBRARY_URL}${key}.json`)
  if (!response.ok) throw new Error('Open Library no respondió')
  const work = await response.json()

  return { olKey: key, description: cleanDescription(work.description) }
}
