import request from '@/utils/request'

// 用户 - 获取基本资料
export const getUserInfoAPI = () => request({
  url: '/v1_0/user'
})
