const {pool} = require('./index')
const {toSql} = require('./dbUtils')


let love = {
    queryLove: async function(userId) {
        const sql = toSql("SELECT * FROM user right join love on user.userId = love.userId where love.userId = ? or love.userId = (select user.lover from user where user.userId = ? ) order by createTime desc ",
            [userId, userId])

        return pool.query({
            sql,
            nestTables: true
        }).then(([rows]) => {
            return rows.map(({love, user}) => {
                delete user.password
                return {...love, user}
            })
        })
    },

    queryLoveWithRemind: async function(userId) {
        const sql = toSql("SELECT * FROM user right join love on user.userId = love.userId where (love.userId = ? or love.userId = (select user.lover from user where user.userId = ? )) and love.remind=true order by createTime desc ",
            [userId, userId])

        return pool.query({
            sql,
            nestTables: true
        }).then(([rows]) => {
            return rows.map(({love, user}) => {
                delete user.password
                return {...love, user}
            })
        })
    },

    addLove: async function(love) {

        let sql = 'insert into love set ?';

        return pool.query(toSql(sql, love))
            .then(([result]) => {
                return result.insertId;
            })
    },

    delLove: async function(loveId) {
        let sql = 'delete from love where love.id=?';

        return pool.query(toSql(sql, loveId))
            .then(([result]) => {
                return result.affectedRows;
            })

    },

    updateLove: async function(love) {

        let sql = 'update love set ? where love.id = ?'

        return pool.query(toSql(sql, [love, love.id]))
            .then(([result]) => {
                return result.affectedRows;
            })
    }
};

module.exports = love
