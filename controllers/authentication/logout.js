module.exports = function(app){
    app.server.post('/logout', app.middleware.authenticated, function(req, res){

    	req.session.destroy(function(err) {
    		if (err){
	            res.status(500).send(err.toString());
	    		return;
	    	}
	    	res.send("Au revoir!");
    	});
    });
};
