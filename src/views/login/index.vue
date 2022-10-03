<template>
  <div>
    <van-nav-bar title="菜菜头条-登录" />
    <van-form @submit="onSubmit">
    <van-field
        v-model="user.mobile"
        required
        name="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写11位手机号', pattern: /^1[3456789]\d{9}$/ }]"
    />
    <van-field
        v-model="user.code"
        required
        type="password"
        name="code"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写6位数字密码', pattern: /^\d{6}$/ }]"
    />
    <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
        :loading="isLoading" loading-text="程序员正在努力加载中">提交</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  name: 'MyLogin',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 短信验证码 246810
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit (values) {
      this.isLoading = true
      //   console.log('submit', values)
      //   console.log(this.user)
      try {
        const res = await loginAPI(values)
        // console.log(res)
        setToken(res.data.data.token)
        Notify({ type: 'success', message: '登陆成功！' })
        this.isLoading = false
        // 路由跳转
        this.$router.push('/layout/home')
      } catch (error) {
        Notify({ type: 'danger', message: '登陆失败！' })
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
    // 使用vant定制主题方式修改
// .van-nav-bar {
//     background-color: rgb(9, 147, 149);
//     color: #fff;
// }
// //  /deep/ 会把属性选择器加到前面
// /deep/.van-nav-bar__title {
//     color: #fff;
// }
</style>>
