import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    // Always default to light mode, ignoring system preferences
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? true : false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Force light mode on initial load
  useEffect(() => {
    // Force light mode on initial load
    setIsDark(false);
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  }, []);

  const toggle = () => setIsDark(!isDark);

  return { isDark, toggle };
};