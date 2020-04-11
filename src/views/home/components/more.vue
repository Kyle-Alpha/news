<template>
  <div class="more">
    <van-popup v-model="show" class="mypopup">
      <van-cell-group v-if="isFirst">
        <van-cell icon="failure" title="不感兴趣" @click="disLike" />
        <van-cell icon="info-o" title="反馈垃圾内容" @click="isFirst=false" is-link />
        <van-cell icon="delete" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isFirst=true" />
        <van-cell
          v-for="(item,index) in reportList"
          :key="index"
          :title="item.title"
          @click="report(item.type)"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { apiDisLIke, apiReports } from '@/api/home'
export default {
  props: ['artID'],
  data() {
    return {
      show: false,
      isFirst: true,
      reportList: [
        { type: 1, title: '标题夸张' },
        { type: 2, title: '低俗色情' },
        { type: 3, title: '错别字多' },
        { type: 4, title: '旧闻重复' },
        { type: 5, title: '广告软文' },
        { type: 6, title: '内容不实' },
        { type: 7, title: '涉嫌违法犯罪' },
        { type: 8, title: '侵权' },
        { type: 0, title: '其他问题' }
      ]
    }
  },
  methods: {
    async disLike() {
      console.log(this.artID)
      await apiDisLIke({
        target: this.artID
      })
      this.$toast('操作成功')
      this.show = false
    },
    async report(type) {
      try {
        apiReports({
          target: this.artID,
          type: type
        })
        this.$toast('操作成功')
        this.show = false
      } catch {}
    }
  }
}
</script>

<style lang="less">
.more {
  .mypopup {
    width: 85%;
    border-radius: 5px;
    .van-cell {
      text-align: left;
    }
  }
}
</style>
