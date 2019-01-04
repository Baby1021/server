const express = require('express')
const router = express.Router()
const {
    addTask,
    updateTask,
    queryTasks,
    delTask
} = require('../db/TaskDao')

router.get('/', async (req, res, next) => {
    const task = await queryTasks(req.query.userId)
    res.json(task)
})

router.post('/', async (req, res, next) => {
    const taskId = await addTask(req.body.task)
    res.json({taskId})
})

router.put('/', async (req, res, next) => {
    const result = await updateTask(req.body.task)
    res.json({result})
})

router.delete('/', async (req, res, next) => {
    const result = await delTask(req.body.taskId)
    res.json({result})

})

// const userId = req.body.userId
// const taskId = req.body.taskId
// const done = req.body.done
module.exports = router