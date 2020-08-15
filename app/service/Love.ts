import { Service } from 'egg'
import LoveModel from "../model/LoveModel";
import { In } from "typeorm";
import * as _ from 'lodash'
import LoveComment from "../model/LoveComment";

/**
 * 动态
 */
export default class LoveService extends Service {

  /**
   * 获取用户的love动态
   *
   * @param userIds
   * @param page
   * @param limit
   */
  public async getLoves(userIds: Array<string | undefined>, page: number, limit: number) {

    const ids = _.compact(userIds)

    if (_.isEmpty(ids)) {
      return []
    }

    return LoveModel.find({
      where: { userId: In(ids) },
      skip: (page - 1) * limit,
      take: limit,
      order: { created: "DESC" },
    })
  }

  public async getLoveComments(loveIds: number[]) {
    if (_.isEmpty(loveIds)) {
      return []
    }
    return LoveComment.find({ loveId: In(loveIds) })
  }

  /**
   * 发布一条Love动态
   */
  public async publishLove(content: string, userId: string, images: string[]) {
    return LoveModel.save({ content, userId, images } as LoveModel)
  }

}
