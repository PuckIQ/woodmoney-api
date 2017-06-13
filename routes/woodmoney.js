var config = require('../conf.js');
var MongoClient = require('mongodb').MongoClient;

var dbUri = 'mongodb://' + config.dbUser + ':' + config.dbPass + '@' + config.dbUri + ':' + config.dbPort + '/' + config.dbName + '?slaveOk=true';

function WoodMoneyHandler(request) {
    "use strict";

    this.getPlayerList = function(req, res) {
        var season = parseInt(req.params.season);
        var gametype;
        switch (req.params.gametype) {
            case '02':
            case '2':
            case 2:
            case 'R':
            case 'REG':
                gametype = 2;
                break;
            default:
                gametype = 3;
                break;
        }

        playerList(season, gametype, function(data) {
            res.contentType('application/json');
            res.send(JSON.stringify(data));
        });
    };

    this.getWoodMoneyBase = function(req, res) {
        var options = req.params;
        woodMoneyBase(options, function(data) {
            res.contentType('application/json');
            res.send(JSON.stringify(data));
        });
    };

    this.getSeasonWoodWowy = function(req, res) {
        var options = req.params;
        seasonWoodWowy(options, function(data) {
            res.contentType('application/json');
            res.send(JSON.stringify(data));
        });
    };

    this.getSeasonWowy = function(req, res) {
        var options = req.params;
        seasonWowy(options, function(data) {
            res.contentType('application/json');
            res.send(JSON.stringify(data));
        });
    };

    /* End of Public Function getPlayerList */

    /* Start Protected Functions */
    var playerList = function(season, gametype, callback) {
        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection('woodmoneylive');

            var results = Collection.aggregate([
                { '$match': { 'Player': { '$exists': true }, 'season': season, 'gametype': gametype } },
                { '$project': { 'PlayerId': 1, 'Player': 1, 'Team': 1, '_id': 0 } },
                { '$sort': { 'PlayerId': 1 } },
                { '$group': { '_id': '$PlayerId', 'PlayerName': { '$first': '$Player' }, 'Team': { '$first': '$Team' } } }
            ], { cursor: { 'batchSize': 1 } });

            results.toArray(function(err, docs) {
                if (!err) {
                    callback(docs);
                } else {
                    callback(null);
                }
                db.close();
            });


        });
    }; /* End of Private Function playerList */

    /* This function runs all of the woodmoney requests to the DB */
    var woodMoneyBase = function(options, callback) {
        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection('woodmoneylive');

            var query = mongoQueryBuilder(options);
            var results = Collection.find(query);

            results.toArray(function(err, docs) {
                if (!err)
                    callback(docs);
                else
                    callback(null);
                db.close();
            });
        });
    };

    var seasonWoodWowy = function(options, callback) {
        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection('seasonwoodwowy');

            var query = mongoQueryBuilder(options);
            var results = Collection.aggregate([
                { $match: query },
                { $lookup: { from: "playerinfo", localField: "Player1Id", foreignField: "_id", as: "player1info" } },
                { $lookup: { from: "playerinfo", localField: "Player2Id", foreignField: "_id", as: "player2info" } }
            ])

            results.toArray(function(err, docs) {
                if(!err) {
                    callback(docs);
                } else {
                    callback(null);
                }
                db.close();
            });
        });
    };

    var seasonWowy = function(options, callback) {
        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection('seasonwowy');

            var query = mongoQueryBuilder(options);
            var results = Collection.aggregate([
                { $match: query },
                { $lookup: { from: "playerinfo", localField: "Player1Id", foreignField: "_id", as: "player1info" } },
                { $lookup: { from: "playerinfo", localField: "Player2Id", foreignField: "_id", as: "player2info" } }
            ])

            results.toArray(function(err, docs) {
                if(!err) {
                    callback(docs);
                } else {
                    callback(null);
                }
                db.close();
            });
        });
    };

    var playerInfo = function(playerid, callback) {
        MongoClient.connect(dbUri, function(err, db) {
            var Collection = db.collection('playerinfo');
            Collection.find({'_id': playerid}, function(err, doc) {
                if(!err)
                    callback(doc);
            });
            db.close();
        });
    };

    /* DO NOT MODIFY BELOW HERE */
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

    /* Helper Functions */
    function isNumeric(n) {
        return !isNaN(n) && isFinite(n);
    }

    function isFloat(n) {
        return n % 1 === 0;
    }
}

module.exports = WoodMoneyHandler;