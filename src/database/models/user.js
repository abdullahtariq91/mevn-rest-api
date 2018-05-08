const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserObj = new Schema({
  name : {type: String, required: [true, 'Name is required']},
  age  : {type: Number, required: true},
  email: {type: String, required: true}
});

module.exports = mongoose.model('Users', UserObj);
