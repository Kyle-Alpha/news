<template>
  <div class="zhi">
    <van-nav-bar title="小智同学" left-arrow @click-left="onClickLeft" />
    <div class="chat_content">
      <template v-for="(item, index) in infoList">
        <div class="robot" v-if="item.isRobot" :key="index">
          <van-image
            src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1166216829,807664386&fm=26&gp=0.jpg"
            round
            width="48"
            height="48"
          />
          <div class="msg">{{item.content}}</div>
        </div>
        <div class="user" v-else :key="index">
          <van-image :src="$route.query.icon" round width="48" height="48" />
          <div class="msg">{{item.content}}</div>
        </div>
      </template>
    </div>
    <van-search
      v-model="value"
      left-icon
      show-action
      placeholder="请输入发送的内容"
      @search="onSearch"
      class="post_info"
    >
      <template #action>
        <div @click="onSearch">发送</div>
      </template>
    </van-search>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { setLocal, getLocal } from '@/utils/token'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      value: '',
      infoList: [],
      socket: null,
      oldtime: 0
    }
  },
  computed: {
    time() {
      return dayjs(Date.now()).format('HH:MM')
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    onSearch() {
      this.infoList.push({
        content: this.value,
        isRobot: false,
        timestamp: Math.floor(Date.now() / 1000)
      })
      this.socket.emit('message', {
        msg: this.value, // 聊天的内容
        timestamp: Math.floor(Date.now() / 1000) // 时间戳
      })
      this.value = ''
      document.querySelector('.van-field__control').focus()
    }
  },
  mounted() {
    this.infoList = getLocal('infoList') || []
    this.socket = io(
      `http://ttapi.research.itcast.cn?token=${this.$store.state.userInfo.token}`
    )
    this.socket.on('message', v => {
      this.infoList.push({
        isRobot: true,
        content: v.msg,
        timestamp: v.timestamp
      })
      this.$nextTick(() => {
        let div = document.querySelector('.chat_content')
        div.scrollTop = div.scrollHeight
      })
      setLocal('infoList', this.infoList)
    })
  }
}
</script>

<style lang="less">
.zhi {
  .van-nav-bar {
    background-color: #3692fa;
    .van-icon {
      color: #fff;
    }
  }
  .van-nav-bar .van-nav-bar__title {
    color: #fff;
  }

  .chat_content {
    position: fixed;
    left: 0;
    bottom: 54px;
    top: 45px;
    width: 100%;
    overflow: auto;
    .robot {
      padding: 10px;
      display: flex;
      align-items: center;
      .msg {
        background-color: #fff;
        padding: 10px 20px;
        margin-left: 10px;
        margin-right: 50px;
        width: fit-content;
        text-align: left;
        border-radius: 10px;
        position: relative;
        &::before {
          left: -15px;
          top: 40%;
          position: absolute;
          content: '';
          border: 8px solid transparent;
          border-right-color: #fff;
        }
      }
    }
    .user {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .msg {
        background-color: rgb(71, 233, 71);
        padding: 10px 10px;
        margin-right: 10px;
        margin-left: 50px;
        border-radius: 10px;
        width: fit-content;
        position: relative;
        text-align: left;
        &::after {
          right: -15px;
          top: 40%;
          position: absolute;
          content: '';
          border: 8px solid transparent;
          border-left-color: rgb(71, 233, 71);
        }
      }
    }
  }
  .post_info {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
