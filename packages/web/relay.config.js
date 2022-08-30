module.exports = {
  language: 'typescript',
  src: './',
  eagerEsModules: true,
  schema: '../api/schema.graphql',
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  customScalars: {
    Date: 'Date',
  }
};
