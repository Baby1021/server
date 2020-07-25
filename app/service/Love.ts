import { Service } from 'egg'
import LoveModel from "../model/LoveModel";

/**
 * 动态业务
 */
export default class LoveService extends Service {

  public async getLoves(userId: string, page: number, limit: number) {
    return LoveModel.find({
      where: { userId },
      skip: (page - 1) * limit,
      take: limit,
      order: { created: "DESC" }
    })
  }

  /**
   * 发布一条Love动态
   */
  public async publishLove(content: string, userId: string, images: string[]) {
    return LoveModel.save({ content, userId, images } as LoveModel)
  }

}
