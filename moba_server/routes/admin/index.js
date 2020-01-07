const multer = require('multer')
const jwt = require('jsonwebtoken')

const restRouter = require('./rest/index')
const loginRouter = require('./login/index')
const authMiddleware = require('../../middleware/auth')
const resourceMiddleware = require('../../middleware/resource')

module.exports = (app) => {
  // 通用CRUD
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(),restRouter);

  // 储存图片
  const upload = multer({dest: __dirname + '../../../public/images'})
  app.post('/admin/api/upload', upload.single('file'), authMiddleware(), async (request, response) => {
    const {file} = request
    file.url = `http://www.akitasummer.cn/public/images/${file.filename}`
    response.send(file)
  })

  // 登录
  app.use('/admin/api/login', loginRouter)

}
