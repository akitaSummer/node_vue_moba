module.exports = options => {
  return (request, response, next) => {
    const modelName = require('inflection').classify(request.params.resource)
    request.Model = require(`../db/models/${modelName}`)
    next()
  }
}