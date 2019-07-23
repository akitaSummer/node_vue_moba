const models = require('../../db/db')

module.exports = router => {
  router.post('/admin/api/categories', (request, response) => {
    const name = request.body.name
    const model = new models.CategoryModel({name})
    model.save((error, model) => {response.send(model)})
  })
}