/**
 * Script to prevent flash of unstyled theme on page load
 * This should be injected into the <head> as an inline script
 * BEFORE any other scripts or styles that depend on theme
 */

export const themeNoFlashScript = `
(function() {
  try {
    const theme = localStorage.getItem('theme') || 'system';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = 
      theme === 'dark' || 
      (theme === 'system' && prefersDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {
    // Silently fail if localStorage is not available
  }
})();
`;

/**
 * Get the script as a string safe for dangerouslySetInnerHTML
 */
export function getThemeNoFlashScript(): string {
  return themeNoFlashScript;
}
