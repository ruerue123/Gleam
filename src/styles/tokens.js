// Design Tokens - Single source of truth for design values
// Use these tokens throughout the app instead of hardcoded values

export const tokens = {
  // Colors
  colors: {
    primary: '#8B7355',
    primaryLight: '#A89584',
    primaryDark: '#6F5943',

    text: {
      primary: '#171515',
      secondary: '#8B7355',
      tertiary: '#A89584',
      disabled: 'rgba(23, 21, 21, 0.4)',
    },

    background: {
      primary: '#ffffff',
      secondary: '#FAFAF8',
      tertiary: '#EDECE4',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },

    border: {
      light: '#EDECE4',
      medium: 'rgba(23, 21, 21, 0.08)',
      dark: 'rgba(23, 21, 21, 0.15)',
    },

    status: {
      success: {
        bg: '#D4EDDA',
        text: '#155724',
        border: '#C3E6CB',
      },
      error: {
        bg: '#FFF5F5',
        text: '#C53030',
        border: '#FEB2B2',
      },
      warning: {
        bg: '#FFF3CD',
        text: '#856404',
        border: '#FFEEBA',
      },
      info: {
        bg: '#D1ECF1',
        text: '#0C5460',
        border: '#BEE5EB',
      },
    },
  },

  // Spacing scale (based on 8px grid)
  spacing: {
    xxxs: '0.25rem',   // 4px
    xxs: '0.5rem',     // 8px
    xs: '0.75rem',     // 12px
    sm: '1rem',        // 16px
    md: '1.5rem',      // 24px
    lg: '2rem',        // 32px
    xl: '2.5rem',      // 40px
    xxl: '3rem',       // 48px
    xxxl: '4rem',      // 64px
    huge: '5rem',      // 80px
  },

  // Responsive spacing (using clamp for fluid sizing)
  fluidSpacing: {
    xs: 'clamp(0.5rem, 1vw, 0.75rem)',
    sm: 'clamp(0.75rem, 1.5vw, 1rem)',
    md: 'clamp(1rem, 2vw, 1.5rem)',
    lg: 'clamp(1.5rem, 3vw, 2rem)',
    xl: 'clamp(2rem, 4vw, 3rem)',
    xxl: 'clamp(3rem, 6vw, 5rem)',
  },

  // Typography
  typography: {
    fontFamily: {
      heading: "'Cardo', serif",
      body: "'Cormorant', serif",
    },

    fontSize: {
      xs: 'clamp(0.75rem, 1.3vw, 0.85rem)',
      sm: 'clamp(0.875rem, 1.5vw, 0.95rem)',
      base: 'clamp(1rem, 1.6vw, 1.1rem)',
      lg: 'clamp(1.125rem, 1.8vw, 1.25rem)',
      xl: 'clamp(1.25rem, 2vw, 1.5rem)',
      xxl: 'clamp(1.5rem, 3vw, 2rem)',
      xxxl: 'clamp(2rem, 4vw, 2.5rem)',
      huge: 'clamp(2.5rem, 5vw, 3.5rem)',
    },

    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
      loose: 2,
    },

    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '2px',
    base: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.04)',
    base: '0 2px 8px rgba(0, 0, 0, 0.04)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.12)',
    xxl: '0 16px 32px rgba(0, 0, 0, 0.15)',
  },

  // Transitions
  transitions: {
    fast: '200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    normal: '400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    slow: '600ms cubic-bezier(0.4, 0.0, 0.2, 1)',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    overlay: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },

  // Breakpoints (for responsive design)
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },

  // Container max widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1400px',
  },
};

// Helper functions for common patterns
export const mediaQuery = {
  xs: `@media (min-width: ${tokens.breakpoints.xs})`,
  sm: `@media (min-width: ${tokens.breakpoints.sm})`,
  md: `@media (min-width: ${tokens.breakpoints.md})`,
  lg: `@media (min-width: ${tokens.breakpoints.lg})`,
  xl: `@media (min-width: ${tokens.breakpoints.xl})`,
  xxl: `@media (min-width: ${tokens.breakpoints.xxl})`,

  maxXs: `@media (max-width: ${tokens.breakpoints.xs})`,
  maxSm: `@media (max-width: ${tokens.breakpoints.sm})`,
  maxMd: `@media (max-width: ${tokens.breakpoints.md})`,
  maxLg: `@media (max-width: ${tokens.breakpoints.lg})`,
  maxXl: `@media (max-width: ${tokens.breakpoints.xl})`,
};

export default tokens;
