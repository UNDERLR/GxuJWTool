import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

import ElementPlus from 'element-plus'
import '@/element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'
app.use(ElementPlus, { locale })

app.use(router).mount('#app')
