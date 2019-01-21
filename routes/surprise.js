const express = require('express');
const router = express.Router();
const {json} = require("../util/ResponseUtil")
const {queryLatestSurprise} = require('../db/SurpriseDao');

router.get('/', async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const surprise = await queryLatestSurprise(userId)
        json(res, surprise)
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }
})

module.exports = router;
