const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleObj = new Schema({
  name: {type: String, required: [true, 'Role name is required']},
  code: {type: String, required: [true, 'Role code is required']},
});

module.exports = mongoose.model('Roles', RoleObj);
