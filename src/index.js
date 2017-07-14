let express = require('express')
let app = express()

app.get('/', function(req, res) {
    res.redirect(302, '/name');
});

app.get("/name", function(req, res) {
    res.send("_UseK");
});

app.get("/show/:id", function(req, res) {
    res.send("ID: " + req.params.id);
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});