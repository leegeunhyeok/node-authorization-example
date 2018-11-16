const config = require('config')
const { Sequelize, sequelize } = require('../bootstrap/database')
const { timeStamp } = require('../common/util')

// User 모델 정의
const User = sequelize.define('User', {
  id: {
    type: Sequelize.STRING(16),
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING(20),
    allowNull: false
  }
})

// DB와 강제 동기화 (DROP TABLE 후 재 생성)
User.sync({ force: true }).then(r => {
  console.log(timeStamp(), '-', 'User model defined'.green)
  
  // 설정 파일에 test가 true인 경우 임시 유저데이터 INSERT
  if (config.get('test')) {
    User.create({
      id: 'test',
      password: 'test123'
    }).then(() => {
      console.log(timeStamp(), '-', 'Test user data created'.cyan)
    }).catch(e => {
      console.log(e)
    })
  }
}).catch(e => {
  console.log(e)
})

// 유저 인증 함수
exports.auth = data => {
  return new Promise((resolve, reject) => {
    User.findOne({
      // 검색 조건
      where: {
        id: data['id'],
        password: data['password']
      }
    }).then(user => {
      if (user) {
        // 해당 ID, PASSWORD의 유저가 존재하는 경우
        resolve(user)
      } else {
        // 존재하지 않는 경우
        reject('Can not find user')
      }
    }).catch(e => {
      // 예외 발생
      reject(e)
    })
  })
}

exports.create = data => {
  User.create(data).catch(e => {
    console.log(e)
  })
}
