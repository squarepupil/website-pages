# Stories

This creates the stories page. We have the text in a list which comes in as
is, but we style and js it on the page so that each note becomes a note card
style. 

## Page

    _"project.md::template | 
        replace main, _"full stories| md " | 
        replace title, A&amp;I Stories | 
        replace style, _"stories css | caps " |
        cheerio main, append, _"next prev" "



## Stories CSS

This is the CSS for the stories page. The idea is that we have list items. We
want to style it it as if they are note cards. There should also be left and
right arrows but we could use javascript perhaps to handle all that. 

    .bottom {
        position: fixed;
        bottom: 0;
        background-color: white;
        width: 100vw;
        max-width:initial;
        right: 0;
        margin: 0;
        padding-top: 9px;
        padding-bottom:2px;
        flex-direction: initial;
    }

    .center {
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        padding-left:34px;
        padding-right:20px;
    }

    footer {
        display:none;
    }

    blockquote {    
        font-size: 17px;
        padding: 8px;
        color: whitesmoke;
        background-color: #296087;
        background-position: top left;
        background-repeat: no-repeat;
        text-indent: 23px;
        margin-top:40px;
        margin-bottom:40px;
    }
    
    M W>670px {
        blockquote {
            width: 670px;
            margin-left: auto;
            margin-right: auto;
        }
    }

    blockquote p {
        display: block;
        background-repeat: no-repeat;
        background-position: bottom right;
        padding: 12px;
  	}
    

 
## Full Stories

    ## Stories From Our Families


    > Sometimes people ask how we think [my daughter] will do in "the real world"
      after a Sudbury education.  In the "real world", the pace of technological
      and social change means that successful people need to be continuous
      learners and skilled collaborators, eager to try new things and not too
      worried about whether their experiments will initially fail.  Those are the
      skills that Sudbury nurtures.  Our daughter will be much more prepared for
      "the real world" than most of her traditionally schooled peers. 

    > [My daughter] is so very happy she woke up at 5:00 AM ASKING IF SHE COULD GO
      TO SCHOOL YET!  I am sure as parents you know how much that means to me;
      there is just no feeling like it.

    > I just want to share that this year has been pivotal for [my son] and I feel
      that A&I has pretty much saved his experience with education.  I think I
      have one of the most balanced, self-motivated and un-cranky teenagers that
      could ever exist! I also want to share that our experience at A&I has
      directly affected my teaching strategy, with teenagers specifically.


    > What image pops into mental view when one hears, yet again, that it takes a
      village to raise a child? A bunch of adults, all available to cast a
      benevolently watchful eye upon whoever’s child happens  to be underfoot as
      they set a virtuous and practical example by going about their business. All
      good. What is missing from this virtual tableau? 
    > 
    >  The sound of small feet
      hurrying, the annoyed sighs of teens deploying their dirt-palmed clean-up
      crew, a chicken coop being raised on academic real estate, music, laughter,
      and all kids raising each other in their real world, in real time, learning
      to own the reality of their actions. To use an adult-shrink-speak term, the
      kids learn “agency” at Arts and Ideas Sudbury School, just ‘cause they can.
      With the tableau thus filled in, the village becomes complete. 


    >  I had a flooding rush of joy and gratitude yesterday (I felt down
        right verklempt) when I dropped R off for school just for the simple
        fact that W--who is a fair bit older than R (in kid years)--waited
        while holding the door for R as he scaled a wall to go into school. W
        had such a kind and patient demeanor and while I'm sure there are
        times the bigs and littles ignore and annoy one another, they also get
        this natural opportunity to care for and about one another. This
        familial type bond is one of the many reasons we chose Sudbury.


    >   Thank you for taking the time to speak with me. You are the main reason why
      I chose Arts & Ideas, just wanted to let you know that. I totally felt at
      ease when we met and sensed an amazing amount of empathy/kindness and
      compassion in you. I want my sprouting bean to be around creative, kind and
      nourishing people, especially at this age. With that said, [my daughter] will be
      thrilled to start this September and we will see you/speak with you when we
      get back home. 


    > Our daughter's learning style is not a match for a traditional classroom.
      We needed to decide whether we would continue cramming her into a box where
      she didn't fit or give her the space to be herself.  This is her 2nd year at
      Arts & Ideas and she's a much happier kid. Her eyes are bright, her
      curiosity is unstoppable and she loves learning a variety of subjects.   


    > I'll be continuing to support you and spread the word about the school,
      especially now that I've seen it. Congratulations too, I'm so impressed with
      how wonderfully you've all made this space happen and how well you've
      articulated the differences and history of this model.


    >  Our change in
      schools was the best decision we have ever made for [my daughter].  She truly is a
      different child!! Thanks for being part of it!! 
    
    >    Once upon a time, not so
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


    > Arts & Ideas saved my kids: I went from worrying about them every second of
      the day to not worrying at all. And once I was totally on board with the
      Sudbury philosophy, I not only didn't worry about their presents, I also
      stopped worrying about their futures.


    > Even the most innovative of public charter schools has assignments, tests,
      strained teachers, and deadlines. For [my daughter], the stress, anxiety, and
      resentment that came from struggling within those constraints got in the way
      of actual learning. Rather than blossoming, this incredibly bright kid was
      failing. Her “off the charts” intelligence didn’t matter; she felt “stupid”
      and gave up because “success” was based on scores. Her anxiety flared and
      her self-esteem plummeted. She was getting sick at school and struggled
      socially. I’m sorry, but a test score does not equal aptitude! We knew the
      system wasn’t working for her and decided to jump ship.
    >
    >    What we’ve found at Arts & Ideas is the space to swim on her own terms, in
        her own way, at her own pace. There’s room to breathe, play, stretch, and
        imagine. In just the few months that we’ve been at A&I, I have already
        seen a big change in [my daughter's] sense of self. 
        They ebb and flow but the
        confidence and autonomy she could not find are really starting to bubble.
        The chance to look inward as well as outward has provided her with her own
        huge canvas to fill – a scenario she never found herself in while tackling
        public school. The elimination of deadlines has freed her mind (and
        schedule) to discover herself and bloom, which is exactly what one should
        hope to find in any schooling.
    >
    >    I’m not going to lie – there are bumps in the suddenly open road to a
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


    >  My sons have been challenged, inspired, frustrated and stymied by this
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
    >
    >    Our youngest son has chosen a different path, unlike our eldest who never
        missed a School Meeting or a chance to volunteer for Judicial Committee,
        our youngest is content to follow his own goals. His independence and
        autonomy are his focus and as he was "raised" in the model we have
        spirited discussions about politics and current events. His separation from
        his brother's approach and years at A&I have also been of great value as
        he stands apart from his brother's choices and expectations. 
    >
    >    We did not desire report cards or test scores, despite my husband working
        as a teacher for a time; we wanted active thinkers, independence, the
        freedom to explore and a firm sense of self determination. Arts and Ideas
        has supported all of this and opened so many new pathways for our family.


## Next Prev

    <div class="bottom">
    <div class="center">
    <div class="previous far"><a href="gallery.html"><span>Gallery</span></a></div>
    <div class="next far"><a href="faq.html"><span>FAQ</span></a></div>
    </div>
    </div>


