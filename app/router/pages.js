const passport = require('passport')
const passportConfig = require('../bootstrap/passport')
const controller = require('../controller/pages')

// 라우터에 경로 등록 및 컨트롤러 연결
module.exports = app => {
  // 홈
  app.get('/', passportConfig.auth, controller.home)

  // 현재 로그인한 유저 ID 조회
  app.get('/info', passportConfig.auth, controller.info)

  // 로그인 진행
  app.post('/login', passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }), (req, res) => {
		  res.redirect('/')
    }
  )

  // 로그인 화면
  app.get('/login', controller.login)

  // 로그아웃
  app.get('/logout', passportConfig.auth, controller.logout)
}
