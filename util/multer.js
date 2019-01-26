const multer = require('multer')
var crypto = require('crypto');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/loves')
    },
    filename: function(req, file, cb) {
        const filename = file.originalname;
        const lastIndexOf = filename.lastIndexOf(".");
        const type = filename.substring(lastIndexOf, filename.length)
        const name = filename.substring(0, lastIndexOf)
        const key = name + Date.now()
        const name2 = crypto.createHash('md5').update(key).digest('hex');
        cb(null, name2 + type)
    }
})
exports.imageMiddleware = multer({storage: storage});
