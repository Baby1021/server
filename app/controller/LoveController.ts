import { Controller } from 'egg';
import { Body, POST, ReturnBody } from "../../lib/router";

export default class LocationController extends Controller {

  /**
   * 发布动态
   *
   * @version 0.0.11 新增接口
   *
   * @param content 动态内容
   * @param userId 用户
   * @param images 图片地址，客户端直接上传到OSS，再把地址返回给服务端
   */
  @ReturnBody
  @POST('/love/publish')
  public async publish(
    @Body('content') content: string,
    @Body('userId') userId: string,
    @Body('images') images: string[]
  ) {
    return this.service.love.publishLove(content, userId, images)
  }

}
