# A&I Website

This is the main entry way to compiling the markdown pages into html and
doing whatever else is necessary.

The idea is to have a set of pages in markdown that compiles into a template
with some css to make it all look nice.  

## Announcement

The announcement should be updated as need be. 

    <div class="announce">
       <p> Our next Open House is <a href="https://docs.google.com/forms/d/1rbowCIad1VC8l_GOoP-0gcIBhH8DXWnw1RzbobY6q4w/viewform">Saturday, October 22nd, 10AM</a></p>
    </div>


## Files

* [main.css](#css::css "save: | caps | postcss autoprefixer ") This is the
  main css styling common to all pages. [css](css.md "load:")
* [template.html](#template "save:") This is a template HTML file that is
  mainly used for secret pages and testing. 
* [index.html](#index::page "save:") This is the main homepage. It is
  sufficiently different to merit its own litpro. [index](index.md "load:")
* [gallery.html](#gallery::page "save:") This is a picture gallery. Again,
  sufficiently different.  [gallery](gallery.md "load:")
* [stories.html](#stories::page "save:") This is the page of people's stories,
  etc. [stories](stories.md "load:")
* [calendar.html](#cal::page "save:") This is the calendar page. [cal](cal.md
  "load:")
* We also need to load the sidebars: [sidebar](sidebar.md "load:")

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
            args[3].replace("PAGE", bits.name) + '|'  +
            ' savefile gGet(fname) "';
    }

[fileCompile](# "define:")


[source reading]()

    _"|echo pages |readdir | .mapc fileCompile, pages, .html, .md, 
        _':src compiler' | .join \n | compile bogu "



[src compiler]()

    readfile 
    | images 
    | process \_"template", \_"announcement", gGet(fname), \_"sidebar::PAGE"




[js](#js "h5:") js scattered

#### Process 
    
`| process \_"template", \_"announcement", fname `

The input is a file organized into three chunks: 

1) Title
2) Body for article
3) The aside material MAYBE
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
        var article_title = bits[0] || '';
        var title = fname;
        title = title.replace("-", " ");
        title = title[0].toUpperCase() + title.slice(1);

        var article = bits[1] || '';
        article = md.render(article);

        _"plus to abstract"

Add in the title both in the head and the article; easier to pop it in here.

        if (title) {
            $("main > h2").text(title.toUpperCase());
            $("title").text("A&I "+ title);
        }
        
        $("article > h1").text(article_title);
        
        _"previous next"

        article += "\n" +  prv + nxt;

        $("article").append(article);


        $("aside").append( announcement +
            "<div class='side-story'>" + args[3] + "</div>"
        );

        _":active page"
        
        _":css"

        _":js"

        return $.html();

    }

[process](# "define: ")


[active page]()

This is about finding the active page. 

    var here = $("[href='" + filename + "']");
    here.addClass("current");
   
    var drops = here.parents(".dropdown");
    if (drops.length > 0) {
        drops.addClass("active");
        $("#logo").addClass("small");
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
   

[css]()

This adds some per-page styling if it is in the 3rd split. 

    var css = (bits[2] || '').trim();
    if (css) {
        $("style").append(css);
    }


[js]()

This adds some per-page javascript if it is in the 4th split. 

    var js = (bits[3] || '').trim();
    if (js) {
        $("script").append(js);
    }

[old parse aside]()

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

            //console.log(tag, start, end, aside.text.slice(start, end).trim());

            
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
        var i, n = arr.length, el, id;
        for (i = 0; i <n; i += 1) {
            el = arr[i];
            id = document.querySelector(el.getAttribute("data-match"));
            el.style.positon ="relative";
            el.style.height = -el.offsetTop+id.offsetTop + "px";
        }
    }

    

[noop]()

This passes the incoming text along. It does nothing except it does allow one
to have subcommands working.

    function (input) {
        return input;
    }

[noop](# "define:")



#### Current

This is a little command function that adds the current class to a link
pointing to the passed in file. 

    function (input, args) {
        var $ = this.parent.local.cheerio.load(input);
        var filename = args[0] || '';
        var here = $("[href='" + filename + "']");
        here.addClass("current"); 
        return $.html();
    }

[current-link](# "define:")

### Previous Next

This section handles creating previous and next directions.

This uses the pre-compiled previous, next format. 

    var np = _":pn-json | eval _":pn-making" ";
    var prv, nxt;
    if (np.hasOwnProperty(fname)) { 
        prv = np[fname][0];
        nxt = np[fname][1];

        if (prv) {
            prv = '<div class="previous far">' + prv + '</div>';
        }
        if (nxt) {
            nxt = '<div class="next far">' + nxt + '</div>';
        }
    } else {
    }


[pn-json]()

This defines the cycle of pages for the previous and next buttons. 

    index : Home
    introduction : Introduction 
    detailed : Detailed
    comparisons: Comparisons
    questions: Questions 
    resources: Resources 
    organization: Organization
    staff: Staff 
    space: Space
    history: History
    name: Name
    admissions: Admissions 
    tuition: Tuition
    gallery: Gallery 
    stories: Stories
    faq: FAQ
    contact-us: Contact us
    support-us: Support us
    calendar: Calendar

    index, introduction, detailed, comparisons, questions, resources,
    organization, staff, space, history, name, admissions, tuition,
    gallery, stories, faq, contact-us, support-us, calendar, index

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
            '<span>' + 
            pieces[1].trim() + '</span></a>';
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


### Plus to abstract

Here we want to enable the collapsing of sections using an abstract to replace
the content and make it clickable. Here we just trying to make a section with
abstract class.

We look for !ABS, !BODY, and !END and replace them with dividers that create a
whole section and then a subsection for abstract and main.

    article = article.
            replace(/<p>ABS<\/p>/g, '<div class="brief"><div class="abstract ">').
            replace(/<p>BODY<\/p>/g, '<button name="more">Less...</button>' +
                '</div><div class="substance">').
            replace(/<p>END<\/p>/g, '</div></div>');
    

   
[CSS]()

Here we write the css.

    .brief .abstract {
        background-color: #c1e0ea;
        padding: 5px;
        border-radius: 5px;
        margin-bottom:16px;
        display:flex;
        align-items: flex-end;
        justify-content: space-between;
    }
    
    .brief div button{
        background-color: whitesmoke;
        border-radius: 6px;
        border-style:none;
        padding: 4px;
        margin: 3px;
        font-size: 17px;
        font-family: bebas;
    }
   


##### JS 

This is the JS that will select the brief elements, make them clickable to
toggle the hide. The original state without JS is to have the full text shown.
If JS runs, then it will hide the full text.

The abstract is always on display, but the more disappears when body is shown.  

Clicking the more button needs to hide the more button and show the substance
Clicking the less button hides the substance and shows the more. 
    

    Array.prototype.slice.call(document.querySelectorAll(".brief")).
        forEach(function (el) {
            var button = el.querySelector("button");
            var subst = el.querySelector(".substance");
            button.addEventListener("click", function () {
                if (subst.classList.contains("hide")) {
                    subst.classList.remove("hide");
                    button.innerHTML = "...Less"; 
                } else {
                    subst.classList.add("hide");
                    button.innerHTML= "More...";
                }
            });  
            subst.classList.add("hide");
            button.innerHTML= "More...";
        });




## Commands

Some of the commands defined here. 

* imgsrc. This takes in a file name and outputs an image element with a
  srcset. 
* images. This is for simple image placement in the main document. It is
  parsed as  !fname, caption!alt, classes
* js-string  This makes a snippet into something that can be saved as a
  javascript string to be read in (converts newlines to escaped newlines and
  the surrounding quote type being escaped as well. 

### Imgsrc
      
This deals with different src sizes. It could also generate the different
images if not already present if we convert this to be async, but that might
be best to be a separate script.

The filename can be either the incoming stream or the first argument. The next
argument (first or second, depending) is the alt text for the image and the
following argument is a class list (space separated). 

    function (input, args) {
        input = input || args.shift();
        var alt = args.shift() || '';
        var cls = args.shift() || '';
        return '<img src="gen/' + input + '.jpg" ' + 
            'srcset= "gen/' + input +'-s.jpg 1w, ' + 
                'gen/' + input + '-m.jpg 500w, gen/' + 
                input + '-l.jpg 1000w, gen/' +
                input + '.jpg 1500w" ' +
            (alt ? 'alt="' + alt +'" ' : '') + 
            (cls ? 'class="' + cls + '" ' : '') +
            '>';
    }

[imgsrc](# "define:  ")

## images

This looks in the text for an image string -- a line starts with an
exclamation mark. The rest of the line is parsed as fname, cap!alt, classes

     function (input, args) {
        var reg = /(?:^|\n)\!([^\n]+)(?:\n|$)/g;
        var m, bits, space, fname, cap, alt, classes, str;
        while ( (m = reg.exec(input)) ) {
            bits = m[1].split(",");
            bits = bits.map(function (el) {return el.trim();});
            if (bits[0]) {
                fname = bits[0].split(".")[0];
                alt = (bits[1] || '').split("!");
                cap = alt[0].trim();
                alt = (alt[1] || '').trim() || cap;
                classes = (bits[2] || '').trim(); 
                str = '<figure' + (classes ? ' class="' + classes + '"': '') + 
                      '><img src="gen/' + fname  + '.jpg" ' +  
                      'srcset="gen/' + fname +'-s.jpg 1w, ' + 
                      'gen/' + fname + '-m.jpg 500w, gen/' + 
                      fname + '-l.jpg 1000w, gen/' +
                      fname + '.jpg 1500w" ' +
                      (alt ? 'alt="' + alt + '"' : '') +
                      '"/>' + 
                      (cap ? '<figcaption>' + cap + '</figcaption>' : '') +
                      '</figure>';

Need to massage the newline capturing in the reg for the positions. 

               input = input.slice(0,m.index+1) + 
                       str + input.slice(reg.lastIndex-1);
            }
        }
        return input;
        
     }


[images](# "define: ")

### js-string

So the input is a string and we escape newlines and quotes, outputting a
quoted string.

    function (input) {
        input = input.
            replace(/\n/g, "\\n").
            replace(/"/g, '\\"');
        return '"' + input + '"';
    }

[js-string](# "define:")




## Template

This is the main html template. It contains all the boiler plate and harmless
HTML elements for replacing. 

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        _":favicon"
        <title>A&amp;I</title>
        <link href="main.css" rel="stylesheet">
        <style></style>
        _":shim"
      </head>
      <body>
        _":body |pug | compile bogus"
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
        h2
        .inner
            article
                h1
            aside 
    header \_"nav::nav"
    footer.outer 
        .inner \_"footer|md"
    .sitemap \_"nav::sitemap"




[shim]()

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

[favicon]()

This was generated by  http://realfavicongenerator.net


    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#14728c">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">




### Footer

    * Arts & Ideas Sudbury School 
    * A&I
    * <a href="https://goo.gl/maps/wDtVMYYgTwM2" target="_blank">4915 Holder<span class="long"> Avenue, Baltimore, MD 21214</span></a>
    * 410-426-0001
    * [![Facebook Logo](img/flogo.png)](https://www.facebook.com/Arts-Ideas-Sudbury-School-372859716072)
    * [![Blog](img/blog-logo.gif)](http://blog.aisudbury.com)



##### js

The footer should be fixed if it is on the screen initially. We do a quick
dirty hack for that. 

    window.addEventListener("load", function () {
        var footer = document.querySelector("footer");
        if (footer.getBoundingClientRect().top < window.innerHeight) {
            footer.classList.add("fix");
        }
    });

    


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
                    //space after cap
                    if (input[i+1] === " ") {
                        input = input.slice(0, i) + match + input.slice(i+1);
                    }
                } else if (typeof match === "function") {
                    input = match(i, input);
                }
            }
            i += 1;
        }

        return input;
    }

[caps](# "define:")


[test | M W>900px a](# "tranform: | caps | assert echo('@media (min-width: 900px) a') , caps test ")

[matches]()

These are the matches. Each match is either a simple string or a function that
takes in the index and string and returns the replaced string.
    
    {
        M  : "@media",
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


