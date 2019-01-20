module.exports = {
    json(res, data, code = 1, message = "成功") {
        res.json({
            code: code,
            message: message,
            data: data
        })
    }
}
