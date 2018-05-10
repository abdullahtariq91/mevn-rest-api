const express = require('express');

const userRoutes = require('./users');
const loginRoutes = require('./login');
const secretRoutes = require('./secret');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/login', loginRoutes);
router.use('/secret', secretRoutes);

module.exports = router;
