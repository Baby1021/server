const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'lai756925010',
    database: 'baby',

    connectionLimit: 10, // 最大连接数
    waitForConnections: true, //为true时，连接排队等待可用连接。为false将立即抛出错误
    typeCast: function(field, next) {
        if (field.type === 'TINY' && field.length === 4) {
            return (field.string() === '1'); // tinyint转boolean
        }
        if (field.type === "DATETIME") {
            const date = field.string();
            let d = new Date(date);
            return d.getTime()
        }
        return next();
    }
})

exports.pool = pool.promise()


