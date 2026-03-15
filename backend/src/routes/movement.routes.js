const express = require('express');
const router = express.Router();
const { getMovements, addMovement } = require('../controllers/movement.controller');
const authenticate = require('../middleware/auth.middleware');

router.get('/', authenticate, getMovements);
router.post('/', authenticate, addMovement);

module.exports = router;
