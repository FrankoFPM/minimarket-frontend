import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      quotes: ['error', 'single'], // Comillas simples
      semi: ['error', 'never'], // No usar punto y coma
      indent: ['error', 2], // Indentación de 2 espacios
      'no-multiple-empty-lines': ['error', { max: 1 }], // Máximo 1 línea vacía
      'object-curly-newline': ['error', { consistent: true }], // Formato de escalera en objetos
      'no-trailing-spaces': 'error', // Eliminar espacios en blanco al final de las líneas
      'no-empty-pattern' : 'off'
    },
  },
])
