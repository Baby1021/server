import Axios, { AxiosInstance } from "axios"
import { Application } from "egg"
import { CreateGeoFenceResponse, GeoFenceCheckResponse } from "./types"
import * as _ from 'lodash';

export default class AliMap {

  app: Application
  request: AxiosInstance

  constructor(app) {
    this.app = app
    this.request = this.createRequest(app)
  }

  async checkInGeoFence(lng, lat): Promise<GeoFenceCheckResponse> {
    return this.request.get(`/v4/geofence/status`, {
      params: {
        diu: '123444ads4442qa', //设备唯一标识符，作为记录依据，不影响判断结果
        locations: `${lng},${lat},${Math.floor(new Date().getTime() / 1000)}`
      }
    })
  }

  async updateGeoFence(gid, name, lng, lat, radius = 500) {
    const result = await this.request.patch(`https://restapi.amap.com/v4/geofence/meta`, {
      name,
      center: `${lng},${lat}`,
      desc: `${name},半径${radius}`,
      radius: radius,
    }, { params: { gid } })

    this.app.logger.info(`更新围栏成功，${gid},${name},${lng},${lat}`)

    return result
  }

  async createGeoFence(name, lng, lat, radius = 500): Promise<CreateGeoFenceResponse> {
    const result: CreateGeoFenceResponse = await this.request.post('/v4/geofence/meta', {
      name,
      center: `${lng},${lat}`,
      desc: `${name},半径${radius}`,
      radius: radius,

      enable: "true",
      valid_time: "2050-12-31",
      repeat: "Mon,Tues,Wed,Thur,Fri,Sat,Sun",
      time: "00:00,23:59",
      alert_condition: "enter;leave"
    })

    if (result.data.status !== '0') {
      throw Error(`创建围栏失败，${JSON.stringify(result)}`)
    }

    return result
  }

  async getLocation(id): Promise<any> {
    return this.request.get(`/v3/place/detail?`, { params: { id } })
  }

  private createRequest(app) {
    const instance = Axios.create({ baseURL: 'https://restapi.amap.com' })
    instance.interceptors.request.use((request) => {
      request.params = {
        ...request.params
      }
      request.params.key = app.config.alimap.key
      return request
    })
    instance.interceptors.response.use(response => {
      return response.data
    })
    return instance
  }
}
