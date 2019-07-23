var express = require('express');
var router = express.Router();
const models = require('../db/db')

require('./admin/index')(router)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
