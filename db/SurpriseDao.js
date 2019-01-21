const {pool} = require('./index')
const {toSql} = require('./dbUtils')


let dao = {
    queryLatestSurprise: async function(userId) {
        const sql = "select * from surprise where id in (select max(id) from surprise  where NOW() >= startTime and NOW() <= endTime and surprise.who = ?)"

        return pool.query(toSql(sql, userId))
            .then(([surprise]) => surprise[0])
    },
};

module.exports = dao
