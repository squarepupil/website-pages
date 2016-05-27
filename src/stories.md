# Stories

The idea here is that we want to use these in both the stories page as well as
the sidebar. 

The three sections with content tell us the story, the pull out, and the pages
to be used. The pictures are numbered by the listing order as well. 

It will be the same html for both pages, but the styling will be different.
The sidebar styling will be in the main css while the stories page will be on
its own page. 

There will be no sidebar on the stories page. 

## Page

    _"project.md::template | replace main, 
        _" | assemble _"full stories| md", 
        _"callouts|md", 
        _"pages for the sidebar|md" " | 
        replace title, A&amp;I Stories | 
        replace main h2, Stories |
        replace style, _"stories css" "  
    


## Assembling

This is where we assemble it all. The incoming sections should be converted to
markdown and we then use cheerio on it to extract the sections. This will be
called by the stories page html which will have the fully assembled version
inserted into it. The stories argument will be the eventual output. 

We also will store the content into `sidebar::page name` where page name
changes. These are required by the pages in their compilation.  

    function (input, args) {
        var doc = this;
        var cheerio = doc.parent.local.cheerio;
        var $ = cheerio.load(args[0]);
        var call = cheerio.load(args[1])("li");
        var places =cheerio.load(args[2])("li");
        var stories = $("li");    

        var i, n = stories.get().length, el, place;

        var img = _":img";
        var sideput = _":store in sidebar";
        var div, parr;
        var inserter = _":inserter";  

        for (i = 0; i < n; i += 1) {
            el = stories.get(i);
            _":wrap in div" 
            $(el).prepend(img(i+1));
            $(el).prepend("<div class='call'>"+$(call.get(i)).text()+"</div>");
            place_s = $(places.get(i)).text().split(",");
            place_s.forEach(sideput);
        }

        $.root().prepend("<h2></h2>");
        
        return $.html();
    }

