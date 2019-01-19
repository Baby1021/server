const {pool} = require('./index')
const {toSql} = require('./dbUtils')


let dao = {
    queryLatestVersion: async function() {
        const sql = "select * from version where versionCode in (select max(versionCode) from version)"

        return pool.query(toSql(sql))
            .then(([version]) => version[0])
    },
};

module.exports = dao
