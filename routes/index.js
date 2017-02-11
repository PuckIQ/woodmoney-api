var WoodMoneyHandler = require('./woodmoney');

module.exports = exports = function(app, request) {
  var woodMoneyHandler = new WoodMoneyHandler(request);

  app.get('/playerlist/:season/:gametype', woodMoneyHandler.getPlayerList);
};
