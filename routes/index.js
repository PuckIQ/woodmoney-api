var WoodMoneyHandler = require('./woodmoney');

module.exports = exports = function(app, request) {
  var woodMoneyHandler = new WoodMoneyHandler(request);

  app.get('/playerlist/:season/:gametype', woodMoneyHandler.getPlayerList);

  // Return All Available WoodMoney results
  app.get('/woodmoney', woodMoneyHandler.getWoodMoneyBase);

  // Return WoodMoney by Season results
  app.get('/woodmoney/:season', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:Comp', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:Conf', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:Conf/:Comp', woodMoneyHandler.getWoodMoneyBase);

  app.get('/woodmoney/:season/:PlayerId', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:PlayerId/:Comp', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:PlayerId/:Conf', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:PlayerId/:Conf/:Comp', woodMoneyHandler.getWoodMoneyBase);

  app.get('/woodmoney/:season/:Team', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:Team/:Comp', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:Team/:Conf', woodMoneyHandler.getWoodMoneyBase);
  app.get('/woodmoney/:season/:Team/:Conf/:Comp', woodMoneyHandler.getWoodMoneyBase);

  //app.get('/querytst/:wood/:money/:puckiq/:fun', woodMoneyHandler.getQueryBuilder);
};
