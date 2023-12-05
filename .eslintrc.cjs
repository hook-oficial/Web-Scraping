module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
<<<<<<< HEAD
    '@typescript-eslint/no-explicit-any': 'off', // Permitir el uso de 'any'
=======
>>>>>>> d62f0d2b67e7ad1df5be6b33d85e33393739a3ec
  },
}
