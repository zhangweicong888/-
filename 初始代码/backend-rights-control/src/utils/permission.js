import Vue from 'vue'
import router from '@/router.js'
// 定义 v-permission 自定义指令
Vue.directive('permission', {
    inserted(el, binding) {
        //console.log(el)  // v-permission 自定义指令所对应的元素标签
        //console.log(binding) // 自定义指令对象
        // 获取自定义指令中对应的值
        const action = binding.value.action
        const effect = binding.value.effect
        // router.currentRoute 当前所处于的路由规则对象
        // console.log(router.currentRoute.meta)
        // 判断当前路由对应的组件中，是否具备 action 权限
        if (router.currentRoute.meta.indexOf(action) == -1) {
            // 判断用户是否具备权限，不具备权限将按钮禁用 effect: 'disabled'
            if (effect === 'disabled') {
                el.disabled = true
                el.classList.add('is-disabled')
            } else {
                // 如果不具备该权限，则删除该元素
                el.parentNode.removeChild(el)
            }
        }
    }
})