const path = require('path')

const { timeStamp } = require(path.join(__dirname, 'app', 'common', 'util'))

const express = require('express')
const app = express()

require(path.join(__dirname, 'app', 'bootstrap', 'bootstrap'))(app)

app.listen(app.get('port'), () => {
  console.log(timeStamp(), '-', 'Server started'.green)
})
