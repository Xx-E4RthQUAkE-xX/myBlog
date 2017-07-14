let http = require('http');
let fs = require('fs');

let server = http.createServer(function(req, res) {
    let path = '.' + req.url;
    fs.readFile(path, function(err, data) {
        if (err) {
            res.statusCode = 404;
            res.write('ファイルが見つかりませんでした')
        } else {
            req.write(data);
        }
    })

    res.end();
});
server.listen(3000);