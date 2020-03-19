import BaseService from "../base/BaseService"
import axios from 'axios'

export default class PushService extends BaseService {

  async pushNotificationForUser(title, desc, devicesToken) {

    const params = {
      'appkey': this.config.umeng.appKey,
      "mipush": true,
      "mi_activity": "com.laiyuanwen.android.baby.push.PushActivity", // 这里应该有一个配置文件
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

    const { data } = await axios.post(this.ctx.helper.getPushUrlWithSign(params), params)

    return data
  }

}







