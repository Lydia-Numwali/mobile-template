// Primary blue theme with various shades
const primary = {
  50: '#EBF5FF',
  100: '#D6EBFF',
  200: '#ADD6FF',
  300: '#84C1FF',
  400: '#5BACFF',
  500: '#3284FF', // Main primary color
  600: '#1E6AD4',
  700: '#1556B2',
  800: '#0C4291',
  900: '#042E6F',
};

// Secondary colors for UI elements
const secondary = {
  50: '#E6F6F9',
  100: '#CCEDF2',
  200: '#99DBE6',
  300: '#66C8D9',
  400: '#33B6CC',
  500: '#00A4C0', // Main secondary color
  600: '#00839A',
  700: '#006273',
  800: '#00424D',
  900: '#002126',
};

// Accent color for highlights
const accent = {
  50: '#FFF5EB',
  100: '#FFEBD6',
  200: '#FFD6AD',
  300: '#FFC184',
  400: '#FFAD5B',
  500: '#FF9833', // Main accent color
  600: '#D47D1E',
  700: '#B26515',
  800: '#914E0C',
  900: '#6F3604',
};

// Gray scale for neutral content
const neutral = {
  50: '#F9FAFB',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
};

// Success color
const success = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981', // Main success color
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  900: '#064E3B',
};

// Warning color
const warning = {
  50: '#FFFBEB',
  100: '#FEF3C7',
  200: '#FDE68A',
  300: '#FCD34D',
  400: '#FBBF24',
  500: '#F59E0B', // Main warning color
  600: '#D97706',
  700: '#B45309',
  800: '#92400E',
  900: '#78350F',
};

// Error color
const error = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444', // Main error color
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
};

export default {
  primary,
  secondary,
  accent,
  neutral,
  success,
  warning,
  error,
  text: {
    primary: neutral[900],
    secondary: neutral[700],
    tertiary: neutral[500],
    placeholder: neutral[400],
    inverse: neutral[50],
    disabled: neutral[300],
  },
  background: {
    primary: neutral[50],
    secondary: neutral[100],
    tertiary: neutral[200],
  },
  border: {
    light: neutral[200],
    medium: neutral[300],
    dark: neutral[400],
  },
  button: {
    primary: primary[500],
    primaryPressed: primary[600],
    secondary: secondary[500],
    secondaryPressed: secondary[600],
    accent: accent[500],
    accentPressed: accent[600],
    disabled: neutral[300],
  },
};