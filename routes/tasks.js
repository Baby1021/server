var express = require('express')
var router = express.Router()

router.get('/', async (req, res, next) => {
    // const userId = req.query.userId

    const task = {
        id: 1,
        done: false,
        title: "测试任务",
        description: "描述文案",
        processor: {
            id: 2,
            avatar: "http://39.108.227.137:3000/images/avatar.jpeg",
            name: 'Jenkins用户'
        },
        createTime: Date.now()
    }

    res.json([task, task, task, task])
})
module.exports = router