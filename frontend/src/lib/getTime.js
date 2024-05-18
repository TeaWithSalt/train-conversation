import dayjs from "dayjs";

export function getTime(date){
    return dayjs(date).format('HH:mm');
}
