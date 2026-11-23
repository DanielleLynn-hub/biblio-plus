import { ref, watch, onScopeDispose } from 'vue'

const API = 'https://openlibrary.org/search.json'
const FIELDS = 'key,title,author_name,first_publish_year,cover_i'
const MIN_LENGTH = 3
const DELAY_MS = 600
const TIMEOUT_MS = 15000
const LIMIT = 8

export function toBook(doc) {
  return {
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? 'Auteur inconnu',
    year: doc.first_publish_year ?? null,
    cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null,
    url: 'https://openlibrary.org' + doc.key,
  }
}

/**
 * Recherche dans l'API publique Open Library à partir d'une requête réactive.
 * La requête est temporisée, et une recherche obsolète est annulée.
 */
export function useOpenLibrary(query) {
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)
  const active = ref(false) // vrai dès que la requête est assez longue
  let timer = null
  let controller = null

  async function search(q) {
    controller?.abort()
    controller = new AbortController()
    let timedOut = false
    const timeout = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, TIMEOUT_MS)
    loading.value = true
    error.value = null
    try {
      const url = `${API}?q=${encodeURIComponent(q)}&lang=fr&limit=${LIMIT}&fields=${FIELDS}`
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error('Erreur HTTP ' + res.status)
      const data = await res.json()
      results.value = data.docs.map(toBook)
      loading.value = false
    } catch (e) {
      if (e.name === 'AbortError' && !timedOut) return // remplacée par une recherche plus récente
      error.value = timedOut
        ? 'Open Library met trop de temps à répondre.'
        : 'Open Library est momentanément indisponible.'
      results.value = []
      loading.value = false
    } finally {
      clearTimeout(timeout)
    }
  }

  function retry() {
    const q = query.value.trim()
    if (q.length >= MIN_LENGTH) search(q)
  }

  watch(
    query,
    (value) => {
      clearTimeout(timer)
      const q = value.trim()
      active.value = q.length >= MIN_LENGTH
      if (!active.value) {
        controller?.abort()
        results.value = []
        error.value = null
        loading.value = false
        return
      }
      loading.value = true
      timer = setTimeout(() => search(q), DELAY_MS)
    },
    { immediate: true },
  )

  onScopeDispose(() => {
    clearTimeout(timer)
    controller?.abort()
  })

  return { results, loading, error, active, retry }
}
