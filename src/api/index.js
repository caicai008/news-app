import request from '@/utils/request'
import { getToken } from '@/utils/token'

// 登录-登录接口
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 频道-获取用户选择频道
export const getUserChannelAPI = () => request({
  url: '/v1_0/user/channels',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 文章-获取文章列表
export const getListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    channel_id,
    timestamp
  }
})
