# Current stuff

This is where we can stash stuff that is modified regularly, namely Open House
and Closing Announcements.

## Open House

The stock open house announcement. 

    <div class="open-house">_":message"</div>

[date]()

    Saturday May 14th, 10AM

[message]()

    Our Next Open House: 

    _":date"

    [RSVP](https://docs.google.com/forms/d/1rbowCIad1VC8l_GOoP-0gcIBhH8DXWnw1RzbobY6q4w/viewform) recommended.


### Open CSS

CSS for open house

    .open-house {
        width:100%;
        margin-left:auto;
        margin-right:auto;
    }
    


## Closing

This is where we do announcements for liberal leave. 
    
    _":nothing"

_":green"

_":red"

_":yellow"

_a

[message]()

    CLOSED TODAY  5/12

LIBERAL LEAVE 

OPEN TODAY

[nothing]()

Nothing to see. 

    

[green]()

    <div class="go alert">_":message"</div>
     
    
[red]()

    <div class="stop alert">_":message"</div>

[yellow]()

    <div class="warning alert">_":message"</div>


### Closing css

The CSS to style the closings. We use the alert class to position and padding.
We use the type of warning class for color

    .alert {
        width: 100%;
        margin-left:auto;
        margin-right:auto;
    }

    .alert.go {
        background-color: green;
        color: black;
    }

    .alert.warning {
        background-color: yellow;
        color: black;
    }

    .alert.stop {
        background-color: red;
        color: black;
    }



