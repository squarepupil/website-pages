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
            #logo \_"logo desk"
            #pathway \_"pathway|md"
    .dropdown.outer          
        .inner.model
                _"details:model"
    .dropdown.outer
        .inner.school
                _"details:school"
    


* [css](#css "h5:")  Common css


[js](#js "h5: ")

[|nav](# "transform: | pug |compile pointless ")


##### js

    /*nav.md*/

##### css

Header will be flexboxed into the top despite being below in source order.
That will be done in the main layout. 


    header {
        width:100%
    }

    header > .outer {
        padding-top: 7px;
        padding-bottom: 7px;
    }

    header a {
        color:black;
        text-decoration: none;
    }

    header a:hover {
        text-decoration: underline; 
    }

    header a.current {
        text-decoration: underline;
    }

    _":layout "
    

[layout]()

So we want to layout the basic layout of the three layers. All of them will
have the inner class setting the max-width. We then flex twice, once for the
immediate layout which is always three items with the center being reserved.
Then inside each are the left and right bits that should also be flexed. 
    

    header .inner {
        display:flex;
        justify-content:space-between;  

    }

    header .inner ul {
        display:flex;
    }

    #actions li:nth-child(1n+2) {
        margin-left: 15px;
    }

    header .spacer {
        display: inline-block;
        width: 50px;
    }

We also need to specify the main widths of each of the blocks inside inner

    header .inner > :nth-child(2n+1) {
        width: 44%;
    }
    

For different levels, we have different design considerations. In the top
level, we want flush.

    #actions ul {
        justify-content:space-between;
    }

    #details ul, #pathway ul {
        justify-content: space-between;
    }   

   .dropdown ul {
        justify-content: flex-start;
    }


    .dropdown ul li+li {
        margin-left:2em;
    } 

    /*
    .dropdown ul:first-child {
        justify-content: flex-start;
    }


    .dropdown ul:first-child li+li {
        margin-left:2em;
    }
    
    .dropdown ul:nth-child(3) {
        justify-content: flex-end;
    }
    */



This is for small screens.

    M W<670px {

        header { 
            display: none;
        }

    }


## Info

This is the info bar at the top of the page. The bar goes the full width with
a lightly-transparent background of green. 



### Home

Our home page link

    <a href="index.html">Arts &amp; Ideas Sudbury School</a>


### Actions

A few quick links.

    * [Calendar](calendar.html)
    * [Support Us](support-us.html)
    * [Contact Us](contact-us.html)

### Details

The structure is an unordered list for each of the list items is to have the
first child of the list item be the toggle item (class arrow) and the second
div to be the drop-down item (class down)


    ul
        li.arrow.model: a(href='#') The Model
        li.arrow.school: a(href="#") Our School
        li: a(href='admissions.html') Admissions


[school]()

    ul
        li: a(href="organization.html") Organization
        li: a(href="staff.html") Staff
        li: a(href="space.html") Space
        li: a(href="history.html") History
        li: a(href="name.html") Name


[model]()

    ul
        li: a(href="introduction.html") Introduction
        li: a(href="detailed.html") Detailed
        li: a(href="comparisons.html") Comparisons
        li: a(href="questions.html") Questions
        li: a(href="resources.html") Resources
    
### Logo desk

    <a href="index.html"><img alt="Light bulb and ampersand logo" src="img/_'logo'" /></a>

#### Logo

lantern.png

    logo.svg

##### CSS

    #logo {
        position:relative;
        right: 0px;
        transition: right 0.3s;
    }

    #logo a {
        position:fixed;
        top:10px;
        z-index:20;
        display:inline-block;
        transition: top 0.3s;
    }

    #logo {
        width:50px;
    }

    #logo img {
        width: 50px;
        height:100%;
        transition: width 0.3s;
    }


We have a small class attached to the bulb when the dropdown is down. 

    #logo.small {
        right:-8px;
        transition: right 0.3s;
    }

    #logo.small a {
        top: 7.5px;
        transition: top 0.3s;
    }

    #logo.small img {
        width: 34px;
        transition: width 0.3s;
    }

    M W<900px {
       .inner {
            width: auto;
            margin-left: 20px;
            margin-right: 20px;
       }
    }

    M W<670px {
        #logo {
            position:fixed;
            right:-5px; 
        }
        #logo a {
            top:-1px;
        }
        #logo img {
            width:31px;
        }
    }



### Pathway

    * [Tuition](tuition.html)
    * [Gallery](gallery.html)
    * [Testimonials](testimonials.html)
    * [FAQ](faq.html)

## Sitemap

This is used for mobile. The idea is that this will be loaded on all pages as
well as the usual nav, but we will switch the visibility. This is inelegant,
but probably efficient. 

