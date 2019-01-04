const {pool} = require('./index')
const {toSql} = require('./dbUtils')


let dao = {
    queryTasks: async function(userId) {
        const options = {
            sql: "SELECT * FROM user right join task as task on user.userId = task.processor where user.userId = ?",
            nestTables: true
        };
        return pool.query(options, [userId])
            .then(([rows]) => {
                return rows.map(({task, user}) => {
                    delete user.password
                    return {...task, processor: user}
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

module.exports = dao
// dao.addTask({
//     title: '测试',
//     description: "描述",
//     processor: "laiyuanwen"
// })
// dao.updateTask({
//     id: 2,
//     title: '更新后的值'
// })
//
//
//
// const options = {
//     sql: "SELECT * FROM task left join user user on task.processor = user.userId where user.userId = ?",
//     nestTables: true // 这个值可以聚合表的对象
// };
//
// pool.query(options, ['laiyuanwen'])
//     .then(([rows, fields]) => { // 解构
//         console.log(JSON.stringify(rows, null, '\t'))
//         console.log(JSON.stringify(rows.map(({task, user}) => {
//             return task.id + " " + user.userId
//         }), null, '\n'))
//     })
//     .catch((err) => {
//         console.log(err)
//     })

// var userId = 1;
// var columns = ['username', 'email'];
// var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function (error, results, fields) {
//     if (error) throw error;
//     // ...
// });
//
// console.log(query.sql); // SELECT `username`, `email` FROM `users` WHERE id = 1
//
//
// var query = "SELECT * FROM posts WHERE title=" + mysql.escape("Hello MySQL");
//
// console.log(query); // SELECT * FROM posts WHERE title='Hello MySQL'


// var post  = {id: 1, title: 'Hello MySQL'};
// var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
//     if (error) throw error;
//     // Neat!
// });
// console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'


// var sql = "SELECT * FROM ?? WHERE ?? = ?";
// var inserts = ['users', 'id', userId];
// sql = mysql.format(sql, inserts);















