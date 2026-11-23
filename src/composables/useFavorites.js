import { ref, computed } from 'vue'

const STORAGE_KEY = 'biblio-plus:favorites'

function read() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Array.isArray(value) ? value : []
  } catch {
    return []
  }
}

// État partagé entre toutes les pages (module singleton), conservé après rechargement
const favorites = ref(read())

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
  } catch {
    // stockage indisponible : les favoris restent en mémoire
  }
}

export function useFavorites() {
  const count = computed(() => favorites.value.length)

  function toggle(id) {
    favorites.value = favorites.value.includes(id)
      ? favorites.value.filter((f) => f !== id)
      : [...favorites.value, id]
    persist()
  }

  return { favorites, count, toggle }
}
