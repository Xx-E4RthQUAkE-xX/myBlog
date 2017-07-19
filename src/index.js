let express = require('express')
let bodyParser = require('body-parser');
let app = express()

let path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

let route = require('./route');
route(app);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});