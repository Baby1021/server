import BaseController from "../base/BaseController";
import { billTypeArray } from "../model/BillModel"
import * as _ from 'lodash';

export default class HomeController extends BaseController {

  /**
   * 获取账单详情
   */
  public async getBill() {

    this.validate(this.ctx.request.query, {
      billId: 'string'
    })

    const result = await this.service.bill.getter.getBill(+this.ctx.request.query.billId)
    this.ctx.stdout(result)
  }

  /**
   * 获取账单列表
   */
  public async getBillList() {
    const result = await this.service.bill.getter.getBillList()
    this.ctx.stdout(result)
  }

  /**
   * 添加/更新账单
   */
  public async saveBill() {
    const body = this.ctx.request.body

    const type = this.ctx.request.body.type
    if (type && !_.includes(billTypeArray, type)) {
      throw Error(`账单类型错误，type：${type}`)
    }

    const result = body.billId ?
      await this.service.bill.setter.updateBill(body) :
      await this.service.bill.setter.addBill(body)

    this.ctx.stdout(result)
  }

  /**
   * 删除一条账单
   */
  public async deleteBill() {
    const body = this.ctx.request.body

    this.validate(body, {
      billId: 'number'
    })

    const result = await this.service.bill.setter.deleteBill(+body.billId)

    this.ctx.stdout(result)
  }

  public async getBillTypeList(){
    const result = await this.service.bill.billTypeGetter.getBillTypeList()

    this.ctx.stdout(result)
  }
}
