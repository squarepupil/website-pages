# Index

This is the litpro part for compiling the unique index page. 

We want something that has a nice word/image gallery as the main mosaic entry
into the site. 

## Page

We will load up the template and the replace it. 

    _"project.md::template | replace article, _"index body"  
        | cheerio .info, after, _"banner | jade" 
        | cheerio style, append, _"css" "


### Index Body

This is the index body. It contains a brief description. 

    Arts&Ideas Sudbury School is a democractic school for ages 5-18. Our
    philosophy of education emphasizes trust, autonomy, justice, and learning.  


### Banner

    .hero
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

    .hero img {
        position: absolute;
        top: 0;
        left: 25vw;
        height: 60vh;
    }

    #logo img {
        height:0;
    }

### Our External Links

    * [Blog](#)
    * [Facebook](#)
    * [YouTube](#)
    * [Overheard](#)
    * [Gallery](#)
