module.exports = function(app){
    app.server.get('/allExercice',
        app.middleware.authenticated,

        function(req, res){
        	var Exercice = app.models.Exercice;
        	Exercice.find({}, function (err, exercices) {
				if(err)
                    res.status(500).send(err.toString());
                else
					res.send(exercices);
			});
        });
};
