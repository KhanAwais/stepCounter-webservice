module.exports = function(app){
    app.server.get('/allSerie',
        app.middleware.authenticated,

        function(req, res){
        	var Serie = app.models.Serie;
        	Serie.find({}, function (err, series) {
				if(err)
                    res.status(500).send(err.toString());
                else
					res.send(series);
			});
        });

    app.server.get('/mySeries',
        app.middleware.authenticated,

        function(req, res){
            var Serie = app.models.Serie;

            var conditions = {
                        user_id: req.currentUser._id,
                    };
            if(req.query.date){
                var dateRecherchee = new Date(req.query.date);
                if(isNaN(dateRecherchee.getTime())){
                    res.status(403).send("Invalid Date");
                    return;
                }
                conditions.date = dateRecherchee;

            }

            var argsAggregate = [
                {
                    $group : {
                        _id : { user_id: "$user_id", jour: "$date" , exercice:"$exercice_id"},
                        user_id: { $first: "$user_id"},
                        date: { $first: "$date"},
                        total_repetitions: { $sum: "$nb_repetitions" },
                        averageQuantity: { $avg: "$nb_repetitions" },
                        nb_series: { $sum: 1 },
                        series: {$push: "$nb_repetitions"}
                    }
                },
                {
                    $match : conditions
                }
            ];

            Serie.aggregate(argsAggregate).exec( function (err, series) {
                if(err)
                    res.status(500).send(err.toString());
                else
                    res.send(series);
            });
        });
};
