# Calendar

Here we have our calendar. This consists of the data which is a simple block
of pipe and line separated: `day|date(s)|status|name` 

We cut up that data and make it into a table that we then style with CSS? 

## Data

    2016-2017
    W|9/7|          O|First Day of School
    F|10/14|        C|Staff Day|
    W|11/23-11/25|  C|Thanksgiving Break
    W|12/19-1/1|    C|Winter Break
    M|1/2|          O|Return to School
    M|1/16|         C|Martin Luther King's Day
    M|2/20|         C|President's Day
    M|3/27-3/31|    C|Spring Break
    M|4/3|          O|Return After Spring Break
    M|4/28|         C|Staff Day
    M|5/29|         C|Memorial Day
    F|6/2|          O|Last Day of School
    F|6/5|          C|First Day of Summer Break


## Page

    _"project.md::template | replace article, 
        _" | assemble _"full stories| md", 
        _"callouts|md", 
        _"pages for the sidebar|md" " | 
        replace title, A&amp;I Calendar | 
        replace main h2, School Calendar |
        replace style, _"calendar css | caps" |
        cheerio article, append, _"next prev" "



## Next Prev

    <div class="inner last">
    <div class="previous far"><a href="/support-us.html"><span>Support US</span></a></div>
    <div class="next far"><a href="/index.html"><span>Home</span></a></div>
    </div>

