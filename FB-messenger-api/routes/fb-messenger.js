
const express = require('express');
const router = express.Router();
const fbMessagerController = require('../controllers/fb-messager');

router.get('/customers', fbMessagerController.getAllCustomers);

module.exports = router;