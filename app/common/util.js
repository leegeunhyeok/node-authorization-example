const config = require('config'),
      path = require('path'),
      fs = require('fs')

// length 길이만큼 0 채우기
const appendZero = (targetNumber, length) => {
  if (typeof targetNumber === 'number') {
    const targetString = targetNumber.toString()
    let zeros = ''
    for (let i = targetString.length; i < length; i++) {
      zeros += '0'
    }
    return zeros + targetString
  } else {
    return '0'
  }
}

// 현재 시각 문자열로 반환
const timeStamp = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = appendZero(date.getMonth() + 1, 2)
  const day = appendZero(date.getDate(), 2)
  const hour = appendZero(date.getHours(), 2)
  const min = appendZero(date.getMinutes(), 2)
  const sec = appendZero(date.getSeconds(), 2)
  const ms = appendZero(date.getMilliseconds(), 3)
  return `${year}-${month}-${day} ${hour}:${min}:${sec}.${ms}`
}

// public 경로의 파일 읽고 반환
const readPublicFile = fileName => {
  const filePath = path.join(config.get('public'), fileName)
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = {
  appendZero: appendZero,
  timeStamp: timeStamp,
  readPublicFile: readPublicFile
}
