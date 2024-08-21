import dayjs from 'dayjs'

export const formatDateTime = (date: string, format: string = 'YYYY-MM-DD HH:mm') => {
  return dayjs(date).format(format)
}
