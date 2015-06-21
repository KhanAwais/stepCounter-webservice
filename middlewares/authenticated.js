module.exports = function(app){
    app.middleware = app.middleware || {};

    app.middleware.authenticated = function(req, res, next){
    	if (!req.session.user_id){
    		res.status(403).send("Vous n'êtes pas connecté!");
    		return;
    	}

    	User = app.models.User;

    	User.findById(req.session.user_id, onUserFound);


    	function onUserFound(err, user) {
    		if (err){
    			res.status(500).send(err.toString());
    			return;
    		}

    		if(!user){
    			console.log("identifiant en session incorrect.");
    			req.session.destroy(function(err) {
    				if (err){
    					res.status(500).send(err.toString());
    					return;
    				}
    			});
    		}
    		// sinon tout va bien, on continue
    		// au passage, on transmet le user au cas où si besoin
    		req.currentUser = user;
    		next();
    	}
    }
};
