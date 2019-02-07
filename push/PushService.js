const crypto = require('crypto');
const axios = require("axios")

const APP_KEY = "5c5b0ca1b465f5e9d900076d"
const MESSGE_SECRET = "45c70be2fea946a61cac41d3870714de"
const MASTER_SECRET = "kflmfumfeeatuinmlb9hzrnsgr88dt76"

const HTTPS_BASE_URL = "https://msgapi.umeng.com/api/send"


/**
 * 获取签名
 */
function getPushUrlWithSign(params) {
    const sign = crypto.createHash('md5')
        .update(`POST${HTTPS_BASE_URL}${JSON.stringify(params)}${MASTER_SECRET}`)
        .digest('hex');
    return `${HTTPS_BASE_URL}?sign=${sign}`
}

module.exports = {

    async pushNotificationForUser(title, desc, devicesToken) {

        const params = {
            'appkey': APP_KEY,
            "mipush": true,
            "mi_activity": "com.laiyuanwen.android.baby.WelcomeActivity", // 这里应该有一个配置文件
            'timestamp': new Date().getTime(),
            'device_tokens': devicesToken,
            'type': 'unicast',
            'payload': {
                'body': {
                    'ticker': title,
                    'title': title,
                    'text': desc,
                    'after_open': 'go_app'
                },
                'display_type': 'notification'
            }
        }

        return axios.post(getPushUrlWithSign(params), params)
    }


}
