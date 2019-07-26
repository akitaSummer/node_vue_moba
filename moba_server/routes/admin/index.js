const multer = require('multer')

const restRouter = require('./rest/index')

module.exports = (app) => {
  // 通用CRUD
  app.use('/admin/api/rest/:resource', (request, response, next) => {
    const modelName = require('inflection').classify(request.params.resource)
    request.Model = require(`../../db/models/${modelName}`)
    next()
  },restRouter);

  // 储存图片
  const upload = multer({dest: __dirname + '../../../public/images'})
  app.post('/admin/api/upload', upload.single('file'), async (request, response) => {
    const {file} = request
    file.url = `http://localhost:4001/public/images/${file.filename}`
    response.send(file)
  })

}