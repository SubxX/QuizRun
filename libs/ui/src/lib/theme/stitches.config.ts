import { createStitches } from '@stitches/react';

export const { theme, styled, globalCss, keyframes, config } = createStitches({
  theme: {
    colors: {
      dark: '#1C1C1C',
      primary: '#34b27b',
      blackish: '#232323',
      card: '#282828',
      'custom-white': '#EDEDED',
      'white-muted': '#A0A0A0',
      'light-white': '#707070',
      white: '#fff',
      'white-rgb': '255,255,255',
      'error': '#ffa6a67d'
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px'
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px'
    },
    fonts: {
      untitled: 'Untitled Sans, apple-system, sans-serif',
      mono: 'Söhne Mono, menlo, monospace',
    },
    fontWeights: {
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {
      md: '6px',
      lg: "8px",
      xl: '12px',
      '2xl': '16px',
      full: "9999999px",
    },
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1023px)',
    xl: '(min-width: 1280px)',
    "2xl": '(min-width: 1536px)',
  },
  utils: {
    spaceY: (value: string) => ({
      '& > * + *': {
        marginTop: value
      }
    }),
    spaceX: (value: string) => ({
      '& > * + *': {
        marginLeft: value
      }
    }),
    lineClamper: (value: number) => ({
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': value,
      lineClamp: value,
      '-webkit-box-orient': 'vertical',
    })
  }
})

export const globalStyles = globalCss({
  '*, *::after, *::before': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  html: {
    background: '$dark',
    fontFamily: '$untitled',
    color: '$white',
    "lineHeight": 1.5,
    "-webkit-text-size-adjust": "100%",
    "-moz-tab-size": 4,
    "tab-size": 4,
    "font-feature-settings": 5,
  },
  body: {
    fontFamily: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit',
    fontSize: '$base',
    '-webkit-font-smoothing': "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  ".flex-center": {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ".h-full": {
    height: '100%'
  },
  ".w-full": {
    width: '100%'
  },
  ".flex-1": {
    flex: 1
  },
  '.truncate': {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  a: {
    color: "inherit",
    textDecoration: "inherit"
  },
  'ul, ol': {
    listStyle: 'none',
  },
  button: {
    border: 'none',
    '&:hover,&:focus': {
      outline: 'none',
    }
  },
  'button, input, optgroup, select, textarea': {
    fontFamily: 'inherit',
    fontSize: '100%',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    color: 'inherit'
  }
});
