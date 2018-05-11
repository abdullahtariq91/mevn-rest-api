const { User } = require('../database/models');

exports.index = async (req, res) => {
  const users = await User.find().exec();
  res.json({ data: users });
  return;
}

exports.store = async (req, res) => {
  req.body.createdDate = Date.now();
  req.body.password = require('bcrypt-nodejs').hashSync(req.body.password, require('bcrypt-nodejs').genSaltSync(8), null);
  const user = new User(req.body);
  user.save().then((userNew) => {
    if (!userNew) {
      res.status(400).json({message: 'Error'});
    } else {
      ACL.addUserRoles(userNew._id.toString(), userNew.role);
      res.status(201).json({ data: userNew });
    }
  }).catch((err) => { console.log(err); res.status(400).json({ message: 'Error' }); });
}

exports.show = async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  res.json({ data: user })
}

exports.delete = async (req, res) => {
  const user = await User.findById(req.params.id).exec();
  if (user.email == 'super@admin.com') {
    res.status(400).json();
  } else {
    await User.findByIdAndRemove(req.params.id).exec();
    res.status(204).json()
  }
}

exports.update = async (req, res) => {
  req.body.updatedDate = Date.now();
  const user = await User
  .findByIdAndUpdate(req.params.id, req.body, { new: true })
  .exec();
  res.json({ data: user });
}
