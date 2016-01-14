var express = require('express');
var pdf = require('phantomjs-pdf');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.post('/convert', function (req, res, next) {
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	var timestamp1 = Date.parse(new Date());

	// 生成PDF配置
	var html = req.body.htmlCotent; //获取html内容
	var options = {
		"html": "<body class='main_con'>" + html + '</body>',
		"css": "F:/WorkSpace/nodejs/markdown/markdown7.css",
		"js": "",
		"runnings": "",
		"deleteOnAction": true
	}
	// 转换
	pdf.convert(options, function (result) {
		result.toBuffer(function (returnedBuffer) {});
		var stream = result.toStream();
		var tmpPath = result.getTmpPath();
		result.toFile("F:/WorkSpace/nodejs/markdown/markdown/public/tmp/" + timestamp1 + ".pdf", function () {
			res.send({
				name: timestamp1
			});
		});
	});
	
	
	
});

module.exports = router;