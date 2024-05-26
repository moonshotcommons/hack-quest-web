module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:json/recommended',
    // 'eslint:recommended',
    // "plugin:react/recommended",
    // 'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    // 1. 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'prettier',
    'unused-imports'
    //  '@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
    //  parser: '@typescript-eslint/parser' // 解析 .ts 文件
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-undef': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    semi: 'off', //语句强制分号结尾,
    'unused-imports/no-unused-imports': 'off',
    'react/no-children-prop': 'warn'
    // 'prettier/prettier': ['error', { printWidth: 160 }]
  }
};
