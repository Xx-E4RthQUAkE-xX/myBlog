let crypto = require('crypto');

module.exports = function(app) {
    app.get('/signup', function(req, res) {
        res.render('signup');
    });
    app.post('/signup', function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        let salt = crypto.randomBytes(8).toString('hex');
        let sha512 = crypto.createHash('sha512');

        sha512.update(salt);
        sha512.update(password);

        let hashData = sha512.digest('hex');
        let sha256 = crypto.createHash('sha512');

        sha256.update(email);
        sha256.update(salt);
        sha256.update(hashData);

        let secondHashData = sha256.digest('hex');

        app.locals.db.query(
            "INSERT INTO `users` (`email`, `password`, `salt`) VALUES (?, ?, ?)", [email, hashData, salt],
            function(error, results, fields) {
                console.log(error);
                res.redirect(302, "/login");
            }
        )
        res.render('top');
    });
    app.get('/login', function(req, res) {
        res.render('login');
    });
    app.post('/login', function(req, res) {
        let email = req.body.email;
        let password = req.body.password;
        app.locals.db.query(
            "SELECT * FROM `users` WHERE `email` = ? LIMIT 1", [email],
            function(error, results, fields) {
                if (results.length < 1) {
                    res.render('login');
                    return;
                }
                let user = results[0];
                let salt = user.salt;
                let sha512 = crypto.createHash('sha512');
                sha512.update(salt);
                sha512.update(password);
                let hash = sha512.digest('hex');

                if (hash !== user.password) {
                    res.render('login');
                    return;
                }
                res.cookie('userID', user.id);
                res.send('SUCCESS!!!');
            });
    });
    app.delete('/logout', function(req, res) {
        res.cookie('userID', undefined);
        res.redirect(302, "/login");
    });

    app.get("/users/:id", function(req, res) {
        let id = req.params.id;
        app.locals.db.query(
            "SELECT * FROM `articles` WHERE `user_id` = ? ORDER BY `id` DESC", [id],
            function(error, results, fields) {
                let articles = results;
                res.render('articles', { articles: articles });
            }
        );
    });

    app.get("/top/", function(req, res) {
        res.render('top');
    })
}