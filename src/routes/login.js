const router = require('express').Router();
const common = require('../libs/common');
const auth = require('../libs/authentication.js');
const userModel = require(common.routing('src/database/models', 'user.js'));

const login = (param) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({email: param.email}).then((user) => {
      if (!user)
        reject({message: 'No user found'});
      if (!(require('bcrypt-nodejs').compareSync(param.password, user.password)))
        return reject({message: 'Incorrect password'});
      let encodedString = require('jwt-simple').encode(user._id.toString(),
          require(common.routing('configurations', 'key.js')).password);
      let token = auth.encrypt(encodedString);
      userModel.findOneAndUpdate({_id: user._id}, {token: token}).then((user) => {
        return resolve({name: user.name, email: user.email, role: user.role, token: token});
      }).catch(() => { return reject({message: 'DB Error'}); });
    }).catch(() => { return reject({message: 'DB Error'}); });
  });
};

const logout = (param) => {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate({ email: param.email }, {token: ''}).then((user) => {
      if (!user)
        reject({ message: 'No user found' });
      return resolve({ message: 'Logged out' });
    }).catch(() => { return reject({ message: 'DB Error'}); });
  });
};

router.route('/')
  .all((req, res, next) => {
    if(req.body.email === undefined || req.body.password === undefined)
      common.fail(res, 'Missing email address and password in the request');
    else next();
  })
  .post((req, res) => {
    login(req.body).then((data) => {
      common.success(res, data, 'User logged in');
    }).catch((err) => { common.fail(res, err.message); });
  });


router.route('/logout').post((req, res) => {
    logout(req.body).then((data) => {
      common.success(res, data, 'User logged out');
    }).catch((err) => { common.fail(res, err.message); });
  });

module.exports = router;
