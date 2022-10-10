<template>
    <div class="com-list" :class="{'art-cmt-container-1' : showCom, 'art-cmt-container-2' : !showCom}">
      <div class="com-item" v-for="obj in commentList" :key="obj.com_id">
          <!-- 评论头部 -->
          <div class="com-item-header">
              <van-cell :title=" obj.aut_name ">
                  <template #icon>
                      <!-- 头像 -->
                      <img src="" alt="" class="avatar">
                  </template>
                      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                  <template #right-icon>
                      <van-icon name="like" size="16" color="red" v-if="obj.is_liking === true" @click="loveFn(true,obj)" />
                      <van-icon name="like-o" size="16" color="grey" @click="loveFn(false, obj)"  v-else/>
                  </template>
              </van-cell>
              <div class="right"></div>
          </div>
          <!-- 评论内容 -->
          <div class="com-context">
              {{ obj.content }}
          </div>
          <!-- 发布时间 -->
          <div class="pub-date">{{ timeAgo(obj.pubdate) }}</div>

          <!-- 底部添加评论区域 - 1 -->
          <div class="add-cmt-box van-hairline--top" v-show="showCom === false">
              <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
              <div class="ipt-cmt-div" @click="showCom = true">发表评论</div>
              <div class="icon-box">
                  <van-badge :content="totalCount" :max="99">
                      <van-icon name="comment-o" size="0.53333334rem"  />
                  </van-badge>
                  <van-icon name="star-o" size="0.53333334rem" />
                  <van-icon name="share-o" size="0.53333334rem" />
              </div>
          </div>

          <!-- 底部添加评论区域 - 2 -->
          <div class="cmt-box van-hairline--top" v-show="showCom === true">
              <textarea
                v-model="comValue"
                placeholder="友善评论、理性发言、阳光心灵"
                v-fofo
                @blur="blurFn">
              </textarea>
              <van-button type="default" :disabled="comValue.length === 0" @click="pubComment">发布</van-button>
          </div>
      </div>
    </div>
</template>

<script>
import { getCommentAPI, commentLikingAPI, commentDisLikingAPI, pubCommentAPI } from '@/api/index'
import { timeAgo } from '@/utils/date'
export default {
  data () {
    return {
      commentList: [],
      showCom: false, //
      totalCount: 0, // 总评论数
      comValue: '' // 评论内容
    }
  },
  async created () {
    this.getCommentListFn()
  },
  methods: {
    timeAgo,
    // 评论 - 获取评论
    async getCommentListFn () {
      const res = await getCommentAPI({
        art_id: this.$route.query.art_id
      })

      this.commentList = res.data.data.results // 保存到变量中
      this.totalCount = res.data.data.total_count || ''
      this.offset = res.data.data.last_id // 保存起来为了做分页
    },

    async loveFn (bool, obj) {
      if (bool === true) {
        // 业务 => 取消红心
        // 调接口 => 取消红心
        // 显示 => 灰心
        obj.is_liking = false
        await commentDisLikingAPI({
          comId: this.$route.query.art_id
        })
      } else {
        // 业务 => 点亮红心
        // 调接口 => 点亮红心
        // 显示 => 红心
        obj.is_liking = true
        await commentLikingAPI({
          target: this.$route.query.art_id
        })
      }
    },
    // 发布评论
    // 问题: 先失去焦点了, 而且你用v-if, DOM移除, 点击事件未来的及触发
    // 解决: 失去焦点, 延时执行
    blurFn () {
      setTimeout(() => {
        this.showCom = false
      })
    },
    async pubComment () {
      try {
        const res = await pubCommentAPI({
          target: this.$route.query.art_id,
          content: this.comValue
        })
        // console.log(res)
        this.commentList.unshift(res.data.data.new_obj)
        this.totalCount++
        this.comValue = ''
      } catch (error) {
        this.$toast.fail('评论失败！')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}
 .com-list {
    width: 100%;
    padding: 5px;

    .com-item {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;

        /** 评论头部 */
        .com-item-header {
            display: flex;
            align-items: center;

            .avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #f8f8f8;
                margin-right: 5px;
                border: none;
            }

            .aut-name {
                font-size: 12px;
                line-height: 60px;
            }
        }

        /** 评论内容 */
        .com-context {
            font-size: 14px;
            line-height: 28px;
            text-indent: 2em;
            margin-top: 6px;
            word-break: break-all;
        }

        /** 发布时间 */
        .pub-date {
            font-size: 12px;
            color: gray;
            margin-top: 10px;
        }
    }

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
 }
</style>>
