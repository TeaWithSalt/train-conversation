import * as dayjs from "dayjs";

export function getDateFromISO(date){
    const localizedFormat = require('dayjs/plugin/localizedFormat')
    dayjs.extend(localizedFormat)

    return dayjs(date).format('DD.MM.YYYY')
}
