const models = require('../../db/db')

module.exports = router => {
  // 新建/修改分类
  router.post('/admin/api/categories', (request, response) => {
    const model = new models.CategoryModel(request.body)
    model.save((error, item) => {response.send(item)})
  })

  // 初始化分类列表
  router.get('/admin/api/categories', (request, response) => {
    models.CategoryModel.find().populate('parent').then(item => response.send(item))
  })

  // 初始化修改分类列表
  router.get('/admin/api/categories/:id', (request, response) => {
    const _id = request.params.id
    models.CategoryModel.findOne({_id}, (error, items) => {
      response.send(items)
    })
  })

  // 修改分类列表
  router.put('/admin/api/categories/:id', (request, response) => {
    const _id = request.params.id
    const model = request.body
    models.CategoryModel.findOneAndUpdate({_id}, model, (error, items) => {
      response.send(items)
    })
  })

  // 删除分类
  router.delete('/admin/api/categories/list/:id', (request, response) => {
    const _id = request.params.id
    console.log(_id)
    models.CategoryModel.findByIdAndRemove(_id, (error, item) => {
      response.send({success: true})
    })
  })
}