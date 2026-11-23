import { describe, it, expect, vi, afterEach } from 'vitest'
import { effectScope, ref, nextTick } from 'vue'
import { toBook, useOpenLibrary } from '../useOpenLibrary'

describe('toBook', () => {
  it('convertit un document Open Library', () => {
    expect(
      toBook({ key: '/works/OL1W', title: 'Germinal', author_name: ['Émile Zola'], first_publish_year: 1885, cover_i: 42 }),
    ).toEqual({
      id: '/works/OL1W',
      title: 'Germinal',
      author: 'Émile Zola',
      year: 1885,
      cover: 'https://covers.openlibrary.org/b/id/42-M.jpg',
      url: 'https://openlibrary.org/works/OL1W',
    })
  })

  it('gère les champs manquants', () => {
    const book = toBook({ key: '/works/OL2W', title: 'Sans auteur' })
    expect(book.author).toBe('Auteur inconnu')
    expect(book.year).toBeNull()
    expect(book.cover).toBeNull()
  })
})

describe('useOpenLibrary', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })

  it("n'appelle pas l'API sous 3 caractères, puis recherche après le délai", async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ docs: [{ key: '/works/OL1W', title: 'Germinal' }] }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const query = ref('ge')
    const scope = effectScope()
    const api = scope.run(() => useOpenLibrary(query))

    expect(api.active.value).toBe(false)
    expect(fetchMock).not.toHaveBeenCalled()

    query.value = 'germinal'
    await nextTick()
    expect(api.active.value).toBe(true)
    expect(api.loading.value).toBe(true)

    await vi.advanceTimersByTimeAsync(700)
    expect(fetchMock).toHaveBeenCalledOnce()
    expect(fetchMock.mock.calls[0][0]).toContain('q=germinal')
    expect(api.results.value).toHaveLength(1)
    expect(api.loading.value).toBe(false)
    scope.stop()
  })

  it("expose une erreur si l'API échoue", async () => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }))
    const scope = effectScope()
    const api = scope.run(() => useOpenLibrary(ref('germinal')))
    await vi.advanceTimersByTimeAsync(700)
    expect(api.error.value).toMatch(/indisponible/)
    expect(api.results.value).toEqual([])
    scope.stop()
  })
})
