var express = require('express');
var router = express.Router();
var { upload } = require("../modules/multer-conn");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('multer-list', { title: 'Express' });
});

router.post('/', upload.single('img'), (req, res, next) => {
  if(req.file) res.send("저장되었습니다."+req.file.filename);
  else res.send("파일을 저장하지 못했습니다.");
});

module.exports = router;
