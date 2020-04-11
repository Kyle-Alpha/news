<template>
  <div class="search">
    <van-search
      show-action
      v-model="value"
      @input="think"
      background="#3692fa"
      placeholder="请输入搜索关键词"
    >
      <van-icon class="header-left" @click="goback" slot="left" name="arrow-left" />
      <template #action>
        <div @click="onSearch(value)"  class="searchBtn">搜索</div>
      </template>
    </van-search>
    <van-cell-group v-if="thinkList.length!==0">
      <van-cell
        @click="onSearch(item.oldItem)"
        icon="search"
        v-for="(item, index) in thinkList"
        :key="index"
      >
        <template #title>
          <div v-html="item.newItem"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template #right-icon>
          <van-icon name="delete" @click="clearHistory" size="20" />
        </template>
      </van-cell>
      <van-cell
        :title="item"
        @click="onSearch(item)"
        icon="clock-o"
        v-for="(item, index) in historyList"
        :key="index"
      >
        <template #right-icon>
          <van-icon name="cross" @click.stop="delOne(index)" size="20" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiThink } from '@/api/search'
import { setLocal, getLocal, removeLocal } from '@/utils/token'
export default {
  data() {
    return {
      value: '',
      thinkList: [],
      historyList: []
    }
  },
  methods: {
    think() {
      var timer
      clearInterval(timer)
      timer = setTimeout(async () => {
        if (this.value) {
          var { data } = await apiThink({
            q: this.value
          })
          this.thinkList = data.options
          this.thinkList = this.thinkList.map(v => {
            return {
              oldItem: v,
              newItem: v.replace(
                this.value,
                `<span style="color:red;">${this.value}</span>`
              )
            }
          })
        } else {
          this.thinkList = []
        }
      }, 1000)
    },
    onSearch(item) {
      this.historyList.unshift(item)
      this.historyList = [...new Set(this.historyList)]
      setLocal('history', this.historyList)
      this.$router.push(`/result/${item}`)
    },
    clearHistory() {
      removeLocal('history')
      this.historyList = []
      this.$toast.success('清除完成')
    },
    getHistory() {
      this.historyList = getLocal('history') || []
    },
    delOne(index) {
      this.historyList.splice(index, 1)
      setLocal('history', this.historyList)
    },
    goback() {
      this.$router.back()
    }
  },
  created() {
    this.getHistory()
  }
}
</script>

<style lang="less">
.search {
  .header-left {
    margin-right: 10px;
    color: #fff;
  }
  .van-cell__title {
    text-align: left;
  }
  .red {
    color: red;
    font-size: 24px;
  }
  .searchBtn {
    color: #fff;
    background-color: #3692fa;
  }
}
</style>