We use the extract-links function below to extract already fully formed links.

    <ul>
        <li><a href="/">Arts <span class="amp">&amp;</span> Ideas Sudbury School <img alt="Light bulb and ampersand logo" src="img/_'logo'" /> </a></li>
        <li id="menu">MENU</li>
    </ul>
    <ul class="off">
       <li id="sitemap-model"> <p class="active arrow mobile">The Model</p>
            <ul class="site-drop active mobile"> 
                _"details:model| pug |extract-links"
            </ul>
       </li>
       <li id="sitemap-school"> <p class="active arrow mobile">Our School</p>
            <ul class="site-drop active mobile">
                _"details:school | pug | extract-links"
            </ul>
        </li>
        _"details | pug | extract-links e(':nth-child(3)')"
        _"pathway | md | extract-links"
        _"actions | md | extract-links"
    </ul>

[extract-links]()

We need the extract-links function for the above. It takes in some html, and
extracts all "li" elements. If there is a first argument, it denotes the
range. We could do more, but currently don't need it.

    function (input, args) {
        var doc = this;
        var cheerio = doc.parent.local.cheerio;
        var $ = cheerio.load(input);
        var links = $("li" + (args[0] ? args[0] : "" ) );
        return links.toString();
    }

[extract-links](# "define:")


##### CSS

We need to style the site-map. For non-mobile, we hide it with javascript. It
is a backup for non-js. 

    .sitemap > ul {
        background-color: #296087; 
        color: whitesmoke;
        position: relative;
        padding:5px;
        padding-left: 19px;
    }

    .sitemap a {
        text-decoration:none;
        color:whitesmoke;
    }
        

    .sitemap img {
        width: 16px;
        position: fixed;
        top: 6px;
        left: 59px;
    }
    .sitemap p {
        margin: 0px;
        color: #CEB1B1;
    }

    #sitemap-model, #sitemap-school {
        padding-bottom:23px;
    }

    .sitemap ul ul li, .sitemap ul:nth-child(2) > li:nth-child(n+4) {
        padding-top: 6px;
    }

    M W>671px {
        .sitemap.js {
            display:none;
        }
        
        .sitemap ul:first-child {
            display:none;
        }

    }
    
    M W<670px {

       #menu {
            background-color:whitesmoke;
            color: black;
            border-radius:5px; 
            padding: 5px;
            padding-bottom:4px;
            padding-top:2px;
       }

       .sitemap > ul:first-child > li:first-child {
        padding-top:3px; 
       }

       .sitemap.js {
            position: fixed;
            top:0;
            width:100%
       }

       .sitemap .off { 
            right:-180px;
            transition: right 0.8s;
       }
       
       .sitemap > ul:first-child {
            display:flex;
            justify-content:space-between; 
        }

        .sitemap > ul:nth-child(2) {
            width: 150px;
            position: fixed;
            height:100%;
            overflow:auto;
        }

        .sitemap .on {
            right:0px;
            transition: right 0.8s;
            padding-bottom: 46px;
        }

        .sitemap .amp {
           padding-left: 2px;
           padding-right: 1.5px; 
        }

        .site-drop {
            max-height:0;
            overflow:hidden;
            transition: max-height 1s;
        }

        .site-drop.active {
            max-height:8em;
            transition: max-height 1s;
        }

This delays the animation so that it takes place off screen. 

        .sitemap .off .site-drop {
            transition-delay:  0.7s;
            tansition: max-height 0.1s;
        }

    }


##### JS

We need to have the menu be clickable to add the show class. We also want some
js to hide the sitemap since we want it hidden unless javascript is disabled.

We also want to put a listener on the body for closing the menu when the body
is clicked. We need to also prevent the clicking inside the menu from closing 

    var sitemap = document.querySelector(".sitemap");
    sitemap.classList.add("js");
    var menulist = document.querySelector(".sitemap ul:nth-child(2)");
    var sactive = document.querySelectorAll(".sitemap .active");
    document.querySelector("#menu").addEventListener("click",
        function (ev) {
            var i, n=sactive.length;
            menulist.classList.toggle("off");
            menulist.classList.toggle("on");
            for (i = 0; i < n; i += 1) {
                sactive[i].classList.add("active");
            }
            ev.stopPropagation();
        });
    sitemap.addEventListener("click", function (ev) {
        ev.stopPropagation();
    });
    document.querySelector("body").addEventListener("click", function () {
        menulist.classList.add("off");
        menulist.classList.remove("on");
    });


## Drop downs

We have three drop-downs. We want the grey to be below the logo and above the
scrolling text so we set its zindex to 10 while the logo and header have
z-index 20.


##### CSS

