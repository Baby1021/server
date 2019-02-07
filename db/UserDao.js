const {pool} = require('./index')
const {toSql} = require('./dbUtils')


let dao = {
    queryAllUser: async function() {
        const sql = "select * from user"
        return pool.query(toSql(sql))
            .then(([users]) => {
                return users.map((user) => {
                    delete user.password
                    return user
                })
            })
    },

    getUserById(userId) {
        const sql = "select * from user  right join user as lover on user.lover = lover.userId where user.userId=?"
        return pool.query({
            sql: toSql(sql, userId),
            nestTables: true
        }).then(([users]) => {
            if (users.length === 0) {
                return null
            }
            delete users[0].password
            return {
                user: users[0].user,
                lover: users[0].lover
            }
        })
    },

    updateUser(user) {
        let sql = 'update user set ? where user.userId = ?'

        return pool.query(toSql(sql, [user, user.userId]))
            .then(([result]) => {
                return result.affectedRows;
            })
    }
};

module.exports = dao
