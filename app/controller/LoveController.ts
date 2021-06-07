import { Controller } from 'egg';
import { Body, GET, POST, Query, ReturnBody } from "../../lib/router";
import { RuleType } from "../const/RuleType";
import * as _ from 'lodash'
import { LoveListResponse, UserResponse } from "../const/type";
import { DateUtils } from "../../lib/util/DateUtils";

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
  @ReturnBody
  @GET('/api/v1/love/list')
  public async loveList(
    @Query('userId', RuleType.String) userId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10'
  ): Promise<LoveListResponse[]> {
    const { user, lover } = await this.service.user.getUserAndLover(userId)

    const loves = await this.service.love.getLoves([user.userId, lover?.userId], +page, +limit)
    const comments = await this.service.love.getLoveComments(_.map(loves, 'id'))

    const getUser = (userId) => {
      const u = user.userId === userId ? user : lover
      return _.pick(u, ['userId', 'name', 'avatar', 'loveId']) as UserResponse
    }

    return _.map(loves, love => ({
      ..._.pick(love, ['id', 'content', 'images', 'remind']),
      created: DateUtils.getYMDHM(love.created),
      user: getUser(love.userId),
      comments: _.chain(comments)
        .filter(comment => comment.loveId === love.id)
        .map(comment => ({
          content: comment.content,
          created: DateUtils.getYMDHM(comment.created),
          user: getUser(comment.userId)
        }))
        .value()
    }))
  }
}
