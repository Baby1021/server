import { Controller } from 'egg';

export default class LocationController extends Controller {

  public async reportLocation() {
    const body = this.ctx.request.body
    const result = await this.service.location.setter.saveLocation(body)
    this.ctx.stdout(result)
  }

}
