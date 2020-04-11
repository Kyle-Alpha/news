<template>
  <div class="channelDialog">
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <van-cell title>
        <template #right-icon>
          <van-icon name="cross" size="18" color="#3692fa" @click="show=false" />
        </template>
      </van-cell>
      <van-cell title="点击删除以下频道">
        <template default>
          <van-button plain round size="mini" @click="edit=!edit" type="info">{{edit? '编辑':'完成'}}</van-button>
        </template>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(item, index) in channelList"
          :key="index"
          @click="edit?changeChannel(item):subChannel(index)"
        >
          <template #text>
            <span :class="{active:active===item.id}">{{item.name}}</span>
            <van-icon name="clear" class="close" @click.stop v-if="!edit&&index!==0" />
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="点击添加以下频道" value />
      <van-grid :gutter="10">
        <van-grid-item
          :text="item.name"
          v-for="(item, index) in allchannels"
          :key="index"
          @click="addChannel(item)"
        ></van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { channels, setChannel } from '@/api/home'
export default {
  props: ['channelList', 'active'],
  data() {
    return {
      show: false,
      edit: true,
      allChannel: []
    }
  },
  computed: {
    allchannels() {
      var ids = this.channelList.map(v => {
        return v.id
      })
      var newChannel = this.allChannel.filter(v => {
        return !ids.includes(v.id)
      })
      return newChannel
    }
  },
  watch: {
    active(v) {
      console.log(v)
    }
  },
  methods: {
    changeChannel(v) {
      this.$emit('update:active', v.id)
      this.show = false
    },
    subChannel(index) {
      this.channelList.splice(index, 1)
      this.setchannel()
    },
    addChannel(item) {
      this.$set(item, 'refreshing', false)
      this.$set(item, 'loading', false)
      this.$set(item, 'finished', false)
      this.$set(item, 'list', [])
      item.pre_time = Date.now()
      this.channelList.push(item)
      this.setchannel()
    },
    setchannel() {
      if (!this.$store.state.userInfo) {
        window.localStorage.setItem(
          'channels',
          JSON.stringify(this.channelList)
        )
      } else {
        var channels = this.channelList.slice(1).map((v, i) => {
          return { id: v.id, seq: i + 2 }
        })
        setChannel({ channels })
      }
    },
    async getAllchannels() {
      var res = await channels()
      this.allChannel = res.data.channels
    }
  },
  created() {
    this.getAllchannels()
  }
}
</script>

<style lang="less">
@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
.channelDialog {
  .van-grid-item {
    height: 30px;
    width: 25%;
    font-size: 12px;
    animation: zoomIn 0.3s ease;
    .van-grid-item__content {
      position: relative;
      background-color: #eee;
      border-radius: 10%;

      span.active {
        color: #3692fa;
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        z-index: 99;
      }
    }
  }
}
</style>
