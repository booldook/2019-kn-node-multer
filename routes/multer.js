var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
var upload = multer({ dest: path.join(__dirname, '../public/uploads/') });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('multer-list', { title: 'Express' });
});

router.post('/', upload.single('img'), (req, res, next) => {
  res.send("저장되었습니다."+req.file.filename);
});

module.exports = router;
