var WoodMoneyHandler = require('./woodmoney');

module.exports = exports = function(app, request) {
  var woodMoneyHandler = new WoodMoneyHandler(request);

  app.get('/playerlist/:season/:gametype', woodMoneyHandler.getPlayerList);

  // Return All Available WoodMoney results
  //app.get('/woodmoney', )
  app.get('/querytst', woodMoneyHandler.getQueryBuilder);
  app.get('/querytst/:wood/:money/:puckiq/:fun', woodMoneyHandler.getQueryBuilder);
};
