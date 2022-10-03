<template>
    <div>
      <!-- 二级路由展示 -->
      <div class="home_container">
        <router-view/>
      </div>
      <!-- 底部导航栏 -->
      <van-tabbar route>
        <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/layout/user" icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </template>

<script>
export default {
  name: 'MyLayout'
}
</script>

<style>
.home_container {
  /** 内容底部内边距(把内容往上挤压, 防止内部被底部导航挡住) */
  padding-bottom: 50px;
}

.van-tabbar {
  border-top: 1px solid #b1a3a3;
}
</style>
