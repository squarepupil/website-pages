# CSS

This contains much of the bulk of the CSS. The nav and individual page CSS is
separate. 

The basic design philosophy is that of a nav bar at top with expandable row,
followed by two column layout with the main column on the left and the sidebar
on the right. There is also a thin footer.

The color scheme is an orange and blue. The font is bebas for headlines. Some
basic styling is taken from writ.css

 
    _"css reset"

    _"writ"

    img {
        max-width:100%;
        width:100%;
    }

    ol {
        list-style-type: decimal;
    }
    
    * {
        box-sizing: border-box; 
    }

    .hide {
        display: none;
    }
    
    strong {
        font-weight:bold;
    }

    _"colors fonts"

    _"borders padding"

    _"layout"

    _"nav::css | .join \n  "

    _"footer"
    
    _"project.md::plus to abstract:css"

    _"css title"

    _"css images"

    _"sidebar"

### Layout

We put header on top with fixed placement, footer on the bottom, and we put a
healthy margin above and below main. All of our containers have an outer and
an inner with the outer being the full width handling full width colors and
borders while the inner provides the constraining width. 

    header {
        position: fixed;
        top: 0;
    }

    main {
        margin-top:110px;
        margin-bottom:19px;
    }

    main .inner {
        display:flex;
        justify-content:space-between;
    }   

    footer {
        /*position: fixed;*/
        bottom:0;
    }

    .outer {
        width: 100%;
    }

    .inner {
        min-width: 600px;
        max-width: 1000px;
        width: 80%;
        margin-left:auto;
        margin-right:auto;
    }

    article {
        flex:4;
        margin-right:20px;
    }
    
    aside {
        
        flex: 2;
        border: none;
    }

These are for the previous and next links. It should be at the foot of the
article. 


    .previous, .next {
        background-color: #296087;
        border-radius: 5px;
        padding-top: 3px;
        padding-bottom: 5px;
        font-family: bebas;
        padding-left: 5px;
        padding-right: 5px;
        word-spacing: 2px;
        text-decoration: none;
        color: whitesmoke;
    }

    .previous a, .next a {
       text-decoration: none;
       color: whitesmoke;
    }

    .previous {
        float:left;
    }

    .previous canvas {
        transform: rotate(180deg);
        width:35px;
        padding-left:5px;
    }

    .next canvas {
        width:35px;
        padding-left: 5px;
    }

    .next {
        float:right;
    }

    form textarea {
        width:500px;
        height:100px;
    }

And then some stuff for small screens

    M W<670px {
        
        .inner {
            min-width:50px;
            flex-direction:column;
            width:auto;
            margin-left:10px;
            margin-right:10px;
        }

        /*undo*/
        article {
            margin-right:initial;
        }

        form textarea {
            width:90vw;
        }

        iframe {
            width:90vw;
        }
        
        main {
            margin-top:30px;
        }

    }


### Colors fonts

    @font-face {
       font-family : "bebas";
       src : url("bebas.ttf");
    }
    
    header, .sitemap {
        font-family: bebas, serif;
        font-size:17px;
        background-color:whitesmoke;
        word-spacing:3px;
    }
    
    .info, .dropdown {
        background-color: #296087; /* rgb(76, 148, 33);*/
        color: whitesmoke;
    }

    .info a, .dropdown a {
        color: whitesmoke;
    }

    footer {
        background-color: whitesmoke;
        padding-top:6px;
        padding-bottom:6px;
        margin-top:6px;
    }

    #actions a {
        color: whitesmoke; /*white;*/
    }

    .dropdown {
       /* background-color: rgb(78, 133, 173);*/
    }

        
    article {
        background-color: whitesmoke;
    }

    article h2 {
            font-size: 1.728em;
    }

### Borders padding

Here we deal with some of the border and padding on the large scale. 



    .dropdown, .content {
        box-shadow: 0px 4px 10px -4px rgba(0,0,0,0.75);
    }

    article li {
        margin-bottom : 1rem;
        margin-left : 1rem;
    }
    
    article ul {
        list-style-type : disc;
    }
    
    article {
        padding : 14px;
    }
    
### CSS Title

