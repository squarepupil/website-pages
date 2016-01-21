# Index

This is the litpro part for compiling the unique index page. 

We want something that has a nice word/image gallery as the main mosaic entry
into the site. 

## Page

We will load up the template and the replace it. 

    _"project.md::template | replace #body, _"index body" 
        | replace #submenu, _"our external links|md" "


### Index Body

This is the index body. It contains a brief description. 

    Arts&Ideas Sudbury School is a democractic school for ages 5-18. Our
    philosophy of education emphasizes trust, autonomy, justice, and learning.  

    _"word gallery"

#### Word Gallery


* ![Friends in the rain](rain.jpg)

     Having shared experiences, good or bad, is part of our
     [model](model.html).
* ![]()

### Our External Links

    * [Blog](#)
    * [Facebook](#)
    * [YouTube](#)
    * [Overheard](#)
    * [Gallery](#)
