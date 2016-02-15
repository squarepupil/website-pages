# Navigation

There are three levels to this menu. The first level is the top bar, green
stretching across. Second is the light bulb menu with main content navigation. 
The third is the drop down menu for the ones with drop downs. Empty otherwise. 

The drop-downs are in their own layer instead of sub-layer so that we can put
them together and they will be visible when there is no javascript. 

But we organize them into columns so that we can have the logo overlapping in
the middle without overlapping any text. Also should make it easier to scale.
The three columns will float to the left. 

    .info.outer
        .inner
            #home \_"home"
            .spacer
            #actions \_"actions|md"
    .content.outer
        .inner
            #details
                _"details"
            #logo \_"logo"
            #pathway \_"pathway|md"
     .dropdown.outer
        .inner
            .school
                _"details:school"
            .model
                _"details:model"
            .gallery
                _"details:gallery"


    


* [css](#css "h5:")  Common css


[js](#js "h5: ")

[|nav](# "transform: | jade |compile pointless ")


##### js

    /*nav.md*/

##### css

Header will be flexboxed into the top despite being below in source order.
That will be done in the main layout. 


    header {
        font-family: bebas, serif;
        width:100%
    }

    header a {
        color:black;
        text-decoration: none;
    }

    header a:hover {
        text-decoration: underline; 
    }

    _":layout"

[layout]()

So we want to layout the basic layout of the three layers. All of them will
have the inner class setting the max-width. We then flex twice, once for the
immediate layout which is always three items with the center being reserved.
Then inside each are the left and right bits that should also be flexed. 
    

    .inner {
        display:flex;
        justify-content:space-between;  

    }

    .inner ul {
        display:flex;
    }

    header .inner li {
        margin-left: 15px;
    }

    .spacer {
        display: inline-block;
        width: 50px;
    }

[junk]()

    header {
        width:100%;
        position: fixed;
        top : 0;    
        font-family: bebas, serif;
        z-index:20;
    }
    header ul {
        display: inline-block;
        margin: 0px;
    }

    header li {
        list-style-type: none;
        display:inline-block;
    }






    


## Info

This is the info bar at the top of the page. The bar goes the full width with
an lightly-transparent background of green. 


##### CSSi

    nav .info {
        width: 100%;
        margin:0px;
        background: linear-gradient(90deg, rgba(76, 148, 33, 0.78), rgb(76, 148, 33) 20%, rgb(76, 148, 33) 80%, rgba(76, 148, 33, 0.78));
        padding-bottom:12px;
    }

    nav .info .inner {
        width: 60%;
        height:25px;
        margin-left: auto;
        margin-right: auto;
        padding-top:9px;
        /*background-color:#71A952;*/
    }

### Home

Our home page link

    <a href="index.html">Arts &amp; Ideas Sudbury School</a>

##### CSSi

There is only one link that is directly under inner.

    .info .inner > a {
        float:left;
    }

### Actions

A few quick links.

    * [Calendar](calendar.html)
    * [Support Us](support.html)
    * [Contact Us](contact.html)


##### cssi

The actions are the only ul under inner

    .info .inner > ul {
        float:right;
    }

    .info .inner li {
        padding-left: 15px;
    }

    .info .inner ul a {
        color:#f9f9f9;
        font-size:smaller;
    }

## Content


##### CSSi

    .content {
        position:relative;
        width : 60%;
        margin-left:auto;
        margin-right:auto;
        height: 30px;
        font-size:20px;
        background-color:white;
        padding:5px;
        padding-bottom:8px;
        box-shadow: 0px 2px 10px grey;
    }


    #details, #pathway {
        display:inline-block;
        width: 45%;
    }

    #details {
        float:left;
    }

    #pathway {
        float:right;
    }

    #details ul {
        float: right;
    }

    #logo {
        display:inline-block;
        width:10%;
    }
    
    .content li {
        margin-left:10px;
    }


[junk]()

    .content li, .content img {
        margin-left:10px;
    }

    .content .inner {
        margin-left:auto;
        margin-right:auto;
    }



### Details

The structure is an unordered list for each of the list items is to have the
first child of the list item be the toggle item (class arrow) and the second
div to be the drop-down item (class down)


    ul
        li.arrow.school: a(href="#") Our School
        li.arrow.model: a(href='#') The Model
        ii.arrow.gallery: a(href='#') Gallery


[school]()

    ul
        li: a(href="our-story.html") Our Story
        li: a(href="our-space.html") Our Space
        li: a(href="our-staff.html") Our Staff
    .spacer
    ul
        li: a(href="our-structure.html") Our Structure

[model]()

    ul
        li: a(href="model.html") Intro
        li: a(href="details.html") Detailed
        li: a(href="comparisons.html") Comparisons
    .spacer
    ul
        li: a(href="confusions.html") Confusions
        li: a(href="resources.html") Resources


[gallery]()

    ul
        li: a(href="highlights.html") Highlights
        li: a(href="tour.html") Tour
    .spacer
    ul
        li: a(href="activities.html") Activities
        lil: a(href="holidays.html") Holidays



##### CSSi

The JS will draw in the arrows. 

For narrow screens, we want it to be a drop-down that just expands to allow
vertical expansion.

