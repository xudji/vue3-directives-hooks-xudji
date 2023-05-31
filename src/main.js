import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import directives from './directives/index';


const app = createApp(App)
app.use(directives) // 调用安装指令
app.use(ElementPlus)
app.use(Antd)
app.mount('#app')
