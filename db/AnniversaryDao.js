const {pool} = require('./index')
const {toSql} = require('./dbUtils')


async function insertAnniversary(userId, name, time) {
    const sql = "insert into baby.anniversary set ?"

    return pool.query(toSql(sql, {
        name, time, userId
    })).then(([rows]) => rows)
}

async function queryAnniversary(userId, loveId) {

    const sql = toSql("SELECT * FROM user right join anniversary on user.userId = anniversary.userId where anniversary.userId=? or anniversary.userId=? order by createTime desc ", [userId, loveId])

    return pool.query({
        sql,
        nestTables: true
    }).then(([rows]) => {
        return rows.map(({anniversary, user}) => {
            delete user.password
            return {...anniversary, user}
        })
    })

}


module.exports = {
    insertAnniversary, queryAnniversary
}
