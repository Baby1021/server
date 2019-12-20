import BaseService from "../../base/BaseService";

/**
 * Test Service
 */
export default class Test extends BaseService {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
