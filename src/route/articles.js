module.exports = function(app) {
    app.get("/articles", function(req, res) {
        app.locals.db.query(
            "SELECT * FROM `articles` ORDER BY `id` DESC", [],
            function(error, results, fields) {
                let articles = results;
                res.render('articles', { articles: articles });
            }
        )
    });

    app.get("/articles/new", function(req, res) {
        if (req.cookies.userID) {
            res.render('new_articles');
            return;
        }
        res.redirect(302, "/login");

    });

    app.post("/articles", function(req, res) {
        let title = req.body.title;
        let body = req.body.body;
        let user_id = req.cookies.userID;
        app.locals.db.query(
            "INSERT INTO `articles` (`title`, `body`, `user_id`) VALUES (?, ?, ?)", [title, body, user_id],
            function(error, results, fields) {
                let id = results.insertId;
                res.redirect(302, "/articles/" + id);
            }
        )
    });

    app.get("/articles/:id", function(req, res) {
        let id = req.params.id;
        app.locals.db.query(
            "SELECT * FROM `articles` WHERE `id` = ? LIMIT 1 ", [id],
            function(error, results, fields) {
                console.log(error)
                if (results.length < 1) {
                    res.status(404).send("Not found");
                    return;
                }

                let article = results[0];
                res.render('article', { article: article });
            }
        )
    });
}