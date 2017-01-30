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
        var gametype = '02';
        break;
      default:
        var gametype = '03';
        break;
    }
    playerList(season, gametype, function(data) {
      res.send(data);
    });
  } /* End of Public Function getPlayerList */

  var playerList = function(season, gametype, callback) {
    MongoClient.connect(dbUri, function(err, db) {
      var Collection = db.collection('woodmoneylive');

      var results = Collection.aggregate([
        { '$match': { 'Player': { '$exists': true } } },
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
};

module.exports = WoodMoneyHandler;
