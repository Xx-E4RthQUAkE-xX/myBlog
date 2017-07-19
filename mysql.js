//1.クライアントから送られてきたID、パスワードを取得する。
//2.Salt(ランダムな文字列)を生成する。
//3.Saltとパスワードを連結し、ハッシュ値を求める。
//4.ID,Salt,ハッシュ値を連結したものを保存する。
//5.ユーザーに登録完了と表示する。

let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'myBlog'
});
connection.connect();


let email = 'user@example.com';
let password = '1234';
let salt = 'ewfoiew'
sha1(salt + password)
connection.query('INSERT INTO users VALUES (NULL, "test@example.com", "passwd")', function(error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(results[0]);
});
connection.end();