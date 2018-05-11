const express = require('express')
const { usersController } = require('../controllers/index');
const { catchErrors } = require('../middleware/error-handler');
const auth = require('../libs/authentication.js');
const permission = require('../middleware/permission');

const router = express.Router()

router.get('/', auth.authenticating, catchErrors(usersController.index));
router.post('/', auth.authenticating, catchErrors(usersController.store));
router.get('/:id', auth.authenticating, catchErrors(usersController.show));
router.delete('/:id', auth.authenticating, catchErrors(usersController.delete));
router.put('/:id', auth.authenticating, catchErrors(usersController.update));

module.exports = router
