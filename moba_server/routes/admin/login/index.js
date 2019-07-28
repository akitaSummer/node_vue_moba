const express = require('express')
const jwt = require('jsonwebtoken')

const AdminUser = require('../../../db/models/AdminUser')

const router = express.Router()

router.post('/', async (request, response) => {
  const {username, password} = request.body
  // 1. 根据用户名查找用户
  const user = await AdminUser.findOne({username}).select('+password')

  if (!user) {
    return response.status(422).send({
      message: '用户不存在'
    })
  }
  // 2. 校验密码
  const isValid = require('bcrypt').compareSync(password, user.password)
  if (!isValid) {
    return response.status(422).send({
      message: '密码错误'
    })
  }

  // 3. 返回token
  const token = jwt.sign({id: user._id}, request.app.get('secret'))
  response.send({token})
})

router.get('/username', async (request, response) => {
  const token = (String(request.headers.authorization) || '').split(' ').pop()
  const {id} = jwt.verify(token, request.app.get('secret'))
  const {username} = await AdminUser.findById(id)
  return response.send({username})
})

module.exports = router