const {pool} = require('./index')
const {toSql} = require('./dbUtils')


let love = {
    queryLove: async function(userId) {
        const options = {
            sql: "SELECT * FROM user right join love on user.userId = love.userId where user.userId = ?",
            nestTables: true
        };
        return pool.query(options, [userId])
            .then(([rows]) => {
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
