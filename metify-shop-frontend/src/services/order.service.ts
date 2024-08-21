import httpClient from '@/utils/httpClient'

const getOrderHistory = async () => {
  const path = 'order/history'
  return httpClient().get(path)
}

const orderService = {
  getOrderHistory
}

export default orderService
