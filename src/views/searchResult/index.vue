<template>
  <div class="searchRes">
    <van-nav-bar title="搜索结果" left-arrow @click-left="onClickLeft" fixed />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <van-cell
        v-for="(item,index) in list"
        :key="index"
        @click="$router.push(`/detail/${item.art_id}`)"
      >
        <template slot="title">
          <div class="title">
            <span>{{ item.title }}</span>
            <van-image
              width="116"
              height="73"
              v-if="item.cover.type==1"
              :src="item.cover.images[0]"
              alt
            />
          </div>
          <van-grid gutter="0" v-if="item.cover.type == 3" :border="false" :column-num="3">
            <van-grid-item v-for="(item,index) in item.cover.images" :key="index">
              <van-image height="73" :src="item" />
            </van-grid-item>
          </van-grid>
          <div class="info">
            <div>
              <span class="info-span">{{ item.aut_name }}</span>
              <span class="info-span">{{ item.pubdate |formatTime }}</span>
            </div>
          </div>
          <van-grid gutter="0" :border="false" :column-num="3">
            <van-grid-item
              @click.stop="comment()"
              icon="comment-o"
              :text="item.comm_count?item.comm_count.toString() :'评论'"
            />
            <van-grid-item
              @click.stop="zan(item.art_id)"
              icon="like-o"
              :text="item.like_count?item.like_count.toString() :'点赞'"
            />
            <van-grid-item @click.stop="share()" icon="certificate" text="分享" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { apiSearch } from '@/api/search'
import { apiZan, apiDelZan } from '@/api/article'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      keyword: '',
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad() {
      var {
        data: { results }
      } = await apiSearch({
        page: this.page,
        perPage: this.perPage,
        q: this.keyword
      })
      if (results.length === 0) {
        this.finished = true
        return
      }
      this.list = [...this.list, ...results]
      this.page++
      this.loading = false
    },
    onClickLeft() {
      this.$router.back()
    },
    comment(id) {
      if (this.$login()) {
      } else {
        this.$router.push('/checkLogin')
        this.$toast('你尚未登录')
      }
    },
    async zan(id) {
      await apiZan({ target: id })
      apiDelZan(id)
    },
    share(id) {
      console.log('share')
    }
  },
  mounted() {
    this.keyword = this.$route.params.art
  }
}
</script>

<style lang="less">
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__title {
  color: #fff;
}
.van-nav-bar {
  background-color: #3692fa;
  .van-nav-bar__left {
    color: #fff;
  }
}
.title {
  span {
    text-align: left;
    font-weight: 600;
  }
}
.list {
  .van-cell {
    text-align: left;
  }
  margin-top: 46px;
  .info {
    span.info-span {
      margin-right: 9px;
      font-size: 8px;
    }
  }
  .van-grid-item__content.van-grid-item__content--center {
    flex-direction: row;
  }
  .van-grid-item__text {
    margin: 0 5px;
  }
}
</style>
