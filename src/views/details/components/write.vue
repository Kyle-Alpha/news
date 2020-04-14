<template>
  <div class="write">
    <!-- 输入框 -->
    <van-search
      class="input"
      @keydown.enter="add"
      left-icon
      v-model="msg"
      shape="round"
      placeholder="写评论"
    />
    <!-- 评论图标 -->
    <van-icon name="comment-o" @click="add" />

    <!-- 只要不是回复界面就显示这个div -->
    <div v-if="!isReply">
      <!-- 收藏图标 -->
      <van-icon v-if="selfCollect" @click="quxiaoshoucang" name="star" />
      <!-- 空心代表还没收藏，如果我点击他就要收藏 -->
      <van-icon v-else @click="shoucang" name="star-o" />

      <!-- 分享图标 -->
      <van-icon name="share" />
    </div>
  </div>
</template>

<script>
import { commentAdd } from '@/api/comment'
import { articleShouCang, articleQxShouCang } from '@/api/article'

// 导入bus
import bus from '@/utils/bus'

export default {
  // 接收一个值，用来告诉我这不是回复
  // isReply如果给true就代表是回复，否则就代表是文章下的评论
  name: 'write',
  props: ['is_collected', 'isReply', 'com_id', 'reply_list'],
  data() {
    return {
      msg: '',
      selfCollect: this.is_collected
    }
  },

  watch: {
    // 侦听父组件传递过来的值
    is_collected(val) {
      this.selfCollect = val
    }
  },

  methods: {
    // 取消收藏
    async quxiaoshoucang() {
      await articleQxShouCang({
        target: this.$route.params.id
      })

      this.selfCollect = false
    },
    // 收藏文章
    async shoucang() {
      await articleShouCang({
        target: this.$route.params.id
      })

      // 每次都要刷新才能看到效果
      this.selfCollect = true
    },
    // 按回车添加评论
    async add() {
      // 如果内容不为空才发请求
      if (this.msg.trim() !== '') {
        // 里面再做一个判断
        if (this.$login()) {
          // 判断是新增文章下的评论还是回复
          if (this.isReply) {
            // 我们要做的是回复
            // 发请求去添加回复
            let res = await commentAdd({
              // 评论的id
              target: this.com_id,
              // 输入的内容
              content: this.msg,
              // 文章id
              art_id: this.$route.params.id
            })

            // 本地的项目数据还没改变，我们要让他改变起来
            this.reply_list.unshift(res.data.new_obj)
            // 清空msg（输入框）
            this.msg = ''

            // 通知父组件我添加成功
            this.$emit('addOK', 1)
          } else {
            // 新增文章下的评论
            let res = await commentAdd({
              // 文章的id
              target: this.$route.params.id,
              // 评论的内容
              content: this.msg
            })

            console.log(res)
            // 通过bus，把res.data.new_obj传递给订阅的对象
            bus.$emit('newCmt', res.data.new_obj)

            // 把输入框内容清空
            this.msg = ''
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.write {
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 0.5px solid #ccc;
  display: flex;
  align-items: center;

  .input {
    flex: 1;
  }

  .van-icon {
    margin-right: 20px;
    font-size: 20px;
  }
}
</style>
