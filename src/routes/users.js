const express = require('express')
const { usersController } = require('../controllers/index');
const { catchErrors } = require('../middleware/error-handler');
const auth = require('../libs/authentication.js');
const permission = require('../middleware/permission');

const router = express.Router()

router.get('/', auth.authenticating, permission.accessChecker, catchErrors(usersController.index));
// router.get('/', catchErrors(usersController.index));
router.post('/', auth.authenticating, permission.accessChecker, catchErrors(usersController.store));
router.get('/:id', auth.authenticating, permission.accessChecker, catchErrors(usersController.show));
router.delete('/:id', auth.authenticating, permission.accessChecker, catchErrors(usersController.delete));
router.put('/:id', auth.authenticating, permission.accessChecker, catchErrors(usersController.update));

module.exports = router
