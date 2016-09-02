# Gallery

This is the gallery page. It consists of displaying all the pictures in the
image gallery. 

A gallery of albums. Each album consists of captions and pictures. 

THOUGHTS: Just three thumbnail pictures per album with a ... picture or something. Show the ui always, have album header at top, caption below, have down and up arrows flip through different albums. 



## Page

    _'project.md::template | replace main, _"albums  "
        | replace style, _"page css | caps" 
        | cheerio head, append, _"pswp css"
        | cheerio body, append, _"pswp html"
        | cheerio body, append, _"pswp js"
        | current-link gallery.html 
        | cheerio main, prepend, <h2>Gallery</h2>
        | cheerio main, append, _"next prev" '

## page css

This is the css for the page that organizes the blocks and footer, etc, 

    main .outer {
        display : flex;
    }

    main .outer .inner {
        padding:5px;

    }
    
    main .inner {
        align-items: baseline; 
        width:100%;
        max-width:initial;
        min-width:initial;
    }
   
This should probably be examined. It was done to get the next from going off
the screen. 

    main .inner.last {
        width:93%;
    }

    main {
        margin-top: 90px;
    }

    .my-gallery {
        display:flex;
        flex-wrap: wrap;
        
    }

    .my-gallery img {
      width: 100%;
    }

    .my-gallery figure {
      display: inline-block;
      margin: 0 5px 5px 0;
      width: 24%;
    }
    .my-gallery figcaption {
      display: none;
    }
    
    .blurb {
        box-shadow: inset 0px 0px 10px #888;
        margin-top:10px;
        margin-bottom:10px;
        padding: 15px;
        margin-left: auto;
        margin-right:auto;
    }

## next prev

    <div class="inner last">
    <div class="previous far"><a href="tuition.html"><span>Tuition</span></a></div>
    <div class="blurb"><a href="https://lightroom.adobe.com/shares/045797a007124252b1060e651abfc2fe">Even More Pictures</a></div>
    <div class="next far"><a href="stories.html"><span>Stories</span></a></div>
    </div>

## Albums

About 10 pictures each. Each section will be read in for file names and a
photoswipe list will be used. 


        
    _"pictures |pswp"



## Pictures

    anything-04.jpg Magic is in the Card
    anything-05.jpg Grass and Sticks
    anything-07.jpg Horsing Around 
    anything-08.jpg Beware of Vader 
    anything-01.jpg Mermaid Exchange Students
    anything-06.jpg Cold Water, Hot Feet  
    anything-12.jpg Selling Rocks and Stuff 
    anything-14.jpg Leaf That Pile Alone
    governance-06.jpg Off-Campus Corporation Meeting
    governance-01.jpg Library Corporation Meeting
    governance-04.jpg Voting in a Chore Checker
    kitchen-02.jpg Breakfast for Lunch
    kitchen-04.jpg Quality Assurance 
    kitchen-01.jpg Student Cashier for Hot Luch Friday
    kitchen-05.jpg Homemade Pizza
    outside-05.jpg Age-mixed Ball Game
    outside-01.jpg Spider Studies 
    outside-02.jpg Porch Talk 
    outside-11.jpg Wall Sitting 
    outside-10.jpg Snow 
    party-04.jpg Costumes All Around
    people-02.jpg Hanging Out on the Stairs 
    people-03.jpg Gathering of the Broom Knights
    people-07.jpg Dining Room Gatherings 
    people-06.jpg Gymnast Spread 
    space-01.jpg Games in the JC Room
    space-04.jpg Social Computer Gaming 
    space-05.jpg Art Room



## Photoswipe

