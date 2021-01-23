const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
    }
  })
  module.exports = mongoose.model('categories', CategorySchema)