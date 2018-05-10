const common = require('../libs/common');

const accessChecker = (req, res, next ) => {
  let resource = (req.accessUrl === undefined) ? req.originalUrl : req.accessUrl;
  let action = req.method.toLowerCase();
  ACL.isAllowed(req.userId, resource, action, (err, result) => {
    if (err) common.fail(res, err.message);
    else {
      if (result) next();
      else {
        let denny = new Error('User does not have enough permission');
        common.fail(res, denny.message);
      }
    }
  });
};

module.exports = { accessChecker };
