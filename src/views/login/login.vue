<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-field
      v-model="loginData.mobile"
      type="tel"
      placeholder="请输入手机号"
    >
      <template slot="left-icon">
        <span class="iconfont icon-iphone"></span>
      </template>
    </van-field>
    <van-field
      center
      clearable
      v-model="loginData.code"
      placeholder="请输入验证码"
    >
      <template slot="left-icon">
        <span class="iconfont icon-lock"></span>
      </template>
      <van-button round slot="button" size="small">发送验证码</van-button>
    </van-field>
    <van-button
      type="info"
      loading-type="spinner"
      :loading="isLoading"
      loading-text="登录中...."
      @click="doLogin"
      >登录</van-button
    >
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  data() {
    return {
      loginData: {
        mobile: '13476894603',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async doLogin() {
      const { data } = await login(this.loginData)
      console.log(data)
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100%;
  background-color: #f5f7f9;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3e9df8;

    .van-nav-bar__title.van-ellipsis {
      color: white;
    }
  }

  button.van-button.van-button--default.van-button--small {
    background-color: #ededed;
  }

  button.van-button.van-button--info.van-button--normal {
    width: 90%;
    margin: 30px auto;
    display: block;
  }
}
</style>
