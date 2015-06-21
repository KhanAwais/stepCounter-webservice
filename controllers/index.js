module.exports = function(app){
    require('./authentication')(app);

    require('./users')(app);
    require('./exercices')(app);
    require('./series')(app);
};
