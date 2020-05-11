import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Welcome from '@/components/Welcome.vue'
import Users from '@/components/user/Users.vue'
import Roles from '@/components/role/Roles.vue'
import GoodsCate from '@/components/goods/GoodsCate.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import NotFound from '@/components/NotFound.vue'
import store from '@/store'

Vue.use(Router)

const userRule = { path: '/users', component: Users }
const rolesRule = { path: '/roles', component: Roles }
const goodRule = { path: '/goods', component: GoodsList }
const categorieRule = { path: '/categories', component: GoodsCate }

const ruleMapping = {
  'users': userRule,
  'roles': rolesRule,
  'goods': goodRule,
  'categories': categorieRule
}

const router = new Router({
  routes: [
    { 
      path: '/', 
      redirect: '/home' 
    },
    { 
      path: '/login', 
      component: Login 
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        // { path: '/users', component: Users },
        // { path: '/roles', component: Roles },
        // { path: '/goods', component: GoodsList },
        // { path: '/categories', component: GoodsCate }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

// 通过导航守卫对用户的非法操作进行拦截
// 正常的逻辑是通过登录界面，登录成功之后跳转到管理平台界面,
// 但是如果用户直接在浏览器中敲入管理平台的地址，也是可以跳过登录的步骤.所以应该在某个时机判断用户是否登录
router.beforeEach((to, from, next) => {
  // 判断用户如果在登录界面直接放行
  if(to.path === '/login') {
    next()
  } else {
    // 判断sessionStorage中是否有token，没有直接跳转到登录页面
    const token = sessionStorage.getItem('token')
    if(!token) {
      next('/login')
    } else {
      next()
    }
  }
})


// 动态添加路由
export function initDynamicRoutes() {
  // 根据二级权限，对路由规则进行动态添加
  // console.log(router)
  // 获取要添加二级路由的一级路由位置
  const currentRoutes = router.options.routes
  // 获取用户权限对应的侧边栏数据
  const rightList = store.state.rightList
  // 对 rightList 进行循环遍历 item 对应的是一级权限
  rightList.forEach(item => {
    // item.children 对应的是二级权限
    item.children.forEach(item => {
      // ruleMapping[item.path]  二级权限所对应的路由
      const temp = ruleMapping[item.path]
      // 给动态添加的路由添加一个源数据，用于判断当前页面中的按钮是否可用
      temp.meta = item.rights
      // 将二级权限所对应的路由动态添加到二级路由中
      currentRoutes[2].children.push(temp)
    })
  })
  router.addRoutes(currentRoutes)
}

export default router
