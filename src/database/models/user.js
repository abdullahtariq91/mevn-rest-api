const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserObj = new Schema({
  firstName  : { type: String },
  lastName   : { type: String },
  phoneNumber: { type: String },
  email      : { type: String, unique: true },
  password   : { type: String },
  role       : { type: String },
  token      : { type: String },
  createdDate: { type: Number },
  updatedDate: { type: Number },
});

module.exports = mongoose.model('Users', UserObj);
