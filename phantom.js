var pdf = require('phantomjs-pdf');

var options = {
	"html": "F:/WorkSpace/nodejs/markdown/editor.html",
	"css": "F:/WorkSpace/nodejs/markdown/markdown.min.js",
	"js": "",
	"runnings": "",
	"deleteOnAction": false //(Deletes the created temp file once you access it via toBuffer() or toFile())
}

pdf.convert(options, function (result) {
	result.toBuffer(function (returnedBuffer) {});
	var stream = result.toStream();
	var tmpPath = result.getTmpPath();
	result.toFile("F:/WorkSpace/nodejs/markdown/markdown/tmp/1.pdf", function () {});
});