let express = require('express')
let app = express()

let path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

let route = require('./route');
route(app);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});