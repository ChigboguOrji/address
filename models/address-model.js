var mongoose = require('mongoose');
var Schema = mongoose.Schema;

AddressSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    trim: true
  },

  lastname: {
    type: String,
    minlength: 3,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 11
  },
  homephone: {
    type: String,
    trim: true,
    minlength: 11
  },
  kin: {
    type: String,
    required: true,
    trim: true
  },
  added: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Address', AddressSchema);