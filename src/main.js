import { createApp } from 'vue'
import App from './App.vue'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import directives from './directives/index';


const app = createApp(App)
app.use(directives) // 调用安装指令
app.use(ElementPlus)
app.mount('#app')
