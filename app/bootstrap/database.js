const { timeStamp } = require('../common/util')

const config = require('config')
const Sequelize = require('sequelize')

// sequelize 옵션 및 객체 생성
const sequelize = new Sequelize(
  config.get('rdbms.database'),
  config.get('rdbms.user'),
  config.get('rdbms.password'),
  {
    define: {
      charset: 'utf8'
    },
    host: config.get('rdbms.mysql.host'),
    port: config.get('rdbms.mysql.port'),
    dialect: 'mysql',
    operatorsAliases : false,
    logging: false
  }
)

// 생성한 Sequelize 객체 DB 접속 테스트
sequelize.authenticate().then(() => {
  console.log(timeStamp(), '-', 'Database connection has been successfully'.green)
}).catch(e => {
  // 접속 실패
  console.log(timeStamp(), '-', 'Database connection failed'.red)
})

exports.Sequelize = Sequelize
exports.sequelize = sequelize
