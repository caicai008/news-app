<template>
  <div class="user-container">
    <!-- 用户基本面板 -->
    <div class="user-car">
      <!-- 头像、昵称 -->
      <van-cell >
        <!-- 使用 title 插槽来自定义标题 -->
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <van-image round class="avatar" :src="userPhoto"/>
        </template>
        <template #title>
          <span class="username">{{user.name}}</span>
        </template>
        <template #label>
          <van-tag color="#fff" text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>
      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{user.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{user.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{user.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <!-- 操作面板 -->
     <van-cell-group class="action-card">
      <van-cell icon="edit" title="编辑资料" is-link to="/user_editor" />
      <van-cell icon="chat-o" title="小思同学" is-link to="/chat" />
      <van-cell icon="warning-o" title="退出登录" is-link @click="quit" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserInfoAPI } from '@/api/user'
import { Dialog } from 'vant'
import { removeToken } from '@/utils/token'
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'MyUser',
  data () {
    return {
      // 请求数据, 保存到data变量上, 才能在vue模板标签上直接用
      // user: {}
    }
  },
  async created () {
    const res = await getUserInfoAPI()
    // console.log(res)
    // this.user = res.data.data
    this.setUser(res.data.data)
  },
  methods: {
    quit () {
      Dialog.confirm({
        title: '提示',
        message: '您确定退出当前账号吗？'
      })
        .then(() => {
          // on confirm
          // 清空vuex和本地
          removeToken()
          // 跳转到登录页
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    },
    ...mapMutations(['setUser'])
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['userPhoto'])
  }
}
</script>

<style lang="less" scoped>
.user-container {
  .user-car {
    background-color: #007bff;
    color: white;
    padding-top: 20px;

     .van-cell {
        background: #007bff;
        color: white;
        &::after {
          display: none;
        }
      }

      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 10px;
      }

      .username {
        font-size: 14px;
        font-weight: bolder;
      }

      .user-data {
        display: flex;
        justify-content: space-evenly;
        font-size: 14px;
        padding: 30px 0;

        .user-data-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 33.33%;
        }
      }

  }
}
</style>
