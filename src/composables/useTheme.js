import { ref, computed } from 'vue'

const STORAGE_KEY = 'biblio-plus:theme'

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function initialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // stockage indisponible : on suit le système
  }
  return systemTheme()
}

// État partagé : le thème choisi par l'utilisateur prime sur celui du navigateur
const theme = ref(initialTheme())

function apply(value) {
  document.documentElement.dataset.theme = value
}
apply(theme.value)

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function toggle() {
    theme.value = isDark.value ? 'light' : 'dark'
    apply(theme.value)
    try {
      localStorage.setItem(STORAGE_KEY, theme.value)
    } catch {
      // le choix reste valable pour la session en cours
    }
  }

  return { theme, isDark, toggle }
}
