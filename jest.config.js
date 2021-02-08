module.exports = {
    clearMocks: true,
    setupFilesAfterEnv: ['regenerator-runtime/runtime'],
    testPathIgnorePatterns: [
      "/node_modules/",
    ],
    globals: {
      window: {}
    },
    jest: {
      verbose: true,
      testURL: "http://localhost/"
    },
    testEnvironment: 'node',
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    }
  };