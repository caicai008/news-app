<template>
  <div>
    <!-- 头部 -->
   <van-nav-bar title="标题"  fixed>
      <template #left>
        <img src="@/assets/images/logo.png" class="logo" alt="">
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 标签栏 -->
    <div class="main">
       <van-tabs v-model="channelId" @change="changeChanelFn" animated sticky offset-top="1.226667rem">
      <van-tab  v-for="item in tabList" :title="item.name" :key="item.id" :name="item.id"  >
        <!-- 文章内容 -->
        <article-list :channelId="channelId"></article-list>
      </van-tab>
    </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api/index'
import ArticleList from './ArticleList.vue'
export default {
  components: { ArticleList },
  name: 'MyHome',
  data () {
    return {
      channelId: 0, // 标签id 默认为0
      tabList: [] // 标签栏列表
      // artList: [] // 文章列表
    }
  },
  async created () {
    // 获取频道
    const { data: res } = await getUserChannelAPI()
    // console.log(res)
    this.tabList = res.data.channels
    // console.log('@@@', this.channelId)
    // 获取文章列表
    // this.changeChanelFn()
  },
  methods: {
    // tabs切换功能
    async changeChanelFn () {
      // const res2 = await getListAPI({
      //   channel_id: this.channelId, // 默认显示推荐页
      //   timestamp: (new Date()).getTime()
      // })
      // console.log(res2)
      // this.artList = res2.data.data.results
    }
  }
}
</script>

<style>
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
}
</style>
