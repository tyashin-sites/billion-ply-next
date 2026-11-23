import type { Config } from 'tailwindcss';

// Raw HSL triples live in globals.css; wrapped here with <alpha-value>
// (tyashin-platform CLAUDE.md §5: never put the colour function in the var).
const c = (v: string) => `hsl(var(--${v}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem' },
      screens: { '2xl': '1320px' },
    },
    extend: {
      colors: {
        background: c('background'),
        foreground: c('foreground'),
        card: { DEFAULT: c('card'), foreground: c('foreground') },
        primary: { DEFAULT: c('primary'), foreground: c('primary-foreground') },
        muted: { DEFAULT: c('muted'), foreground: c('muted-foreground') },
        border: c('border'),
        input: c('border'),
        ring: c('ring'),
        ink: c('ink'),
        leaf: { DEFAULT: c('leaf'), deep: c('leaf-deep'), tint: c('leaf-tint') },
        oak: { DEFAULT: c('oak'), deep: c('oak-deep'), tint: c('oak-tint') },
        paper: c('paper'),
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)',
      },
      transitionTimingFunction: {
        brand: 'var(--ease-brand)',
      },
      boxShadow: {
        rest: 'var(--shadow-rest)',
        hover: 'var(--shadow-hover)',
      },
    },
  },
  plugins: [],
} satisfies Config;
