import BaseController from '../base/BaseController'
import { PUT, ReturnBody } from "../../lib/router";

export default class HomeController extends BaseController {
  public async index () {
    const result = this.ctx.request.body
    this.ctx.stdout(result)
  }

  @PUT('/api/v1/user/pushToken')
  @ReturnBody
  public async pushToken () {
    return this.service.user.savePushToken(this.ctx.request.body)
  }

  public async getSignImage(){
    const url = this.app.oss.get('image').signatureUrl('b79689cd75cf5d3-200x180.jpg',{'process' : 'image/resize,w_50'});
    this.ctx.body = url
  }

  public async uploadImage () {
    const { ctx, app } = this

    try {
      // result = await app.oss.get('image').put(name, file.filepath)

      // const t = await app.oss.get('imagests')
    } finally {
      // await fs.unlink(file.filepath)
    }

    // if (result) {
    //   console.log('get oss object: %j', result)

      let token = await app.oss.get('imagests').assumeRole('acs:ram::1003795807777484:role/babyapp', {
        "Statement": [
          {
            "Action": [
              "oss:Get*","oss:PutObject"
            ],
            "Effect": "Allow",
            "Resource": ["acs:oss:*:*:image-baby/*"]
          }
        ],
        "Version": "1"
      }, 15 * 60, 'laiyuanwen');
      ctx.body = {
        StatusCode:token.res.statusCode,
        AccessKeyId:token.credentials.AccessKeyId,
        AccessKeySecret:token.credentials.AccessKeySecret,
        SecurityToken:token.credentials.SecurityToken,
        Expiration:token.credentials.Expiration
      }

    // } else {
    //   ctx.body = 'please select a file to upload！'
    // }
  }

  public async homeInfo () {
    const user = await this.service.user.getUserById(this.getUserId())
    const lover = await this.service.user.getLoverById(this.getUserId())
    const location = await this.service.location.getUserLatestLocation(lover && lover.userId)

    this.ctx.stdout({
      user: {
        name: user.name,
        avatar: user.avatar
      },
      lover: lover ? {
        name: lover.name,
        avatar: lover.avatar,
        addressName: location && location.aoiName
      } : null
    })
  }
}
