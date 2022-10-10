<template>
    <div>
        <!-- 编辑-头部 -->
        <van-nav-bar
            title="编辑资料"
            left-arrow
            @click-left="$router.back()"
        />
        <!-- 编辑-内容 -->
        <van-cell title="头像" is-link center>
            <template #default>
                <van-image round class="avatar" :src="profile.photo" @click="$refs.iptFile.click()"/>
                <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange">
            </template>
        </van-cell>
        <van-cell title="名称" is-link :value="profile.name" @click="showNameDialogFn" />
        <van-dialog v-model="showNameDialog" title="修改名称" show-cancel-button :before-close="onNameDialogBeforeClose" >
           <van-field
            v-model.trim="userName"
            placeholder="请输入名称"
            maxlength="7"
            input-align="center"
            v-fofo
          />
        </van-dialog>
        <van-cell title="性别" is-link :value="profile.gender === 0 ? '男' : '女'" />
        <van-cell title="生日" is-link :value="profile.birthday" @click="ShowBirthFn" />
        <van-popup v-model="isShowBirth" position="bottom" style="height: 50%" round>
          <!-- 日期选择控件 -->
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择出生日期"
            :min-date="minDate"
            :max-date="maxDate"
            :show-toolbar="true"
            @cancel="isShowBirth = false"
            @confirm = "confirmFn"
          />
        </van-popup>
    </div>
</template>

<script>
import { userProfileAPI, updatePhotoAPI, updateUserInfoAPI } from '@/api/user'
import { Notify } from 'vant'
import moment from 'moment'
export default {
  data () {
    return {
      profile: {}, // 用户信息
      userName: '',
      showNameDialog: false,
      isShowBirth: false, // 显示时间选择器
      minDate: new Date(1900, 1, 1), // 最小的可选的日期
      maxDate: new Date(), // 最大的可选日期
      currentDate: new Date() // 当前日期
    }
  },
  async created () {
    const res = await userProfileAPI()
    // console.log(res)
    this.profile = res.data.data
  },
  methods: {
    // 头像修改
    async onFileChange (e) {
    //   console.log(e.target.files[0])
      if (e.target.files[0].length === 0) return // 防止用户未选择图片
      const fd = new FormData()
      fd.append('photo', e.target.files[0]) // photo在表单里参数名携带
      const res = await updatePhotoAPI(fd)
      console.log(res)
      this.profile.photo = res.data.data.photo
    },
    // 修改名称
    showNameDialogFn () {
      this.showNameDialog = true
      this.userName = this.profile.name // 设置默认显示内容
    },
    // 修改姓名弹出层-关闭前方法
    async onNameDialogBeforeClose (action, done) {
      // 确认
      if (action === 'confirm') {
        // 校验名称
        if (/^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/.test(this.userName)) {
          // 检验通过
          // 调用接口
          const { data: res } = await updateUserInfoAPI({
            name: this.userName
          })
          console.log(res)
          this.profile.name = this.userName
          // 更新页面显示的名字

          // 关闭弹窗
          Notify({ type: 'success', message: '修改成功！' })
          done()
        } else {
          // 提示用户
          Notify({ type: 'warning', message: '用户名中英文和数字1-7位' })
          // 阻止弹窗关闭
          done(false)
        }
      } else {
        // 取消
        done()
      }
    },
    // 显示修改时间组件
    ShowBirthFn () {
      this.isShowBirth = true
      this.currentDate = new Date(this.profile.birthday)
    },
    // 修改生日
    async confirmFn () {
      // console.log(this.currentDate) Wed Nov 20 2002 00:00:00 GMT+0800 (中国标准时间)
      // 但是后台要"年-月-日"格式字符串参数值
      const dateStr = moment(this.currentDate).format('YYYY-MM-DD')
      await updateUserInfoAPI({
        birthday: dateStr
      })
      this.profile.birthday = dateStr
      // 时间选择器关闭
      this.isShowBirth = false
    }
  }
}
</script>

<style>
.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
}
</style>
