/** @type {import('jest').Config} */
module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(ts|mjs|js|html)$': [
        'jest-preset-angular',
        {
          tsconfig: '<rootDir>/tsconfig.spec.json',
          stringifyContentPathRegex: '\\.html$',
        },
      ],
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  };
  