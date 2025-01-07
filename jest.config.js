/** @type {import('ts-jest').JestConfigWithTsJest} */
const nextJest = require('next/jest');

const dotenv = require('dotenv')
dotenv.config({
  path: '.env.development',
})

const createJestConfig = nextJest({
  dir: '.',
});

const customJestConfig = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  moduleDirectories: ['node_modules', '<rootDir>']
};

module.exports = createJestConfig(customJestConfig);