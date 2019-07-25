const mongoose = require('mongoose')

const heroSchema = mongoose.Schema({
  name: {type: String},
  avatar: {type: String},
})

module.exports = mongoose.model('Hero', heroSchema)