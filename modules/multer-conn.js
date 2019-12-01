var multer  = require('multer');
var path = require('path');
var fs = require('fs');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, getPath());
  },
  filename: function (req, file, cb) {
    var saveFile = getFile(file.originalname); //{} -> originalname -> 1912-12333333-99.jpg
    cb(null, saveFile.filename);
  }
});

var chkFile = (req, file, cb) => {
	var allowExt = ['.jpg', '.jpeg', '.png', '.gif', '.zip', '.pdf'];
	var ext = path.extname(file.originalname).toLowerCase();
	console.log(ext);
	if(allowExt.indexOf(ext) > -1) {
		req.fileValidateError = true;
		cb(null, true);
	}
	else {
		req.fileValidateError = false;
		cb(null, false);
	}
}
var upload = multer({ storage: storage, fileFilter: chkFile });

function getPath() {
  var newPath = path.join(__dirname, "../public/uploads/" + makePath());
  if(!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  }
  return newPath;
}

function makePath() {
  var d = new Date();
  var year = String(d.getFullYear()).substr(2); //19
  var month = (d.getMonth() + 1 < 10) ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  return year + month;
}

function getFile(oriFile) {
  // oriFile = "sample.jpg"
  var ext = path.extname(oriFile);  //.jpg
  var fname = path.basename(oriFile, ext); //sample
  var f1 = makePath();  //1912
  var f2 = Date.now(); //timestamp
  var f3 = Math.floor(Math.random() * 90 + 10);
  var filename = f1 + '-' + f2 + '-' + f3 + ext;
  console.log(filename);

  return {oriFile, ext, fname, filename};
}

module.exports = { upload };