# Sidebar

This creates the sidebar. We have the open house blurb, the quote callouts,
and a picture or video embedding. 

There are no sidebars on the home page, stories, gallery, or calendar page. 

## Create Sidebars

        _" | assemble _"callouts|md", 
            _"sidebar media|md", _"jpg", _"vimeo" "

[](# "transform:")


## Assemble 

    function (input, args) {
        var doc = this;
        var cheerio = doc.parent.local.cheerio;
        var call = cheerio.load(args[0])("li");
        var $ = cheerio.load(args[1]);
        var places = $("li");

        places.each(function (i, elem) {
            var bits = $(elem).html().split(" ");
            var name = bits[0].trim().toLowerCase();
            var media = bits[1].trim().toLowerCase();
            var callout = '<div class="call">' + 
                $(call.get(i)).html() +
                '</div>';
            _":assemble media"    
            doc.store(name, callout + media);

        });

    }


[assemble](# "define:")


[assemble media]()

This chooses an appropriate html result for media, replacing the media
variable with that html. We are importing the html via the arguments. For the
jpg, we use the full name, for the vimeo, we use just the number part. 

    var namePieces = media.split(".").
        map(function (el) {return el.trim();});
    var ext = namePieces[1].toLowerCase();
    if (ext === "jpg") {
        media = args[2].replace(/FNAME/g, namePieces[0]).replace("\n", "");
    } else if (ext === "vimeo") {
        media = args[3].replace(/NUMBER/g, namePieces[0]);
    } else {
        console.error("unrecognized media: ", media);
        media = '';
    }



## Callouts

    1.  “My daughter woke up at 5:00 AM asking if she could go to school yet! There is just no feeling like it.”
    2.  “I feel that A&I has pretty much saved [my son’s] experience with education. I think I have one of the most balanced, self-motivated, and un-cranky teenagers that could ever exist!”
    3.  “The kids learn agency at Arts and Ideas Sudbury School, just 'cause they can.”
    4.  “I want my sprouting bean to be around creative, kind, and nourishing people.”
    5.  “This is [my daughter’s] 2nd year at Arts & Ideas and she’s a much happier kid. Her eyes are bright, her curiosity is unstoppable, and she loves learning a variety of subjects.”
    6.  “Successful people need to be continuous learners and skilled collaborators, eager to try new things and not too worried about whether their experiments will initially fail. Those are the skills that Sudbury nurtures.”
    7.  “I’m so impressed with how wonderfully you’ve all made this space happen.”
    8.  “Our change in schools was the best decision we have ever made for [our daughter]. She truly is a different child!!”
    9.  “I went from worrying about [my kids] every second of the day to not worrying at all.”
    10.  “What we’ve found at Arts & Ideas is the space for [our daughter] to swim on her own terms, in her own way, at her own pace.”
    11.  “This has been the best choice we could have made for our family.”
    13.  “Freedom to pursue one's passion” 
    14.  “Gives kids a chance to be in their own skin” 
    15.  “I am incredibly confident in going into anything next” 
    16.  “It really helps cultivate an air of respect and trust when you know
         there is a system to back it up” 


## Sidebar Media

Here we list the sidebar media. It could be a picture or it could be a video. 

    1. Tuition 1.jpg
    2. Introduction 2.jpg
    3. Detailed 3.jpg
    4. Staff 4.jpg
    5. FAQ 5.jpg
    6. Name 6.jpg
    7. Space 7.jpg
    8. History 8.jpg
    9. Contact-Us 9.jpg
    10. Admissions 10.jpg
    11. Support-us 11.jpg
    13. Resources 130995015.vimeo
    14. Comparisons 136142976.vimeo
    15. Questions 135727831.vimeo
    16. Organization 135571192.vimeo


## jpg

The html for the picture in the sidebar

     <figure class="side-img"> 
        <img src="gen/FNAME.jpg"
        srcset="gen/FNAME-s.jpg 1w,
         gen/FNAME-m.jpg 500w, 
         gen/FNAME-l.jpg 1000w, 
         gen/FNAME.jpg 1500w" /> 
     </figure>

## vimeo

    
    <div class="video-container">
        <iframe src="https://player.vimeo.com/video/NUMBER" width="640"
        height="362" frameborder="0" webkitallowfullscreen mozallowfullscreen
        allowfullscreen></iframe>
    </div>
    <p class="ref">Video from similar school <a href="http://sudburyschool.com/" target=_blank>Hudson Valley Sudbury School</a></p>
 
[css]()

Here we need to style do some iframe responsiveness, courtesy of [Smashing](https://www.smashingmagazine.com/2014/02/making-embedded-content-work-in-responsive-design/)

    aside .video-container {
        position: relative;
        padding-bottom: 56.25%;
        padding-top: 35px;
        height: 0;
        overflow: hidden;
    }

    aside .video-container iframe {
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    aside .ref {
       color: whitesmoke;
       text-align: center;
       font-size: 14px;
       background-color: black;
    }
