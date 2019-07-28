module.exports = options => {
  const jwt = require('jsonwebtoken')

  const AdminUser = require('../db/models/AdminUser')

  return async (request, response, next) => {
    // 验证是否已经的登录
    const token = (String(request.headers.authorization) || '').split(' ').pop()
    if (!token) {
      return response.status(401).send({
        message: '请先登录'
      })
    }
    const {id} = jwt.verify(token, request.app.get('secret'))
    if (!id) {
      return response.status(401).send({
        message: '请先登录'
      })
    }
    request.user = await AdminUser.findById(id)
    if (!request.user) {
      return response.status(401).send({
        message: '请先登录'
      })
    }
    next()
  }
}