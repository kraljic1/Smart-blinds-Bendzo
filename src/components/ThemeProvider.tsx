import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component - simply passes children through
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
} 