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


## Data Transform

This takes in the data and makes it into an html list

Each item is of the form of a colored date and the title

    function (input, args) {
       var lines = input.split("\n");
       var year = "<h3>Calendar for Arts &amp; Ideas School Year " + 
           lines.shift().trim() + "</h3>\n";
       var list = "";
       lines.forEach(function (line) {
            var bits = line.split("|").
                map(function (bit) {return bit.trim();});

            var status = ( (bits[2] === 'O') ? 'Open' : 'Closed');
            var day = ( (bits[0] === 'M') ? 'Monday' :
                ( (bits[0] === 'W') ? 'Wednesday' : 'Friday') );

             list += '<li>' +
                    '<span class="' + bits[2] + '">'+
                    bits[1] + 
                    '</span> ' + 
                    bits[3] +
                    ' (' + status + ' ' + day  + ')' +
                    '</li>\n'
       });
       return year + "<ul>\n" + list + "</ul>\n";

    }

[dates](# "define:")

## Page

    _"project.md::template | 
        replace article, _" data | dates" |
        replace title, A&amp;I Calendar | 
        replace main > h2, School Calendar |
        replace style, _"calendar css | caps" |
        cheerio article, append, _"next prev" |
        cheerio aside, remove "



## Next Prev

    <div class="inner last">
    <div class="previous far"><a href="/support-us.html"><span>Support US</span></a></div>
    <div class="next far"><a href="/index.html"><span>Home</span></a></div>
    </div>

## Calendar CSS

The classes color the dates. 


    article h3 {
        text-align: center;
        margin-bottom: 20px;
    }

    article ul {
        margin-left: auto;
        margin-right: auto;
        width: 28em;
    }
    

    article ul {
        list-style-type : none;
    }

    .O, .C {
        width: 6em;
        display: inline-block;
    }

    M W<484px {
        .O, .C {
            display:block;
        }
    }

    .O {
        color:green;
    }

    .C {
        color:red;
    }
    
    main .inner.last {
        width:93%;
        flex-direction: initial;
    }
