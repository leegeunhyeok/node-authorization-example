const config = require('config'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      flash = require('connect-flash'),
      passport = require('passport')

// Express 서버 설정
module.exports = app => {
  // 포트
  app.set('port', config.get('port'))

  // 미들웨어
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(session({
    secret: 'test_key',
    resave: true,
    saveUninitialized: true
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
}
