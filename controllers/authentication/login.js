var bodyParser = require('body-parser').json();
var sha1 = require('sha1');

module.exports = function(app){
    app.server.post('/login',
        bodyParser,
        function(req, res){
            if (req.session.user_id){
            	res.send("Vous etes déjà connecté. Si vous voulez vous connecter avec un autre user, il vous faut vous déconnecter.");
            	return;
            }

        	if (!req.body.login || !req.body.password){
                res.status(403).send("Missing required field");
                return;
            }

            var user = {};
            user.login = req.body.login;
            user.password = sha1(req.body.password);

            User = app.models.User;
            User.find(user, onUserFound);

            function onUserFound(err, user){
                if(err){
                    res.status(500).send(err.toString());
                    return;
                }
                if(!user[0]){
                    res.status(403).send("Incorrect login or password");
                    return;
                }

            	req.session.user_id = user[0]._id;
                res.send("Bonjour "+user[0].login+"!");
            }
        });
};
