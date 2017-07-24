let markDownIt = require('markdown-it');

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

        app.locals.dbp.query(
            "SELECT * FROM `articles` WHERE `id` = ? LIMIT 1", [id]
        ).then(function(data) {
            let results = data[0];
            let fields = data[1];
            if (results.length < 1) {
                throw new Error("Article not found");
            }

            article = results[0];
            let markdown = new markDownIt({
                html: true,
                linkify: true
            });
            article.html = markdown.render(article.body);
            res.render('article', { article: article });
        })
    });


    app.get("/articles/:id/edit", function(req, res) {
        let id = req.params.id;

        app.locals.dbp.query(
            "SELECT * FROM `articles` WHERE `id` = ? LIMIT 1", [id]
        ).then(function(data) {
            let results = data[0];
            let fields = data[1];
            if (results.length < 1) {
                throw new Error("Article not found");
            }

            article = results[0];
            res.render('edit_article', { article: article });
        })
    });
    app.put("/articles/:id", function(req, res) {
        let id = req.params.id;
        let title = req.body.title;
        let body = req.body.body;

        app.locals.dbp.query(
            "UPDATE `articles` SET `title` = ?, `body` = ? WHERE `id` = ?", [title, body, id]
        ).then(function(data) {
            res.redirect(`/articles/${id}`);
        }).catch(function(error) {
            res.status(403).send(error.message);
        })
    })
    app.delete("/articles/:id", function(req, res) {
        let id = req.params.id;

        app.locals.dbp.query(
            "DELETE FROM `articles` WHERE `id` = ?", [id]
        ).then(function(data) {
            res.redirect(`/articles`);
        }).catch(function(error) {
            res.status(403).send(error.message);
        })
    })
    app.get("/title/", function(req, res) {
        let id = req.params.id;
        res.render('title')
    })
}