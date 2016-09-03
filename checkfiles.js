var crypto = require('crypto');
var fs = require('fs');

var hashes = {}; 

var origfiles = fs.readdirSync('assets/originals', {encoding:'utf8'});
var imgfiles = fs.readdirSync('assets/img', {encoding:'utf8'});

console.log(origfiles.length + imgfiles.length);

var i = 0;

origfiles.forEach(function (name) {
    var hash = crypto.createHash('sha256');
    var full = 'assets/originals/' + name;
    var input = fs.readFileSync( full, {encoding:'utf8'});
    hash.update(input);
    var dig = hash.digest('hex');
    //console.log( (i++) + ": " + full + " has hash " + dig);
    if (hashes.hasOwnProperty(dig) ) {
        console.log(full.replace('assets/', '') + ' && ' +
            hashes[dig].replace('assets/', '') );
    } else {
        hashes[dig] = full;
    }
});


imgfiles.forEach(function (name) {
    var hash = crypto.createHash('sha256');
    var full = 'assets/img/' + name;
    var input = fs.readFileSync( full, {encoding:'utf8'});
    hash.update(input);
    var dig = hash.digest('hex');
    //console.log( (i++) + ": " + full + " has hash " + dig);
    if (hashes.hasOwnProperty(dig) ) {
        console.log(full.replace('assets/', '') + ' && ' +
            hashes[dig].replace('assets/', '') );
    } else {
        hashes[dig] = full;
    }
});



