module.exports = {
  cacheDirectory: "./node_modules/.jest",
  clearMocks: true,
  restoreMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: [ "text", "html", "lcov" ],
  watchman: false,
};
