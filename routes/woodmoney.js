var config = require('../conf.js');
var MongoClient = require('mongodb').MongoClient;

var dbUri = 'mongodb://' + config.dbUser + ':' + config.dbPass + '@' + config.dbUri + ':' + config.dbPort + '/' + config.dbName;

function WoodMoneyHandler(request) {
  "use strict";

  this.getPlayerList = function(req, res) {
    var season = req.params.season;
    switch(req.params.gametype) {
      case '02':
      case '2':
      case 2:
      case 'R':
      case 'REG':
        var gametype = 2;
        break;
      default:
        var gametype = 3;
        break;
    }
    playerList(season, gametype, function(data) {
      res.contentType('application/json');
      res.send(JSON.stringify(data));
    });
  } /* End of Public Function getPlayerList */

  this.getQueryBuilder = function(req, res) {
    var options = req.params;
    woodMoneyBase(options, function(data) {
      res.send(data)
    })
  }


  /* Start Protected Functions */
  var playerList = function(season, gametype, callback) {
    MongoClient.connect(dbUri, function(err, db) {
      var Collection = db.collection('woodmoneylive');

      var results = Collection.aggregate([
        { '$match': { 'Player': { '$exists': true }, 'season': season, 'gametype': gametype } },
        { '$project': { 'PlayerId': 1, 'Player': 1, '_id': 0 } },
        { '$sort': { 'PlayerId': 1 } },
        { '$group': { '_id': '$PlayerId', 'PlayerName': { '$first': '$Player' } } }
      ], { cursor: { 'batchSize': 1 } });

      results.toArray(function(err, docs) {
        if(!err) {
          callback(docs);
        } else {
          callback(null);
        }
        db.close();
      });


    });
  } /* End of Private Function playerList */

  var woodMoneyBase = function(options, callback) {
    /*MongoClient.connect(dbUri, function(err, db) {
      var Collection = db.collection('woodmoneylive');

      var query = mongoQueryBuilder(options);
    });*/
    var query = mongoQueryBuilder(options);
    callback(query);
  }

  var mongoQueryBuilder = function(options, callback) {
    var queryBuilder = "";
    Object.keys(options).forEach(function(key) {
      if(Number.isInteger)
        queryBuilder += key + ": " + options[key];
      else
        queryBuilder += key + ": '" + options[key] + "'";
    });

    callback(queryBuilder);
  }
};

module.exports = WoodMoneyHandler;
