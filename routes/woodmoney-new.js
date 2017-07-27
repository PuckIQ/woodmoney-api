var config = require('../conf.js');
var MongoClient = require('mongodb').MongoClient;

var dbUri = 'mongodb://' + config.dbUser + ':' + config.dbPass + '@' + config.dbUri + ':' + config.dbPort + '/' + config.dbName + '?slaveOk=true';

function WoodMoneyHandler(request) {
    "use strict";

    /**
     * Exposed Functions
     * All of the functions will be exposed to the outside world and can be triggered
     * via the index.js.
     */


    /**
     * Framework Functions
     * These are the functions used to build the framework for the exposed functions
     */


    /**
     * Misc Functions
     * These are used as building blocks and are to be access by the Framework Functions
     * only.
     */

    /**
     * Name: mongoQueryBuilder
     * Usage: mongoQueryBuilder(object)
     * Returns: object
     * Description: Used to define a mongodb query (ie. db.collection.find(mongoQueryBuilder(object)) )
     */
    function mongoQueryBuilder(options) {
        var queryBuilder = new Object();
        Object.keys(options).forEach(function(key) {
            if (isNumeric(options[key]))
                queryBuilder[key] = parseInt(options[key]);
            else
                queryBuilder[key] = options[key];
        });
        return queryBuilder;
    }

    function mongoReturnBuilder(options) {
        if(typeof options !== 'undefined') {
            var returnBuilder = new Object();
            var requestArray = options.split(',');
            for(var x = 0; x < requestArray.length; x++) {
                queryBuilder[returnBuilder[x]] = 1;
            }
            return queryBuilder;
        } else {
            return null;
        }
    }
};

module.exports = WoodMoneyHandler;