This is the css for the title. It should have centered text, white, bebas, and a background image based on class?

    main > h2 {
        font-family: bebas;
        word-spacing:7px;
        text-align: center;
        color: whitesmoke;
        background: gray;
        margin-top: -47px;
        padding-top: 36px;
        padding-bottom: 36px;
        background-image: url("img/banner1.jpg");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;

    }

    M W<670px {
        main > h2 {
            margin-top: -20px;
        }
    }

### CSS Images

This is styling information for figures and images. 

    figure {
        margin-bottom:1.5rem;
    }

    figure.left, figure.right {
        width: 50%;
        margin-right: 14px;
        margin-bottom: 14px;
        margin-left:14px;
    }

    figure.staff {
        width: 50%;
        float: left;
        margin-right: 10px;
        margin-bottom: 2px;
    }

    figure.left {
        float:left;
    }

    figure.right {
        float:right;
    }

This should clear the pictures of section headings. 

    article h2 {
        clear:both;
    }

### Sidebar

The sidebar has an announcement part and a callout for quotes and pictures. 

    aside .announce a {
        color: #D2B777;
    }

    aside .side-story, aside .announce  {
        border:14px solid white;
        
    }

    M W<670px {
        aside .side-story, aside .announce  {
            border: initial; 
        }
    }

    aside .announce {
        border-top:0px;
    }
    
    aside .side-story .call, aside .announce {
       font-size: 20px;
       background-color: #296087;
       padding: 15px;
       color:whitesmoke;
       line-height: 1.1;
       text-align: center;
    }

    aside figure {
        margin-bottom: 0;
    }

    aside .text {
        display: none;
    }

## Footer

We want it to be on a single line, images small

    footer img {
        width:12px;
    }

    footer {
        bottom:0;
        width:100%;
    }
   
    footer.fix {
        position:fixed;
    }

the above color is kind of a yellow-brown that flows from the grass. 
previous color of pale blue: #9797FF;
previous color of yellow burn: #9E9A6C


    footer ul {
        display:flex;
        margin-left:0;
        margin-right:auto;
        padding-top:3px;
        justify-content:space-between;
    }

The Next styling

    .next span {
        font-family:bebas, serif;
    }

        

We also want to hide the first or second item depending on the width. The
first item is for wide footer, the second is for short. 

    M W>954px {
        footer li:nth-child(2) {
            display:none;
        }
    }

    M W<953px {
        footer li:nth-child(1) {
            display:none;
        }
    }

    M W<670px {
        footer .long {
            display:none;
        }
        footer li:nth-child(2) {
            display:none;
        }
        footer li:nth-child(1n+3) {
            list-style-type:none;
           /* margin-left:9px;*/
        }
    }



## CSS Reset

    /* http://meyerweb.com/eric/tools/css/reset/ 
       v2.0 | 20110126
       License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }



## Writ

This is part of writ.css, and modified.

    /*!
     * Writ v1.0.2
     *
     * Copyright Â© 2015, Curtis McEnroe <curtis@cmcenroe.me>
     *
     * https://cmcenroe.me/writ/LICENSE (ISC)
     */

    /* Fonts, sizes & vertical rhythm */

    html {
      font-family: Palatino, Georgia, Lucida Bright, Book Antiqua, serif;
      font-size: 16px;
    }
    
    p, h1, h2 {
      line-height: 1.5rem;
      margin-bottom: 1rem;
    }

    code, pre, samp, kbd {
      font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
      font-size: 0.833rem;
    }

    kbd { font-weight: bold; }
    h1, h2, h3, h4, h5, h6, th { font-weight: normal; }

    /* Minor third */
    h1 { font-size: 2.488em; }
    h2 { font-size: 2.074em; }
    h3 { font-size: 1.728em; }
    h4 { font-size: 1.44em; }
    h5 { font-size: 1.2em; }
    h6 { font-size: 1em; }
    small { font-size: 0.833em; }

    h1, h2, h3 { line-height: 3rem; }

    /*
    p, ul, ol, dl, table, blockquote, pre, h1, h2, h3, h4, h5, h6 {
      margin: 1.5rem 0 0;
    }
    ul ul, ol ol, ul ol, ol ul { margin: 0; }
    */
    
    hr {
      margin: 0;
      border: none;
      padding: 1.5rem 0 0;
    }

    /* Accounting for borders */
    table {
      line-height: calc(1.5rem - 1px);
      margin-bottom: -1px;
    }
    pre {
      margin-top: calc(1.5rem - 1px);
      margin-bottom: -1px;
    }


