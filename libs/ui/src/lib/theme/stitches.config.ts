import { createStitches } from '@stitches/react';

export const { theme, styled, globalCss } = createStitches({
  theme: {
    colors: {
      dark: '#1C1C1C',
      primary: '#34b27b',
      blackish: '#232323',
      card: '#282828',
      'custom-white': 'EDEDED',
      white: '#fff'
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px'
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
      lg: "8px",
      full: "9999999px",
      md: '6px'
    },
    shadows: {},
    zIndices: {},
    transitions: {},
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
    })
  }
})

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  html: {
    background: '$dark'
  },
  body: {
    fontFamily: '$untitled',
    color: '$white',
    fontSize: '$base',
    '-webkit-font-smoothing': "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  },
  ".flex-center": {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
