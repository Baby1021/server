import { Service } from 'egg'
import LoveModel from "../model/LoveModel";

/**
 * 动态业务
 */
export default class LoveService extends Service {

  /**
   * 发布一条Love动态
   */
  public async publishLove(content: string, userId: string, images: string[]) {
    return LoveModel.save({ content, userId, images } as LoveModel)
  }

}
