/**
 * Formats an option value to be displayed in the UI
 * Replaces underscores with spaces and capitalizes each word
 * @param value The option value to format
 * @returns The formatted option value
 */
export const formatOptionValue = (value: string | number | boolean): string => {
  // Handle non-string values
  if (typeof value !== 'string') {
    return String(value);
  }
  
  // Replace underscores with spaces
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Formats an option label to be displayed in the UI
 * Replaces underscores with spaces and capitalizes each word
 * @param key The option key/label to format
 * @returns The formatted option label
 */
export const formatOptionLabel = (key: string): string => {
  // Replace underscores with spaces and capitalize each word
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}; 