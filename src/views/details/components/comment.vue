<template>
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
              <van-tag
                @click="showReply(item)"
                class="reply"
                color="#eff7f8"
                round
              >回复{{ item.reply_count }}</van-tag>
            </div>
          </div>

          <!-- 点赞图标 -->
          <div class="zan">
            <!-- 实心 -->
            <van-icon
              v-if="item.is_liking"
              @click="unLike(item)"
              class="zan-icon"
              color="red"
              name="like"
            />
            <!-- 空心 -->
            <van-icon v-else @click="like(item)" class="zan-icon" color="red" name="like-o" />
            <span>{{ item.like_count }}</span>
          </div>
        </div>
      </template>
    </van-cell>
  </van-list>
</template>

<script>
// 导入接口函数
import { commentList, commentLike, commentUnLike } from '@/api/comment'
// 导入bus
import bus from '@/utils/bus'

export default {
  name: 'comment',
  data() {
    return {
      loading: false,
      finished: false,
      // 用来存储cell数据的
      list: [],
      offset: undefined
    }
  },

  methods: {
    // 点击回复显示回复界面
    showReply(item) {
      bus.$emit('showReply', item)
    },

    // 点赞
    async like(item) {
      // 发请求
      await commentLike({
        target: item.com_id
      })

      // 手动空心变实心
      item.is_liking = true
      // 让点赞数+1
      item.like_count++
    },
    // 取消点赞
    async unLike(item) {
      // 这行数据里的com_id就是评论id
      // console.log(item.com_id.toString());

      // 发请求
      await commentUnLike({
        target: item.com_id
      })

      // 请求发过去了，生效了，但是界面看不到效果
      // 必须手动刷新才看得到效果
      // 自己写代码把这行的实心变空心
      item.is_liking = false
      // 让点赞数-1
      item.like_count--
    },

    async onLoad() {
      // 加载数据
      let res = await commentList({
        type: 'a',
        // 文章的id,因为评论组件本身就是在详情里，所以直接通过路由就能拿到id
        source: this.$route.params.id,
        // 先不传,如果给undefined就代表这个参数没有传
        offset: this.offset,
        // 页容量
        limit: 10
      })

      // 拿到数据后先保存起来
      this.list.push(...res.data.results)

      // 继续加载数据
      this.loading = false

      // 把下一页的起始标识赋值给offset
      this.offset = res.data.last_id

      // 要做一个判断是否结束
      if (res.data.last_id === res.data.end_id) {
        // 代表结束了，所以要加载完毕
        this.finished = true
      }
    }
  },

  created() {
    bus.$on('newCmt', data => {
      this.list.unshift(data)
    })
  }
}
</script>

<style lang="less">
// 根标签
.comment {
  // 自定义的每个cell的title（包住所有内容的div）
  .title {
    display: flex;

    // 头像
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    // 名字、内容、时间区域
    .info {
      flex: 1;
      margin-left: 10px;
      font-size: 14px;
      text-align: left;
      // 名字
      .name {
        color: #7d95bd;
        margin-bottom: 10px;
      }
      // 评论内容
      .content {
        margin-bottom: 10px;
      }

      // 底部的时间+回复数
      .bottom {
        .time {
          margin-right: 20px;
        }

        .reply {
          color: black;
          padding: 5px 15px;
          font-size: 14px;
        }
      }
    }

    // 点赞区域
    .zan {
      display: flex;
      align-items: center;
      .zan-icon {
        font-size: 25px;
        margin-right: 10px;
      }
    }
  }
}
</style>
