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

// 搜索-联想菜单
export const suggestListAPI = ({ q }) => request({
  url: '/v1_0/suggestion',
  params: {
    q
  }
})

// 搜索 - 结果列表
export const searchResultListAPI = ({ q, page = 1 }) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}

// 文章 - 详情
export const articleDetailAPI = ({ id }) => {
  return request({
    // :id是后台规定的参数名
    // 前端要在对应路径位置传值(不要写:)
    url: `/v1_0/articles/${id}`
  })
}

// 文章 - 关注作者
export const followedUserAPI = ({ target }) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: target
    }
  })
}
// 文章 - 取消关注作者
export const unFollowedUserAPI = ({ uid }) => {
  return request({
    // 这uid只是个变量名, 把值拼接在url发给后台(无需指定参数名)
    url: `/v1_0/user/followings/${uid}`,
    method: 'DELETE'
  })
}

// 文章 - 点赞
export const articleLikeAPI = ({ target }) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}

// 文章 - 取消点赞
export const articleDisLikeAPI = ({ artId }) => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}

// 评论 - 获取评论
export const getCommentAPI = ({ art_id }) => request({
  url: '/v1_0/comments',
  params: {
    type: 'a',
    source: art_id
  }
})

// 评论 - 点赞评论
export const commentLikingAPI = ({ target }) => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target
  }
})

// 评论-取消点赞
export const commentDisLikingAPI = ({ comId }) => {
  return request({
    url: `/v1_0/comment/likings/${comId}`,
    method: 'DELETE'
  })
}

// 评论-发布评论
export const pubCommentAPI = ({ target, content }) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST', // 注意方法不要有空格
    data: {
      target,
      content,
      art_id: null
    }
  })
}
