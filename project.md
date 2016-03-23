# [ai-redesign](# "version: 0.2.0; Redesigning A&I's website")

This is the main entry way to compiling the markdown pages into html and
doing whatever else is necessary.

The idea is to have a set of pages in markdown that compiles into a template
with some css to make it all look nice.  

## Announcement

The announcement should be updated as need be. 

    _":md | md"

[md]()

    ## Announcement

    * Open House
    * Awesome news


## Files

* [main.css](#css "save: | caps | postcss autoprefixer ") This is the main css
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

        return '\_"|echo ' + args[0] + '/' + input + '|' +
            'noop gSet(kv(fname, ' + bits.name + args[1] + ')) | ' +
            args[3] + '|'  +
            ' savefile gGet(fname) "';
    }

[fileCompile](# "define:")


[source reading]()

    _"|echo pages |readdir | .mapc fileCompile, pages, .html, .md, 
        _':src compiler' | .join \n | compile bogu "


`[src compiler](# ": | log | jsStringLine |log")`


[src compiler]()

    readfile 
    | process \_"template", \_"announcement", gGet(fname)





[js](#js "h5:") js scattered

#### Process 
    
`| process \_"template", \_"announcement", fname `

The input is a file organized into three chunks: 

1) Title
2) Body for article
3) The aside material
4) previous/next

In addition, the arguments is the html template, the announcement and the
file name. The file name is used for activating the relevant link. 

    function (input, args) {
        var doc = this;
        var md = doc.parent.local.md;
        var cheerio = doc.parent.local.cheerio;

        var $ = cheerio.load(args[0]);
        var announcement = args[1] || '';
        var filename = args[2] || '';
        var fname = filename.split(".")[0];

        var bits = input.split("\n---\n");
        var title = bits[0] || '';

        var article = bits[1] || '';
        article = md.render(article);

Add in the title both in the head and the article; easier to pop it in here.

        if (title) {
            article = "<h2>" + title + "</h2>\n" + article;
            $("title").text("A&I "+ title);
        }
        
        _"previous next"

        article += "\n" +  prv + nxt;

        var ind; 
        

        $("article").append(article);

        var aside = bits[2] || '';

        _":parse aside"
        
        $("aside").append( announcement + aside);

        _":active page"
        

        return $.html();

    }

