var WoodMoneyHandler = require('./woodmoney');

module.exports = exports = function(app, request) {
    var woodMoneyHandler = new WoodMoneyHandler(request);

    app.get('/woodmoney/season/:season', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney/player/:PlayerId', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney/team/:Team', woodMoneyHandler.getWoodMoneyBase);
    app.get('/woodmoney/comp/:Comp', woodMoneyHandler.getWoodMoneyBase);
    
    app.get('/schema/:collection', woodMoneyHandler.getSchema);

    app.get('/playerinfo', woodMoneyHandler.getPlayerInfo);
    app.get('/playerinfo/:playerid', woodMoneyHandler.getPlayerInfo);
    
    /*app.get('/wowy-team/:Team', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-team/:Team/season/:season', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-team/:Team/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWowy);

    app.get('/wowy-teamu/:Team', woodMoneyHandler.getSeasonWowyUpdated);

    app.get('/wowy-player/:Player1Id', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-player/:Player1Id/season/:season', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-player/:Player1Id/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWowy);
    app.get('/wowy-player/:Player1Id/playercomp/:Player2Id', woodMoneyHandler.getSeasonWowy);

    app.get('/woodwowy-team/:Team', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-team/:Team/season/:season', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-team/:Team/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWoodWowy);

    app.get('/woodwowy-player/:Player1Id', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-player/:Player1Id/season/:season', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-player/:Player1Id/season/:season/GameType/:gametype', woodMoneyHandler.getSeasonWoodWowy);
    app.get('/woodwowy-player/:Player1Id/playercomp/:Player2Id', woodMoneyHandler.getSeasonWowy);*/
};