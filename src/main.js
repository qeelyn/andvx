import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import { Button } from 'ant-design-vue'
import "../assets/index.less";

Button.props.shape.default = 'round';

const app = createApp(App)

app.config.productionTip = false;

store.dispatch("andvx/setTableHeader");

app.use(router)
app.use(store)

// 使用formCreate配和设计器的时候建议全局引入 ant-design-vue
import antd from 'ant-design-vue';
app.use(antd)

app.mount('#app')
