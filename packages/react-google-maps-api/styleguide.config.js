import { basename } from 'node:path'
import { withCustomConfig } from 'react-docgen-typescript'

export const ignore = ['**/*.js', '**/*.ts', '**/*.stories.tsx']

export const propsParser = withCustomConfig('./tsconfig.json', {
  savePropValueAsString: true, // Optional config: adjust as needed
}).parse

export function getComponentPathLine(componentPath) {
  const name = basename(componentPath, '.tsx')
  return `import { ${name} } from '@react-google-maps/api';`
}

export const usageMode = 'expand'

export const webpackConfig = {
  module: {
    rules: [
      {
        // Transpile TypeScript and TSX files using ts-loader
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
      },
    ],
  },
  // Resolve these file extensions
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}

export const sections = [
  {
    name: 'Introduction',
    content: 'src/docs/introduction.md', // Path to the introduction documentation
  },
  {
    name: 'Getting Started',
    content: 'src/docs/getting-started.md', // Path to the getting-started documentation
  },
  {
    name: 'Components',
    // List of components and component files to document
    components: [
      'src/useJsApiLoader.tsx',
      'src/LoadScript.tsx',
      'src/LoadScriptNext.tsx',
      'src/useLoadScript.tsx',
      'src/GoogleMap.tsx',
      'src/components/**/*.tsx',
    ],
  },
]

export const typescript = {
  componentNameResolver: (filePath) => basename(filePath, '.tsx'),
}
