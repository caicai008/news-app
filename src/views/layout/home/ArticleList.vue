<template>
  <div>
    <!-- 文章列表 -->
    <!-- 上拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 下拉加载 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="到底啦~~~"
        @load="onLoad"
        offset="50"
        :immediate-check="false"
      >
      <article-item
        v-for="item in artList"
        :key="item.art_id"
        :artObj='item'
        @dislikeEv='dislikeFn'
        @reportEv= 'reportFn'
      >
      </article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from './components/ArticleItem.vue'
import { getListAPI, articleDislikeAPI, articleReportsAPI } from '@/api/index'
import { Notify } from 'vant'

export default {
  props: {
    channelId: Number // 名字写错了好久才发现呜呜呜
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      artList: [],
      loading: false,
      finished: false,
      nextTime: new Date().getTime(), // 用于加载更多(分页)
      isLoading: false // 顶部刷新状态
    }
  },
  // 修改之后，重复点击同一频道不会再次发起接口请求
  async created () {
    this.getArticleList()
  },
  methods: {
    // 获取文章数据
    async getArticleList () {
      // 负责拿文章列表数据
      const res = await getListAPI({
        channel_id: this.channelId,
        timestamp: this.nextTime
      })
      console.log(res)

      // 如果无数据
      if (res.data.data.results.length === 0) {
        this.finished = true // 告诉list组件直接底部显示没有更多数据
      } else {
        this.nextTime = res.data.data.pre_timestamp // 保存下一页数据的时间(做分页用)
        this.artList = [...this.artList, ...res.data.data.results]
        // 等待网络请求结果后
        this.loading = false // 底部加载更多状态
      }
    },
    // 底部加载
    async onLoad () {
      // 异步更新数据
      // 有第一页数据以后, onLoad再发请求
      if (this.artList.length === 0) {
        return
      }
      this.getArticleList()
    },
    // 顶部刷新
    async onRefresh () {
      this.artList = []
      this.nextTime = new Date().getTime()
      this.getArticleList()
      this.isLoading = false
    },
    // 反馈-不感兴趣
    async dislikeFn (id) {
      try {
        await articleDislikeAPI({
          target: id
        })
        Notify({ type: 'success', message: '反馈成功，将减少此类推送' })
      } catch (error) {
        Notify({ type: 'danger', message: '反馈失败，请联系管理员' })
      }
    },
    // 反馈-举报
    async reportFn (id, type) {
      try {
        await articleReportsAPI({
          target: id,
          type: type,
          remark: '没有理由'
        })
        Notify({ type: 'success', message: '举报成功！' })
      } catch (error) {
        Notify({ type: 'danger', message: '举报失败，请联系管理员' })
      }
    }
  }
}
</script>
