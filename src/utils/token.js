// 封装本地存储，token值不再用vuex接收，使存储长久化
const key = 'caicai'

// 设置
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

// 获取
export const getToken = () => localStorage.getItem(key)

// 删除
export const removeToken = () => localStorage.removeItem(key)
