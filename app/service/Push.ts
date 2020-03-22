import BaseService from "../base/BaseService"
import axios from 'axios'
import AddressModel from "../model/AddressModel"

export default class PushService extends BaseService {

  /**
   * 当地址更新后，通知伴侣
   */
  async pushLoverWhenAddressIsUpdate(address: AddressModel) {
    const lover = await this.service.user.getLoverById(address.userId)
    if (!lover || !lover.pushToken) {
      return
    }
    return this.pushNotificationForUser(
      `你的宝贝更新${address.type.name}啦，快去看看吧`, address.detail, lover.pushToken
    )
  }


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







