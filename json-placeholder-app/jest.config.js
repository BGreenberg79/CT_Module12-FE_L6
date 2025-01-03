export default {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  }
};
