# Code challenge discussion

I enjoyed this challenge and found myself delving a bit too deep at times on minutia.  I'd like to share my thoughts on some of the implementation decisions I made.

## HTML5 & Handlebars templates
I divided the widget into header, current, and forecast templates all of which are embedded in the widget markup. I used templates because the `ul#forecast li`'s seemed to offer a nice way to demonstrate how one might abstract the layout of this page.  I also added `h2`s to each sub section.  These h2's are meant to be hidden from visual users, but read by screen readers and search engine crawlers (turn off css to see them).  The h2's added structure better defines how the widget information is grouped.

I would prefer to make all the templates a shared resource instead of embedded in the markup, but I settled for the current implementation for this demonstration.

## CSS & Modernizer
I prefer to use flexbox for layout and so I did for this challenge. To center the widget I used two methods: flexbox for modern browsers and absolute positioning for ie9.  Please note: Using flexbox required me add style declarations to the document body to make it have height. I recognize deploying this in the wild would likely cause havoc to an existing page, but I did it here to showcase my flexbox knowledge.  Normally, I would employ the method I used in the `weather-widget.ie9.css` file.

I used MS's conditional comments to call the ie9 css when needed. This separates the ie9 styles so that when support is dropped for ie9 we can simply remove conditional comment and the ie9 css file.  I used modernizer so I can scope the ie9 changes `.no-flexbox`.  Perhaps this was overkill.

Generally, I prefer to write SASS instead of css, however I chose to write CSS here for expediancy. 

## jQuery & Handlebars
I namespaced the widget functions to a cv object to avoid conflicting with any other existing js code.  Each function is assigned to a separate property on that cv object for ease of testing and maintenance.  I used jQuery's `$.http` to make the call and wrote methods to handle success and failure responses.  To see a failure message just change the `weatherApiUrl` near the bottom of the `weather-widget.js` file.

## Testing
I wanted to write test code, but my time has run short. 
My preference would be to write integration tests in Protractor, but here unit tests make a lot of sense. Unit tests would involve spying to see if calls are made from the ajax block.  Passing mocked data into the various functions, like `cv.widget.renderemplates()`, and validating the output. Integration tests would require using a mock JSON response from the API and checking for proper conditions on failure, existence of a loading spinner at start up, and maybe correct placement of data in the widget. We can also test the centering of the widget in a variable sized viewport.
