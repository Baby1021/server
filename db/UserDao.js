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
};

module.exports = dao
