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
    app.get('/woodmoney-season/:season/comp/:Comp/pos/:Pos', woodMoneyHandler.getWoodMoneyBase);

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
    
    app.get('/wowy-team/:Team', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-team/:Team/season/:season', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-team/:Team/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWowy);

    app.get('/wowy-teamu/:Team', woodMoneyHandler.getSeasonWowyUpdated);

    app.get('/wowy-player/:Player1Id', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-player/:Player1Id/season/:season', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-player/:Player1Id/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-player/:Player1Id/playercomp/:Player2Id', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-player/:Player1Id/playercomp/:Player2Id/season/:season', woodMoneyHandler.getSeasonWowy);

    app.get('/woodwowy-team/:Team', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-team/:Team/season/:season', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-team/:Team/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWoodWowy);

    app.get('/woodwowy-player/:Player1Id', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-player/:Player1Id/season/:season', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-player/:Player1Id/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-player/:Player1Id/playercomp/:Player2Id', woodMoneyHandler.getSeasonWowy);
    app.get('/woodwowy-player/:Player1Id/playercomp/:Player2Id/season/:season', woodMoneyHandler.getSeasonWowy);
};