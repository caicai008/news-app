<template>
  <div class="search-result">
        <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        />
       <!-- 搜索结果 -->
        <article-item v-for="obj in articleList" :key="obj.art_id" :artObj="obj" :showX="false" />
  </div>
</template>

<script>
import ArticleItem from '../layout/home/components/ArticleItem.vue'
import { searchResultListAPI } from '@/api/index'
export default {
  components: { ArticleItem },
  data () {
    return {
      articleList: []
    }
  },
  async created () {
    const res = await searchResultListAPI({
      q: this.$route.params.keywords // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
    })
    // console.log(res)
    this.articleList = res.data.data.results
  }
}
</script>

<style>

</style>
