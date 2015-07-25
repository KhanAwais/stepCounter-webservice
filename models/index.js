var mongoose = require('mongoose');
var process = {};
process.env = {};

module.exports = function(app){
    app.mongoose = mongoose.connect(app.settings.db);

    app.models = {};
    app.models.User = require('./Users')(app);
    app.models.Exercice = require('./Exercices')(app);
    app.models.Serie = require('./Series')(app);
};
