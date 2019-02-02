const express = require('express');
const router = express.Router();
const {addLoveComment, deleteLoveComment} = require('../../db/LoveDao');
const {json} = require('../../util/ResponseUtil');

/**
 * 添加评论
 *
 * @param comment   评论的json对象
 *      @param userId    评论者id
 *      @param loveId    评论的LoveId
 *      @param content   评论文字
 *
 * @version v0.0.3 新增
 */
router.post('/', async (req, res, next) => {

    const comment = req.body.comment;

    try {
        const result = await addLoveComment(comment);
        json(res, result)
    } catch (e) {
        json(res, {error: e.message}, -1, "添加评论失败")
    }
});

/**
 * 删除评论
 *
 * @param userId    操作用户id
 * @param commentId 评论ID
 *
 * @version v0.0.3 新增
 */
router.delete('/', async (req, res, next) => {

    const userId = req.body.userId;
    const commentId = req.body.commentId


    try {
        const result = await deleteLoveComment(commentId);
        json(res, result)
    } catch (e) {
        json(res, {error: e.message}, -1, "删除评论失败")
    }
});

module.exports = router
