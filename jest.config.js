module.exports = {
    clearMocks: true,
    setupFilesAfterEnv: ['regenerator-runtime/runtime'],
    testPathIgnorePatterns: [
      "/node_modules/",
    ],
    globals: {
      window: {}
    },
    testEnvironment: 'node',
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    }
  };