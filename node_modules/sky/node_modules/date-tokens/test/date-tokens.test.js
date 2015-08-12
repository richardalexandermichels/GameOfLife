var dt = require('../lib/date-tokens')
  , assert = require('assert');

describe('date-tokens', function(){

    describe('+ dt', function() {
        it('should return the tokens object of functions', function() {
            var tokens = dt();
            
            for (var token in tokens) {
                if(tokens.hasOwnProperty(token)) {
                    var val = tokens[token];
                    assert(typeof val === 'function');
                }
            }
        });

        it('should return the tokens object of functions, if function called, should return current time', function() {
            var tokens = dt();

            assert(tokens['mins']() == (new Date()).getMinutes());
        });

        it('should return the tokens object of functions, if function called without param, should use param in dt()', function() {
            var tokens = dt(new Date(2001, 3, 4));

            assert(tokens['year']() == 2001);
        });
        
        it('should return the tokens object of functions, if function called with param, should use param', function() {
            var tokens = dt(new Date(2001, 3, 4));

            assert(tokens['year'](new Date(2006, 3, 4)) == 2006);
        });

        it('should return the tokens object of functions with tokens named with the prefix', function() {
            var tokens = dt(new Date(2001, 3, 4), 'date-');
            assert(tokens['date-year'](new Date(2006, 3, 4)) == 2006); 
        });

        it('should return the tokens object of functions with tokens named with the prefix and current time', function() {
            var tokens = dt('date-');
            assert(tokens['date-mins']() == (new Date()).getMinutes());
        });
    });

    describe('+ eval', function() {
        it("should return the tokens object of strings of eval'd dates", function() {
            var tokens = dt.eval();
            
            for (var token in tokens) {
                if(tokens.hasOwnProperty(token)) {
                    var val = tokens[token];
                    assert(typeof val === 'string');
                }
            }
        });

        it('should return the tokens object of strings and should return current time', function() {
            var tokens = dt.eval();

            assert(tokens['mins'] == (new Date()).getMinutes());
        });

        it('should return the tokens object of strings should use param in eval()', function() {
            var tokens = dt.eval(new Date(2001, 3, 7, 13, 5, 33, 345)); //April 7th, 2001 1:05 PM

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

        });

        it('should return the tokens object of strings with tokens named with the prefix', function() {
            var tokens = dt.eval(new Date(2001, 3, 4), 'date-');
            assert(tokens['date-year'] === '2001'); 
        });

        it('should return the tokens object of strings with tokens named with the prefix and return current', function() {
            var tokens = dt.eval('date-');
            assert(tokens['date-year'] == (new Date()).getFullYear()); 
        });
    })
});

