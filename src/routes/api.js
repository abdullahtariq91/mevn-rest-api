const express = require('express');

const userRoutes = require('./users');
const loginRoutes = require('./login');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/login', loginRoutes);

module.exports = router;
