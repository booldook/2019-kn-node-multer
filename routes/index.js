var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/multer', function(req, res, next) {
  res.render('multer-list', { title: 'Express' });
});

module.exports = router;
