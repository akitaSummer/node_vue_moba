module.exports = app => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://localhost:27017/node_vue_moba', {userNewUrlParser: true})
  const conn = mongoose.connection
  conn.on('connected', () => {console.log('数据库连接成功')})

  require('require-all')(__dirname + '/models')
}
