// Charte graphique M2H2 - Couleurs EXACTES du logo public/logo.jpeg
export const brandColors = {
  // Bleu navy/foncé du logo (couleur dominante)
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#1565C0', // BLEU PRINCIPAL DU LOGO
    600: '#0D47A1', // BLEU FONCÉ LOGO
    700: '#0D47A1',
    800: '#0a3d91',
    900: '#082f6f',
  },
  // Rouge/Orange accent du logo
  secondary: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#E53935', // ROUGE/ORANGE LOGO
    600: '#C62828',
    700: '#B71C1C',
    800: '#a71818',
    900: '#8b1414',
  },
  // Gris neutre
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Succès et erreur
  success: {
    500: '#4caf50',
    600: '#388e3c',
  },
  error: {
    500: '#f44336',
    600: '#d32f2f',
  },
}

export const gradients = {
  primary: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)', // Bleu du logo
  secondary: 'linear-gradient(135deg, #E53935 0%, #C62828 100%)', // Rouge du logo
  hero: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)', // Juste bleu, sobre
  subtle: 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)',
}

export const typography = {
  fontFamily: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    heading: '"Inter", sans-serif',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
}

export const spacing = {
  section: {
    sm: '3rem',   // 48px
    md: '5rem',   // 80px
    lg: '7rem',   // 112px
  },
  container: {
    padding: '1rem',
    maxWidth: '1280px',
  },
}

export const borderRadius = {
  sm: '0.375rem',  // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
}

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
}

export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
}

// Configuration pour les composants
export const components = {
  button: {
    primary: {
      bg: brandColors.primary[600],
      hoverBg: brandColors.primary[700],
      text: '#ffffff',
      shadow: shadows.md,
    },
    secondary: {
      bg: brandColors.secondary[600],
      hoverBg: brandColors.secondary[700],
      text: '#ffffff',
      shadow: shadows.md,
    },
  },
  card: {
    bg: '#ffffff',
    border: brandColors.neutral[200],
    shadow: shadows.lg,
    hoverShadow: shadows.xl,
  },
}

export default {
  colors: brandColors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  components,
}
