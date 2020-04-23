<template>
  <div class="userinfo">
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="onClickLeft"
      right-text="保存"
      @click-right="onClickRight"
    />
    <van-cell-group>
      <van-cell title="头像" @click="uploadShow" is-link>
        <template #default>
          <van-image :src="userInfo.photo" width="24" height="24" round />
        </template>
      </van-cell>
      <van-cell title="昵称" :value="userInfo.name" @click="showname=true" is-link></van-cell>
      <van-cell title="介绍" :value="userInfo.intro" @click="showintro=true" is-link></van-cell>
      <van-cell title="性别" @click="showgender=true" :value="userInfo.gender===0?'男':'女'" is-link></van-cell>
      <van-cell title="生日" @click="showbirth=true" is-link>
        <template #default>{{userInfo.birthday | formatDate}}</template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="showname" position="bottom" :style="{ height: '7%' }">
      <van-form>
        <van-field
          v-model="userInfo.name"
          name="昵称"
          placeholder="请填写昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
      </van-form>
    </van-popup>
    <van-popup v-model="showintro" position="bottom" :style="{ height: '7%' }">
      <van-form>
        <van-field
          v-model="userInfo.intro"
          name="昵称"
          placeholder="请填写昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
        />
      </van-form>
    </van-popup>
    <van-popup v-model="showbirth" position="bottom" :style="{ height: '20%' }">
      <van-datetime-picker
        v-model="userInfo.birthday"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmPicker"
        visible-item-count="3"
      />
    </van-popup>
    <van-popup v-model="showgender" position="bottom" :style="{ height: '15%' }">
      <van-picker
      show-toolbar
        title="请选择性别"
        :default-index="userInfo.gender"
        visible-item-count="3"
        :columns="columns"
        @change="onChange"
      />
    </van-popup>
    <upload ref="upload" @upOK="changeImage" />
  </div>
</template>

<script>
import { getProfile, getInfo, editProfile } from '@/api/user'
import upload from './component/upload'
import dayjs from 'dayjs'
export default {
  components: {
    upload
  },
  data() {
    return {
      userInfo: {},
      showname: false,
      showintro: false,
      showbirth: false,
      showgender: false,
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2025, 10, 1),
      columns: ['男', '女']
    }
  },
  methods: {
    confirmPicker(value) {
      this.userInfo.birthday = value
    },
    onChange(picker, value, index) {
      this.userInfo.gender = index
    },
    uploadShow() {
      this.$refs.upload.show = true
    },
    onClickLeft() {
      this.$router.back()
    },
    async onClickRight() {
      var obj = { ...this.userInfo }
      delete obj.photo
      obj.birthday = dayjs(obj.birthday).format('YYYY-MM-DD')
      var res = await editProfile(obj)
      if (res) {
        this.$toast.success('提交成功')
      }
    },
    async getUserInfo() {
      var res = await getProfile({ target: this.$route.params.id })
      this.userInfo = res.data
      var {
        data: { intro }
      } = await getInfo({ target: this.$route.params.id })
      this.$set(this.userInfo, 'intro', intro)
      this.userInfo.birthday = new Date(this.userInfo.birthday.split('-'))
    },
    changeImage(v) {
      this.userInfo.photo = v
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="less">
.userinfo {
  .van-nav-bar .van-icon {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__text {
    color: #fff;
    &:active {
      background-color: #3692fa;
    }
  }

  .van-nav-bar {
    background-color: #3692fa;
    .van-nav-bar__left {
      color: #fff;
    }
  }
  .van-cell__title {
    text-align: left;
  }
}
</style>
