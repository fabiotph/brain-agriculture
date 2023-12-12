jest.mock("./src/database", () => ({
  Postgres: {
    getInstance: jest.fn().mockImplementation(() => ({
      getConnection: jest.fn().mockImplementation(() => ({
        define: jest.fn(() => ({
          hasMany: jest.fn(),
          belongsTo: jest.fn(),
          init: jest.fn(),
          removeAttribute: jest.fn(),
          belongsToMany: jest.fn(),
        })),
        authenticate: jest.fn().mockResolvedValue(() => { }),
        sync: jest.fn().mockResolvedValue(() => { }),
        query: jest.fn().mockResolvedValue(() => { }),
        fn: jest.fn(),
      })),
    })),
  },
}));