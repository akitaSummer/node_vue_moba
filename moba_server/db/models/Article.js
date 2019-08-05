const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: {type: String},
  body: {type: String},
  thumbnail: {type: String},
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}]
},{
  timestamps: true
})

module.exports = mongoose.model('Article', articleSchema)