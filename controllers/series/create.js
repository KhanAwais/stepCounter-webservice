var bodyParser = require('body-parser').json();

module.exports = function(app){
    app.server.post('/serie',
        bodyParser,
        app.middleware.authenticated,

        function(req, res) {

            if (!req.body.exercice_id || !req.body.date || !req.body.nb_repetitions){
                res.status(403).send("Missing required field");
                return;
            }

            var Serie = app.models.Serie;

            serie = {};
            serie.user_id = req.currentUser._id;
            serie.exercice_id = req.body.exercice_id;
            if(req.body.date){
                var dateRecherchee = new Date(req.body.date);
                if(isNaN(dateRecherchee.getTime())){
                    res.status(403).send("Invalid Date");
                    return;
                }
                serie.date = dateRecherchee;

            }
            serie.nb_repetitions = req.body.nb_repetitions;

            serie = new app.models.Serie(serie);
            serie.save(onSerieCreated);

            function onSerieCreated(err, serie){
                if(err)
                    res.status(500).send(err.toString());
                else
                    res.send(serie.toJSON());
            }
        });
};
