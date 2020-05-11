<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 为了防止用户登录后 刷新页面导致页面无法访问，需要在app.vue中导入initDynamicRoutes
// 让页面刷新后，根据用户所具备的权限，再次动态添加路由规则
import { initDynamicRoutes } from '@/router.js'
export default {
  name: 'app',
  created() {
    initDynamicRoutes()
  }
}
</script>

<style>
</style>
