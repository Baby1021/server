const express = require('express');
const router = express.Router();
const {json} = require('../util/ResponseUtil')
const service = require('../service/AnniversaryService')

/**
 * 查询纪念日
 *
 * @version 0.0.8
 */
router.get("/", async (req, res, next) => {
    const userId = req.query.userId

    try {
        const result = await service.getAnniversary(userId)
        json(res, result)
    } catch (e) {
        console.log(e)
        json(res, null, -1, "添加失败")
    }
})

/**
 * 添加纪念日
 *
 * @version 0.0.8
 */
router.post("/", async (req, res, next) => {
    const userId = req.body.userId
    const name = req.body.name
    const year = req.body.year
    const month = req.body.month
    const day = req.body.day

    try {
        const result = await service.addAnniversary(userId, name, year, month, day)
        json(res, "添加成功")
    } catch (e) {
        console.log(e)
        json(res, null, -1, "添加失败")
    }
})

module.exports = router;

