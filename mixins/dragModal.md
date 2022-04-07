# dragModal.js

针对 Modal 组件无法拖动导致ui呗遮挡问题提供了一个混入处理

## npm
```
npm i andvx
```

## 使用
局部路由下使用 xxx.vue
```
import dragModal from "andvx/mixins/dragModal";

export default defineComponent({
    mixins: [dragModal],
});
```

全局使用 main.js
```
import { createApp } from 'vue'
import dragModal from "andvx/mixins/dragModal";

const app = createApp(App)
app.mixin(dragModal)
...
```

## 注意

由于实现处理原因无法针对某个.vue文件内的Modal进行不拖动处理，当然此功能开发人者认为使用的人并不在意去设置某个Modal不拖动,所有的Modal都存在遮挡下层视图的问题


## 与components/doModal的区别

doModal是在ant a-modal上进行扩展无法支持 Modal.info(...)弹出来组件的拖动
## DEMO

[在这里](../src/views/modal/index.vue)