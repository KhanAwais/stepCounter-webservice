module.exports = function(app){

    var SerieSchema = app.mongoose.Schema({
        user_id: {
            type: app.mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        exercice_id: {//emprunteur
            type: app.mongoose.Schema.Types.ObjectId,
            ref: 'Exercice',
            required: true
        },
        date: {
            type: Date,
            required : true
        },
        nb_repetitions: {
            type: Number,
            required: true
        }
    });

    return app.mongoose.model('Serie', SerieSchema);
};
