var gm = require('gm');
var fs = require('fs');

var indir = "originals/";
var outdir = "build/gen/";

var arr = fs.readdirSync(indir);
var done = fs.readdirSync(outdir);

var sizes = [["s", 200], ["m", 500], ["l", 800]];

var create =  function (orig, out, size) {
    gm(indir + orig).
        resize(size).
        noProfile().
        write(outdir + out, function (err) {
            if (!err) {
                console.log('DONE with: ' + orig);
            } else {
                console.log(err);
            }
        });
};

arr.forEach(function (file) {
    if (done.indexOf(file) !== -1) {
        console.log("SKIPPING (already done) " + file);
        return;
    }
    if (file.indexOf(".jpg") !== -1) {
        sizes.forEach(function (el)  {
            create(file, 
                file.replace(".jpg", "-" + el[0] + ".jpg"),
                el[1] 
            );
        });
        create(file, file, 1200);
   }
});
