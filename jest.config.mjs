/** @type {import('jest').Config} */
export default {
  testEnvironment: "jsdom", // React тесты = jsdom
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        useESM: false,
        diagnostics: {
          warnOnly: false
        }
      }
    ]
  },

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    "^.+\\.(css|scss)$": "identity-obj-proxy",

    "^.+\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/tests/__mocks__/fileMock.js"
  }
};
