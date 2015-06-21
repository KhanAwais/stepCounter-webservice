module.exports = function(app){

    var ExerciceSchema = app.mongoose.Schema({
        nom: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    });

    ExerciceSchema.index({nom: 1}, {unique: true});

    return app.mongoose.model('Exercice', ExerciceSchema);
};