For larger screens, we want the arrowed menu items to align flush
to the left and then spread out to the maximum width. When clicked, a
drop-down should appear below it, grey. The menu'd items should be underlined. 


    



[junk]()

    @media (max-width:800px) {
        #details a:hover {  
            text-decoration: none;    
        }
    }



[junk]()

    #details {
    }

    #details li:first-child {
        margin-left:0px;
    }

    #pathway {
        margin-left:200px;
        margin-right:0;
    }


[example]()

Example of syntax to make varying properties for different sizes.

    #details {
        width: 90%;

        @import table {

        }
            B! 1000px;
            L! 800px;
            M! 500px;
            S! 90%;
    }


        W>L, W<=B  {
            width:50px;
        }

    #details,  {
        width :
    }



### Logo

    <a href="index.html"><img alt="Light bulb and ampersand logo" src="img/ailogo.png" /></a>

##### CSS

    #logo a {
        position:relative;
        top:-30px;
        z-index:20;
        width:70px;
        height:70px;
        border: black 2px solid;
        border-radius:50%;
        background-color:white;
        box-shadow: 0px 2px 5px grey;
        display:inline-block;
        margin-left:10px;
    }

    #logo img {
        display:inline-block;
        width:40px;
        margin-left:15px;
        margin-top:3px;
    }

[junk]()

    #logo {
        position:absolute;
        top:-25px;
        left:380px;
    }

### Pathway

    * [Admissions](admissions.html)
    * [Tuition](tuition.html)
    * [Testimonials](testimonials.html)
    * [FAQ](faq.html)


## Drop downs

We have three drop-downs. We want the grey to be below the logo and above the
scrolling text so we set its zindex to 10 while the logo and header have
z-index 20.

##### CSSi

The drop-down menus  


    .drop-downs {
        background-color:#AEAEAE;
        z-index:10;
        width:60%;
        margin-left: auto;
        margin-right:auto;
        position:relative;
        height:0px;
        font-size:20px;
        box-shadow: inset -2px -2px 2px grey, inset 2px 2px 2px grey ;
        transition: height .2s;
    }

    .hide {
       display:none;
    }

    .open {
       height:33px; 
    }

    .closed {
        height:0px;
       overflow-y:hidden;
    }
    
    .drop-downs > ul.visible {
        height:auto;
        position:absolute;
        top:5px;
        margin-left:16px;
        transition: height .2s;
    }

    .drop-downs > li:nth-child(n+2) {
        margin-left:20px;
    }

    .drop-downs > ul:nth-child(1) > li:nth-child(3) {
        margin-right:104px;
    }
    
    .drop-downs > ul:nth-child(2) > li:nth-child(3) {
        margin-right:85px;
    }

    .drop-downs > ul:nth-child(3) li:nth-child(3) {
        margin-right:116px;
    }

    .arrow canvas {
        width:10px;
        height:10px;
        vertical-align:middle;
        padding-left:2px;
        transition: transform 0.5s ;
    }

    .active {
        text-decoration: underline;
    }
    
    canvas.down {
        transform: rotate(90deg);
    }
 
        
##### JS

We need to append drop-down arrows to the list elements in the details and
activate them accordingly. 

We proceed by selecting the arrow and down classes.      

    var togglers = document.querySelectorAll(".arrow");
    var drops = document.querySelectorAll(".dropdown");
    var arrows = [];
    var makeTriangle = _":triangle";
    var toggler = _":toggler";
    var i, n = togglers.length;
    console.log("togglers", n); 
    for (i=0; i < n; i += 1) {
        arrows.push(makeTriangle(togglers[i]));    
        togglers[i].addEventListener("click", toggler(i)); 
    }

[triangle]()

Triangle created using canvas

    function (el) {
        var can = document.createElement("canvas");
        can.setAttribute("width", "100");
        can.setAttribute("height", "100");

        var ctx = can.getContext("2d");
        ctx.fillStyle="black";
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,100);
        ctx.lineTo(100,50);
        ctx.fill();
        el.appendChild(can);
        return can;
    }

[toggler]()

This toggles the drop-down menu. It takes in a number and produces a function
that will toggle the menu. If nothing is active, our last bit of code hides
the parent.

    function (ind) {
        var dd =  drops[ind]
        dd.classList.add("closed");
        dd.classList.add("hide");
        return function () {
            i = 0, n = drops.length;
            for (i = 0; i < n; i += 1) {
                if (i === ind) {
                    drops[i].classList.toggle("closed");
                    drops[i].classList.toggle("visible");
                    arrows[i].classList.toggle("down");
                } else {
                    drops[i].classList.remove("visible");
                    drops[i].classList.add("closed");
                    arrows[i].classList.remove("down");
                }
            }
            var flag = false;
            for (i = 0; i < n; i += 1) {
                if ( drops[i].classList.contains("visible")) {
                    togglers[i].classList.add("active");
                    flag = true;
                } else {
                    togglers[i].classList.remove("active");
                }
            }
            if (flag) {
                dd.classList.remove("hide");
                dd.classList.add("open");
            } else {
                dd.classList.remove("open");
                setTimeout(function () {
                    dd.classList.add("hide");
                }, 200);
            }
        }
    }


