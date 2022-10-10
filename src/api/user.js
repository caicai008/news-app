import request from '@/utils/request'

//  获取用户信息
export const getUserInfoAPI = () => request({
  url: '/v1_0/user'
})

// 获取用户个人资料
export const userProfileAPI = () => request({
  url: '/v1_0/user/profile'
})

// 用户- 更新头像
// 注意: formObj的值必须是一个表单对象
// '{"a": 10, "b": 20}' // 对象格式的JSON字符串
// new FormData() // 表单对象
export const updatePhotoAPI = (formObj) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: formObj
    // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
  })
}

// 修改用户资料
export const updateUserInfoAPI = ({ birthday, name }) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday,
      name
    }
  })
}

// 更新token
export const getTokenAPI = () => request({
  url: '/v1_0/authorizations',
  method: 'PUT'

})