[assemble](# "define: | jshint ")

[wrap in div]()

This wraps the children of the list item in a div. 

    div = $("<div class='text'></div>");
    parr = $(el).children();
    $(el).prepend(div);
    parr.each(inserter);

[inserter]()

This just inserts the element into the div.

    function (i, el) {
        div.append(el);
    }

[img]()

This deals with the testimonials' image html. 

    function (fname) {
        var str = '<figure' + ' class="test-img"' + 
                      '><img src="gen/' + fname  + '.jpg" ' +  
                      'srcset="gen/' + fname +'-s.jpg 1w, ' + 
                      'gen/' + fname + '-m.jpg 500w, gen/' + 
                      fname + '-l.jpg 1000w, gen/' +
                      fname + '.jpg 1500w" ' +
                      '/>' + 
                      '</figure>';
       return str;
    }


[store in sidebar]()

For each place in the array, we store the html of the element in the sidebar.
we replace the `<li>` with a `<div>`. We use the el from the surrounding loop.


    function (place) {
        var html = $(el).html();
        //console.log(html);//
        doc.store("side " + place.trim().toLowerCase(), html);
    }




## Stories CSS

This is the stuff for just this page. It is similar to that of the front page
design.

    aside, .call {
        display:none;
    }

    main ol {
        list-style-type: none;
    }

    main ol li {
       display: flex; 
    }

    .text {
        flex:1;
        padding:10px;
        text-align: center;
        margin-top:auto;
        margin-bottom:auto;
    }

    .test-img {
        flex:1;
    }

    main ol > :nth-child(2n+0) {
        background-color:#eee;
    }

    main ol > :nth-child(2n+0) .text {
        color:red;
        order:1;
    }

## Full Stories

    1. [My daughter] is so very happy she woke up at 5:00 AM ASKING IF SHE COULD GO
      TO SCHOOL YET!  I am sure as parents you know how much that means to me;
      there is just no feeling like it.
    1. I just want to share that this year has been pivotal for [my son] and I feel
      that A&I has pretty much saved his experience with education.  I think I
      have one of the most balanced, self-motivated and un-cranky teenagers that
      could ever exist! I also want to share that our experience at A&I has
      directly affected my teaching strategy, with teenagers specifically. 
    1. What image pops into mental view when one hears, yet again, that it takes a
      village to raise a child? A bunch of adults, all available to cast a
      benevolently watchful eye upon whoever’s child happens  to be underfoot as
      they set a virtuous and practical example by going about their business. All
      good. What is missing from this virtual tableau? The sound of small feet
      hurrying, the annoyed sighs of teens deploying their dirt-palmed clean-up
      crew, a chicken coop being raised on academic real estate, music, laughter,
      and all kids raising each other in their real world, in real time, learning
      to own the reality of their actions. To use an adult-shrink-speak term, the
      kids learn “agency” at Arts and Ideas Sudbury School, just ‘cause they can.
      With the tableau thus filled in, the village becomes complete. 
    1. Thank you for taking the time to speak with me. You are the main reason why
      I chose Arts & Ideas, just wanted to let you know that. I totally felt at
      ease when we met and sensed an amazing amount of empathy/kindness and
      compassion in you. I want my sprouting bean to be around creative, kind and
      nourishing people, especially at this age. With that said, [my daughter] will be
      thrilled to start this September and we will see you/speak with you when we
      get back home. 
    1. Our daughter's learning style is not a match for a traditional classroom.
      We needed to decide whether we would continue cramming her into a box where
      she didn't fit or give her the space to be herself.  This is her 2nd year at
      Arts & Ideas and she's a much happier kid. Her eyes are bright, her
      curiosity is unstoppable and she loves learning a variety of subjects. -
      Debbie 
    1. Sometimes people ask how we think [my daughter] will do in "the real world"
      after a Sudbury education.  In the "real world", the pace of technological
      and social change means that successful people need to be continuous
      learners and skilled collaborators, eager to try new things and not too
      worried about whether their experiments will initially fail.  Those are the
      skills that Sudbury nurtures.  Our daughter will be much more prepared for
      "the real world" than most of her traditionally schooled peers. 
    1. I'll be continuing to support you and spread the word about the school,
      especially now that I've seen it. Congratulations too, I'm so impressed with
      how wonderfully you've all made this space happen and how well you've
      articulated the differences and history of this model.
    1.  Our change in
      schools was the best decision we have ever made for [my daughter].  She truly is a
      different child!! Thanks for being part of it!! 
      
        Once upon a time, not so
      very long ago, a princess was born to the Kingdom
      of Avondale.  It did not take long for the king and queen to realize that
      this was no ordinary princess.  This princess did not like princess clothes.
      She did not like to participate in activities that other young princesses
      enjoy.  And she hated princess school.  Often it was difficult for this
      princess to just get dressed and leave the castle in the mornings.  She
      fought many battles at her young age.  The kingdom was confused by this
      out-of-the-box princess.  The king and queen summoned all the best
      specialists to come look at their child to understand why she acted
      differently than the other princesses.  Then one day, the king and queen
      found a magic bean.  They planted the magic bean and grew some sense.  Sense
      is a powerful thing! The king and queen removed the princess from princess
      school and enrolled her in a non-traditional school with young lads and
      lassies from neighboring kingdoms.  They told their princess that she did
      not have to grow up to be just like the other princesses.  She could be
      anything and do anything she wanted.  The princess began to flourish.  She
      no longer had difficulty getting dressed and leaving the castle in the
      mornings.  She even started to explore the latest in princess fashions.  The
      princess was happy!  And everyone knows... a happy princess means a happy
      kingdom. Happy, happy birthday my beautiful princess.  May you continue to
      beat to your own drum, let your light shine, and make your own way in the
      world. 
    1. Arts & Ideas saved my kids: I went from worrying about them every second of
      the day to not worrying at all. And once I was totally on board with the
      Sudbury philosophy, I not only didn't worry about their presents, I also
      stopped worrying about their futures.
    1. Even the most innovative of public charter schools has assignments, tests,
      strained teachers, and deadlines. For [my daughter], the stress, anxiety, and
      resentment that came from struggling within those constraints got in the way
      of actual learning. Rather than blossoming, this incredibly bright kid was
      failing. Her “off the charts” intelligence didn’t matter; she felt “stupid”
      and gave up because “success” was based on scores. Her anxiety flared and
      her self-esteem plummeted. She was getting sick at school and struggled
      socially. I’m sorry, but a test score does not equal aptitude! We knew the
      system wasn’t working for her and decided to jump ship.

        What we’ve found at Arts & Ideas is the space to swim on her own terms, in
        her own way, at her own pace. There’s room to breathe, play, stretch, and
        imagine. In just the few months that we’ve been at A&I, I have already
        seen a big change in Dolly’s sense of self. They ebb and flow but the
        confidence and autonomy she could not find are really starting to bubble.
        The chance to look inward as well as outward has provided her with her own
        huge canvas to fill – a scenario she never found herself in while tackling
        public school. The elimination of deadlines has freed her mind (and
        schedule) to discover herself and bloom, which is exactly what one should
        hope to find in any schooling.

        I’m not going to lie – there are bumps in the suddenly open road to a
        teen’s self-sufficiency and the non-accrediting thing scared us a bit
        going in. BUT we had (and continue to have) faith that the pieces missing
        in her public school experience –the independence, the time to focus on
        passions, a fantastic staff that’s always ready and willing to hear
        her—THESE are what we need and what we’ll find in a Sudbury environment.
        And that these things in the forefront will make learning exciting – not
        dreaded.  In the few months we’ve been at A&I, she’s already: plotting RPG
        game designs, playing music, critically thinking about the world around
        her (“Homestuck as the modern day Odyssey” could totally be a college
        course), learning about democracy and judiciary responsibility, filling
        her art portfolio, studying mythology, advocating feminism and social
        justice, making great friendships, and more. Now THAT’S an education!
    1. Many well meaning friends and family members have questioned what seems like
      an unorthodox educational approach or journey for our family. We began as
      homeschoolers, turned into unschoolers and ended up at Arts and Ideas in 2008.
      This has been the best choice we could have made for our family. My
      eldest son was deeply involved in the local homeschooling community and
      loved the direction his education was taking him, and then we attended an
      open house for Arts and Ideas. At what was to be the interview for our 6
      year old, our twelve year old begged for an interview and tour and basically
      pleaded with the founders to have the school allow him an age exception
      since the school was not going to take 12 year olds. Both boys began, with
      me working as staff, in the Fall of 2008, and I can honestly say we have
      never made a better decision as a family.

        My sons have been challenged, inspired, frustrated and stymied by this
        model. Our eldest son graduated from A&I after a senior year where he
        struggled with his thesis( the model's requirement for graduation) and
        balanced an internship with a local bakery. During his time at A&I he
        began to become serious about photography and with this skill he garnered
        a show at a local restaurant and his work hung in numerous local shops. He
        bought his first car with the money he saved in part due to sales of his
        photographs. After graduation at age 16 he went on to certify as one of
        the youngest Wilton instructors in our area, then soon after he began
        working at a local restaurant in Hampden. Le Garage. He has been there two
        years and is the pastry chef, which was what his life goal was beginning
        at 12. He felt prepared to step into adulthood  as he had gained so many
        skills we tend to think of as more "adult" through the processes of School
        Meeting and Judicial Committee.

        Our youngest son has chosen a different path, unlike our eldest who never
        missed a School Meeting or a chance to volunteer for Judicial Committee,
        our youngest is content to follow his own goals. His independence and
        autonomy are his focus and as he was 'raised" in the model we have
        spirited discussions about politics and current events.His separation from
        his brother's approach and years at A&I have also been of great value as
        he stands apart from his brother's choices and expectations. 

        We did not desire report cards or test scores, despite my husband working
        as a teacher for a time; we wanted active thinkers, independence,the
        freedom to explore and a firm sense of self determination. Arts and Ideas
        has supported all of this and opened so many new pathways for our family.


## Callouts

    1.  “My daughter woke up at 5:00 AM asking if she could go to school yet! There is just no feeling like it.”
    2.  “I feel that A&I has pretty much saved [my son’s] experience with education. I think I have one of the most balanced, self-motivated, and un-cranky teenagers that could ever exist!”
    3.  “The kids learn “agency” at Arts and Ideas Sudbury School, just ‘cause they can.”
    4.  “I want my sprouting bean to be around creative, kind, and nourishing people.”
    5.  “This is [my daughter’s] 2nd year at Arts & Ideas and she’s a much happier kid. Her eyes are bright, her curiosity is unstoppable, and she loves learning a variety of subjects.”
    6.  “Successful people need to be continuous learners and skilled collaborators, eager to try new things and not too worried about whether their experiments will initially fail. Those are the skills that Sudbury nurtures.”
    7.  “I’m so impressed with how wonderfully you’ve all made this space happen.”
    8.  “Our change in schools was the best decision we have ever made for [our daughter]. She truly is a different child!!”
    9.  “I went from worrying about [my kids] every second of the day to not worrying at all.”
    10.  “What we’ve found at Arts & Ideas is the space for [our daughter] to swim on her own terms, in her own way, at her own pace.”
    11.  “This has been the best choice we could have made for our family.”


## Pages for the sidebar 

    1. Comparisons, Calendar
    2. Introduction
    3. Detailed
    4. Staff
    5. FAQ
    6. Name
    7. Space, Support-us
    8. History
    9. Contact-us, Tuition
    10. Admissions, Questions
    11. Resources, Organization


