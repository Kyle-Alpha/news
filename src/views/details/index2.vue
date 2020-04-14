<template>
  <div class="detail">
    <!-- 导航栏部分 -->
    <van-nav-bar @click-left="$router.back()" left-arrow title="文章详情" />

    <!-- 标题部分 -->
    <h2 class="title">{{ detail.title }}</h2>

    <!-- 作者信息的cell -->
    <van-cell>
      <!-- 自定义title -->
      <template slot="title">
        <div class="info">
          <img class="icon" :src="detail.aut_photo" alt />
          <!-- 作者名字和时间部分 -->
          <div class="aut-info">
            <div class="name">{{ detail.aut_name }}</div>
            <div class="time">{{ detail.pubdate | formatTime }}</div>
          </div>
          <!-- 关注按钮 -->
          <van-button v-if="detail.is_followed" @click="quguan" type="info">已关注</van-button>
          <van-button v-else @click="follow" type="info" icon="plus">关注</van-button>
        </div>
      </template>
    </van-cell>

    <!-- 内容区域 -->
    <van-cell>
      <template slot="title">
        <div class="content" v-html="detail.content"></div>
      </template>
    </van-cell>

    <!-- 操作区域 -->
    <div class="opt">
      <van-button
        v-if="detail.attitude == 1"
        @click="cancelLike"
        type="danger"
        plain
        round
        icon="like"
      >点赞</van-button>
      <van-button v-else @click="like" round icon="like">点赞</van-button>

      <van-button
        v-if="detail.attitude == 0"
        @click="qxbxh"
        type="danger"
        plain
        round
        icon="delete"
      >不喜欢</van-button>
      <van-button v-else @click="buxihuan" round icon="delete">不喜欢</van-button>
    </div>

    <h3 style="padding-left:15px;">猜你喜欢</h3>

    <!-- 评论区域 -->
    <comment />

    <!-- 写评论的区域 -->
    <write :is_collected="detail.is_collected" :isReply="false" />

    <reply />
  </div>
</template>

<script>
// 导入评论组件
import comment from './components/comment'
import write from './components/write'
import reply from './components/reply'

// 导入接口
import {
  articleDetail,
  articleLike,
  articleCancelLike,
  articleBuXiHuan,
  articleQxbxh
} from '@/api/article'
import { followUser, quguanUser } from '@/api/user'

export default {
  name: 'detail',

  components: {
    comment,
    write,
    reply
  },

  data() {
    return {
      detail: {}
    }
  },

  methods: {
    async qxbxh() {
      await articleQxbxh({
        target: this.detail.art_id
      })

      this.detail.attitude = -1
    },
    async buxihuan() {
      if (this.checkLogin()) {
        await articleBuXiHuan({
          target3: this.detail.art_id
        })

        this.detail.attitude = 0
      }
    },
    // 取消点赞的点击事件
    async cancelLike() {
      await articleCancelLike({
        art_id: this.detail.art_id
      })

      this.detail.attitude = -1
    },
    // 点赞的点击事件
    async like() {
      if (this.checkLogin()) {
        await articleLike({
          target: this.detail.art_id // 文章的id，路由的参数就是文章的id，或者detail.art_id也是id
        })

        // attitude 字段改为1
        this.detail.attitude = 1
      }
    },
    // 取关的点击事件
    async quguan() {
      if (this.checkLogin()) {
        await quguanUser({
          aut_id: this.detail.aut_id
        })

        // 弹出提示，取关成功
        this.$toast.success('取消关注用户成功！')

        this.detail.is_followed = false
      }
    },
    // 关注的点击事件
    async follow() {
      // 判断是否登录
      if (this.checkLogin()) {
        // 发请求去关注用户
        await followUser({
          target: this.detail.aut_id // 用户id
        })

        this.$toast.success('关注成功！')

        // 把关注状态设置为true，那么界面就能看到效果了
        this.detail.is_followed = true
      }
    }
  },

  async created() {
    // 页面一打开就去加载文章详情数据
    let res = await articleDetail({
      art_id: this.$route.params.art_id
    })

    // 把查询到的数据保存到detail中
    this.detail = res.data
  }
}
</script>

<style lang="less" scoped>
.detail {
  min-height: 100%;
  background-color: #fff;
  margin-bottom: 44px;
  // 导航栏
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;

    .van-nav-bar__title.van-ellipsis {
      color: white;
    }

    i.van-icon.van-icon-arrow-left.van-nav-bar__arrow {
      color: white;
    }
  }

  .title {
    text-align: center;
  }

  .info {
    display: flex;

    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .aut-info {
      // 代表占用剩余宽度的1份
      flex: 1;
      margin-left: 10px;
    }
  }

  .content {
    // padding: 30px 15px;

    /deep/img {
      // 如果图片本身就比较小，那么没必要强行放大到100%
      // 是限制图片太大，那么也最多只能到100%
      max-width: 100%;
    }

    // 找到content里面所有元素，给他们都设置换行模式
    /deep/ * {
      word-wrap: break-word;
      white-space: normal;
    }
  }

  .opt {
    display: flex;
    justify-content: space-around;
  }
}
</style>
