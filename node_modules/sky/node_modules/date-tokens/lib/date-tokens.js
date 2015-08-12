function DateTokens() {
    this.date = null;
}

DateTokens.prototype.create = function(date, prefix) {
    if (typeof date === 'string') {
        prefix = date;
        date = null;
    }

    this.date = date;

    var self = this;
    function fetchDateToUse(date) {
        var dateToUse = null;
        if (self.date) {
            dateToUse = self.date;
        }

        if (date) {
            dateToUse = date;
        }

        if (typeof(dateToUse) === 'undefined' || dateToUse == null)
            dateToUse = new Date(); //use now
        return dateToUse;
    }

    var dateObj = {
        "year": function(date) {
            return fetchDateToUse(date).getFullYear().toString();
        },
        "month": function(date) {
            return ('0' + (fetchDateToUse(date).getMonth()+1)).slice(-2);
        },
        "day": function(date) {
            return ('0' + fetchDateToUse(date).getDate()).slice(-2);
        },
        "hours": function(date) {
            return ('0' + fetchDateToUse(date).getHours()).slice(-2);
        },
        "minutes": function(date) {
            return ('0' + fetchDateToUse(date).getMinutes()).slice(-2);
        },
        "seconds": function(date) {
            return ('0' + fetchDateToUse(date).getSeconds()).slice(-2);
        },
        "milliseconds": function(date) {
            return fetchDateToUse(date).getMilliseconds().toString();
        },
        'ymd': function(date) {
            return dateObj['year'](date) + '-' + dateObj['month'](date) + '-' + dateObj['day'](date);
        },
        'hms': function(date) {
            return dateObj['hours'](date) + '-' + dateObj['minutes'](date) + '-' + dateObj['seconds'](date);
        },
        'ymd-hms': function(date) {
            return dateObj['ymd'](date) + '-' + dateObj['hms'](date);
        },
        'ymd_hms': function(date) {
            return dateObj['ymd'](date) + '_' + dateObj['hms'](date);
        },
        'iso': function(date) {
            return fetchDateToUse(date).toISOString();
        }
    }

    //aliases
    dateObj['hour'] = dateObj['hours'];
    dateObj['minute'] = dateObj['minutes'];
    dateObj['mins'] = dateObj['minutes'];
    dateObj['secs'] = dateObj['seconds'];
    dateObj['millis'] = dateObj['milliseconds'];

    if (prefix) {
        for (var token in dateObj) {
            if (dateObj.hasOwnProperty(token)) {
                dateObj[prefix + token] = dateObj[token];
            }
        }
    }

    return dateObj;
}

function dt(date, prefix) {
    var d = new DateTokens();
    return d.create.apply(d, arguments);
}

function eval(date, prefix) {
    var retObj = {}, tokenObj = null;


    if (date)
        tokenObj = dt(date, prefix);
    else
        tokenObj = dt(new Date(), prefix);

    for (var token in tokenObj) {
        if (tokenObj.hasOwnProperty(token)) {
            retObj[token] = tokenObj[token]();
        }
    }

    return retObj;
}

module.exports = dt;
module.exports.eval = eval;


