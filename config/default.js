module.exports = {
  port: 8080,
  public: 'public',
  test: true,
  rdbms: {
    database: 'auth_test',
    user: 'root',
    password: '1234',
    mysql: {
      host: 'localhost',
      port: '3306',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  }
}