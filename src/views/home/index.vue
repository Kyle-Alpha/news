<template>
  <div class="home">
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      background="#3692fa"
      class="search_bar"
      @search="onSearch"
      @focus="$router.push('/search')"
    >
      <template #action>
        <div @click="onSearch">
          <van-icon name="photograph" />
          <span>发布</span>
        </div>
      </template>
    </van-search>
    <van-tabs v-model="active" class="index" title-active-color="#3692fa" color="#3692fa" swipeable>
      <van-tab  v-for="(item, index) in channels" :name="item.id" :key="index">
        <div class="tab-title" slot="title" >{{ item.name }}</div>
        <van-pull-refresh v-model="item.refreshing" @refresh="onRefresh(item)">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="我是有底线的"
            @load="onLoad(item)"
          >
            <van-cell v-for="(it,idx) in item.list" :key="idx" :title="it.title">
              <template slot="title">
                <div class="title" @click="$router.push(`/detail/${it.art_id}`)">
                  <span>{{ it.title }}</span>
                  <van-image
                    width="116"
                    height="73"
                    lazy-load
                    v-if="it.cover.type==1"
                    :src="it.cover.images[0]"
                    alt
                  />
                </div>
                <van-grid gutter="0" v-if="it.cover.type == 3" :border="false" :column-num="3">
                  <van-grid-item v-for="(item,index) in it.cover.images" :key="index">
                    <van-image height="73" lazy-load :src="item" />
                  </van-grid-item>
                </van-grid>
                <div class="info">
                  <div>
                    <span class="info-span">{{ it.aut_name }}</span>
                    <span class="info-span">评论({{ it.comm_count }})</span>
                    <span class="info-span">{{ it.pubdate |formatTime }}</span>
                  </div>
                  <van-icon @click="showMore(it)" class="info-more" name="cross" />
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="channel_btn">
      <van-icon name="wap-nav" @click="$refs.channelDialog.show=true" />
    </div>
    <channelDialog ref="channelDialog" :channelList="channels" :active.sync="active" />
    <more ref="moreRef" :artID="artId" />
  </div>
</template>

<script>
import channelDialog from './components/channel'
import more from './components/more'
import { userChannel, articleList } from '@/api/home'
import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
export default {
  components: {
    channelDialog,
    more
  },
  data() {
    return {
      active: 0,
      channels: [],
      artId: 0,
      value: ''
    }
  },
  methods: {
    async onLoad(item) {
      const res = await articleList({
        channel_id: this.active,
        timestamp: item.pre_time,
        with_top: 0
      })
      const arr = res.data.results
      if (arr.length === 0) {
        item.finished = true
      } else {
        item.pre_time = res.data.pre_timestamp
        item.list.push(...arr)
        item.loading = false
      }
    },
    async onRefresh(item) {
      const res = await articleList({
        channel_id: this.active,
        timestamp: Date.now(),
        with_top: 0
      })
      item.list.unshift(...res.data.results)
      item.refreshing = false
      item.loading = false
      item.finished = false
      this.onLoad(item)
    },
    async getChannels() {
      if (!this.$store.state.userInfo) {
        const res = JSON.parse(window.localStorage.getItem('channels'))
        if (res) {
          this.channels = res
          return
        }
      }
      const {
        data: { channels }
      } = await userChannel()
      this.channels = channels
      this.channels.forEach(item => {
        this.$set(item, 'refreshing', false)
        this.$set(item, 'loading', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'list', [])
        item.pre_time = Date.now()
      })
    },
    showMore(it) {
      this.$refs.moreRef.show = true
      this.artId = it.art_id
    },
    onSearch() {}
  },
  created() {
    this.getChannels()
  }
}
</script>

<style lang="less">
.home {
  .search_bar {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 999;
  }

  .van-search__action {
    background-color: #3e9df8;
    div {
      width: 42px;
      height: 34px;
      display: flex;
      flex-direction: column;
      color: #fff;
      i {
        font-size: 24px;
      }
      span {
        height: 21px;
        line-height: 14px;
        font-size: 12px;
        padding: 0;
      }
    }
  }
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;

    .van-nav-bar__title.van-ellipsis {
      color: white;
    }
  }
  .index {
    width: 100%;
    top: 54px;
    .van-tabs__wrap {
      width: 88%;
      position: fixed;
      z-index: 99;
    }
  }
  .channel_btn {
    position: fixed;
    width: 12%;
    height: 44px;
    top: 54px;
    right: 0;
    background-color: #fff;
    text-align: center;
    font-size: 24px;
    line-height: 50px;
    z-index: 99;
    box-shadow: 1px 0 5px rgba(0, 0, 0, 0.3);
  }
  .van-cell {
    .van-grid-item__content {
      padding: 10px 3px;
    }
  }
  .title {
    text-align: left;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 5px;
    }
  }
  .info {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info-span {
      margin-right: 10px;
      font-size: 12px;
      color: #ccc;
    }

    .info-more {
      border: 1px solid #ccc;
      color: #ccc;
      width: 20px;
      height: 10px;
      font-size: 12px;

      // 弹性布局，布局内容的
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 30%;
    }
  }
  .van-list {
    margin-top: 40px;
  }
}
</style>
