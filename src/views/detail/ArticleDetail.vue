<template>
    <div class="search-result">
      <!-- 文章详情标题 -->
      <van-nav-bar title="文章详情" left-arrow @click-left="$router.go(-1)"/>
       <!-- 文章详情内容 -->
      <div class="article-container">
        <!-- 文章标题 -->
          <h1 class="art_title">{{ artObj.title }}</h1>
          <!-- 作者信息 -->
          <van-cell :title="artObj.aut_name" label="artObj.pubdate">
            <template #icon>
              <!-- 头像 -->
              <img :src="artObj.aut_photo" alt="" class="avatar">
            </template>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-button type="info" plain size="mini" v-if="artObj.is_followed" @click="followedFn(false)">已关注</van-button>
              <van-button icon="plus" plain type="info" size="mini" v-else  @click="followedFn(true)">关注</van-button>
            </template>
          </van-cell>

          <!-- 文章内容 -->
           <div class="art_content" v-html="artObj.content"></div>
           <!-- 分割线 -->
          <van-divider>END</van-divider>

            <!-- 点赞 -->
          <div class="like-box">
            <van-button icon="good-job" type="danger" size="small" v-if="artObj.attitude === 1" @click="likeFn(false)">已点赞</van-button>
            <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="likeFn(true)">点赞</van-button>
          </div>
      </div>
    </div>
</template>

<script>
import { articleDetailAPI, followedUserAPI, unFollowedUserAPI, articleLikeAPI, articleDislikeAPI } from '@/api/index'
export default {
  data () {
    return {
      artObj: {} // 文章对象
    }
  },
  async created () {
    console.log(this.$route.query.art_id)
    const res = await articleDetailAPI({
      id: this.$route.query.art_id
    })
    // console.log(res)
    this.artObj = res.data.data
  },
  methods: {
    // 作者关注/取关
    async followedFn (bool) {
      if (bool === true) {
        // 业务: 关注用户
        // 显示: 已关注按钮
        this.artObj.is_followed = true
        await followedUserAPI({
          target: this.artObj.aut_id
        })
      } else {
        // 业务: 不关注用户
        // 显示: 已取消关注按钮
        this.artObj.is_followed = false
        await unFollowedUserAPI({
          uid: this.artObj.aut_id
        })
      }
    },
    // 点赞/取消点赞
    async likeFn (bool) {
      if (bool === true) {
        this.artObj.attitude = 1
        await articleLikeAPI({
          target: this.$route.query.art_id
        })
      } else {
        this.artObj.attitude = -1
        await articleDislikeAPI({
          artId: this.$route.query.art_id
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
 .article-container {
  padding:10px;

  .art_title {
    font-size: 16px;
    font-weight: bolder;
    margin: 10px 0;
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f8f8f8;
    margin-right: 5px;
    border: none;
  }

  .art_content {
    font-size: 12px;
    line-height: 24px;
    width: 100%;
    overflow-x: scroll;
    word-break: break-all;
  }

  .like-box {
    display: flex;
    justify-content: center;
}
 }
</style>>
