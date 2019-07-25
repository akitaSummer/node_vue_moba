var express = require('express');
var router = express.Router();

// 新建/修改分类
router.post('/', async (request, response) => {
  const model = new request.Model(request.body)
  await model.save((error, item) => {response.send(item)})
})

// 初始化分类列表
router.get('/', async (request, response) => {
  let queryOptions = {}
  if (request.Model.modelName === 'Category') {
    queryOptions.populate = 'parent'
  }
  await request.Model.find().setOptions(queryOptions).then(item => response.send(item))
})

// 初始化修改分类列表
router.get('/:id', async (request, response) => {
  const _id = request.params.id
  await request.Model.findOne({_id}, (error, items) => {
    response.send(items)
  })
})

// 修改分类列表
router.put('/:id', async (request, response) => {
  const _id = request.params.id
  const model = request.body
  await request.Model.findOneAndUpdate({_id}, model, (error, items) => {
    response.send(items)
  })
})

// 删除分类
router.delete('/list/:id', async (request, response) => {
  const _id = request.params.id
  await request.Model.findByIdAndRemove(_id, (error, item) => {
    response.send({success: true})
  })
})

module.exports = router