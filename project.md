# [ai-redesign](# "version: 0.2.0; Redesigning A&I's website")

This is the main entry way to compiling the markdown pages into html and
doing whatever else is necessary.

The idea is to have a set of pages in markdown that compiles into a template
with some css to make it all look nice.  



## Files

* [main.css](#css "save: | postcss autoprefixer ") This is the main css
  styling common to all pages. 
* [template.html](#template "save:") This is a template HTML file that is
  mainly used for secret pages and testing. 
* [index.html](#index::page "save:") This is the main homepage. It is
  sufficiently different to merit its own litpro. [index](index.md "load:")
* [gallery.html](#gallery::page "save:") This is a picture gallery. Again,
  sufficiently different.  [gallery](gallery.md "load:")

And then we have the project oriented files.

* [../lprc.js](#lprc "save:") This contains the supportive code for compiling the
  litpro in the way we want.
* [../package.json](#package "save:") This supports the lprc.
* [../watch.js](#watch "save:") This watches the specified files and directories
  for changes and then implements them. 
* [../README](#readme "save:") This is the readme file. Not that useful. 



### Pages

This is a set of markdown+ files that are used to get the content in. 

We will automatically load all the files in the pages directory and process
them. 

[file reading]()
    
This takes in a file and outputs a command that will read in the file, process
it, and then save it. It assumes the file is of the form `name.ext` and the
arguments are of the form `final extension, initial extension, cmd1, cmd2,
...`

A generated string ought to look like `_"|echo name.md | readfile |
    ... | savefile name.html"`

    function (input, args) {
        var path = require('path');
        bits = path.parse(input);
        if (bits.ext !== args[2]) {
            return '';
        }
        return '\_"|echo ' + args[0] + '/' + input + '|' + args[3] + ' '  +
            ' | savefile ' + bits.name + args[1] + '"\n';
    }

[fileCompile](# "define:")


[source reading]()

    _"|echo pages |readdir | .mapc fileCompile, pages, .html, .md, 
        _':src compiler' | .join \n | compile bogu "


`[src compiler](# ": | log | jsStringLine |log")`


[src compiler]()

    readfile | md | append \_"template", main 


[junk]()

    readfile  
    | .split \n---\n 
    | defaults :css, :hero, :footer, \_'footer', :nav, \_'nav', :bottom
    | minidoc :title, :body 
    | .mapc .trim 
    | .apply :body, md  
    | log 
    | .compile html::template 
    | syntax 

[stringing]()

    function (input) {
        return input.
            split("\n").
            map(function (el) {
                return '"' + el + '"';
            }).
            join('+\n');
    }

[jsStringLine](# "define:")



## Template

This is the main html template. It contains all the boiler plate and harmless
HTML elements for replacing. 

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>A&amp;I <subtitle/></title>

        <link href="main.css" rel="stylesheet">
        <style></style>
        _":shim"
      </head>
      <body>
        <main></main>
        <header>_"nav::nav"</header>
        <footer></footer>
        <script>_"nav::js | .join \n"</script>
      </body>
    </html>


We need to load up the [nav](nav.md "load:")


[shim]()

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->


## CSS
 


    _"css reset"
    _"writ"

    * {
        box-sizing: border-box; 
    }

    @font-face {
       font-family : "bebas";
       src : url("bebas.ttf");
    }

The background 

    html {
        background-color:rgb(76, 148, 33);
    }

    @media (min-width:800px) {
        html {
            background: url("img/background.jpg") no-repeat center top fixed;
            background-size: 100% 100%;
            background-attachment: fixed;
        }
    }

    main {
        background-color:white;
        width:60%;
        margin-top:100px;
        margin-left:auto;
        margin-right:auto;
        padding-top:0.5rem;
    }

    p {
        margin: 1rem 1rem 1rem 1rem;  
    }

    _"nav::css | .join \n  "

    @media (min-wdith:1000px) {
        _"nav::big | .join \n "
        _":big"
    }

    @media (min-width:800px, max-width:999px) {
        _"nav::large| .join \n "
        _":large"
    }

    @media (min-width:600px, max-width:799px) {
        _"nav::moderate| .join \n "
        _":moderate"
    }

    @media ( max-width:599px) {
        _"nav::small| .join \n "
        _":small"
    }



[big]()

[large]()

[moderate]()

[small]()

[junk]()
    
## sass sample

    $color-main:#333;
    $file: "img/awesome.jpg";

    @mixin widths ($base: 5px) {
        width: $base;
        height: 2*$base;
    }

    header {
        width: 5px;
        font : {
            size:54px;
            family: Jubilat, Georgia;
        } 
        @include widths(50px);
        
        &:hover {
            color:$color-main;
            @include widths;
        }

        body.store & {
            background {
                color: lighten($color-main, 40%);
                img: url($file);
            }
        }

        .alert {
            width:5px;
            color:red;
        }

        .alert-positive {
            @extend .alert;
            color:green;
        }

        #logo {
            float:left;
        }
    }
    
    .alert {
        height:10px;
    }

[sass](# "transform: | sass | log")


## Watch

This watches the files specified. When they change, litpro is called to
compile the project. When that is done, the output is rsynced to the test
webpage. 
   
    
    var fs = require('fs');
    var cp = require('child_process');
    var processing = false;
    var files = ['project.md'];
    var dir =['src/pages', 'src'];

    var compile = _":compile";

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





[compile]()

Basically, we will compile using litpro, but we need to turn off the other
processing.

    function () {
        if (processing) {
            return;
        }
        processing = true;
        cp.exec('node node_modules/.bin/litpro', _":post litpro"); 
    };

[post litpro]()

This is after litpro is done processing. We reactivate the compiling path.
This is also a place we could put in something like rsync.  

    function (err, out, stderr) {
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

    }


## lprc

    module.exports = function (Folder, args) {

        if (args.file.length === 0) {
            args.file = ["project.md"];
        }

out is to be checked in, output is not. put images and such in output. that is to be put on the server. Out is for seeing differences in the actual html files. 

        args.build = ["out","output"];
        //args.src = ".";

The local property was in the code, but not sure how it is being used.
Probably can remove it. 

        if (!Folder.prototype.local) {
            Folder.prototype.local = {};
        }

        _':modules'

    };    
 

[modules]()

    _":jade"

    _":md"

    _":cheerio"

    _":postcss"

    _":sass"


[jade]()    

Jade converts the jade syntax into html. It is mainly used for structures as
opposed to content. `jade text...|jade`

    var jade = require('jade');

    Folder.sync("jade" , function (code, args) {
        options = args.join(",").trim();
        if (options) {
            options = JSON.parse(options);
        } else {
            options = {'pretty':true};
        }
        return jade.render(code, options); 
    });


[md]()

This uses markdown-it and an add-on of markdown-it-anchor that makes headers
into anchors as on GitHub.  `markdown text...|md`  

    var md = require('markdown-it')({
        html:true,
        linkify:true
    }).use(require('markdown-it-anchor'));
    

    Folder.prototype.local.md = md; 

    Folder.sync( "md", function (code, args) {
        return  md.render(code);
    });



[cheerio]()

Cheerio takes in html and can do replacements on it, like jQuery does. The
syntax is  `html... | cheerio selector, method, args to method...`

    var cheerio = require('cheerio');

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
                //doc.log(warn.toString());
            });
            doc.gcd.emit("text ready:" + name, result.css);
        });
    };

    Folder.plugins.postcss = {
         autoprefixer : require('autoprefixer')
    };


[sass]()

This takes in some text and compiles it into css using sass. Probably want to
figure out how to throw in libraries or something. 

    var sass = require('node-sass');

    Folder.commands.sass = function (input, args, name) {
        var doc = this;
        sass.render({data: input,
            outputStyle: "compact"
        }, function (err, result) {
            if (err) {
                doc.log("Error in SASS: " + err.message);
            } else {
                doc.gcd.emit("text ready:" + name, result.css.toString("utf8"));
            }
        });
    }
  

## pbcopy

This works on macs.

    function pbcopy(data) { 
        var proc = require('child_process').spawn('pbcopy');
        proc.stdin.write(data);
        proc.stdin.end();
        return data;
    }

[clip](# "define:")

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

## Readme

    This is the website design backbone for the [Arts&Ideas Sudbury
    School](http://aisudbury.org) web page.

by [James Taylor](https://github.com/jostylr "npminfo: jostylr@gmail.com ; 
    deps: ;
    dev: litpro 0.12.1, cheerio 0.19.0, markdown-it 4.4.0, 
        markdown-it-anchor 2.3.0, 
        jade 1.11.0, postcss 5.0.4, autoprefixer 6.0.0,
        gm 1.18.1, pdf-image 1.0.1, node-sass 3.4.2 ")


Need to add in https://www.npmjs.com/package/css-mqpacker for packing media
queries, node-sass for doing sass queries,  css-nano for minimfications. 



## CSS Reset

    /* http://meyerweb.com/eric/tools/css/reset/ 
       v2.0 | 20110126
       License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

## Writ

This is part of writ.css

    /*!
     * Writ v1.0.2
     *
     * Copyright Â© 2015, Curtis McEnroe <curtis@cmcenroe.me>
     *
     * https://cmcenroe.me/writ/LICENSE (ISC)
     */

    /* Fonts, sizes & vertical rhythm */

    html {
      font-family: Palatino, Georgia, Lucida Bright, Book Antiqua, serif;
      font-size: 16px;
      line-height: 1.5rem;
    }

    code, pre, samp, kbd {
      font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
      font-size: 0.833rem;
    }

    kbd { font-weight: bold; }
    h1, h2, h3, h4, h5, h6, th { font-weight: normal; }

    /* Minor third */
    h1 { font-size: 2.488em; }
    h2 { font-size: 2.074em; }
    h3 { font-size: 1.728em; }
    h4 { font-size: 1.44em; }
    h5 { font-size: 1.2em; }
    h6 { font-size: 1em; }
    small { font-size: 0.833em; }

    h1, h2, h3 { line-height: 3rem; }

    /*
    p, ul, ol, dl, table, blockquote, pre, h1, h2, h3, h4, h5, h6 {
      margin: 1.5rem 0 0;
    }
    ul ul, ol ol, ul ol, ol ul { margin: 0; }
    */
    
    hr {
      margin: 0;
      border: none;
      padding: 1.5rem 0 0;
    }

    /* Accounting for borders */
    table {
      line-height: calc(1.5rem - 1px);
      margin-bottom: -1px;
    }
    pre {
      margin-top: calc(1.5rem - 1px);
      margin-bottom: -1px;
    }

    /* Colors */

    body { color: #222; }
    code, pre, samp, kbd { color: #111; }
    a, nav a:visited { color: #00e; }
    a:visited { color: #60b; }
    mark { color: inherit; }

    code, pre, samp, thead, tfoot { background-color: rgba(0, 0, 0, 0.05); }
    mark { background-color: #fe0; }

    main aside, blockquote, ins { border: solid rgba(0, 0, 0, 0.05); }
    pre, code, samp { border: solid rgba(0, 0, 0, 0.1); }
    th, td { border: solid #dbdbdb; }
