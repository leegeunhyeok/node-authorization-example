/**
 * 서버 시작 전 초기 작업
 */

module.exports = app => {
  require('colors')
  require('./database')
  require('./server')(app)
  require('../router/pages')(app)
}
