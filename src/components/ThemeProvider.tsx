import { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component - simply passes children through
function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}

export default ThemeProvider; 