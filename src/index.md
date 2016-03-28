# Index

This is the litpro part for compiling the unique index page. 

We want something that has a nice word/image gallery as the main mosaic entry
into the site. 

## Page

We will load up the template and then replace the article, put in the banner,
add in some css, hide the lightbulb by default, and throw in some js. 

    _"project.md::template | replace main, _"index body"  
        | cheerio body, prepend, _"banner | jade" 
        | cheerio style, append, _"css" 
        | cheerio #logo, addClass, hide  
        | cheerio body, append, _"scrolling" "


### Index Body

This is the index body. It contains a brief description. 
    
    
    <div class="inner">_":lead | md"</div>

    _":age mixing | blurb"

    _":democracy | blurb"

    _":autonomy | blurb"

the extra div below is to get rid of the flex. bad hack. 

    <div class="inner"><div>_":feeder | md"</div></div>
    

[lead]()

    #### **Arts&Ideas Sudbury School** is a democractic school for ages 5-18. Our philosophy of education emphasizes trust, autonomy, justice, and learning.  


[age mixing]()

    Age-Mixing
    Learning by teaching
    _" |imgsrc kitchen-06, Older and younger in kitchen "

    Children, like adults, thrive in diverse, interesting, and challenging
    environments. One of the most important factors in creating this kind of
    environment at a Sudbury school is age-mixing. When younger and older
    students freely associate with one another, learning accelerates. 

    Younger students engage in (often just by watching) more complex
    activities, and they are motivated to take on big challenges like the
    older students they see around them. They gain exposure to more advanced
    skills and knowledge, and have immense opportunity to look up to a variety
    of role models.

    Older students also benefit deeply from being around younger students.
    They not only develop leadership, nurturance, and a sense of
    responsibility for others, but are also are able to enjoy a lengthened
    childhood themselves by playing and engaging with younger kids without
    fear of judgement. Teenagers at Arts & Ideas are free to move back and
    forth between benefitting from the joy of being a kid and growing and
    learning as they ease their way into becoming an adult. 

[democracy]()

    Authentic Democracy
    The power to be responsible
    _"| imgsrc governance-06, Several students in a committee meeting "
     

    Arts & Ideas operates on the assertion that children are equally deserving
    of the respect and trust that we grant adults. When the inalienable rights
    to life, liberty, and the pursuit of happiness are extended to children,
    responsible choices arise from the sense of duty that that power naturally
    entails. 

    As such, students and staff make the rules and manage day to day
    activities together. Students and staff have equal democratic access to
    draft and amend rules, take part in supporting those rules, and share in
    the administration of conflict resolution and judicial processes. Placed
    in a community, children are as conscientious and compassionate with their
    entrusted authorities as we expect adults to be (and oftentimes moreso).

    Charged with the responsibility to make meaningful decisions for
    themselves and the wider community, children rise to the occasion.


[autonomy]()

    Autonomy
    Structure, not schedules
    _" | imgsrc people-10, Student in tree"
    

    All growing children look for meaning and order; a child's demand to
    understand pushes the way ahead. In this way, they actively construct a
    rich understanding of the world. We believe students learn best at their
    own pace, unencumbered by compulsory lesson plans.

    When they are given the chance, students tune to their individual gifts.
    By choosing each step, students own what they know. This is what it means
    to 'learn how to learn.'

    We recognize learning pursued in this manner may not always appear linear
    and sequential. By design, the methodology will be unique to the learner.
    We are convinced that this is the hallmark of a deep, personalized,
    authentic education and is the 'gold standard' for our culture. We
    challenge the notion that free choice will lead to a lack of discipline
    and commitment. Rather, we have observed that discipline and commitment,
    awakened from within, is a natural outcome of self determination and
    respect.
        
[feeder]()


    Explore our website to discover what makes our school tick and why
    students and their families wouldn’t have it any other way.   

    You can start with a brief [introduction to our model](intro.html).
    

### Blurb

This reads in a blurb for the homepage and outputs the html for it. 

