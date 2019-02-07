const dao = require('../db/LoveDao')
const UserDao = require('../db/UserDao')
const push = require('../push/PushService')

module.exports = {
    addLove: async (love) => {
        const result = await dao.addLove(love)
        const {user, lover} = await UserDao.getUserById(love.userId)

        if (lover.pushToken !== null || lover.pushToken !== undefined || lover.pushToken !== '') {
            push.pushNotificationForUser(`你的${user.name}发了一条Love，快去看看吧`,
                love.content, lover.pushToken)
        }

        return result
    }
}
