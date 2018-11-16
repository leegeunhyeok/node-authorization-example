const passport = require('passport')
const { Strategy } = require('passport-local')
const { timeStamp } = require('../common/util')

const User = require('../model/user')

// Passport 전략 정의
passport.use(new Strategy(
  {
    usernameField : 'id',
    passwordField : 'password',
    session: true
  },
  (id, password, done) => {
    const data = { id, password }
    console.log(timeStamp(), '-', 'Authenticate data:', data)
    
    // 유저 인증
    User.auth(data).then(user => {
      done(null, user)
    }).catch(e => {
      console.log(timeStamp(), '-', e.red)
      done(null, false)
    })
  }
))

// 로그인 성공 시 유저 정보 직렬화
passport.serializeUser((user, done) => {
  console.log(timeStamp(), '-', 'Login success!, serialize'.green)
  done(null, user)
})

// 로그인 후 인증 진행 시 호출됨
passport.deserializeUser((user, done) => {
  console.log(timeStamp(), '-', 'deserialize, id:', user['id'].cyan)
  done(null, user)
})

// 인증 상태 확인
exports.auth = (req, res, next) => {
  console.log(timeStamp(), '-', 'Authenticated:', req.isAuthenticated() ? 'true'.green : 'false'.red)
  if (req.isAuthenticated()) {
    // 인증 Ok
    return next()
  }
  // 인증 Fail
  console.log(timeStamp(), '-', 'You need login!'.yellow)
  res.redirect('/login')
}

exports.passport = passport
