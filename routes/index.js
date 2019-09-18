var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    page_title: 'BRIGHTSIDE\r\nADDRESS BOOK',
    sub_title: 'Built with vanilla javascript\nexpress server, data-persistence with mongodb'
  });
});

module.exports = router;