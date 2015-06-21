var bodyParser = require('body-parser').json();
var sha1 = require('sha1');

module.exports = function(app){
    app.server.post('/user',
        bodyParser,

        function(req, res) {

            if (!req.body.login || !req.body.password || !req.body.nom || !req.body.prenom){
                res.status(403).send("Missing required field");
                return;
            }

            var User = app.models.User;

            User.find({login : req.body.login}, createIfLoginUnique);

            function createIfLoginUnique(err, user){
                if(err){
                    res.status(500).send(err.toString());
                    return;
                }
                if(user.length>0){
                    res.status(403).send("Login already exists");
                    return;
                }
                user = {};
                user.login = req.body.login;
                user.password = sha1(req.body.password);
                user.nom = req.body.nom;
                user.prenom = req.body.prenom;

                user = new app.models.User(user);
                user.save(onUserCreated);
            }

            function onUserCreated(err, user){
                if(err)
                    res.status(500).send(err.toString());
                else
                    res.send(user.toJSON());
            }
        });
};
