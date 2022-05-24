module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  plugins: [
    'react'
  ],
  settings: {
    react: {
      'version': 'detect'
    }
  },
  env: {
    'es2021': true,
    'browser': true,
    'node': true,
    'jest': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    //COMMON
    'no-console': 'off',
    'jsx-quotes': [1, 'prefer-double'],
    'quotes': [1, 'single', { 'allowTemplateLiterals': true }],
    'semi': [1, 'always'],
    'eol-last': ['warn', 'always'],
    'array-callback-return': ['error', { allowImplicit: true }],
    'block-scoped-var': 1,
    'dot-notation': 1,
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'no-trailing-spaces': 'warn',
    // REACT
    'react/prop-types': 1,
    'react/no-array-index-key': 1,
    'react/no-children-prop': 1,
    'react/no-deprecated': 1,
    'react/no-direct-mutation-state': 2,
    'react/no-multi-comp': 1,
    'react/no-typos': 2,
    'react/no-string-refs': 1,
    'react/no-unused-state': 1,
    'react/react-in-jsx-scope': 2,
    'react/require-render-return': 2,
    'react/self-closing-comp': [2, { component: true, html: false }],
    'react/style-prop-object': 2,
    'react/void-dom-elements-no-children': 2,
    // JSX
    'react/jsx-closing-bracket-location': [1, 'line-aligned'],
    'react/jsx-closing-tag-location': 1,
    'react/jsx-curly-spacing': [1, { when: 'never', children: true }],
    'react/jsx-equals-spacing': [1, 'never'],
    'react/jsx-indent': [1, 2],
    'react/jsx-indent-props': [1, 'first'],
    'react/jsx-key': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-tag-spacing': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1
  }
};
