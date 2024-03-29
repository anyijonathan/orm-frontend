export default {
    testTimeout: 100000,
    'fakeTimers': {'enableGlobally': true},
    roots: ["."],
    preset: 'ts-jest',
    transform: {
       '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
          '<rootDir>/node_modules/',
          '/build/',        
          '/ignoreFolder/', 
          '<rootDir>/Components',
          '<rootDir>/test/mocks/styleMock.ts',
          '<rootDir>/test/mocks/fileMock.ts',
          '<rootDir>/test/setupTests.ts',
          
        ],
  
        setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
          maxWorkers: 1,
          moduleNameMapper: {
              "\\.(css|scss)$": "<rootDir>/test/mocks/styleMock.ts",
              "react-select-search(.*)": "<rootDir>/test/mocks/styleMock.ts",
              "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/test/mocks/fileMock.ts",
              "^[./a-zA-Z0-9$_-]+\\.svg$": "<rootDir>/test/mocks/fileMock.ts",
          },
  };
  