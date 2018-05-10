const express = require('express');
const auth = require('../libs/authentication.js');
const permission = require('../middleware/permission');
const common = require('../libs/common');

const router = express.Router();

const secretFunction = () => {
  return new Promise((resolve, reject) => {
    return resolve({ message: 'Secret Message' });
  });
};

router.route('/').get(auth.authenticating, permission.accessChecker, (req, res) => {
    secretFunction().then((data) => {
      common.success(res, data, 'For Admin Only');
    }).catch((err) => { common.fail(res, err.message); });
  });

module.exports = router
