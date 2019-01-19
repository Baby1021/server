const express = require('express');
const router = express.Router();
const {queryLatestVersion} = require('../db/AppDao');

router.get('/checkUpdate', async (req, res, next) => {
    const version = req.query.version;
    const versionData = await queryLatestVersion()

    if (version < versionData.versionCode) {
        res.json({version: versionData})
    } else {
        res.json({version: null})
    }
})

module.exports = router;
