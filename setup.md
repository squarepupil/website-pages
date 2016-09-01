# [ai-redesign](# "version: 0.2.0; Redesigning A&I's website")

This is the setup for processing the website redesign. 

* [lprc.js](#lprc "save:") This contains the supportive code for compiling the
  litpro in the way we want.
* [package.json](#package "save:") This supports the lprc.
* [.gitignore](#gitignore "save:") gitignore file. 
* [README.md](#readme "save:") This is the readme file. Not that useful. 
* [img.js](#img-reduce "save:") This converts the images in originals and
  puts them in build/gen in three different sizes.
 
## Readme

    This is the website design backbone for the [Arts&Ideas Sudbury
    School](http://aisudbury.org) web page.


## lprc

    module.exports = function (Folder, args) {

        if (args.file.length === 0) {
            args.file = ["project.md"];
        }


        if (!Folder.prototype.local) {
            Folder.prototype.local = {};
        }

        require('litpro-jshint')(Folder, args);
        
        Folder.prototype.local.gm = require('gm');

        _':modules'

    };    
 

[modules]()

    _":pug"

    _":md"

    _":cheerio"

    _":postcss"



[pug]()    

pug converts the pug syntax into html. It is mainly used for structures as
opposed to content. `pug text...|pug`

    var pug = require('pug');

    Folder.sync("pug" , function (code, args) {
        options = args.join(",").trim();
        if (options) {
            options = JSON.parse(options);
        } else {
            options = {'pretty':true};
        }
        return pug.render(code, options); 
    });


[md]()

This uses markdown-it and an add-on of markdown-it-anchor that makes headers
into anchors as on GitHub.  `markdown text...|md`  

    var md = require('markdown-it')({
        html:true,
        linkify:true
    });
    

    Folder.prototype.local.md = md; 

    Folder.sync( "md", function (code, args) {
        return  md.render(code);
    });



[cheerio]()

Cheerio takes in html and can do replacements on it, like jQuery does. The
syntax is  `html... | cheerio selector, method, args to method...`

    var cheerio = require('cheerio');
    Folder.prototype.local.cheerio = cheerio;

    Folder.sync( "cheerio" , function(code, args) {
        var selector = args.shift(); 
        var method = args.shift();
        var n = args.length;
        var $ = cheerio.load(code);
        var el$ = $(selector);
        el$[method].apply(el$, args);
        return $.html();
    });

There is a special function of replacement where the arguments are paired to
be a selector and the html replacement. This is like the standard sub command.

    Folder.sync( "replace" , function(code, args) {
        var selector, replacement;
        var n = args.length;
        var $ = cheerio.load(code);
        for (i = 0; i < n; i += 2) {
            selector = args[i];
            replacement = args[i+1];
            $(selector).html(replacement);
        }
        return $.html();
    });

This takes the incoming code as a replacement 

    Folder.sync("append", function (input, args) {
        var $ = cheerio.load(args[0]);
        $(args[1]).append(input);
        return $.html();
    });

This reads off a title from the article h2 and replaces the subtitle in the
title tag with the heading name. 

    Folder.sync("title", function (input, args) {
        var $ = cheerio.load(input);
        var title = $("article h2").text();
        if (title) {
           $("title").text("A&I "+ title);
        }
        return $.html();
    });

This looks for links with the current page name and makes them active. It should also make the drop-down stuff be open and active, but need to think on that one.

    Folder.sync("current", function (input, args) {
        var $ = cheerio.load(input);
        var links = $("[href='" + args[0] + "']");
        links.addClass("current");
        return $.html();
    });


[postcss]() 

This uses postcss to work its magic on the incoming text. The plugins should
be loaded here; right now it is just autoprefixer. Then it can be used as
`css...|postcss cmd1, cmd2, ...`  

    var postcss      = require('postcss');
    
    Folder.commands.postcss = function (input, args, name) {
        var doc = this;
        var pc = doc.plugins.postcss; 
        var cmds = [];
        if ( (typeof input !== "string") || (input === '') ) {
            doc.gcd.emit("text ready:" + name, input);
            return;
        }
        args.forEach(function (el) {
            if (typeof pc[el] === "function" ) {
                cmds.push(pc[el]);
            }
        });
        postcss(cmds).process(input).then(function (result) {
            result.warnings().forEach(function (warn) {
                doc.log(warn.toString());
            });
            doc.gcd.emit("text ready:" + name, result.css);
        }).catch(function (error) {
            doc.log(error.toString());
        });
    };

    Folder.plugins.postcss = {
         autoprefixer : require('autoprefixer')
    };


## package

The requisite npm package file. 

    {
      "name": "_`g::docname`",
      "description": "_`g::tagline`",
      "version": "_`g::docversion`",
      "homepage": "https://github.com/_`g::gituser`/_`g::docname`",
      "author": {
        "name": "_`g::authorname`",
        "email": "_`g::authoremail`"
      },
      "repository": {
        "type": "git",
        "url": "git://github.com/_`g::gituser`/_`g::docname`.git"
      },
      "bugs": {
        "url": "https://github.com/_`g::gituser`/_`g::docname`/issues"
      },
      "license": "MIT",
      "main": "index.js",
      "engines": {
        "node": ">=0.12"
      },
      "dependencies":{
        _"g::npm dependencies"
      },
      "devDependencies" : {
        _"g::npm dev dependencies"
      },
      "scripts" : { 
        "test" : "node ./test.js"
      },
      "keywords": ["literate programming"],
      "private": true

    }

## Img Reduce

This generates a js file that can be run as `node img.js` It takes files in
the originals directory and puts them in the img direcory with width reduced
to 450px. 

    var gm = require('gm');
    var fs = require('fs');

    var indir = "assets/originals/";
    var outdir = "build/gen/";
    
    var arr = fs.readdirSync(indir);
    var done = fs.readdirSync(outdir);

    var sizes = [["s", 200], ["m", 500], ["l", 800]];

    var create =  _":create";

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

[create]()

This takes in a filename, loads that image, resizes it to the given size, and
outputs where out points to. It logs the results in console. 

This relies on the variables indir and outdir for general input and output. I
may regret this.

    function (orig, out, size) {
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
    }


## gitignore

    node_modules
    assets
    build
    quiet
    output
    *.php
    originals
    old-originals
    .checksum


by [James Taylor](https://github.com/jostylr "npminfo: jostylr@gmail.com ; 
    deps: ;
    dev: litpro 0.12.1, cheerio 0.22.0, markdown-it 7.0.1, 
        markdown-it-anchor 2.3.0, litpro-jshint 0.2.1,  
        pug 2.0.0-beta-5, postcss 5.0.4, autoprefixer 6.0.0,
        gm 1.18.1, pdf-image 1.0.1")


