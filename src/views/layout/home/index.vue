<template>
  <div>
    <!-- 头部 -->
   <van-nav-bar title="标题"  fixed>
      <template #left>
        <img src="@/assets/images/logo.png" class="logo" alt="">
      </template>
      <template #right>
        <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')" />
      </template>
    </van-nav-bar>
    <!-- 标签栏 -->
    <div class="main">
        <van-tabs v-model="channelId"  animated sticky offset-top="1.226667rem">
          <van-tab  v-for="item in tabList" :title="item.name" :key="item.id" :name="item.id"  >
            <!-- 文章内容 -->
            <article-list :channelId="channelId" ></article-list>
          </van-tab>
        </van-tabs>
          <!-- 编辑频道图标 -->
        <van-icon name="plus"
          size="0.37333334rem"
          class="moreChannels"
          @click="show = true"
          get-container="body"
          closeable
          close-icon="close"
        />
        <van-popup v-model="show" class="edit_wrap">
            <!-- 频道管理组件 -->
            <channel-edit
            @close="show = false"
            :myList="tabList"
            :allList="unCheckChannel"
            @addChannel="addChannelFn"
            @removeChannel="removeChannelFn"
            @changeChannel= 'changeChannelFn'
          />
        </van-popup>
    </div>
  </div>
</template>

<script>
import { getUserChannelAPI, getAllChannelAPI, updateChannelAPI } from '@/api/index'
import ArticleList from './ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  components: { ArticleList, ChannelEdit },
  name: 'MyHome',
  data () {
    return {
      channelId: 0, // 标签id 默认为0
      tabList: [], // 标签栏列表
      // artList: [] // 文章列表
      show: false, // 展示添加频道遮罩层
      allChannel: []
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

    // 获取所有频道
    const { data: res1 } = await getAllChannelAPI()
    console.log(res1.data.channels)
    this.allChannel = res1.data.channels
  },
  computed: {
    // 好好琢磨
    unCheckChannel () {
      const newArr = this.allChannel.filter(bigObj => {
        const index = this.tabList.findIndex(smallObj => {
          return smallObj.id === bigObj.id
        })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArr
    }
  },
  methods: {
    // 添加频道 ---更新
    async addChannelFn (obj) {
      this.tabList.push(obj)
      await updateChannelAPI({
        channels: this.tabList
      })
    },
    // 删除频道--未完成
    async removeChannelFn (obj) {
      // 找到这个频道在数组下标删除
      // console.log(this.tabList)
      // console.log(this.tabLis.name)
      // const index = this.tabList.findIndex(item => item[0].id === obj.id)
      // console.log(index)
      // this.tabList.splice(index, 1)
      // this.addChannelFn()
      // await deleteChannelAPI({ target: obj.id })
      // // console.log(res)
      // this.addChannelFn()
    },
    changeChannelFn (obj) {
      this.channelId = obj.id
    }
  }
}
</script>

<style lang="less" scoped>

.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;

  // 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}

.edit_wrap {
  width: 100%;
  height: 100%;
}
}

</style>
