/** @jsxImportSource react */
import React, { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component - simply passes children through
export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  return <React.Fragment>{children}</React.Fragment>;
} 