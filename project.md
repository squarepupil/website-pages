# [ai-redesign](# "version: 0.1.0; Redesigning A&I's website")

This is the main entry way to compiling the markdown pages into html and
doing whatever else is necessary.

The idea is to have a set of pages in markdown that compiled into a template
with some css to make it all look nice.  

## Files

* [custom.css](#css "save: | postcss autoprefixer ")
* [our-story.html](# "save: | go our-story.md | about ")
* [our-space.html](# "save:| go our-space.md")
* [our-staff.html](# "save:| go our-staff.md")
* [pictures.html](# "save:| go pictures.md")
* [nuts-and-bolts.html](# "save:| go nuts-and-bolts.md")
* [start-at-the-beginning.html](# "save:| go start-at-the-beginning.md")
* [okay-so-youre-sort-of-like.html](# "save:| go okay-so-youre-sort-of-like.md")
* [i-get-it-but-what-about.html](# "save:| go i-get-it-but-what-about.md")
* [index.html](# "save:| go index.md ")
* [where-can-i-learn-more.html](# "save:| go where-can-i-learn-more.md")
* [how-do-we-enroll.html](# "save:| go how-do-we-enroll.md")
* [how-much-does-it-cost.html](# "save:| go how-much-does-it-cost.md")
* [contact-us.html](# "save:| go contact-us.md")
* [supprt-us.html](# "save:| go support-us.md")
* [calendar.html](# "save:| go calendar.md")
* This reduces the images to 450 px. [../img.js](#img-reduce "save:") 
* This converts first pages of pdfs to pictures for thumbnails. [../news.js](#news-page "save:")
* [../docs.js](#news-page "save: | sub /news, /docs") Just piggybacking


---

[go](# "compose: readfile $0 | .split \n---\n | minidoc :title, :body, :gal 
    | .mapc .trim | .apply :body, md | imgf | 
    | .compile template |figure ")
    
This reads in the file, splits on `---` lines, then sticks them in a doc for
keys title, body, gal where gal is short for gallery and it gets translated
into html and css galleries under imgf if present.  We also compile the body
into markdown. The final step is to compile the doc into the template. After
that, we can compile that again with a separate command if the body had stuff
to compile. 


[imgf](# "compose: imgfade :gal, :hgal, :cgal |  .apply :cgal, postcss, autoprefixer 
    | .apply :cgal, wrap, <style>, </style>") 

This takes that which is stored in gal and first transforms it into html and
css stuff that then gets processed by autprefixer. We then wrap it up in a
style tag. We are localizing the gallery fading to simply the documents that
use them. 


[wrap]() 

A simple function that wraps its arguments (think html tags) 

    function (input, args) {
        return args[0] + input + args[1];
    }

[wrap](# "define:")



## Template

This is the template html that we will stick rendered HTML into. 

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>MWIA \1_`:title`</title>

        _":css"
        \1_`:cgal`
        _":shim"
      </head>
      <body>
        _":body | jade | compile"
      </body>
    </html>

[body]()

    header
        .constrainer
            a(href="/"): img(src="img/logo.png", alt="MWIA Tree Logo")
            nav \_`:menu|md` 
            | \_`featured event`

     .container
         h1 \2_`:title`
         | \2_`:hgal`
         | \2_`:body`
     


[css]()
 
Basic bootstrap theme and then any custom css. 


    <link href="/custom.css" rel="stylesheet">


[shim]()

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->


[scripts]()

#Nav

This creates the nav section. We have two different types of nav buttons, one
a drop-down, one direct links. The idea is to have on wide screens: 

1. logo (space) direct buttons
2. centered: drop-down buttons

On small screens, it could be

1. logo
2. direct buttons
3. drop-down (hopefully fits)


[drop-menu]() 

These are the items where the visible nav button creates a drop-list of
options. 

    * [Our school](#os)
        + [Our story](our-story.html)
        + [Our space](our-space.html)
        + [Our staff](our-staff.html)
        + [Pictures](pictures.html)
        + [Nut and Bolts](nuts-and-bolts.html)
    * [How it works](#hiw)
        + [Start at the beginning](start-at-the-beginning.html)
        + [Okay, so you're sort of like ...](okay-so-youre-sort-of.html)
        + [I get it, but what about ...](i-get-it-but-what-about.html)
        + [Where can I learn more?](where-can-i-learn-more.html)
    * [Prospective Families](#pf)
        + [How do we enroll?](how-do-we-enroll.html)
        + [How much does it cost?](how-much-does-it-cost.html)

[button menu]()

This is a set of buttons that go directly to a page. No drop-downs.

    * [Contact us](contact-us.html)
    * [Support us](support-us.html)
    * [Calendar](calendar.html)




## Images

From  http://css3.bradshawenterprises.com/cfimg/ 

For "n" images You must define:
a=presentation time for one image
b=duration for cross fading
Total animation-duration is of course `t=(a+b)*n`

    animation-delay = t/n or = a+b

    Percentage for keyframes:

    0%
    a/t*100%
    (a+b)/t*100% = 1/n*100%
    100%-(b/t*100%)
    100%

[imgfad]()

This takes in an object that has a  string of lines whose format is `imgname
Alt text` and generates the html and css to style it as a cross fading image
The first line of the images is the class name of the container along with the
desired duration per image and length of duration of fading.  The args give
the property name of the string of lines and the names of the html and css
keys.

`imgfad gal, hgal, cgal`  for lines

`imgfader 2 0.3` would be first line (equivalent to defaults, leave blank line if
they are fine). could add detection about `.` to differentiate this line. 


    function (input, args, name) {
        var propkey = args[0]; 
        var htmlkey = args[1];
        var csskey = args[2];
        var temp;

        var prop = input[args[0]];
        if (typeof prop !== "string") {
            prop = '';
        }


        prop = prop.split("\n");
        // if empty
        if ( ( prop.length === 1) && (prop[0].trim() === '') ) {
            input[htmlkey] = '';
            input[csskey] = '';
            return input;
        } else if (prop.length === 1) { // just one image
            input[csskey] = '';
            prop = prop[0];
            temp = prop.indexOf(" "); 
            input[htmlkey] = '<figure><img src="' + 
                prop.slice(0, temp) + '" alt="' +
                prop.slice(temp+1) + '"/></figure>';
            return input;
        }
        // not empty!
        var lead = prop.shift().split(" ")
        var cls = lead[0] || "imgfade";
        var aniname =  cls + "";
        //html
        var html = '<div class="' +cls+'"><div class="dummy"></div><ul>\n' +  
            prop.map(function (el) {
                var space = el.indexOf(" ");
                return '    <li><img src="/img/' + 
                    el.slice(0, space) + '" alt="' +
                    el.slice(space + 1) + '"/></li>';
             }).join("\n") + 
             "\n</ul></div>\n";
        input[htmlkey] = html;
        //css
        cls = "." + cls;
        var n = prop.length;
        var a = parseFloat(lead[1] || "2");
        var b = parseFloat(lead[2] || "0.3");
        var t = (a+b)*n;
        var p1 = Math.round(a*100/t);
        var p2 = Math.round( (a+b)*100/t);
        var p3 = Math.round( 100 - (b*100/t) ); 
        var css = "@keyframes " + aniname + " {" +
            "0% { opacity:1; }" +
            p1+ "% {opacity:1;}" +
            p2 + "% {opacity:0;}" +
            p3 + "% {opacity:0;}" +
            "100% { opacity:1;}" +
            "}\n";

        css += cls + " li {\n" +
            "animation-name: " + aniname + ";\n" +
            "animation-timing-function: ease-in-out;\n" +
            "animation-iteration-count: 1;\n" +
            "animation-duration: " + t + "s;\n" +
            "}\n"; 

        var i;
        for (i = 0; i < n; i +=1 ) {
            css += cls + " :nth-child("+ (i+1) + ") {\n" +
                "animation-delay: " +  (t - (i+1)*(a+b) ) + "s;\n" +
                "}\n";
        }
        //css = "<style>\n" + css + "</style>\n";
        input[csskey] = css;


        return input;
    }


[imgfade](# "define:")


## Figures

We also enable the syntax of, on its own line, a figure placement. 

`FIG(filename, caption/alt, link, size, class, place at top?)`

We do this after the full compilation and do a simple search for the syntax.
Using unicode syntax for parentheses because it otherwise plays havoc with
syntax parentheses matching.  

    function (input, args) {
        var start =0, end, params, figure ; 

        while ( (start = input.indexOf("FIG\u0028")  ) !== -1 ) {
            end = input.indexOf( "\u0029", start);
            _":compute figure html"
            input = input.slice(0, start) + figure + 
                input.slice(end+1);     
        }
        return input;
    }

[figure](# "define:")


[compute figure html]()

We need to parse the arguments; we assume the commas are separators. Then we
put together the figure stuff. 

    params = input.slice(start+4, end).split(",").map(function (el) {
        return el.trim(); });

    figure = "<figure" + 
         (params[4] ? ' class="'+params[4].replace(".", ' ')+'"' : '' )+  
        (params[3] ? ' style="width:'+ params[3] + ';"' : '') +
        ">\n" +
        ( (params[5] === "top") ? 
            '<figcaption>'+params[1] + '</figcaption>\n' : '') +
        (params[2] ?  '<a href="' + params[2] + '">\n' : '') +
        '<img src="' + params[0] + '" alt="'+params[1]+'"/>\n' + 
        (params[2] ? '</a>\n' : '') +
        ( (params[5] !== "top") ?
            '<figcaption>'+params[1] + '</figcaption>\n'  : '' )+
        '</figure>';
        


    


## Common CSS variables

A pale yellow color for the background

[background color](# "store: rgba(189, 238, 198, 1) ")

rgba(253, 250, 219, 1) 
rgba(225, 229, 192, 1); 
rgba(252, 239, 160, 1);
rgba(250, 194, 111, 0.34);

## Colors

This is a list of colors. The transform directive will split on lines and
colons to generate key-values that get stored under color:key.

    headerbg: #E0ECE5
    nav links: green

[colors|](# ":| .split \n | augment arr | .splitsep : 
    | minidoc | .store color: ") 


## CSS

_"css reset"
 

    _"|readfile writ.css"

    * {
        box-sizing : border-box;
    }

    body {
        background-color: white; /*#F1F1EF;*/
        color: #424040;
        margin:0;
    }

    .container {
        margin-left:auto;
        margin-right:auto;
        max-width:950px;
    }
    
    h1, h2, h3 {
        line-height:2rem;
    }

    h2, h3 {
        clear:both;
    }


    _":header"

    _":menu"
    
    _":imgf"

    
    table {
        max-width: 500px;
        margin:0 auto 0;
    }

    figure {
      display:block;
      width:300px;
      float:left;
      margin-top:5px;
    }
    
    figure:nth-of-type(2n+1) {
        float:left;
    }

    figure:nth-of-type(2n) {
        float:right;
    }

    figcaption {
       text-align:center; 
    }



    figure.news img, figure.border img {
        border: 2px solid #aaaadd;
    }

    figure.memberform {
        background-color:white;
    }


    figure.level {
        margin-top:0px;
    }




    .event:visited {
        color:#00e;
    }
    
    #memberpay {
        margin-top:1.2em;
        margin-left:4em; 
        margin-bottom:1.2em; 
        width:250px;

    }

    #memberpay td {
        border-style: none;
    }

    _":media queries"

[header]()

We want the logo on the left, about 30% width and the menu on the right. 

The header will be fixed. The left and right margins and the width are set to
make sure the background covers. 

    header {
        /*margin: -10px 10px 30px 10px; */
        position:fixed;
        top: 0px;
        max-height: 100px;
        width:100%;
        background-color: _"color:headerbg";
        z-index:10;
        padding-bottom:10px;
        padding-left:10px;
        padding-right:10px;
    }



    header img {
        float:left;
        max-width: 350px ;
    }

    header nav {
        position:relative;
        bottom:10px;
        right:0;
    }


    header:after {
        content:"";
        display:table;
        clear:both;
    }
    
    .container {
        margin-top: 125px;
        margin-bottom:50px;
    }




[menu]() 

    header nav li {
        float:left;
        width: initial;
        border: 1px solid #CED8C4;
        text-transform: uppercase;
        padding-left: 2px;
        padding-right: 2px;
        margin-left: 4px;
    }

    header nav a:hover {
        background-color : #CED8C4;
    }

[imgf]() 

    .imgfade {
        margin: 0px auto 10px;
        height:281px;
        width:450px;
        position:relative;
        top:27px;
        box-shadow: 5px 5px 5px #aaa;
        overflow:hidden;
        float:right;
    }

    .imgfade li {
        position: absolute;
        top:-50px;
        left:7px;
        list-style:none;
    }

[media queries]()

    
    @media (min-width:751px) {
        _":moderate"
    }
    
    @media (min-wdith:751px), (max-width:970px) {
        .container  {
            margin-left: 15px;
            margin-right: 15px;

        }
    }


    @media (min-wdith:751px), (max-width:850px) {
        nav li {
            font-size:small;
        }
        h1 {font-size: 2.2em;}
        h2 {font-size: 1.7em;}
        h3 {font-size: 1.5em;}
    }

    @media (max-width:750px) {
        _":moderate small"
    }

    @media (max-width: 750px ) {
        _":small"
    }

    
[moderate]()

    figure.news {
        float:left;
        margin-left:5px;
        margin-right:5px;
    }

    header nav ul li {
        padding-left:0px;
    }

    header nav {
        position:absolute;
        bottom: 36px;
        right:0px;
    }

    header .event {
       display:block;
       position:absolute;
       top:13px;
       right:0; 
    }

    nav a {
        display: inline-block;
        width:100%;
    }

    figure.left:nth-of-type(n) {
        float:left;
    }
    
    figure.right:nth-of-type(n) {
        float:right;
    }
   
    header img {
        position: absolute;
        top:9px;
        left:0px;
    }

    header .constrainer {
        position:relative;
        max-width:950px;
        height:120px;
        display:block;
        margin-left:auto;
        margin-right:auto;
    }


[moderate small]() 


For moderate small screen size, we shrink the font a little for the buttons to
prevent overrunning and we stop the image floating, letting it be at the top.
We then center the headings as well. 

    nav a {
        font-size: 0.8em;
    }
    
    .imgfade {
        float:none;
        max-width:450px;
    }

    h1, h2, h3 {
        text-align:center;
    }

    figure:nth-of-type(n) {
        display:block;
        position:relative;
        float:none;
        max-width:450px;
        margin-left:auto;
        margin-right:auto;
    }
    
    figure.memberform {
        display:none;
    }
    

[small]()

A hack from http://ansciath.tumblr.com/post/7347495869/css-aspect-ratio
Basically the dummy element gives the height of the inline-block. There still
seems to be a little border at small sizes. But this seems stable. 


    .imgfade {
        float:none;
        /*display:inline-block;*/
        position: relative;
        max-width:450px;
        height:auto;
        width:100%;
    }

    .dummy {
        margin-top:66.666%
    }

    .imgfade ul {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .imgfade li {
        left:0;
        top:-43px;
    }




And now we work on getting the menu to fit. Wanted the logo above the menu,
both centered. 


    header > a {
        width: 300px;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }
    
    header img {
        width:300px;
        float:none;
    }
    
    header .constrainer {
        max-width: 550px;
        margin-left:auto;
        margin-right:auto;
    }
    
    nav a {
        font-size: 0.4 em;
    }

    header nav {
        position: static;
        display:block;
        float:none;
        width: 322px;
        margin-left:auto;
        margin-right:auto;
    }

    header ul {
        float:none;
        margin-top:0;
        margin-bottom:0;
        margin-left:3px;
    }
   
    nav:last-child {
        margin-bottom:10px;
    }

    nav:last-child:after {
    content:"";
    display:table;
    clear:both;
    }
   

    header nav li {
        border-left: 0px;
        border-bottom: 0px;
        background-color:#C3D2C9;
        width:initial;
        margin-left: 1px;
        font-size: small; 
        padding-left:2px;
        padding-right:2px;
    }

    header nav li a {
        text-align:center;
    }

    header {
        width:100%;
        padding-left:0;
        padding-right:0;
        max-height:120px;
    }

    .container {
        margin-top: 125px;
        margin-bottom: 20px;
        margin-left:2ch;
        margin-right:2ch;
    }

    figure {
        width:initial;
        max-width:300px;
    }


    h1 { font-size: 1.5em;}
    h2 { font-size: 1.25em;}
    h3 { font-size: 1.15em;}

    .event {
       position:static;
       display:inline-block;
       
    }




## Img Reduce

This generates a js file that can be run as `node img.js` It takes files in
the originals directory and puts them in the img direcory with width reduced
to 450px. 

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

## News page

This generates pngs of the first page in the pdfs

Note that it automatically skips nonpdfs since the replacement will do
nothing. Ha. 

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


## NPM package

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


[../package.json](# "save:")


by [James Taylor](https://github.com/jostylr "npminfo: jostylr@gmail.com ; 
    deps: ;
    dev: litpro 0.11.1, cheerio 0.19.0, markdown-it 4.4.0, 
        markdown-it-anchor 2.3.0, 
        jade 1.11.0, postcss 5.0.4, autoprefixer 6.0.0,
        gm 1.18.1, pdf-image 1.0.1, mailhide 0.1.1, tiny-csv 2.0.0   ")

