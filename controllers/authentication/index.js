var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

module.exports = function(app){
    app.server.use(session({
        saveUninitialized: true,
        resave: false,
        secret: 's3cr3t',
        store: new MongoStore({
            mongooseConnection: app.mongoose.connection
        })
    }));

    require('./authenticate')(app);
    require('./login')(app);
    require('./logout')(app);
};
