Node.js - date-tokens
=====================

Convenient date formatting for templates. 



Why?
----

I have a lot of files using [mustache-style templates](http://mustache.github.com/), like `{{date-year}}`, `{date-mins}`, etc. Also, often I want these dates to always have two-digit formatting, even if it's a single digit month. For example, in JavaScript `(new Date(2001, 3, 13).getMonth()` returns '3'. Since JavaScript uses 0-11 indexing for months. I want to call a `month` method and get "04" for this example.



Installation
------------

    npm install date-tokens



Example
------

Two functions: `dt` and `dt.eval`.

### dt([date], [prefix])

Returns an object with tokens each with a function value.


```javascript
var dt = require('date-tokens');

var tokens = dt(); //returns an object with function tokens.
tokens['year'](); //return current year
```

```javascript
var dt = require('date-tokens');

var tokens = dt(new Date(2001, 3, 4)); //returns an object with function tokens.
tokens['year'](); //returns '2001'
```

```javascript
var dt = require('date-tokens');

var tokens = dt(new Date(2001, 3, 4)); //returns an object with function tokens.
tokens['year'](new Date(2006, 5, 12)); //returns '2006'
```

```javascript
var dt = require('date-tokens');

var tokens = dt('date-'); //returns an object with function tokens.
tokens['date-year'](); //return current year
```

```javascript
var dt = require('date-tokens');

var tokens = dt(new Date(2005, 1, 1), 'date-'); //returns an object with function tokens.
tokens['date-year'](); //'2005'
```

### dt.eval([date], [prefix])

Return an object with tokens each with a string value

```javascript
var dt = require('date-tokens');

var tokens = dt.eval(); 
tokens['year']; //return current year
```

```javascript
var dt = require('date-tokens');

var tokens = dt.eval(new Date(2001, 3, 4)); //returns an object with function tokens.
tokens['year']; //returns '2001'
```

```javascript
var dt = require('date-tokens');

var tokens = dt.eval('date-'); 
tokens['date-year']; //return current year
```


Use with Mustache.js, Hogan.js, or Handlebars.js
------------------------------------------------

The main purpose of `date-tokens` is to use in conjunction with a templating language.

```javascript
var hogan = require('hogan.js')
  , dt = require('date-tokens');

var template = "Hello, the current year is {{date-year}}."

var output = hogan.compile(template).render(dt.eval('-date'));

console.log(output); //Hello, the current year is 2012.
```


Tokens
------

```javascript
assert(tokens['year'] === '2001');
assert(tokens['month'] === '04'); //<----- NOTE THIS IS 4 AND NOT 3. JavaScript monthly indexing 0-11 is very stupid.
assert(tokens['day'] === '07');
assert(tokens['hour'] === '13');
assert(tokens['hours'] === '13');
assert(tokens['minute'] === '05');
assert(tokens['minutes'] === '05');
assert(tokens['mins'] === '05');
assert(tokens['secs'] === '33');
assert(tokens['seconds'] === '33');
assert(tokens['millis'] === '345');
assert(tokens['milliseconds'] === '345');

assert(tokens['ymd'] === '2001-04-07');
assert(tokens['hms'] === '13-05-33');
assert(tokens['ymd-hms'] === '2001-04-07-13-05-33');
assert(tokens['ymd_hms'] === '2001-04-07_13-05-33');

assert(tokens['iso'] === '2001-04-07T18:05:33.345Z')
```

License
-------

(MIT License)

Copyright 2012, JP  <jprichardson@gmail.com>


