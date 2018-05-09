const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserObj = new Schema({
  name    : { type: String },
  age     : { type: Number },
  email   : { type: String },
  password: { type: String },
  role    : { type: String },
  token   : { type: String }
});

module.exports = mongoose.model('Users', UserObj);
