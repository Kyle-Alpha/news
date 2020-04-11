<template>
  <div class="details">
    <van-nav-bar title left-arrow @click-left="onClickLeft">
      <template #right>
        <van-icon name="ellipsis" size="24" />
      </template>
    </van-nav-bar>
    <h2 class="title">{{list.title}}</h2>
    <van-sticky z-index="99" offset-top="10">
      <div class="author">
        <van-image width="40" height="40" round :src="list.aut_photo" />
        <div class="info">
          <div class="name">{{list.aut_name}}</div>
          <div class="time">{{list.pubdate|formatTime}}</div>
        </div>
        <van-button
          round
          :type="list.is_followed?'info':'default'"
          @click="follow"
        >{{list.is_followed?'已关注':'+关注'}}</van-button>
      </div>
    </van-sticky>

    <van-cell>
      <template #title>
        <div class="content" v-html="list.content"></div>
        <div class="btnBox">
          <van-button
            icon="good-job-o"
            plain
            size="small"
            round
            @click="zan"
            :type="list.attitude===1?'danger':'default'"
          >点赞</van-button>
          <van-button
            icon="delete"
            plain
            size="small"
            round
            @click="like"
            :type="list.attitude===0?'danger':'default'"
          >不喜欢</van-button>
        </div>
      </template>
    </van-cell>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <comment v-for="(item, index) in 5" :key="index" />
    </van-list>
  </div>
</template>

<script>
import {
  apiArticle,
  articleLike,
  articleCancelLike,
  articleBuXiHuan,
  articleQxbxh
} from '@/api/article'
import { followUser, quguanUser } from '@/api/user'
import comment from './components/comment'
export default {
  components: {
    comment
  },
  data() {
    return {
      art_id: this.$route.params.id,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getDetail() {
      var { data } = await apiArticle(this.art_id)
      this.list = data
    },
    onClickLeft() {
      this.$router.back()
    },
    follow() {
      if (this.list.is_followed) {
        quguanUser(this.list)
        this.list.is_followed = false
        this.$toast.success('取关成功')
      } else {
        followUser({ target: this.list.aut_id })
        this.list.is_followed = true
        this.$toast.success('关注成功')
      }
    },
    zan() {
      console.log(this.list.attitude)
      if (this.list.attitude === -1) {
        articleLike({ target: this.list.art_id })
        this.list.attitude = 1
      } else {
        articleCancelLike(this.list)
        this.list.attitude = -1
      }
    },
    like() {
      console.log(this.list.attitude)
      if (this.list.attitude === -1) {
        articleBuXiHuan({ target: this.list.art_id })
        this.list.attitude = 0
      } else {
        articleQxbxh(this.list)
        this.list.attitude = -1
      }
    },
    onLoad() {}
  },
  created() {
    this.getDetail()
  }
}
</script>

<style lang="less">
.details {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;
  }
  .van-nav-bar .van-icon {
    color: #fff;
    vertical-align: middle;
    font-size: 24px;
  }
  .title {
    margin: 20px 10px;
  }
  .author {
    display: flex;
    background-color: #fff;
    padding: 0 20px;
    .info {
      margin-left: 10px;
      flex: 1;
      text-align: left;
      .name {
        font-weight: 500;
      }
      .time {
        color: #ccc;
      }
    }
  }
  .content {
    text-align: left;
  }
  .btnBox {
    display: flex;
    justify-content: space-around;
  }
}
</style>
