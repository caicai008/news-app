<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artObj.title }}</span>
        <!-- 单图 -->
        <img v-if="artObj.cover.type === 1" class="thumb" :src="artObj.cover.images" alt="">
      </div>
      <!-- 多图 -->
      <div class="thumb-box" v-if="artObj.cover.type > 1" >
        <img class="thumb" v-for="(imgUrl,index) in artObj.cover.images" :key="index" :src="imgUrl" alt="">
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{artObj.aut_name}}</span>
          <span>{{artObj.comm_count}}</span>
          <span>{{formateDate(artObj.pubdate)}}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross"  @click="show = true"/>
        <!-- get-container="body" 指定蒙层挂载点 -->
        <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
          get-container="body"
          :cancel-text="cacText"
          @cancel="onCancel"
        />
      </div>
    </template>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { firstAction, secondAction } from '@/api/report'
export default {
  props: ['artObj'],
  data () {
    return {
      show: false,
      actions: firstAction,
      cacText: '取消'
    }
  },
  methods: {
    formateDate: timeAgo,

    // 点击反馈按钮功能
    async onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      if (item.name === '反馈内容') {
        this.actions = secondAction
        this.show = true
        this.cacText = '返回'
      } else if (item.name === '不感兴趣') {
        // 不感兴趣
        // console.log(this.artObj.art_id)
        // 为何这次await左边不接受结果？ 只要没报错, 就代表反馈成功, 而且要响应数据也无用
        // 接口统一在list调用
        this.$emit('dislikeEv', this.artObj.art_id)
        this.show = false
      } else { // 二级反馈面板
        this.$emit('reportEv', this.artObj.art_id, item.value)
        this.show = false
      }
    },
    // 取消反馈面板
    onCancel () {
      if (this.cacText === '返回') {
        this.actions = firstAction
        this.show = true
        this.cacText = '取消'
      }
    }
  }

}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span{
    margin: 0 3px;
    &:first-child{
        margin-left: 0;
    }
}
</style>
