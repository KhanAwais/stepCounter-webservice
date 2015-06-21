module.exports = function(app){

    var UserSchema = app.mongoose.Schema({

        login: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        nom: {
            type: String,
            required: true
        },
        prenom: {
            type: String,
            required: true
        }
    });

    UserSchema.index({login: 1}, {unique: true});
    UserSchema.plugin(require('mongoose-timestamp'));

    UserSchema.methods.toJSON = function(){
        var user = this.toObject();
        delete user.password;

        return user;
    };

    return app.mongoose.model('User', UserSchema);
};
