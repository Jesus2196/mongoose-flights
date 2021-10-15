var express = require('express');
var router = express.Router();
var destinationsCtrl = require('../controllers/destinations');

router.post('/flights/:id/destinations', destinationsCtrl.create);
router.delete('/destinations/:id', destinationsCtrl.delete);

module.exports = router;