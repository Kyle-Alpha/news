<template>
  <van-popup
    class="reply"
    closeable
    close-icon-position="top-left"
    v-model="show"
    position="bottom"
    :style="{ height: '45%' }"
  >
    <div class="title-count">{{ cellData.reply_count }}条回复</div>

    <van-list
      class="comment"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index">
        <template slot="title">
          <div class="title">
            <!-- 头像 -->
            <img class="avatar" :src="item.aut_photo" alt />

            <!-- 详细信息 -->
            <div class="info">
              <div class="name">{{ item.aut_name }}</div>
              <div class="content">{{ item.content }}</div>
              <div class="bottom">
                <span class="time">{{ item.pubdate | formatTime }}</span>
              </div>
            </div>

            <!-- 点赞图标 -->
            <div class="zan">
              <!-- 实心 -->
              <van-icon
                v-if="item.is_liking"
                class="zan-icon"
                color="red"
                name="like"
              />
              <!-- 空心 -->
              <van-icon v-else  class="zan-icon" color="red" name="like-o" />
              <span>{{ item.like_count }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>

    <!-- 写评论的组件 -->
    <write :isReply="true" :com_id="cellData.com_id" :reply_list="list" @addOK="addCount" />
  </van-popup>
</template>

<script>
import bus from '@/utils/bus'
// 导入接口
import { commentList } from '@/api/comment'

// 导入组件
import write from './write'
export default {
  name: 'reply',
  components: {
    write
  },
  data() {
    return {
      show: false,
      loading: false,
      finished: false,
      list: [],
      cellData: {},
      offset: undefined
    }
  },

  methods: {
    addCount() {
      this.cellData.reply_count++
    },

    async onLoad() {
      let res = await commentList({
        //   类型，要获取的是评论的回复，所以传入'c'
        type: 'c',
        // 评论id，因为这个id是对象，所以调用toString
        // 如果你的请求不是get请求，那么可以不用toString，因为它内部传值时会自己调用toString方法
        // 如果是get请求，但是参数是路径参数，那么也可以不用toString,他内部会帮你toString
        source: this.cellData.com_id.toString(),
        //   下一页的标识，如果查第一页就不传
        offset: this.offset,
        limit: 10
      })

      this.list.push(...res.data.results)
      // 把offset记录为last_id
      this.offset = res.data.last_id
      this.loading = false

      // 判断是否查完了
      if (res.data.end_id === res.data.last_id) {
        this.finished = true
      }
    }
  },

  created() {
    // 订阅消息
    bus.$on('showReply', data => {
      // 把被点的那一行存起来
      this.cellData = data

      // 面板显示出来之前，先把这些值恢复称默认值
      this.loading = false
      this.finished = false
      this.list = []
      this.offset = undefined
      this.show = true
    })
  }
}
</script>

<style scoped lang="less">
.reply {
  margin-bottom: 44px;
  i.van-icon.van-icon-cross.van-popup__close-icon.van-popup__close-icon--top-left {
    color: black;
  }

  .title-count {
    font-size: 20px;
    text-align: center;
    padding: 10px 0;
  }
}
</style>
