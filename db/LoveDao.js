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

    addTask: async function(task) {

        let sql = 'insert into task set ?';

        return pool.query(toSql(sql, task))
            .then(([result]) => {
                return result.insertId;
            })
    },

    delTask: async function(taskId) {
        let sql = 'delete from task where task.id=?';

        return pool.query(toSql(sql, taskId))
            .then(([result]) => {
                return result.affectedRows;
            })

    },

    updateTask: async function(task) {

        let sql = 'update task set ? where task.id = ?'

        return pool.query(toSql(sql, [task, task.id]))
            .then(([result]) => {
                return result.affectedRows;
            })
    }
};

module.exports = love
