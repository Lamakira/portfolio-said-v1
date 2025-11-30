import { ref, computed, watch } from 'vue';

// Global theme state
const theme = ref('light');

// Provide/inject key
export const THEME_KEY = Symbol('theme');

/**
 * Theme management composable
 * Handles theme persistence, detection, and switching
 */
export function useTheme() {
  // Computed property for dark mode check
  const isDark = computed(() => theme.value === 'dark');

  /**
   * Set theme and persist to localStorage
   * @param {string} newTheme - 'light' or 'dark'
   */
  const setTheme = (newTheme) => {
    if (newTheme !== 'light' && newTheme !== 'dark') {
      console.warn(`Invalid theme: ${newTheme}. Using 'light'.`);
      newTheme = 'light';
    }

    theme.value = newTheme;
    
    // Update HTML attribute
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Persist to localStorage
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      console.error('Failed to save theme to localStorage:', e);
    }
  };

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark');
  };

  /**
   * Initialize theme from localStorage or system preference
   */
  const initTheme = () => {
    let savedTheme = null;

    // Try to read from localStorage
    try {
      savedTheme = localStorage.getItem('theme');
    } catch (e) {
      console.error('Failed to read theme from localStorage:', e);
    }

    // If no saved theme, check system preference
    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      savedTheme = prefersDark ? 'dark' : 'light';
    }

    setTheme(savedTheme);
  };

  /**
   * Listen for system theme changes
   */
  const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  };

  /**
   * Register a callback for theme changes
   * @param {Function} callback - Function to call when theme changes
   * @returns {Function} Unwatch function
   */
  const onThemeChange = (callback) => {
    return watch(theme, (newTheme, oldTheme) => {
      callback(newTheme, oldTheme);
    });
  };

  return {
    theme: computed(() => theme.value),
    isDark,
    setTheme,
    toggleTheme,
    initTheme,
    watchSystemTheme,
    onThemeChange,
  };
}
