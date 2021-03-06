const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: Number,
    default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
      },
      isAdmin: {
        type: Boolean,
        default: false
        },
        superUser: {
          type: Boolean,
          default: false
          }
        })
      module.exports = mongoose.model('users', UserSchema)