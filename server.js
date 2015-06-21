var express = require('express');

(function init(){
    var app = {
        server: express()
    };

    require('./settings')(app);
    require('./models')(app);
    // TODO : dans le middleware authenticated, revoir le retour lors d'une erreur
    require('./middlewares')(app);
    require('./controllers')(app);

    app.server.listen(app.settings.port);
    console.log('Server started. Listening on port #{port}.'
        .replace('#{port}',  app.settings.port));
}());