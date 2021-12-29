import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import Antd, { Button } from 'ant-design-vue'
import "../assets/index.less";
import DoTable from "../components/doTable";

Button.props.shape.default = 'round';

const app = createApp(App)

app.config.productionTip = false;

store.dispatch("andvx/setTableHeader");
app.component('a-table', DoTable);

app.use(Antd);
app.use(router)
app.use(store)

app.mount('#app')
