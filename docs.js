var PDFImage = require("pdf-image").PDFImage;
var fs = require('fs');

var arr = fs.readdirSync("ghpages/docs");

arr.forEach(function (file) {
    if (arr.indexOf( file.replace(".pdf", "-0.png") ) !== -1) {
        console.log("SKIPPING (already done): " + file);
        return;
    }
    var pdfImage = new PDFImage("ghpages/docs/"+file);
    pdfImage.convertPage(0);
    console.log("SAVED thumb:" + file);
});
