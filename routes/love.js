const express = require('express');
const router = express.Router();
const {imageMiddleware} = require('../util/multer')
const {addLove, updateLove, queryLove, delLove} = require('../db/LoveDao');
const {json} = require('../util/ResponseUtil');
const {getImages} = require('../util/BabyUtils');

router.get('/', async (req, res, next) => {
    const love = await queryLove(req.query.userId)
    res.json(love)
});

router.post('/', async (req, res, next) => {
    try {
        const loveId = await addLove(req.body.love)
        json(res, {loveId})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }
});

router.post('/image', imageMiddleware.array('images', 9), async (req, res) => {
    try {

        const content = req.body.content
        const userId = req.body.userId;
        const result = await addLove({
            content, userId,
            "images": getImages(req.files)
        })

        json(res, {result})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }
})

router.put('/', async (req, res, next) => {
    try {
        // todo 处理时间戳
        const result = await updateLove(req.body.love)
        json(res, {result})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const result = await delLove(req.body.loveId)
        json(res, {result})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }

});

module.exports = router
