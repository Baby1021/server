import * as moment from 'moment'

export function getYMDHM(date: Date) {
  return moment(date).format('YYYY-MM-DD HH:mm')
}