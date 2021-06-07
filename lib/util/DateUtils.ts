import * as moment from "moment";

export class DateUtils {
  getYMDHM(date: Date) {
    return moment(date).format('YYYY-MM-DD HH:mm')
  }
}
