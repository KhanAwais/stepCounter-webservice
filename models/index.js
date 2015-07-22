var mongoose = require('mongoose');
var process = {};
process.env = {};
// le tuto Azure voulait qu'on mette la chaine dans process.env.CUSTOMCONNSTR_MONGOLAB_URI
// process.env.CUSTOMCONNSTR_MONGOLAB_URI = 'mongodb://localhost:27017/stepCounter-dev-db';
console.log(process.env.CUSTOMCONNSTR_MONGOLAB_URI);
console.log("et process.env : ");
console.log(process.env);

module.exports = function(app){
    app.mongoose = mongoose.connect(process.env.CUSTOMCONNSTR_MONGOLAB_URI);

    app.models = {};
    app.models.User = require('./Users')(app);
    app.models.Exercice = require('./Exercices')(app);
    app.models.Serie = require('./Series')(app);
};
