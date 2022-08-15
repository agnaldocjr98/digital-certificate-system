module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
