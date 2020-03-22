import Axios, { AxiosInstance } from "axios"
import { Application } from "egg"

export default class AliMap {

  app: Application
  request: AxiosInstance

  constructor(app) {
    this.app = app
    this.request = this.createRequest(app)
  }


  async getLocation(id):Promise<any> {
    return this.request.get(`/v3/place/detail?`, { params: { id } })
  }

  private createRequest(app) {
    const instance = Axios.create({ baseURL: 'https://restapi.amap.com' })
    instance.interceptors.request.use((request) => {
      request.params.key = app.config.alimap.key
      return request
    })
    instance.interceptors.response.use(response => {
      return response.data
    })
    return instance
  }
}
