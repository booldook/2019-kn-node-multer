var express = require('express');
var router = express.Router();
var multer  = require('multer');
var path = require('path');
var fs = require('fs');
var upload = multer({ dest: path.join(__dirname, '../public/uploads/') });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, getPath());
  },
  filename: function (req, file, cb) {
    var saveFile = getFile(file.originalname); //{} -> originalname -> 1912-12333333-99.jpg
    cb(null, saveFile.saveName);
  }
});
function getPath() {
  var newPath = path.join(__dirname, "../public/uploads/" + makePath());
  if(!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  }
  return newPath; //1912
}
function makePath() {
  var d = new Date();
  var year = d.getFullYear().substr(2); //19
  var month = (d.getMonth() + 1 < 10) ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  return year + month;
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('multer-list', { title: 'Express' });
});

router.post('/', upload.single('img'), (req, res, next) => {
  res.send("저장되었습니다."+req.file.filename);
});

module.exports = router;
