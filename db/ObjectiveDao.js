const {pool} = require('./index')
const {toSql} = require('./dbUtils')

let dao = {

    /**
     * 查询指定用户的所有目标
     *
     * @param userId 用户id
     */
    queryObjectiveWithUserId: async function(userId) {
        const sql = "select * from objective where objective.userId=?"

        return pool.query(toSql(sql, userId))
            .then(([objective]) => objective)
    },

    /**
     * 添加目标
     */
    addObjective() {

    },

    /**
     * 完成目标
     */
    finishObjective() {

    },

    /**
     * 删除目标
     */
    deleteObject() {

    },

    /**
     * 对方确认目标
     *
     * 需要添加金额
     */
    submitObjective() {

    }

};

module.exports = dao
