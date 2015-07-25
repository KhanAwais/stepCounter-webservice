var mongoose = require('mongoose');
var process = {};
process.env = {};
// le tuto Azure voulait qu'on mette la chaine dans process.env.CUSTOMCONNSTR_MONGOLAB_URI
process.env.CUSTOMCONNSTR_MONGOLAB_URI = 'mongodb://appMobile:appMobile@ds036178.mongolab.com:36178/StepCounterDB';

module.exports = function(app){
    app.mongoose = mongoose.connect(process.env.CUSTOMCONNSTR_MONGOLAB_URI);

    app.models = {};
    app.models.User = require('./Users')(app);
    app.models.Exercice = require('./Exercices')(app);
    app.models.Serie = require('./Series')(app);
};