These are the classes that handle the display.

    .dropdown.outer {
        height:0px;
        padding:0px;
        overflow-y:hidden;
        transition: height 0.2s;
        /*transition: padding 0.2s;*/
    }
    
    .dropdown .inner > :nth-child(n+2) {
        display:none;
    }   

    .dropdown .inner {
        padding-top:7px;
        padding-bottom:7px;
    }

    .dropdown.active {
        height:32px;
        /*padding:4px;
        transition: padding 0.4s;*/
        transition: height 0.4s;
    }

    .arrow canvas {
        width:10px;
        height:10px;
        vertical-align:middle;
        margin-left:3px;
        transition: transform 0.3s ;
    }
    

    #details .active a {
        text-decoration: underline;
    }
    
    .active canvas {
        transform: rotate(90deg);
    }

    .dropdown .inner ul {
        width: 100%;
        justify-content:space-between;
    }

    .dropdown li {
        width:100px;
    }

    .dropdown li:nth-child(n+2) {
        text-align:center;
    }

    .dropdown li:nth-last-child(1) {
        text-align:right;
    }

    M W<670px {
        .dropdown.active {
            height:40px;
        }
    }

        
##### JS

We need to append drop-down arrows to the list elements in the details and
activate them accordingly. 

We proceed by selecting the arrow and down classes.      

    var togglers = document.querySelectorAll(".arrow");
    var drops = [].concat(
            Array.prototype.slice.apply(document.querySelectorAll(".dropdown")),
            Array.prototype.slice.apply(document.querySelectorAll(".site-drop")));
            console.log(drops);
    var bulb = document.querySelector("#logo").classList;
    var arrows = [];
    var makeTriangle = _":triangle";
    var toggler = _":toggler";
    var i, n = togglers.length;
    console.log("togglers", n, "drops", drops.length); 
    for (i=0; i < n; i += 1) {
        arrows.push(makeTriangle(togglers[i]));    
        togglers[i].addEventListener("click", toggler(i)); 
    }

[triangle]()

Triangle created using canvas. Did to color the triangle appropriately.  

    function (el) {
        var can = document.createElement("canvas");
        can.setAttribute("width", "100");
        can.setAttribute("height", "100");

        var color;
        if (el.classList.contains("mobile")) {
            color = "#CEB1B1"; 
        } else {
            color = "black";
        }

        var ctx = can.getContext("2d");
        ctx.fillStyle=color;
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
that will toggle the menu.

It removes the active class from anything it finds. If the index is the same
as the active class, then we are done (remove lightbulb small size). Otherwise, we need to activate it which
is what we do after the loop.

Doing a hack here. The mobile menu should be handled differently, but don't
really want to think about it. So simply going to ignore the removal if mobile
and index is not i. 

    function (ind) {
        var dd =  drops[ind];
        return function (e) {
            var flag = false;
            e.preventDefault();
            var i = 0, n = drops.length;
            var cl;
            for (i = 0; i < n; i += 1) {
                cl = drops[i].classList;
                if (cl.contains("active") ) {
                    if (cl.contains("mobile") ) {
                        if (ind === i) {
                            cl.remove("active");
                            togglers[i].classList.remove("active");
                            flag = true; // toggling behavior;
                        }
                    } else {
                        cl.remove("active");
                        togglers[i].classList.remove("active");
                        if (ind === i) {
                            bulb.remove("small");
                            return;
                        }
                    }
                }
            }
            setTimeout(function() {
                if (!flag) {
                   dd.classList.add("active");
                    bulb.add("small");
                    togglers[ind].classList.add("active");
                }
            }, 300);
        };
    }


## Next and Previous

This is the stuff that produces the styling for the next and previous 

##### JS

    var farrow = _":full arrow";

    farrow(document.querySelector(".previous a"), 
        document.querySelector(".previous a span"));
    farrow(document.querySelector(".next a"));    

[full arrow]()

This produces a full arrow. We can transform it to get the other direction
(left). 

    function (el, prepend) {
        if (!el) {
            return;
        }
        var can = document.createElement("canvas");
        can.setAttribute("width", "200");
        can.setAttribute("height", "100");

        var color;
        color = "whitesmoke";

        var ctx = can.getContext("2d");
        ctx.fillStyle=color;
        ctx.beginPath();
        ctx.moveTo(0,25);
        ctx.lineTo(0,75);
        ctx.lineTo(100,75);
        ctx.lineTo(100,100);
        ctx.lineTo(200,50);
        ctx.lineTo(100, 0);
        ctx.lineTo(100, 25);
        ctx.lineTo(0,25);
        ctx.fill();
        if (prepend) {
            el.insertBefore(can, prepend);
        } else {
            el.appendChild(can);
        }
        return can;
    }



