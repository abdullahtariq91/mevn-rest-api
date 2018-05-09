const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserObj = new Schema({
  firstName  : { type: String },
  lastName   : { type: String },
  phoneNumber: { type: String },
  email      : { type: String },
  password   : { type: String },
  role       : { type: String },
  token      : { type: String }
});

module.exports = mongoose.model('Users', UserObj);
