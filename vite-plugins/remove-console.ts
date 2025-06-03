/**
 * Vite Plugin: Remove Console Statements in Production
 * Automatically strips console.log, console.info, console.debug statements from production builds
 * while preserving console.error and console.warn for critical issues
 */

import type { Plugin } from 'vite';

interface RemoveConsoleOptions {
  /**
   * Console methods to remove in production
   * @default ['log', 'debug', 'info']
   */
  remove?: string[];
  
  /**
   * Console methods to keep in production
   * @default ['error', 'warn']
   */
  keep?: string[];
  
  /**
   * Whether to remove console statements in development
   * @default false
   */
  removeInDev?: boolean;
  
  /**
   * File patterns to include (glob patterns)
   * @default ['**\/*.{js,ts,jsx,tsx}']
   */
  include?: string[];
  
  /**
   * File patterns to exclude (glob patterns)
   * @default ['**\/node_modules\/**', '**\/dist\/**']
   */
  exclude?: string[];
}

const defaultOptions: Required<RemoveConsoleOptions> = {
  remove: ['log', 'debug', 'info'],
  keep: ['error', 'warn'],
  removeInDev: false,
  include: ['**/*.{js,ts,jsx,tsx}'],
  exclude: ['**/node_modules/**', '**/dist/**', '**/scripts/**']
};

export function removeConsole(options: RemoveConsoleOptions = {}): Plugin {
  const opts = { ...defaultOptions, ...options };
  
  return {
    name: 'remove-console',
    enforce: 'pre',
    
    transform(code: string, id: string) {
      // Skip if in development and removeInDev is false
      if (process.env.NODE_ENV !== 'production' && !opts.removeInDev) {
        return null;
      }
      
      // Check if file should be processed
      const shouldInclude = opts.include.some(pattern => 
        id.includes(pattern.replace('**/', '').replace('*', ''))
      );
      
      const shouldExclude = opts.exclude.some(pattern => 
        id.includes(pattern.replace('**/', '').replace('*', ''))
      );
      
      if (!shouldInclude || shouldExclude) {
        return null;
      }
      
      let transformedCode = code;
      
      // Remove specified console methods
      opts.remove.forEach(method => {
        // Match console.method(...) calls
        const regex = new RegExp(
          `console\\.${method}\\s*\\([^)]*\\)\\s*;?`,
          'g'
        );
        transformedCode = transformedCode.replace(regex, '');
        
        // Also match multiline console calls
        const multilineRegex = new RegExp(
          `console\\.${method}\\s*\\([\\s\\S]*?\\)\\s*;?`,
          'g'
        );
        transformedCode = transformedCode.replace(multilineRegex, '');
      });
      
      // Clean up empty lines left by removed console statements
      transformedCode = transformedCode.replace(/^\s*[\r\n]/gm, '');
      
      return {
        code: transformedCode,
        map: null // We're not providing source maps for this simple transformation
      };
    }
  };
}

export default removeConsole; 