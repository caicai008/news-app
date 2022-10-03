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
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/date'
export default {
  props: ['artObj'],
  methods: {
    formateDate: timeAgo
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
