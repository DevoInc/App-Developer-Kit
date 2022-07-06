module.exports = {
    preset: 'ts-jest/presets/default',
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        'dist/',
        'index.ts'
    ],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,ts,tsx,jsx}',
        '!<rootDir>/src/**/*.stories.*'
    ],
    moduleNameMapper: {
        '\\.s?css$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
    coverageThreshold: {
        global: {
            branches: 10,
            functions: 10,
            lines: 10,
            statements: 10,
        },
    },
};
