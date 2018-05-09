const express = require('express')
const { usersController } = require('../controllers/index');
const { catchErrors } = require('../middleware/error-handler');
const auth = require('../libs/authentication.js');
const permission = require('../middleware/permission');

const router = express.Router()

router.get('/', auth.authenticating, permission.accessChecker, catchErrors(usersController.index));
// router.get('/', catchErrors(usersController.index));
router.post('/', catchErrors(usersController.store));
router.get('/:id', catchErrors(usersController.show));
router.delete('/:id',  catchErrors(usersController.delete));
router.put('/:id', catchErrors(usersController.update));

module.exports = router
