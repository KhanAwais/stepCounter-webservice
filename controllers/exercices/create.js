var bodyParser = require('body-parser').json();

module.exports = function(app){
    app.server.post('/exercice',
        bodyParser,

        function(req, res) {

            if (!req.body.nom){
                res.status(403).send("Missing required field");
                return;
            }

            var Exercice = app.models.Exercice;

            Exercice.find({nom : req.body.nom}, createIfExerciceUnique);

            function createIfExerciceUnique(err, exercice){
                if(err){
                    res.status(500).send(err.toString());
                    return;
                }
                if(exercice.length>0){
                    res.status(403).send("Exercice already exists");
                    return;
                }
                exercice = {};
                exercice.nom = req.body.nom;
                exercice.description = req.body.description || "";

                exercice = new app.models.Exercice(exercice);
                exercice.save(onExerciceCreated);
            }

            function onExerciceCreated(err, exercice){
                if(err)
                    res.status(500).send(err.toString());
                else
                    res.send(exercice.toJSON());
            }
        });
};
