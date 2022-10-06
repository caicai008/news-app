<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-header">
        <van-icon name="arrow-left" color="#fff" size="0.48rem" class="goBack" @click="$router.back()" />
        <van-search
            v-model="value"
            background="#4fc08d"
            shape="round"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            v-fofo
            @input="inputFn"
            >
        </van-search>
    </div>
   <!-- 搜索建议列表 -->
    <div class="sugg-list" v-if="value.length !== 0">
        <div class="sugg-item" @click="onSearch(str)"  v-for="(str, index) in searchList" :key="index" v-html="lightFn(str, value)" >
        </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
       <!-- 标题 -->
      <van-cell title="搜索历史">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
        <van-icon name="delete" class="search-icon" @click="clearFn" />
          </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
          <span class="history-item" @click="onSearch(item)" v-for="(item, index) in history" :key="index">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { suggestListAPI } from '@/api/index'
export default {
  name: 'MySearch',
  data () {
    return {
      value: '', // 搜索关键字
      timer: null, // 防抖
      searchList: [], // 搜索列表
      history: JSON.parse(localStorage.getItem('his')) || [], // 搜索历史 // 搜索历史
      resultList: []
    }
  },
  watch: {
    // 因为跳转页面, 原来页面被释放了, 回来后数组重新创建
    //  解决: 本地缓存起来
    //  问题2: 但是发现跳转后, 并未保存到本地(==原因: 先跳转了, watch还未来的及执行==)
    // 解决： 给路由跳转加个定时器(最后执行)
    history () {
      localStorage.setItem('his', JSON.stringify(this.history))
    }
  },
  methods: {
    // 跳转到搜索结果页
    onSearch (val) {
      if (this.history.indexOf(val) === -1) {
        this.history.push(val) // 保存搜索关键字
      }
      setTimeout(() => {
        this.$router.push(`/search/:${val}`)
      })
    },
    // 防抖
    inputFn () {
      clearTimeout(this.timer)
      if (this.value.length === 0) { // 清空处理
        this.searchList = []
      } else {
        this.timer = setTimeout(async () => {
          if (this.value.length === 0) return // 防止空内容触发下面逻辑
          // console.log(this.value)
          // 搜索联想
          const res = await suggestListAPI({ q: this.value })
          // console.log(res)
          this.searchList = res.data.data.options
        }, 500)
      }
    },
    // 搜索关键字高亮
    lightFn (originStr, target) {
      // originStr:原来字符串
      // target:关键字
      return originStr.replace(target, `<span style="color: red;">${target}</span>`)
    },
    // 清空搜索历史
    clearFn () {
      this.history = []
    }
  }
}
</script>

<style lang="less" scoped>
 .search-header {
    display: flex;
    height: 46px;
    align-items: center;
    overflow: hidden;
    background-color: #4fc08d;

    .goBack {
        padding-left: 14px;
    }

    .van-search {
        flex: 1;
    }
 }

 /*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>>
