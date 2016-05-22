# Index

This is the litpro part for compiling the unique index page. 

We want something that has a nice word/image gallery as the main mosaic entry
into the site. 

## Page

We will load up the template and then replace the article, put in the banner,
add in some css, hide the lightbulb by default, and throw in some js. 

    _"project.md::template | replace main, _"index body"  
        | cheerio body, prepend, _"banner | jade | log | compile index body " 
        | cheerio style, append, _"css | caps" 
        | cheerio #logo, addClass, hide  
        | cheerio body, append, _"scrolling" "


### Index Body

This is the index body. It contains a brief description. 
    

    _":democracy | blurb dem"

    _":autonomy | blurb aut"
    
    _":age mixing | blurb agemix"

the extra div below is to get rid of the flex. bad hack. 

    <div class="outer"><div class="inner tail"><div>_":feeder | md"</div></div></div>
    

[lead]()

    #### **Arts & Ideas Sudbury School** is a democractic school for ages 5-18. We emphasize trust, autonomy, justice, and learning. 

    #### Come visit us and learn more at our [next open house](https://docs.google.com/forms/d/1rbowCIad1VC8l_GOoP-0gcIBhH8DXWnw1RzbobY6q4w/viewform)! 


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
    _"| imgsrc governance-07, Several students in a committee meeting "
     

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

    <div class="next far"><a href="model.html">Introduction</a></div>
   


### Blurb

This reads in a blurb for the homepage and outputs the html for it. 

The first line is the topic, the second is a mantra, and the third is a
picture. After that are some paragraphs of text. 

    function (input, args) {
        var ind = input.indexOf("\n\n");
        var bits = input.slice(0, ind).split("\n");

        var title = "<h2>" + bits[0].trim() + "</h2>";
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

        return '<div class="blurb" id="' + args[0] + 
            '"><div class="inner">' +
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

This includes the wordmark and the lead text



    .hero
        .top
        .inner
            .relative 
                img#wmark(src="img/_'wordmark'")
        .middle
        .bottom
            .inner \_":lead | md" 
        
#### wordmark

    wordmark.png

wordmark.svg


### CSS

This is the css of the styling


    .top {
        height: 118px;
        background-color: #FBAA48; 
    }
    
    .middle {
        height: 91.35px;
        background-color:white;
    }
    
    .bottom {
        padding-top: 95px;
        padding-bottom: 24px;
        background-color: #FBAA48;
        text-align:center;
    }
    
    h4 {
        margin-bottom:0;
    }

    h4+h4 {
        padding-top:14px;
    }

    .relative {
        position: relative;
        width: 622px;
        margin-left: auto;
        margin-right: auto;
    }

    #wmark  {
        position: absolute;
        top: -38px;
        left: 0;
    }
    
    main img {
        border : #FFFFFF solid 5px;
    }

Small version the nav gets twice as large so we need to account for that.
Also the width gets narrower shifting the image. 

    M W<640px {

        .top {
            height: 67px;
            background-color: #FBAA48; 
        }
        
        .middle {
            height: 43.35px;
            background-color:white;
        }
        
        .bottom {
            padding-top: 50px;
            padding-bottom: 1px;
            background-color: #FBAA48;
        }

        h4 {
            font-size:16px;
        }

        h4 + h4 {
            padding-bottom: 11px;
        }
        
        .relative {
            position: relative;
            width: 300px;
            margin-left: auto;
            margin-right: auto;
        }

        #wmark  {
            position: absolute;
            top: -19px;
            left: 0;
            width:100%; 
        }
    }


Here we style the blurbs. The idea is to have the image on the left with a
quote beneath. At top, is the title  

    .blurb {
        width:100%;
        background-color: #eee;
        /*margin-bottom: 3rem;*/
    }

    main > :nth-child(2n+0) {
        background-color: white;
    }

    main > :nth-child(2n+1) {
        box-shadow: inset 0px 0px 10px #888;
    }
    
    .blurb .inner {
        padding-top:2rem;
        padding-bottom:2rem;
    }
    
    .blurb .text {
          text-align: justify; 
    }
    
    .tail {
        padding-top:1rem;
        /*padding-bottom:1rem;*/
    }

    .blurb figure {
    }

    figure img {
        width:100%;
    }

    .blurb h2 {
        margin-bottom:2rem;
        text-align: center;
        font-family: bebas, serif;
        word-spacing:7px; 
    }

    .blurb .nottext {
        flex:1;
        margin-right : 2rem;
    }
    
    main.outer :nth-child(2) .nottext {
        order:1;
        margin-right:0;
        margin-left:2rem;
    }

    main.outer {
       padding:0; 
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
        margin-top:0em;
        margin-bottom:28px;
    }

Because of the picture/text split, we want to make them columned a little bit
later.

    M W<900px {
        
        main .inner {
            min-width:50px;
            flex-direction:column;
            width:auto;
            margin-left:20px;
            margin-right:20px;
        }
        
        .blurb figcaption {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        
        main.outer :nth-child(2) .nottext {
            order:0;
        }
        
        main.outer :nth-child(n) .nottext {
            margin-left:0;
            margin-right:0;
        }
    }

We need some padding for the larger ones to get it to be a little more
centered feeling

    M W>901px {
        #dem .text {
            padding-top: 3rem;
        }

        #aut .text {
            padding-top: 1.5rem;
        }
    }



### Scrolling

    <script>
        _":js "
    </script>

[js]()

This handles the scrolling of the main image disappearing. When it disappears,
the logo bulb should appear. It should start hidden. 

We will use boundingClientRect to get the bottom of the two heights we care
about. 


    var fmark = document.querySelector("#wmark");
    var logo = document.querySelector("#logo");
    var headBottom = document.querySelector("header").
            getBoundingClientRect().bottom;
    var bigVis = true;

    window.addEventListener("scroll", function () {
        var imgBottom = fmark.getBoundingClientRect().bottom;

banner image has scrolled away, but first time noticed. So we unhide bulb

        if ( ( imgBottom < headBottom ) && bigVis) {
            logo.classList.remove("hide");
            bigVis = false;
        } else if ( ( imgBottom > headBottom ) && !bigVis) {
            logo.classList.add("hide");
            bigVis = true;
        }
    });


### Our External Links

    * [Blog](#)
    * [Facebook](#)
    * [YouTube](#)
    * [Overheard](#)
    * [Gallery](#)
