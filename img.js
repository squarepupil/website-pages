var gm = require('gm');
var fs = require('fs');

var arr = fs.readdirSync("originals");
var done = fs.readdirSync("ghpages/img");

arr.forEach(function (file) {
    if (done.indexOf(file) !== -1) {
        console.log("SKIPPING (already done) " + file);
        return;
    }
   if (file.indexOf(".jpg") !== -1) {
        gm('originals/'+file).
        resize(450).
        noProfile().
        write('newimg/'+file, function (err) {
            if (!err) {
                console.log('DONE with' + file);
            } else {
                console.log(err);
            }
        })
   }
});
