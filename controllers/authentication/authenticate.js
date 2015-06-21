module.exports = function(app){
    app.server.post('/authenticate',
        app.middleware.authenticated,
        function(req, res){
        	res.send("Bonjour "+req.currentUser.login+"!");
        });
};
