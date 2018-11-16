const { readPublicFile, timeStamp } = require('../common/util')

// GET /
exports.home = (req, res) => {
  readPublicFile('index.html').then(html => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(html)
    res.end()
  }).catch(e => {
    res.send(e)
  })
}

// /GET /info
exports.info = (req, res) => {
  res.json({ id: req.user['id'] })
}

// GET /login
exports.login = (req, res) => {
  readPublicFile('login.html').then(html => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(html)
    res.end()
  }).catch(e => {
    res.send(e)
  })
}

// GET /logout
exports.logout = (req, res) => {
  console.log(timeStamp(), '-', 'Logout'.yellow)
  req.logout()
  res.redirect('/')
}
