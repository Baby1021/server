const mysql = require('mysql2')
module.exports = {
    toSql: function(sql, args) {
        const newSql = mysql.format(sql, args)

        console.log(`执行的sql ：${newSql}`)

        return newSql
    }
}