import {createApp} from 'vue';
import App from './App.vue'
import router from './router'
const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/element-variables.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

app.use(ElementPlus, { locale:zhCn })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

document.body.style.margin = '0';

import axios from 'axios'
app.config.globalProperties.$http = axios

app.use(router).mount('#app')

//修复 el-table 在路由切换时引起的奇怪bug
const debounce = (fn: (...args: any[]) => any, delay: number) => {
    let timer: any;
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback:any) {
        callback = debounce(callback, 100);
        super(callback);
    }
}
