var WoodMoneyHandler = require('./woodmoney');

module.exports = exports = function(app, request) {
    var woodMoneyHandler = new WoodMoneyHandler(request);

    app.get('/playerlist/:season/:gametype', woodMoneyHandler.getPlayerList);

    // Return All Available WoodMoney results
    //app.get('/woodmoney-all', woodMoneyHandler.getWoodMoneyBase);

    // Return WoodMoney by Season results
    //app.get('/woodmoney-season/:season', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-season/:season/comp/:Comp', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-season/:season/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-season/:season/comp/:Comp/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);

    app.get('/woodmoney-player/:PlayerId', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-player/:PlayerId/comp/:Comp', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-player/:PlayerId/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-player/:PlayerId/comp/:Comp/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-player/:PlayerId/season/:season', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-player/:PlayerId/season/:season/comp/:Comp', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-player/:PlayerId/season/:season/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-player/:PlayerId/season/:season/comp/:Comp/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);

    app.get('/woodmoney-team/:Team', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-team/:Team/comp/:Comp', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-team/:Team/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-team/:Team/comp/:Comp/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-team/:Team/season/:season', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-team/:Team/season/:season/comp/:Comp', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-team/:Team/season/:season/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-team/:Team/season/:season/comp/:Comp/conf/:Conf', woodMoneyHandler.getWoodMoneyBase);

    app.get('/woodmoney-comp/comp/:Comp', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-comp/comp/:Comp/GameType/:gametype', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney-comp/comp/:Comp/GameType/:gametype/pos/:Pos', woodMoneyHandler.getWoodMoneyBase);

    //app.get('/querytst/:wood/:money/:puckiq/:fun', woodMoneyHandler.getQueryBuilder);
};