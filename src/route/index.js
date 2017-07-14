module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send("Initialized!");
    });

    require('./user')(app);
};