const express = require('express');
const router = express.Router();
const {
    queryAllUser
} = require('../db/UserDao')

router.get('/list', async (req, res, next) => {
    const users = await queryAllUser();
    res.json(users)
})

module.exports = router;