[process](# "define: | jshint")


[junk next]()

We have a special syntax for next, namely "NEXT:"  followed by the link and a
description. We generate the relevant HTML here. 

    var next = {};
    next.start = article.indexOf("NEXT:");
    if (ind !== -1) {
        next.end = article.indexOf("\n", next.start);
        next.end = (next.end === -1) ? article.length : next.end;
        next.text = article.slice(next.start + 5, next.end).trim();
        next.space = next.text.indexOf(" ");
        next.link = next.text.slice(0, next.space);
        next.label = next.text.slice(next.space+1);
        next.str = "<a class='next' href='" + 
            next.link + "'>" + next.label + "</a>";
        article = article.slice(0, next.start) + next.str + 
            article.slice(next.end+1);
    }   

[active page]()

This is about finding the active page. 

    var here = $("[href='" + filename + "']");
    here.addClass("current");
   
    var drops = here.parents(".dropdown");
    if (drops.length > 0) {
        drops.addClass("active");
        var inner = here.parents(".inner");
        var cl;

        if (inner.hasClass("school") ) {
            cl = "school";
        } else {
            cl = "model";
        }
        var det = $("#details ." + cl);
        det.addClass("active");
    }
   

[parse aside]()

Here we look for caps, colon after a new line. We then make pieces out of
these. 

Then we try to match with a
function and produce some html. 

        aside = {
            text : "\n" + aside.trim(),
            reg : /\n([A-Z]+)\:/g,
            matches : [],
            bits : []
        };
        var tags = _":tags";
        while ( (aside.match = aside.reg.exec(aside.text)) ) {
            aside.matches.push([
                aside.match[1], 
                aside.match.index, 
                aside.reg.lastIndex]
            );
        }
        
        aside.matches.forEach(function (el, ind, arr) {
            var tag = el[0];
            var start = el[2];
            var end;

Figure out where to cut the text string.

            if (ind < arr.length-1) {
                end = arr[ind+1][1];
            } else {
                end = aside.text.length;
            }

            console.log(tag, start, end, aside.text.slice(start, end).trim());

            
           if (tags.hasOwnProperty(tag)) {
                aside.bits.push(tags[tag]( 
                    aside.text.slice(start, end).trim()
                ));
           } else {
                aside.bits.push(aside.text.slice(el[1], end));
           }
        });

        aside = aside.bits.join("\n");

[tags]()

Tags include IMG, QUOTE, SIG, SPACE

    {
        IMG : function (str) {
            var ind = str.indexOf(" ");
            return "<img href='" + str.slice(0, ind) +
                "' alt='" + str.slice(ind + 1) +"'/>";
        }, 
        QUOTE : function (str) {
            return "<blockquote>" + md.render(str) + "</blockquote>";
        },
        SIG : function (str) {
            return "<figcaption>" +  md.render(str) + "</figcaption>";
        },
        SPACE : _":space",
        F : function () {
            return "<figure>";
        },
        E: function () {
            return "</figure>";
        }
    }


[space]()

Here the supplied text may be a class name, a `300px` which gives height
style, or a place in the text to hook into which starts with `#section` where
section is the id heading that it is linked to. 

    function (str) {
        console.log(str);
        if (str[0] === "#") {
            return "<div data-match='" + str+ "'></div>";
        } else if (str[0].search(/[0-9]/) === 0) {
            return "<div style='height:" + str + "'></div>";
        } else {
            return "<div class='" + str + "'></div>";
        }
    }

##### JS

This is some js to line up the space for those with a data-match attribute.

    var asideHeight = _":per element";
    var resizing = false;
    window.addEventListener("load", asideHeight);
    window.addEventListener("resize", function() {
        if (!resizing) {
            resizing = true;
            setTimeout(function() {
                resizing = false;
                asideHeight();
            }, 100);
        }
    });


[per element]()

For each element found, we want to line it up to the id. This is creating the
space required to get from current position to new position. 

    function () {
        var arr = document.querySelectorAll("[data-match]");
        leak = arr;
        console.log("hey");
        var i, n = arr.length, el, id;
        for (i = 0; i <n; i += 1) {
            el = arr[i];
            id = document.querySelector(el.getAttribute("data-match"));
            console.log(id, el.getAttribute("data-match"));
            el.style.positon ="relative";
            el.style.height = -el.offsetTop+id.offsetTop + "px"
        }
    };

    

[junk]()
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


[noop]()

This passes the incoming text along. It does nothing except it does allow one
to have subcommands working.

    function (input) {
        return input;
    }

[noop](# "define:")


### Previous Next

This section handles creating previous and next directions.

This uses the pre-compiled previous, next format. 

    var np = _":pn-json | eval _":pn-making" ";
    if (np.hasOwnProperty(fname)) { 
        var prv = np[fname][0];
        var nxt = np[fname][1];

        console.log(prv, nxt, fname);

        if (prv) {
            prv = '<div class="previous">PREVIOUS: ' + prv + '</div>';
        }
        if (nxt) {
            nxt = '<div class="next">NEXT: ' + nxt + '</div>';
        }
    } else {
        console.log("no next or previous for " + fname);
    }


[pn-json]()

This defines the cycle of pages for the previous and next buttons. 

    index : Home
    model : The basics of our model
    indetail : Our model in-depth
    comparisons: How our model compares to alternatives
    confusions: Some common questions about the model
    resources: Further reading
    our-structure: Our governing structure
    our-staff: Our staff
    our-space: Our space
    our-name: What our name means
    admissions: What our admissions process looks like
    tuition: The prices we have
    faq: Common questions
    gallery:  Incredible photos of our school.
    stories: Tales from inside and out 
    contact: How to contact us

    index, model, indetail, comparisons, confusions, resources,
    our-structure, our-staff, our-story, our-name, admissions, tuition,
    faq, gallery, stories, contact

[pn-making]()

This converts this into pn-json. This code is being evaled. The
incoming text is in `text` and that is the variable whose .toString is
returned by the evaling. 

It expects the top to be of the form `key : description` where key is the name
part of a filename. The bottom is a comma separated list of those filenames
that define a cycle for the keys. 

The result is an object with key of being the fname without extension pointing
to a two element array of `[prv, next]` links, possible empty strings.

    var temp =  text.split("\n\n");
    var prelinks = temp[0];
    var cycle = temp[1];
    var links = {};



    prelinks.
        split("\n").
        forEach(function (el) {
           var pieces = el.split(":");
           links[pieces[0].trim()] = '<a href="'+
            pieces[0].trim() + '.html" >' +
            pieces[1].trim() + '</a>';
        });


    var ret =  {};
    
    cycle = cycle.
        split(",").
        map(function (el) {
            return el.trim();
        }).
        forEach(function(key, ind, arr) {
            ret[key] = [
                links[arr[ind-1]] || '',
                links[arr[ind+1]] || ''
            ];
        });

    text = JSON.stringify(ret);




## Template

This is the main html template. It contains all the boiler plate and harmless
HTML elements for replacing. 

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>A&amp;I</title>
        <link href="main.css" rel="stylesheet">
        <style></style>
        _":shim"
      </head>
      <body>
        _":body |jade | compile bogus"
        <script>
            _"js | .join \n | jshint "
            _"nav::js | .join \n | jshint "
        </script>
      </body>
    </html>


We need to load up the [nav](nav.md "load:")

We also institute the h5 for js


[body]()

    main.outer
        .inner
            article
            aside 
    header \_"nav::nav"
    footer.outer 
        .inner \_"footer|md"




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

    _"colors fonts"

    _"borders padding"

    _"layout"

    _"nav::css | .join \n  "

    _"footer:css"

### Layout

We put header on top with fixed placement, footer on the bottom, and we put a
healthy margin above and below main. All of our containers have an outer and
an inner with the outer being the full width handling full width colors and
borders while the inner provides the constraining width. 

    header {
        position: fixed;
        top: 0;
    }

    main {
        margin-top:150px;
        margin-bottom:50px;
    }

    main .inner {
        display:flex;
        justify-content:space-between;
    }   

    footer {
        position: fixed;
        bottom:0;
    }

    .outer {
        width: 100%;
        padding: 5px;
    }

    .inner {
        min-width: 600px;
        max-width: 1000px;
        width: 80%;
        margin-left:auto;
        margin-right:auto;
    }

    article {
        flex:4;
        margin-right:20px;
    }
    
    aside {
        flex: 1;
        border: none;
    }


### Colors fonts

    @font-face {
       font-family : "bebas";
       src : url("bebas.ttf");
    }
    
    header {
        font-family: bebas, serif;
        font-size:15px;
        background-color:white;
    }
    
    .info {
        background-color: rgb(76, 148, 33);
    }

    footer {
        background-color: #E0DFD6;
    }

    #actions a {
        color: white;
        font-size: 0.8em;
    }

    .dropdown {
        background-color: grey;
    }

    
        

### Borders padding

Here we deal with some of the border and padding on the large scale. 

    .info {
      border-bottom: black solid 2px;
      padding-top: 7px;
      padding-bottom:7px;
    }

    .content {
        border-top: black solid 2px;
        border-bottom: grey solid 2px; 
    }
    
[junk]()


The background will be gray white 

    html {
        background-color: #f0f0f0;
    }

    main {
        background-color:white;
        width:60%;
        margin-top:100px;
        margin-left:auto;
        margin-right:auto;
        padding-top:0.5rem;
        padding-bottom:1rem;
        display:flex;
    }

    h1, h2, h3 {
        margin-left: 1rem;
    }
 



    aside > ul {
        position: fixed;
        top: 30vh;
    }

    p {
        margin: 1rem 1rem 1rem 1rem;  
    }




###  DELETE Layout

The layout is fairly simple. We flexbox vertically to have the header at the
top, the main in the middle, and then the footer at the bottom. 

    html, body {
        margin:0;
        height:100%;
        min-height:100%
    }

    body {
        margin:0;
        display:flex;
        flex-direction:column;
    }

    header {
        order: 1;
        flex-shrink: 0;
        flex-basis: 50px;
    }

    main {
        order:2; 
    }

    article {
        height:1000px;
        background-color:red;
    }

    footer {
        order: 3;
        flex-shrink:0;
        flex-basis: 50px;
    }


(Above taken from [SO](http://stackoverflow.com/questions/19477707/html5-three-rows-flexbox-with-fixed-top-bottom-and-scrollable-middle) , [fiddle](https://jsfiddle.net/njfmt7w0/)  )

So that stacks the stuff in the right order and fixes the header, footer.

Nav.md handles the header internals and the footer is handled below.

For the 


### Sidebar

This sidebar is flexible. Ideally it should pull from other bits. 
    
    * Open House ....
    * [Gallery](gallery.html)
    * [Testimonials](testimonials.html)
    * [Blog](http://blog.aisudbury.com)
    _"nav::actions" 




### Footer

    * Arts & Ideas Sudbury School 
    * A&I
    * 4915 Holder Avenue, Baltimore, MD 21214 
    * 410-426-0001
    * [![Facebook](img/flogo.png)](https://www.facebook.com/Arts-Ideas-Sudbury-School-372859716072)
    * [![Blog](img/blog-logo.gif)](http://blog.aisudbury.com)


[css]()

We want it to be on a single line, images small

    footer img {
        width:12px;
    }

    footer {
        position:fixed;
        bottom:0;
        width:100%;
    }
    
the above color is kind of a yellow-brown that flows from the grass. 
previous color of pale blue: #9797FF;
previous color of yellow burn: #9E9A6C


    footer ul {
        display:flex;
        margin-left:0;
        margin-right:auto;
        padding-top:3px;
    }

    footer li:nth-last-child(1n+2) {
        margin-right:10px;
    }

    footer li:nth-child(1n+3) {
        list-style-type:disc;
        margin-left: 20px;
    }

We also want to hide the first or second item depending on the width. The
first item is for wide footer, the second is for short. 

    M W>954px {
        footer li:nth-child(2) {
            display:none;
        }
    }

    M W<953px {
        footer li:nth-child(1) {
            display:none;
        }
    }


    
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

[sass](# "transform: | sass ")


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
        setTimeout(function () {
            if (processing) {
                return;
            }
            processing = true;
            cp.exec('node node_modules/.bin/litpro', _":post litpro"); 
        }, 100);
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

        args.build = ["output"];
        //args.src = ".";

The local property was in the code, but not sure how it is being used.
Probably can remove it. 

        if (!Folder.prototype.local) {
            Folder.prototype.local = {};
        }

        require('litpro-jshint')(Folder, args);

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

## caps

The idea of this is to use capital letters as abbreviations. This is not
elegant, but it is kind of cool.

    function (input) {
        var matches = _":matches";

        var i = 0; 
        while (i < input.length) {
            if (matches.hasOwnProperty(input[i]) ) {
                match = matches[input[i]];
                if (typeof match === "string") {
                    input = input.slice(0, i) + match + input.slice(i+1);
                } else if (typeof match === "function") {
                    input = match(i, input);
                }
            }
            i += 1;
        }

        return input;
    }

[caps](# "define:")


[test | M W>900px a](# "store: | caps | assert echo('@media (min-width: 900px) a') , caps test ")

[matches]()

These are the matches. Each match is either a simple string or a function that
takes in the index and string and returns the replaced string.
    
    {
        M : "@media",
        W : function (ind, input) {
                _":width"
            }
    }

[width]()

The width converts "<" and ">" into max and min widths. It is to be surrounded
by parentheses. It should be of the form `W<600px `  with no spaces until
after the unit. 

    var end = input.indexOf(" ", ind);
    var num = input.slice(ind+2, end);
    var rep;
    if (input[ind+1] === "<") {
        rep = "(max-width: " + num + ")";
    } else if (input[ind+1] === ">") {
        rep = "(min-width: " + num + ")"
    } else {
        return input;
    }
    return input.slice(0, ind) + rep + input.slice(end);

## assert eq

This is a little command that should be more general. It tests for equality of
the strings. 

    function (input, args) {
        var doc = this;
        if (input !== args[0]) {
            doc.log("FAIL: " + args[1] + "\nACTUAL: " + input + 
                "\nEXPECTED: " + args[0]); 
        }
    }

[assert](# "define:")


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
        markdown-it-anchor 2.3.0, litpro-jshint 0.2.1,  
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


