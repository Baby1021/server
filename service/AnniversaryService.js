const UserDao = require('../db/UserDao')
const dao = require('../db/AnniversaryDao')
const push = require('../push/PushService')
const moment = require('moment')


async function addAnniversary(userId, name, year, month, day) {
    const time = moment({year, month: month - 1, date: day})
    console.log(time.format("YYYY-MM-DD"))
    return dao.insertAnniversary(userId, name, time.toDate())
}

async function getAnniversary(userId) {

    const {user, lover} = await UserDao.getUserById(userId)

    return dao.queryAnniversary(user.userId, lover.userId)
}

module.exports = {
    addAnniversary, getAnniversary
}
