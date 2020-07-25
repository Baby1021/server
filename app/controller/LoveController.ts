import { Controller } from 'egg';
import { Body, GET, POST, Query, ReturnBody } from "../../lib/router";

export default class LoveController extends Controller {

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
  @POST('/api/v1/love/publish')
  public async publish(
    @Body('content') content: string,
    @Body('userId') userId: string,
    @Body('images') images: string[]
  ) {
    return this.service.love.publishLove(content, userId, images)
  }

  /**
   * love列表
   *
   * @version 0.0.11 新增接口
   *
   * @param userId
   * @param page
   * @param limit
   */
  @GET('/api/v1/love')
  public async loveList(
    @Query('userId') userId: string,
    @Query('page') page: string,
    @Query('limit') limit: string
  ) {
    this.ctx.body = await this.service.love.getLoves(userId, +page, +limit)
  }
}
