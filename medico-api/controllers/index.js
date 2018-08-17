var express = require('express');
var router = express.Router();
var requestIp = require('request-ip');

/* GET home page. */
router.get('/', function(req, res, next) {
  var client_ip = requestIp.getClientIp(req);
  res.render('index', { title: 'Medico',ip:client_ip });
});

module.exports = router;
