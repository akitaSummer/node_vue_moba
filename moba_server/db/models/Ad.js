const mongoose = require('mongoose')

const AdSchema = mongoose.Schema({
  name: {type: String},
  items: [{
    image: {type: String},
    url: {type: String}
  }]

})

module.exports = mongoose.model('Ad', AdSchema)