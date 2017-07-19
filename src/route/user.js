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

        console.log(hashData);

        let sha256 = crypto.createHash('sha512');

        sha256.update(email);
        sha256.update(salt);
        sha256.update(hashData);

        let secondHashData = sha256.digest('hex');

        console.log(secondHashData);
        res.json('登録が完了しました。');
    });
    app.get('/login', function(req, res) {

    });
    app.post('/login', function(req, res) {

    });
    app.delete('/logout', function(req, res) {

    });

}