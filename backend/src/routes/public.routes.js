const express = require('express');
const router = express.Router();
const { getPublicStore } = require('../controllers/public.controller');

router.get('/:slug', getPublicStore);

module.exports = router;