The first line is the topic, the second is a mantra, and the third is a
picture. After that are some paragraphs of text. 

    function (input) {
        var ind = input.indexOf("\n\n");
        var bits = input.slice(0, ind).split("\n");

        var title = "<h3>" + bits[0].trim() + "</h3>";
        var caption = "<figcaption>" + bits[1].trim() + "</figcaption>";
        var img = bits[2].trim();
        

Split the paragraphs on double newline. Then join them with paragraph html
breaks.

        var paragraph = "\n<p>" + 
            input.
                replace(/&/g, "&amp;").
                slice(ind+2).
                split("\n\n").
                join("</p>\n<p>") +
            "</p>";

        return '<div class="blurb"><div class="inner">' +
            '<div class="nottext">' +
            title + 
            '<figure>' + img + caption + '</figure>' +
            '</div>' +
            '<div class="text">' +
            paragraph +
            '</div>' +
           '</div></div>';

    }

[blurb](# "define:")

### Banner

    .hero
        img(src="img/hero.jpg")
        img(src="img/fwordmark.png")
        

### CSS

This is the css of the styling

.hero  {
background:url("img/hero.jpg") no-repeat center 40% fixed;
background-size: cover;
height:70vh;
width:100%;
position:relative;

}

The banner image is in hero. We just do a little centering. 

    .hero img:nth-child(1) {
       width:100%; 
    }

    .hero img:nth-child(2) {
        position: absolute;
        top: 13vh;
        left: 15.3vw;
        width: 70vw;
    }


Here we style the blurbs. The idea is to have the image on the left with a
quote beneath. At top, is the title  

    .blurb {
        width:100%;
        background-color: #e0dfd6;
        margin-bottom: 3rem;
    }

    .blurb .inner {
        padding-top:1rem;
        padding-bottom:1rem;
    }

    .blurb figure {
    }

    figure img {
        width:100%;
    }

    .blurb h3 {
        margin-bottom:2rem;
        text-align: center;
    }

    .blurb .nottext {
        flex:1;
        margin-right : 2rem;
    }

    .blurb .text {
        flex:1;
    }

    .blurb figcaption {
        margin-top: 2rem;
        font-size: 1.3rem;
        text-align: center;
    }

The aside disappearing allows for full text expansion. Also the top margin on
the main part is not needed as large. 

    aside {
        display:none;
    }

    main {
        margin-top:3em;
    }

The one element of h4 is the lead

    h4 {
        margin-bottom:3em;
    }

### Scrolling

    <script>
        _":js | jshint"
    </script>

[js]()

This handles the scrolling of the main image disappearing. When it disappears,
the logo bulb should appear. It should start hidden. 

One complication in the positioning is that the image disappears behind the
nav so its relevant height is a little bit messy. Also the word mark is what
matters and it extends a bit lower as an image than it appears (about 20%)
hence the multiply by 80% and the subtraction from the nav height

    var getY = _":position";
    var fmark = document.querySelector(".hero img:nth-child(2)");
    var logo = document.querySelector("#logo");
    var fheight = fmark.offsetHeight*0.8 - 
        document.querySelector("header").offsetHeight;
    var bigVis = true;

    window.addEventListener("scroll", function (e) {
        var elY = getY(fmark) + fheight;
        console.log(elY, fheight);

banner image has scrolled away, but first time noticed. So we unhide bulb

        if ( (elY < 0) && bigVis) {
            logo.classList.remove("hide");
            bigVis = false;
        } else if ( (elY > 0) && !bigVis) {
            logo.classList.add("hide");
            bigVis = true;
        }
    });


[position]()

This is code taken from 
https://www.kirupa.com/html5/get_element_position_using_javascript.htm
which yields a function that gives us the position
of the top corner. 

    function (el) {
      var yPos = 0;
     
      while (el) {
        if (el.tagName == "BODY") {
          // deal with browser quirks with body/window/document and page scroll
          var yScroll = el.scrollTop || document.documentElement.scrollTop;
     
          yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
          // for all other non-BODY elements
          yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }
     
        el = el.offsetParent;
      }
      return yPos;
    }


### Our External Links

    * [Blog](#)
    * [Facebook](#)
    * [YouTube](#)
    * [Overheard](#)
    * [Gallery](#)
