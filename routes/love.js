const express = require('express')
const router = express.Router()
const {
    addTask,
    updateTask,
    queryLove,
    delTask
} = require('../db/LoveDao')

router.get('/', async (req, res, next) => {
    const love = await queryLove(req.query.userId)
    res.json(love)
})

router.post('/', async (req, res, next) => {
    const loveId = await addTask(req.body.task)
    res.json({loveId})
})

router.put('/', async (req, res, next) => {
    const result = await updateTask(req.body.task)
    res.json({result})
})

router.delete('/', async (req, res, next) => {
    const result = await delTask(req.body.taskId)
    res.json({result})

})

module.exports = router
