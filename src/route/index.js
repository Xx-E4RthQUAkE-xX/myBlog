module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send("Initialized!: " + req.cookies.userID);
    });

    require('./user')(app);
    require('./articles')(app);
};