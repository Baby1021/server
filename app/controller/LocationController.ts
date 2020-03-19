import BaseController from "../base/BaseController"
import axios from "axios"
import * as _ from 'lodash';

export default class LocationController extends BaseController {

  public async reportLocation() {
    const body = this.ctx.request.body
    const result = await this.service.location.setter.saveLocation(body)
    this.ctx.stdout(result)
  }

  public async searchLocation() {

    const request = this.ctx.request

    this.validate(request.query, {
      keywords: 'string'
    })

    const result = await axios.get(`http://restapi.amap.com/v3/assistant/inputtips`, {
      params: {
        key: this.config.alimap.key,
        keywords: request.query.keywords,
        location: request.query.location,
        city: request.query.city,
        datatype: 'poi'
      }
    })

    this.ctx.stdout(_.get(result, 'data.tips', []))
  }

}
