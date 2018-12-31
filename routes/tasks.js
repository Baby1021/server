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
            id:10,
            avator:"https://avatars0.githubusercontent.com/u/22772199?s=460&v=4",
            name:'测试用户'
        },
        createTime: Date.now()
    }

    res.json([task, task, task, task])
})
module.exports = router