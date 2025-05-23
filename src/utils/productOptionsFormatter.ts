/**
 * Utility functions for formatting product option keys and values for display
 */

interface FormattedOption {
  label: string;
  value: string;
}

/**
 * Mapping of raw option keys to user-friendly labels
 */
const OPTION_LABELS: Record<string, string> = {
  // Installation
  installation: 'Installation',
  
  // Transparency/Light filtering
  transparency: 'Light Filtering',
  
  // Color and fabric
  color: 'Color',
  fabric: 'Fabric',
  
  // System and mounting
  system: 'Mounting System',
  wall_fitting: 'Wall Fitting',
  
  // Size
  size: 'Size',
  width: 'Width',
  height: 'Height',
  
  // Motor configuration
  motor_type: 'Motor Type',
  motor_side: 'Motor Position',
  
  // Hardware
  bottom_bar: 'Bottom Bar',
  
  // Remote control
  remote: 'Remote Control',
  
  // Track and curtain specific
  curtain_type: 'Curtain Type',
  track_type: 'Track Type',
  
  // Blind specific
  blind_type: 'Blind Type',
  
  // Default fallback - convert snake_case to Title Case
};

/**
 * Mapping of raw option values to user-friendly display values
 */
const VALUE_MAPPINGS: Record<string, string> = {
  // Installation options
  inside: 'Inside Mount',
  outside: 'Outside Mount',
  
  // Transparency/Light filtering
  light: 'Light Filtering',
  blackout: 'Blackout',
  
  // Motor types
  bluetooth: 'Bluetooth Motor',
  wifi: 'WiFi Motor',
  manual: 'Manual Operation',
  
  // Motor positions
  links: 'Left Side',
  rechts: 'Right Side',
  left: 'Left Side',
  right: 'Right Side',
  
  // Systems
  brackets: 'Bracket System',
  clips: 'Clip System',
  
  // Bottom bar materials
  metal: 'Metal Bar',
  plastic: 'Plastic Bar',
  
  // Remote control options
  none: 'No Remote',
  '5-channel': '5-Channel Remote',
  '15-channel': '15-Channel Remote',
  
  // Size options
  small: 'Small',
  medium: 'Medium',
  large: 'Large',
  
  // Default fallback - capitalize first letter
};

/**
 * Convert snake_case to Title Case
 */
function snakeCaseToTitleCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Format an option key to a user-friendly label
 */
export function formatOptionLabel(key: string): string {
  const normalizedKey = key.toLowerCase().trim();
  
  if (OPTION_LABELS[normalizedKey]) {
    return OPTION_LABELS[normalizedKey];
  }
  
  // Fallback: convert snake_case to Title Case
  return snakeCaseToTitleCase(normalizedKey);
}

/**
 * Format an option value to a user-friendly display value
 */
export function formatOptionValue(value: string | number | boolean): string {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  
  if (typeof value === 'number') {
    return value.toString();
  }
  
  const normalizedValue = value.toString().toLowerCase().trim();
  
  if (VALUE_MAPPINGS[normalizedValue]) {
    return VALUE_MAPPINGS[normalizedValue];
  }
  
  // Handle special cases
  if (normalizedValue.includes('essential-')) {
    return value.toString().replace('essential-', 'Essential ').replace('-', ' ');
  }
  
  if (normalizedValue.includes('-')) {
    return value.toString()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  // Fallback: capitalize first letter
  return value.toString().charAt(0).toUpperCase() + value.toString().slice(1).toLowerCase();
}

/**
 * Format product options object for display
 */
export function formatProductOptions(options: Record<string, string | number | boolean>): FormattedOption[] {
  return Object.entries(options).map(([key, value]) => ({
    label: formatOptionLabel(key),
    value: formatOptionValue(value)
  }));
}

/**
 * Get dimensions display from width and height
 */
export function formatDimensions(width?: number, height?: number): string {
  if (width && height) {
    return `${width} × ${height} cm`;
  }
  if (width) {
    return `Width: ${width} cm`;
  }
  if (height) {
    return `Height: ${height} cm`;
  }
  return '';
} 