/**
 * ThemeScript Component
 * Server component that injects theme detection script into <head>
 * Prevents flash of unstyled theme on page load
 * This must be placed in the <head> tag in layout.tsx
 */

import { getThemeNoFlashScript } from "@/lib/theme-no-flash";

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: getThemeNoFlashScript(),
      }}
      suppressHydrationWarning
    />
  );
}