This is a library that implements a nice photo gallery. [Photoswipe](http://photoswipe.com/)

This contains the user-side script embedded in the page. We also have css
links and js links to include. 


### pswp js

Links to js files

    <!-- Core JS file -->
    <script src="pswp/photoswipe.min.js"></script> 

    <!-- UI JS file -->
    <script src="pswp/photoswipe-ui-default.min.js"></script> 

    <script>
        _"pswp embedded js"    
    </script>


### pswp css

links to css files

    <!-- Core CSS file -->
    <link rel="stylesheet" href="pswp/photoswipe.css"> 

    <!-- Skin CSS file (styling of UI - buttons, caption, etc.)
         In the folder of skin CSS file there are also:
         - .png and .svg icons sprite, 
         - preloader.gif (for browsers that do not support CSS animations) -->
    <link rel="stylesheet" href="pswp/default-skin/default-skin.css"> 

Here we modify the caption to be at the top and to have larger font-size.
Probably need to work on this for narrow views. 

    <style>
 
        .pswp__caption__center {
            font-size: 24px;
        }
    </style>

   
### pswp html

This is the basic html for the gallery irrespective of content. 



    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

        <!-- Background of PhotoSwipe. 
             It's a separate element, as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

            <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
            <!-- don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>

            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">

                <div class="pswp__top-bar">

                    <!--  Controls are self-explanatory. Order can be changed. -->

                    <div class="pswp__counter"></div>

                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

                    <button class="pswp__button pswp__button--share" title="Share"></button>

                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

                    <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                          <div class="pswp__preloader__cut">
                            <div class="pswp__preloader__donut"></div>
                          </div>
                        </div>
                    </div>
                </div>

                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div> 
                </div>

                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
                </button>

                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
                </button>

                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>

              </div>

            </div>

    </div>


### pswp cmd

This is the command that creates the needed html from the files. 

This takes in a block of file names and should output an html gallery.

    function (input, args, cb) {
        var doc = this;
        var gm = doc.parent.local.gm;
        var galleryname = args.shift();
        var container = _":container |js-string";
        var item = _":item |js-string";

        var items = input.split("\n");

        var flags = [];

        var done = _":done";
        
        var itemstart = _":item start";

        var itemdone = _":item done";

        items.forEach(function (el, ind) {
            flags[ind] = false;
            var name = itemstart(el, ind); //also parses item into items
            gm(process.cwd() + "/assets/originals/" + name).size(itemdone(ind));
        });
    }

[pswp](# "define:async")
        

[done]()

This is called when all the flags are done.

It first maps the items array into the html of the item. Then it joins them
and puts them in the container html, calling the callback to signal the
command is done. 

    function () {
        var text = container.replace("ITEMS", items.map(function (el) {

Each item comes in the form `[ filename, alt, caption, size]` though the middle two are optional. Trim should be done on all. We need to get 
            
            return item.
                replace("BIG", "gen/" + el[0]).
                replace("MED", "gen/" + el[0].replace(".jpg", "-s.jpg")).
                replace("ALT", el[1] || '').
                replace("CAP", el[1] || el[0]).
                replace("SIZE", el[3]);
        }).join("\n"));
        cb(null, "<div class='outer'><div class='inner'>" + 
           text + "</div></div>");
    }

[item start]() 

This parses the item and returns a name and modifies the item entry. 

The name is defined as everything up to the first space. The caption is what
follows after that. 

    function (el, ind) {
        el = el.trim();
        var space = el.indexOf(" ");
        var item = [el.slice(0, space), el.slice(space+1)];
        items[ind] = item;
        return item[0];
    }

[item done]()

This generates a callback function. The callback should set the appropriate
flag to true, store the size, and then decide whether to call done. 

    function (ind) {
        return function (err, size) {
           if(err) { console.error(err); return;}
            items[ind][3] = size.width + "x" + size.height;
            flags[ind] = true;
            if ( flags.indexOf(false) === -1 )  { // all true
                done();
            }
        };
    }


[container]()

    <div class="my-gallery" itemscope itemtype="http://schema.org/ImageGallery">
    ITEMS
    </div>

[item]()


    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
      <a href="BIG" itemprop="contentUrl" data-size="SIZE">
          <img src="MED" itemprop="thumbnail" alt="ALT" />
      </a>
      <figcaption itemprop="caption description">CAP</figcaption>
    </figure> 


### pswp embedded js

This is code from the example page. 

    var initPhotoSwipeFromDOM = function(gallerySelector) {

        // parse slide data (url, title, size ...) from DOM elements 
        // (children of gallerySelector)
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for(var i = 0; i < numNodes; i++) {

                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes 
                if(figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };



                if(figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML; 
                }

                if(linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                } 

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            // find root element of slide
            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if(!clickedListItem) {
                return;
            }

            // find index of clicked item by looping through all child nodes
            // alternatively, you may define index via data- attribute
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) { 
                    continue; 
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }



            if(index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
            params = {};

            if(hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {

                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function(index) {
                    // See Options -> getThumbBoundsFn section of documentation for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect(); 

                    return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                }

            };

            // PhotoSwipe opened from URL
            if(fromURL) {
                if(options.galleryPIDs) {
                    // parse real index when custom PIDs are used 
                    // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    // in URL indexes start from 1
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            // exit if index not found
            if( isNaN(options.index) ) {
                return;
            }

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll( gallerySelector );

        for(var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i+1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

    // execute above function
    window.addEventListener("load", function () {
        initPhotoSwipeFromDOM('.my-gallery');
    });
