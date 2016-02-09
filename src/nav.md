# Navigation

There are three levels to this menu. The first level is the top bar, green
stretching across. Second is the light bulb menu with main content navigation. 
The third is the drop down menu for the ones with drop downs. Empty otherwise. 

The drop-downs are in their own layer instead of sub-layer so that we can put
them together and they will be visible when there is no javascript. 

But we organize them into columns so that we can have the logo overlapping in
the middle without overlapping any text. Also should make it easier to scale.
The three columns will float to the left. 

    nav
        .info
            .inner
                | \_"home"
                | \_"actions|md"
        .content
            .inner
                #details \_"details|md"
                #logo \_"logo"
                #pathway \_"pathway|md"
        .drop-downs
            | \_"dd layout| jade | compile model"
            | \_"dd layout| jade | compile our"
            | \_"dd layout| jade | compile gallery"
    


* [css](#css "h5:")  Common css
* [big](#big "h5:") Big CSS 1000+ 
* [large](#large "h5: ")  Large CSS, so between moderate and big, probably
  800-1000
* [moderate](#moderate "h5:")
* [small](#small "h5: ")


[js](#js "h5: ")

[|nav](# "transform: | jade |compile pointless ")


##### js

    /*nav.md*/

##### css

    header {
        width:100%;
        position: fixed;
        top : 0;    
        font-family: bebas, serif;
        z-index:20;
    }

    header a {
        color:black;
        text-decoration: none;
    }

    header a:hover {
        text-decoration: underline; 
    }

    header ul {
        display: inline-block;
        margin: 0px;
    }

    header li {
        list-style-type: none;
        display:inline-block;
    }

##### big

##### large

##### moderate

##### small 


## Info

This is the info bar at the top of the page. The bar goes the full width with
an lightly-transparent background of green. 


##### CSS

    nav .info {
        width: 100%;
        margin:0px;
        background: linear-gradient(90deg, rgba(76, 148, 33, 0.78), rgb(76, 148, 33) 20%, rgb(76, 148, 33) 80%, rgba(76, 148, 33, 0.78));
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

##### CSS

There is only one link that is directly under inner.

    .info .inner > a {
        float:left;
    }

### Actions

A few quick links.

    * [Calendar](calendar.html)
    * [Support Us](support.html)
    * [Contact Us](contact.html)


##### css

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


##### CSS

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

    * [The Model](#)
    * [Our School](#)
    * [Gallery](#)

##### CSS


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

##### CSS

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
    
    .drop-downs ul.visible {
        height:auto;
        position:absolute;
        top:5px;
        margin-left:16px;
        transition: height .2s;
    }

    .drop-downs li:nth-child(n+2) {
        margin-left:20px;
    }

    .drop-downs ul:nth-child(1) li:nth-child(3) {
        margin-right:104px;
    }
    
    .drop-downs ul:nth-child(2) li:nth-child(3) {
        margin-right:85px;
    }

    .drop-downs ul:nth-child(3) li:nth-child(3) {
        margin-right:116px;
    }

    #details canvas {
        width:10px;
        height:10px;
        vertical-align:middle;
        padding-left:2px;
        transition: transform 0.5s ;
    }

    #details .active {
        text-decoration: underline;
    }
    
    canvas.down {
        transform: rotate(90deg);
    }
 
        
##### JS

We need to append drop-down arrows to the list elements in the details and
activate them accordingly. 

    var dd = document.querySelector(".drop-downs");
    var drops = document.querySelectorAll(".drop-downs ul");
    var details = document.querySelectorAll("#details li");
    var arrows = [];
    var makeTriangle = _"drop downs/js:triangle";
    var toggler = _":toggler";
    var i, n = details.length;
    console.log(n); 
    for (i=0; i < n; i += 1) {
        arrows.push(makeTriangle(details[i]));    
        details[i].addEventListener("click", toggler(i)); 
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
        drops[i].classList.add("closed");
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
                    details[i].classList.add("active");
                    flag = true;
                } else {
                    details[i].classList.remove("active");
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

### dd layout
 
    ul
        li \_":left | md"
        li \_":right | md"    

### Model

[left]()

    * [Intro](model.html)
    * [Detailed](details.html)
    * [Comparisons](comparisons.html)

[right]()

    * [Confusions](confusions.html)
    * [Resources](resources.html)

### Our 


[left]()

    * [Our Story](our-story.html)
    * [Our Space](our-space.html)
    * [Our Staff](our-staff.html)

[right]()

    * [Our Structure](our-structure.html)


### Gallery

[left]()

    * [Highlights](highlights.html)
    * [Tour](tour.html)

[right]()

    * [Activities](activities.html)
    * [Holidays](holidays.html)


