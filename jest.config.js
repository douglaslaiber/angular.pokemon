module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
  moduleNameMapper: {
    '@store/(.*)$': '<rootDir>/src/app/store/$1',
  },
};
