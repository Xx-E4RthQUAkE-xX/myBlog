let net = require('net');

function parseHTTP(request) {
    let lines = request.split("\r\n");
    let firstLine = lines.shift();
    let method, path, version;

    [method, path, version] = firstLine.split(" ");
    version = version.substr("HTTP/".length);

    let headers = {};
    for (let header of lines) {
        let fields = header.split(': ');
        let key = fields.shift();
        headers[key] = fields.join(': ');
    }

    return {
        method: method,
        path: path,
        version: version,
        headers: headers
    }
}

let server = net.createServer(function(conn) {
    let requestBody = "";

    conn.on('data', function(data) {
        let chunk = data.toString();
        requestBody += chunk
        let req = parseHTTP(requestBody);
        console.log(req);
        let body = "Bonjour " + req.path;
        let response = [
            "HTTP/1.1 200 OK",
            "Date: " + (new Date()).toGMTString(),
            "Connection: close",
            "Content-Type: text/plain",
            "Content-Length: " + body.length,
            "",
        ];
        conn.write(response.join("\r\n"))
        conn.write("\r\n");
        conn.write(body);
        conn.write("\r\n");
        conn.end();

        if (chunk === "\n") {
            console.log(requestBody);

        }
    });
    conn.on('end', function() {});
});

server.listen(3000);