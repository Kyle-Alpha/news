<template>
  <div class="upload">
    <van-popup v-model="show" class="mypopup">
      <div class="item" @click="openFile">
        从相册中选择
        <input type="file" @change="changeImg" style="display:none" ref="input" />
      </div>
      <div class="item">拍照</div>
      <div class="item">取消</div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { uploadPhoto } from '@/api/user'

// 全局注册
Vue.use(ImagePreview)
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    openFile() {
      this.$refs.input.click()
    },
    changeImg() {
      var myImg = this.$refs.input.files[0]
      var filereader = new FileReader()
      filereader.readAsDataURL(myImg)
      filereader.addEventListener('load', function() {
        var path = filereader.result
        ImagePreview({
          images: [path],
          onClose() {
            this.$dialog
              .confirm({
                title: '提示',
                message: '你确认要用该图片为头像吗'
              })
              .then(async () => {
                var {
                  data: { photo }
                } = await uploadPhoto(myImg)
                // this.$parent.userInfo.photo = photo
                this.show = false
                this.$emit('upOK', photo)
                this.$toast.success('上传成功')
              })
              .catch(() => {
                this.$toast.fail('上传失败')
              })
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.mypopup {
  width: 90%;
}
</style>
