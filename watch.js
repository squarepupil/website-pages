var fs = require('fs');
var cp = require('child_process');
var processing = false;
var files = ['project.md'];
var dir =['src/pages', 'src'];

var compile = function () {
    setTimeout(function () {
        if (processing) {
            return;
        }
        processing = true;
        cp.exec('node node_modules/.bin/litpro', function (err, out, stderr) {
            if (err) {
                console.log(err, out, stderr);
                return;
            }
            setTimeout(procfal, 2000);
            console.log(out);
            console.log(stderr);
            if (out.indexOf("NOT SAVED:") !== -1) {
                cp.exec('say "A file is not saved"'); 
            }
        
        }); 
    }, 100);
};;

var filing = function (event, fname) {
    if (files.indexOf(fname) !== -1) {
        compile();        
    }
}

var procfal = function () {
    processing = false;
}

dir.forEach(function (el) {
    fs.watch(el, compile);
});

fs.watch('.', filing);
