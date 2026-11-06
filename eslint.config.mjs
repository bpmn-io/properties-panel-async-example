import bpmnIoPlugin from 'eslint-plugin-bpmn-io';
import importPlugin from 'eslint-plugin-import';

const files = {
  ignored: [
    'public'
  ],
  build: [
    '*.js'
  ]
};

export default [
  {
    ignores: files.ignored
  },

  // build
  ...bpmnIoPlugin.configs.node.map(config => {
    return {
      ...config,
      files: files.build,
      languageOptions: {
        ...config.languageOptions,
        sourceType: 'commonjs'
      }
    };
  }),

  // source
  ...bpmnIoPlugin.configs.browser.map(config => {
    return {
      ...config,
      ignores: files.build
    };
  }),
  ...bpmnIoPlugin.configs.jsx.map(config => {
    return {
      ...config,
      ignores: files.build
    };
  }),
  {
    settings: {
      react: {
        version: '18.0'
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      'import/first': 'error',
      'import/no-amd': 'error',
      'import/no-webpack-loader-syntax': 'error'
    },
    ignores: files.build
  }
];
