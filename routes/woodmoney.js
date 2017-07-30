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

    this.getPlayerInfo = function(req, res) {
        var options = req.params;
        var quri = req.query;
        playerInfo(options, quri, function(data) {
            res.contentType('application/json');
            res.send(JSON.stringify(data));
        });
    };

    this.getWoodMoneyBase = function(req, res) {
        var options = req.params;
        var quri = req.query;
        woodMoneyBase(options, quri, function(data) {
            res.contentType('application/json');
            res.send(JSON.stringify(data));
        });
    };

    this.getSchema = function(req, res) {
        var collection = req.params;
        schemaBase(collection.collection, function(data) {
            res.contentType('application/json');
            res.send(JSON.stringify(data));
        });
    }


    /**
     * Framework Functions
     * These are the functions used to build the framework for the exposed functions
     */

    var playerInfo = function(options, quri, callback) {
        var playerid = (typeof options.playerid !== 'undefined') ? parseInt(options.playerid) : null;
        var displayteams = (typeof quri.displayteams !== 'undefined') ? 1 : 0;
        var results;

        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection('playerinfo');
            if(playerid == null && displayteams == 1) {
                results = Collection.find();
            } else if(playerid != null && displayteams == 1) {
                results = Collection.find({'_id': playerid});
            } else if(playerid == null && displayteams == 0) {
                results = Collection.find({},{'teams': 0});
            } else {
                results = Collection.find({'_id': playerid},{'teams': 0});
            }

            results.toArray(function(err, docs) {
                if (!err) {
                    callback(docs);
                } else {
                    callback(null);
                }
                db.close();
            });
        });
    }

    var woodMoneyBase = function(options, quri, callback) {
        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection('woodmoneylive');

            var query = mongoQueryBuilder(options, quri);
            var rt = mongoReturnBuilder(quri);
            var results = (rt != null) ? Collection.find(query,rt) : Collection.find(query);

            results.toArray(function(err, docs) {
                if (!err)
                    callback(docs);
                else
                    callback(null);
                db.close();
            });
        });
    };

    var schemaBase = function(col, callback) {
        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection(col);
            // find is used instead of findOne to go deeper into the DB
            // to get a document with all schema info
            var results = Collection.find().skip(10).limit(1);

            results.toArray(function(err, item) {
                console.log(item[0]);
                var schema = new Array();
                for(var key in item[0]) {
                    schema.push(key);
                }
                callback(schema);
                db.close();
            });
        });
    }

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
    function mongoQueryBuilder(options, quri) {
        var queryBuilder = new Object();
        Object.keys(options).forEach(function(key) {
            if (isNumeric(options[key]))
                queryBuilder[key] = parseInt(options[key]);
            else
                queryBuilder[key] = options[key];
        });

        Object.keys(quri).forEach(function(key) {
            if(key != 'rq' && typeof queryBuilder[key] === 'undefined') {
                if (isNumeric(quri[key]))
                    queryBuilder[key] = parseInt(quri[key]);
                else {
                    queryBuilder[key] = quri[key];
                }
            }
        });

        return queryBuilder;
    }

    /**
     * Name: mongoReturnBuilder
     * Usage: mongoReturnBuilder(object)
     * Returns: object,null
     */
    function mongoReturnBuilder(options) {
        if(typeof options.rq !== 'undefined') {
            var returnBuilder = new Object();
            var requestArray = options.rq.split(',');
            returnBuilder['_id'] = (requestArray.indexOf("id") >= 0 ) ? 1 : 0;
            for(var x = 0; x < requestArray.length; x++) {
                returnBuilder[requestArray[x]] = 1;
            }
            return returnBuilder;
        } else {
            return null;
        }
    }

    function isNumeric(n) {
        return !isNaN(n) && isFinite(n);
    }

    function isFloat(n) {
        return n % 1 === 0;
    }
};

module.exports = WoodMoneyHandler;