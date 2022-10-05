import request from '@/utils/request'

// 登录-登录接口
export const loginAPI = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 频道-获取所有频道
export const getAllChannelAPI = () => request({
  url: '/v1_0/channels'
})

// 频道-获取用户选择频道
export const getUserChannelAPI = () => request({
  url: '/v1_0/user/channels'
})

// 频道 - 更新已选
export const updateChannelAPI = ({ channels }) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}

// 频道-删除频道
export const deleteChannelAPI = ({ target }) => request({
  url: '/v1_0/user/channels/:target',
  method: 'DELETE',
  data: {
    target
  }
})

// 文章-获取文章列表
export const getListAPI = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  params: {
    channel_id,
    timestamp
  }
})

// 反馈-不感兴趣
export const articleDislikeAPI = ({ target }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target
  }
})

// 反馈-举报内容
export const articleReportsAPI = ({ target, type, remark }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  data: {
    target,
    type,
    remark
  }
})
