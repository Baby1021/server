const {pool} = require('./index')
const {toSql} = require('./dbUtils')


let love = {
    // todo 整合queryLove和queryLoveWithRemind方法
    queryLove: async function(userId) {
        const sql = toSql("SELECT * FROM user right join love on user.userId = love.userId where love.userId = ? or love.userId = (select user.lover from user where user.userId = ? ) order by createTime desc ",
            [userId, userId])

        let loves = await pool.query({
            sql,
            nestTables: true
        }).then(([rows]) => {
            return rows.map(({love, user}) => {
                delete user.password
                return {...love, user}
            })
        });

        for (let love of loves) {
            // const sql = toSql("select * from love_comment where love_comment.loveId = ? order by createTime", love.id)
            const sql = toSql("select * from user right join love_comment as comment  on user.userId = comment.userId where comment.loveId = ? order by createTime", love.id)
            love.comments = await pool.query({
                sql,
                nestTables: true
            }).then(([rows]) => {
                return rows.map(({comment, user}) => {
                    delete user.password
                    return {...comment, user}
                })
            });
        }
        return loves
    },

    queryLoveWithRemind: async function(userId) {
        const sql = toSql("SELECT * FROM user right join love on user.userId = love.userId where  love.userId = (select user.lover from user where user.userId = ? ) and love.remind=true order by createTime desc ",
            [userId])

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
    },

    addLoveComment: async function(comment) {
        let sql = 'insert into love_comment set ?';

        return pool.query(toSql(sql, comment))
            .then(([result]) => {
                return result.insertId;
            })
    },

    deleteLoveComment: async function(commentId) {
        let sql = 'delete from love_comment where love_comment.id=?';

        return pool.query(toSql(sql, commentId))
            .then(([result]) => {
                return result.affectedRows;
            })
    }
};

module.exports = love
