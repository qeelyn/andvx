# leavePageDetection.js

在编辑表单时，在编辑的时候不小心按到了浏览器回退或者点到了路由跳转会导致编辑中的内容未保存就被跳转离开，返回后内容需要重新填写问题

## npm
```
npm i andvx
```

## 使用
局部使用 xxx.vue
```
import leavePageDetection from "andvx/mixins/leavePageDetection";

export default defineComponent({
    mixins: [leavePageDetection],
});
```

全局使用 main.js
```
import { createApp } from 'vue'
import leavePageDetection from "andvx/mixins/leavePageDetection";

const app = createApp(App)
app.mixin(leavePageDetection)
...
```

## 注意

- 组件必须暴露save.disabled 


## DEMO

[外层](../src/views/form/index.vue)

[里层form](../src/views/form/standard.vue)

- 外层

外层通过引入 leavePageDetection 和在组件上设置ref="standardFromRef" 

- 里层form  暴露save.disabled 

通过watch 表单的数据对象model 来设置save.disabled = false;
通过初始化表单数据和重置表单数据的是来设置save.disabled = true;

 PS: save.disabled 也可以用来配合保存按钮的disabled和`<a-badge />`的小红点提醒