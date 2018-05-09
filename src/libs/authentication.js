let common = require('./common.js');

const getUserId = (val) => {
  return new Promise((resolve, reject) => {
    let descToken = decrypt(val);
    let userId = require('jwt-simple').decode(descToken,
      require(common.routing('configurations', 'key.js')).password);
    if (!(require('mongoose').Types.ObjectId.isValid(userId))){
      return reject({message: 'Invalid token'});
    }
    return resolve(userId);
  });
};

const getUserRoleType = (role) => {
  return new Promise((resolve, reject) => {
    require(common.routing('src/database/models', 'role.js')).findOne({code: role}).then((role) => {
      if (!role) return reject({ message: 'Role not found' });
      return resolve(role);
    }).catch(() => {
      return reject({message: common.routing('configurations', 'text.js').dbError});
    });
  });
};

const getUser = (id, token) => {
  return new Promise((resolve, reject) => {
    require(common.routing('src/database/models', 'user.js')).findOne({_id: id, token: token}).then((user) => {
      if (!user || user._id == undefined){
        reject({message: 'Fail get user'});
      }
      getUserRoleType(user.role).then((role) => {
        return resolve({user: user, role: role});
      }).catch(() => {
        return reject({message: common.routing('configurations', 'text.js').dbError});
      });
    }).catch(() => {
      return reject({message: common.routing('configurations', 'text.js').dbError});
    });
  });
};

const encrypt = (userId) => {
  const ENCRYPTION_KEY = require('../../configurations/key').value;
  const IV_LENGTH = 16;
  let iv = require('crypto').randomBytes(IV_LENGTH);
  let cipher = require('crypto').createCipheriv(require('../../configurations/key').algorithm,
      new Buffer(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(userId);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (text) => {
  const ENCRYPTION_KEY = require('../../configurations/key').value;
  let textParts = text.split(':');
  let iv = new Buffer(textParts.shift(), 'hex');
  let encryptedText = new Buffer(textParts.join(':'), 'hex');
  let decipher = require('crypto').createDecipheriv(require('../../configurations/key').algorithm,
      new Buffer(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const authenticating = (req, res, next) => {
  if (!(req.headers['authorization'])) {
    common.fail(res, 'Missing authorization in request header');
  } else {
    //TODO: Authorization --- [token-type] [token]
    let val = req.headers['authorization'].split(" ");
    let token = val[1];
    getUserId(token).then( (userId) => {
      getUser(userId, token).then( (data) => {
        req.userId = data.user._id.toString();
        req.role = data.role;
        return next();
      }).catch((err) => {
        common.fail(res, err.message);
      });
    }).catch( (err) => {
      common.fail(res, err.message);
    });
  }
};

module.exports = {
  authenticating, encrypt, getUser, getUserId
};
