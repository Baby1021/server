const express = require('express');
const router = express.Router();
const {json} = require('../util/ResponseUtil')
const {
    queryAllUser,
    getUserById,
    updateUser
} = require('../db/UserDao')

// /api/v1/user

router.get('/list', async (req, res, next) => {
    const users = await queryAllUser();
    res.json(users)
})

/**
 * 登录
 *
 * @version 0.0.5
 */
router.post("/login", async (req, res, next) => {
    const userId = req.body.userId
    const password = req.body.password

    const {user} = await getUserById(userId)

    if (user.password === password) {
        json(res, "登录成功")
    } else {
        json(res, "登录失败,账号或密码错误", -1, "失败")
    }
})

router.put("/pushToken", async (req, res, next) => {
    const pushToken = req.body.pushToken;
    const userId = req.body.userId;

    const result = await updateUser({userId, pushToken})

    json(res, "更新pushToken成功")
})

module.exports = router;

