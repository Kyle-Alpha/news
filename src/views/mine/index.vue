<template>
  <div class="mine">
    <!-- 头部区域 -->
    <div v-if="$store.state.userInfo.token" class="top">
      <!-- 用户信息 -->
      <div v-if="$store.state.userInfo.token" class="user-info">
        <img @click="$router.push('/profile')" class="avatar" :src="userInfo.photo" alt />
        <span class="name">{{ userInfo.name }}</span>
      </div>

      <!-- 统计数据 -->
      <div class="data-info">
        <div class="data-info-item">
          <span>{{ userInfo.art_count }}</span>
          <span>动态</span>
        </div>
        <div class="data-info-item">
          <span>{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </div>
        <div class="data-info-item">
          <span>{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </div>
      </div>

      <!-- 阅读时间 -->
      <div class="read-time">
        <div>今日阅读</div>
        <div>1分钟</div>
      </div>
    </div>

    <!-- 没登录时显示的头部 -->
    <div v-else class="top">
      <div class="phone-wrap">
        <img class="top-phone" src="http://toutiao.research.itcast.cn/img/wd_weidl.png" alt />
      </div>
    </div>

    <!-- 中间的操作区域 -->
    <van-grid :column-num="3">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="underway-o" text="历史" />
      <van-grid-item icon="records" text="作品" />
    </van-grid>

    <!-- 下面的功能区域 -->
    <van-cell-group class="bottom-wrap">
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <!--
        以前参数里是直接写路径，例如 $router.push('/robot')
        可以传对象的
          对象有固定的属性
            name：路由的名字
            params：给路由的参数（数据）
            path: 写路径的路径的

        如果是用这种写法，而且你还要传params的话，就不能用path，只能用name
      -->
      <van-cell
        @click="$router.push({ name:'robot',params:{ icon:userInfo.photo } })"
        title="小智同学"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
// 导入接口
import { getInfo } from '@/api/user'

export default {
  name: 'mine',

  data() {
    return {
      userInfo: {}
    }
  },

  async created() {
    // 先判断有没有登录
    if (this.$store.state.userInfo.token) {
      // 有token代表登录了，就发请求获取当前数据
      let res = await getInfo()
      this.userInfo = res.data
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.mine {
  height: 100%;
  background-color: #f5f7f9;
  .van-cell__title {
    text-align: left;
  }
  // 顶部区域
  .top {
    padding: 25px 35px;
    background-color: #3e9df8;
    position: relative;
    min-height: 200px;
    box-sizing: border-box;

    // 用户头像和名字区域
    .user-info {
      display: flex;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
      .name {
        margin-left: 15px;
        color: white;
        font-size: 18px;
      }
    }

    .phone-wrap {
      padding-top: 30px;
      text-align: center;
      .top-phone {
        width: 60px;
        height: 60px;
      }
    }
    // 统计数据
    .data-info {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      // 给里面的每一项加flex布局
      .data-info-item {
        display: flex;
        // 修改弹性布局主轴方向，y为主轴
        flex-direction: column;
        align-items: center;
        color: white;
        font-size: 18px;
      }
    }

    .read-time {
      position: absolute;
      right: 0;
      top: 40px;
      color: white;
      background-color: #2b6ead;
      padding: 5px 15px;
      text-align: center;

      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      font-size: 13px;
    }
  }

  /deep/.van-icon-star-o {
    color: red;
  }

  /deep/.van-icon-underway-o {
    color: orange;
  }

  /deep/.van-icon-records {
    color: #6a93ff;
  }

  /deep/.van-grid-item__text {
    font-size: 16px;
  }

  .bottom-wrap {
    margin-top: 10px;

    .van-cell__title {
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
