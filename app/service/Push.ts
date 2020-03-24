import BaseService from "../base/BaseService"
import axios from 'axios'
import AddressModel from "../model/AddressModel"

export default class PushService extends BaseService {

  /**
   * 实时地址更新后，推送给小宝贝
   */
  async pushLoverWhereYouAre(address: AddressModel) {
    const lover = await this.service.user.getLoverById(address.userId)
    if (!lover || !lover.pushToken) {
      return
    }
    return this.pushNotificationForUser(
      `你的宝贝现在位于${address.name}`, address.detail, lover.pushToken
    )
  }

  /**
   * 当地址更新后，通知小宝贝
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

    this.logger.info(`消息推送，title:${title},desc:${desc},token:${devicesToken}`)

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







