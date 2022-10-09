const { join } = require('path');
// const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    // ...createGlobPatternsForDependencies(__dirname),
    join(__dirname, '../../libs/ui', '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx}')
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1C1C1C',
        primary: '#34b27b',
        blackish: '#232323',
        card: '#282828',
        'custom-white': 'EDEDED'
      },
    },
  },
  plugins: [],
}
