/**
 * Design System Tokens & Theme Constants
 * Garut Public Service AI Command Center (GPS-CC)
 */

export const THEME_COLORS = {
  garutBlue: '#0F4C81',
  garutGreen: '#2E7D32',
  garutGold: '#F4B400',
  danger: '#E53935',
  warning: '#FB8C00',
  success: '#43A047',
  info: '#039BE5',
  bgDark: '#0D1117',
  cardDark: '#161B22',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
} as const;

export const THEME_SPACING = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
} as const;

export const THEME_RADIUS = {
  none: '0px',
  xs: '0.25rem',  // 4px
  sm: '0.375rem', // 6px
  md: '0.5rem',   // 8px
  lg: '0.75rem',  // 12px
  xl: '1rem',     // 16px
  '2xl': '1.5rem',// 24px
  full: '9999px',
} as const;

export const THEME_SHADOWS = {
  glass: '0 10px 40px rgba(0, 0, 0, 0.2)',
  glow: '0 0 20px rgba(15, 76, 129, 0.35)',
  card: '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
  panel: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
} as const;

export const THEME_BADGES = {
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  neutral: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
} as const;

export const THEME_CONFIG = {
  colors: THEME_COLORS,
  spacing: THEME_SPACING,
  radius: THEME_RADIUS,
  shadows: THEME_SHADOWS,
  badges: THEME_BADGES,
} as const;

export default THEME_CONFIG;
