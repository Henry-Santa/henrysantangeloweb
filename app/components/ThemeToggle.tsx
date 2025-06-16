"use client";

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

/**
 * ThemeToggle
 * -------------
 * A small, fully client-side component that allows visitors to switch
 * between light and dark modes. We use the classic approach of adding or
 * removing Tailwind's `dark` class on the root `<html>` element. Because
 * this functionality touches the `window` object, the component is marked
 * as a client component via the implicit "use client" directive at the
 * top of the file.
 *
 * By storing the preference in `localStorage`, we ensure that the choice
 * persists across page refreshes and future visits. The implementation is
 * intentionally dependency-free – no context providers or third-party
 * libraries – to keep bundle size small and integration simple. Should the
 * project outgrow these requirements, swapping in `next-themes` would be
 * straightforward.
 */

export default function ThemeToggle() {
  // Internal state mirrors the current theme for instant UI feedback.
  const [isDark, setIsDark] = useState<boolean>(false);

  // On first render, read the stored preference *once* so that we avoid a
  // layout shift. This effect runs on the client only.
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = stored ? stored === 'dark' : prefersDark;

    setIsDark(shouldUseDark);
    document.documentElement.classList.toggle('dark', shouldUseDark);
  }, []);

  /**
   * Toggles the theme class on the root `<html>` element and saves the new
   * preference to `localStorage`.
   */
  const handleToggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={handleToggle}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
    </button>
  );
} 