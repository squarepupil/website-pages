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
        .inner.model
                _"details:model"
    .dropdown.outer
        .inner.school
                _"details:school"
    


* [css](#css "h5:")  Common css


[js](#js "h5: ")

[|nav](# "transform: | jade |compile pointless ")


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
        width:98%;

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

    M W<640px {

        header { 
            display: none;
        }

    }


## Info

This is the info bar at the top of the page. The bar goes the full width with
an lightly-transparent background of green. 



### Home

Our home page link

    <a href="index.html">Arts &amp; Ideas Sudbury School</a>


### Actions

A few quick links.

    * [Calendar](calendar.html)
    * [Support Us](support.html)
    * [Contact Us](contact.html)

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
    .spacer
    ul
        li: a(href="space.html") Space
        li: a(href="story.html") Story
        li: a(href="name.html") Name

[model]()

    ul
        li: a(href="model.html") Intro
        li: a(href="indetail.html") Detailed
        li: a(href="comparisons.html") Comparisons
    .spacer
    ul
        li: a(href="questions.html") Questions
        li: a(href="resources.html") Resources

    
### Logo

    <a href="index.html"><img alt="Light bulb and ampersand logo" src="img/lantern.png" /></a>

##### CSS

    #logo {
        position:relative;
        width:50px;
    }

    #logo a {
        position:fixed;
        top:10px;
        z-index:20;
        display:inline-block;
    }

    #logo img {
        width: 50px;
    }

    M W<640px {
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
    * [Stories](stories.html)
    * [FAQ](faq.html)

## Sitemap

This is used for mobile. The idea is that this will be loaded on all pages as
well as the usual nav, but we will switch the visibility. This is inelegant,
but probably efficient. 

We use the extract-links function below to extract already fully formed links.

    <ul>
        <li><a href="/">Arts <span class="amp">&amp;</span> Ideas Sudbury School <img alt="Light bulb and ampersand logo" src="img/lantern.png" /> </a></li>
        <li id="menu">MENU</li>
    </ul>
    <ul class="off">
       <li> <p>The Model</p>
            <ul> 
                _"details:model| jade |extract-links"
            </ul>
       </li>
       <li> <p>Our School</p>
            <ul>
                _"details:school | jade | extract-links"
            </ul>
        </li>
        _"details | jade | extract-links e(':nth-child(3)')"
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
    }

    .sitemap a {
        text-decoration:none;
        color:whitesmoke;
    }
        

    .sitemap img {
        width: 16px;
        position: fixed;
        top: 6px;
        left: 40px;
    }
    .sitemap p {
        margin: 0px;
        color: #CEB1B1;
    }

    .sitemap ul ul {
        margin-left: 25px;
    }

    .sitemap li+li {
        padding-top: 4px;
    }

    M W>641px {
        .sitemap.js {
            display:none;
        }
        
        .sitemap ul:first-child {
            display:none;
        }

    }
    
    M W<640px {

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
            transition: right 1s;
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
            transition: right 1.3s;
            padding-bottom: 46px;
        }

        .sitemap .amp {
           padding-left: 2px;
           padding-right: 1.5px; 
        }

    }


##### JS

We need to have the menu be clickable to add the show class. We also want some
js to hide the sitemap since we want it hidden unless javascript is disabled.

    var sitemap = document.querySelector(".sitemap");
    sitemap.classList.add("js");
    var menulist = document.querySelector(".sitemap ul:nth-child(2)");
    document.querySelector("#menu").addEventListener("click",
        function () {
            menulist.classList.toggle("off");
            menulist.classList.toggle("on");
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
        padding-left:2px;
        transition: transform 0.3s ;
    }

    #details .active a {
        text-decoration: underline;
    }
    
    .active canvas {
        transform: rotate(90deg);
    }


    M W<640px {
        .dropdown.active {
            height:40px;
        }
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
    console.log("togglers", n, "drops", drops.length); 
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
that will toggle the menu.

It removes the active class from anything it finds. If the index is the same
as the active class, then we are done. Otherwise, we need to activate it which
is what we do after the loop.

    function (ind) {
        var dd =  drops[ind];
        return function (e) {
            e.preventDefault();
            var i = 0, n = drops.length;
            var cl;
            for (i = 0; i < n; i += 1) {
                cl = drops[i].classList;
                if (cl.contains("active") ) {
                    cl.remove("active");
                    togglers[i].classList.remove("active");
                    if (ind === i) {
                        return;
                    }
                }
            }
            setTimeout(function() {
               dd.classList.add("active");
                togglers[ind].classList.add("active");
            }, 300);
        };
    }

    


