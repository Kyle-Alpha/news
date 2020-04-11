<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="loginData.mobile" placeholder="请输入手机号" clearable>
        <template slot="left-icon">
          <span class="iconfont icon-iphone"></span>
        </template>
      </van-field>
      <van-field center clearable v-model="loginData.code" placeholder="请输入验证码">
        <template slot="left-icon">
          <span class="iconfont icon-lock"></span>
        </template>
        <van-button
          round
          slot="button"
          size="small"
          @click="sendCode"
          :disabled="second != 0"
        >{{ second === 0 ? '发送验证码' : `${second}S` }}</van-button>
      </van-field>
      <van-button
        type="info"
        loading-type="spinner"
        :loading="isLoading"
        loading-text="登录中...."
        @click="doLogin"
      >登录</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { login } from '@/api/login'
import { setToken } from '@/utils/token'
export default {
  data() {
    return {
      loginData: {
        mobile: '18511111111',
        code: '246810'
      },
      isLoading: false,
      timerId: '',
      second: 0
    }
  },
  methods: {
    async doLogin() {
      if (this.checkMobile() && this.checkCode()) {
        try {
          this.isLoading = true
          const { data } = await login(this.loginData)
          setToken(data)
          this.$store.commit('setUserInfo', data)
          if (this.$route.path === '/login') {
            this.$router.push('/home')
          } else {
            this.$router.back()
          }
        } catch {
          this.$toast('验证码错误')
        } finally {
          this.isLoading = false
        }
      }
    },
    checkMobile() {
      if (
        this.loginData.mobile.length !== 11 ||
        !/(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}/.test(
          this.loginData.mobile
        )
      ) {
        this.$toast('请输入正确手机号')
        return false
      }
      return true
    },
    checkCode() {
      if (this.loginData.code.length !== 6) {
        this.$toast('验证码格式错误')
        return false
      }
      return true
    },
    sendCode() {
      this.second = 60
      this.timerId = setInterval(() => {
        this.second--
        if (!this.second) clearInterval(this.timerId)
      }, 1000)
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
    width: 86px;
  }

  button.van-button.van-button--info.van-button--normal {
    width: 90%;
    margin: 30px auto;
    display: block;
  }
}
</style>
