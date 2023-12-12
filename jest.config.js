
module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: '__tests__/coverage',
    coveragePathIgnorePatterns: ['/node_modules', '/dist', 'src/app.ts'],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
        },
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    testPathIgnorePatterns: ['/node_modules', '__tests__', '/dist', 'src/app.ts'],
    testEnvironment: 'node',
    preset: 'ts-jest',
    verbose: true,
    setupFiles: ['./setupTests.js']
};

process.env = Object.assign(process.env, {
    ENVIRONMENT: 'test',
    DB_HOST: 'db-brain-agriculture',
    DB_USER: 'postgres',
    DB_NAME: 'brain-agriculture',
    DB_PASSWORD: 'root',
    DB_PORT: '5432',
    PORT: '3000',
});

