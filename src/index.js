let express = require('express')
let app = express();

let path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

let morgan = require('morgan');
app.use(morgan('dev'));

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let cookieParser = require('cookie-parser');
app.use(cookieParser());

let mysql = require('mysql');
let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "myBlog"
});
db.connect();
app.locals.db = db;

let route = require('./route');
route(app);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});