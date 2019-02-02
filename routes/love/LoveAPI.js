const express = require('express');
const router = express.Router();
const {imageMiddleware} = require('../../util/multer')
const {addLove, updateLove, queryLove, delLove, queryLoveWithRemind} = require('../../db/LoveDao');
const {json} = require('../../util/ResponseUtil');
const {getImages} = require('../../util/BabyUtils');

/**
 * 查询用户Love
 *
 * @param userId 用户Id
 *
 * @version v0.0.1 新增接口
 * @version v0.0.3 返回评论数据
 */
router.get('/', async (req, res, next) => {
    const love = await queryLove(req.query.userId)
    res.json(love)
});

/**
 * 查询需要提醒的love
 *
 * @param userId 用户Id
 *
 * @version v0.0.3 新增接口
 */
router.get('/remind', async (req, res, next) => {
    const love = await queryLoveWithRemind(req.query.userId)
    res.json(love)
});

/**
 * 添加Love(文字)
 *
 * @version v0.0.1 新增接口
 * @version v0.0.3 新增remind字段 todo 这个接口应该和image接口合并
 */
router.post('/', async (req, res, next) => {
    try {
        const love = req.body.love;
        const loveId = await addLove(love)
        json(res, {loveId})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }
});

/**
 * 添加Love（文字 + 图片）
 *
 * @version v0.0.2 新增接口
 * @version v0.0.3 添加remind字段
 */
router.post('/image', imageMiddleware.array('images', 9), async (req, res) => {
    try {

        const content = req.body.content
        const userId = req.body.userId;
        const result = await addLove({
            content, userId,
            remind: true,
            "images": getImages(req.files)
        })

        json(res, {result})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }
})

/**
 * 更新Love
 * @version v0.0.2 新增接口
 */
router.put('/', async (req, res, next) => {
    try {
        // todo 处理时间戳
        const result = await updateLove(req.body.love)
        json(res, {result})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }
});

/**
 * 删除Love
 *
 * @param loveId Love的id
 * @version v0.0.2 新增接口
 */
router.delete('/', async (req, res, next) => {
    try {
        const result = await delLove(req.body.loveId)
        json(res, {result})
    } catch (e) {
        json(res, {error: e.message}, -1, "添加失败")
    }

});

/**
 * 更新love的提醒
 *
 * @param loveId Love的id
 * @param isRead Love的id
 *
 * @version v0.0.3 新增
 */
router.post('/remind', async (req, res, next) => {
    const loveId = req.body.loveId;
    const remind = req.body.remind;

    try {
        const result = await updateLove({
            id: loveId, remind
        })
        json(res, {result})
    } catch (e) {
        json(res, {error: e.message}, -1, "修改Love提醒失败")
    }
});

module.exports = router
