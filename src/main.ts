import {createApp} from 'vue';
import App from './App.vue'
import router from './router'
const app = createApp(App)

import ElementPlus from 'element-plus'
import '@/element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

app.use(ElementPlus, { locale })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

document.body.style.margin = '0';

import axios from 'axios'
app.config.globalProperties.$http = axios

app.use(router).mount('#app')
