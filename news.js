var PDFImage = require("pdf-image").PDFImage;
var fs = require('fs');

var arr = fs.readdirSync("ghpages/news");

arr.forEach(function (file) {
    if (arr.indexOf( file.replace(".pdf", "-0.png") ) !== -1) {
        console.log("SKIPPING (already done): " + file);
        return;
    }
    var pdfImage = new PDFImage("ghpages/news/"+file);
    pdfImage.convertPage(0);
    console.log("SAVED thumb:" + file);
});
