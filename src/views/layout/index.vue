<template>
  <div class="layout">
    <!-- 上面记得一定要加出口才能看到内容 -->
    <router-view></router-view>

    <!-- active记录的是被选中的tab的索引 -->
    <van-tabbar v-model="active">
      <!-- 给每个tabbar设置to属性，就代表点击他时要跳到哪个页面 -->
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="tv-o">视频</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style>
.layout {
  height: 100%;
}
</style>
