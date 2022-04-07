#  doModal
Modal 拖动功能 在官方api基础上扩展依然支持[官方api](https://1x.antdv.com/components/modal-cn#API)

## npm
```
npm i andvx
```

## 增加props

|  参数  | 类型  | 默认值 |
| ----  | ---- | ---- |
| isDrag  | Boolean | true |

## 使用
使用方法与官方一致可以直接覆盖a-modal进行使用

全局使用 main.js
```
...
import { createApp } from 'vue'
import DoModal from "andvx/components/doModal";

const app = createApp(App)
app.component('a-modal', DoModal);
...
```

按需使用 xxx.vue
```

<template>
    <a-modal ....>
</template>

<script>
import { defineComponent, ref } from "vue";
import DoModal from "andvx/components/doModal";

export default defineComponent({
    components: { AModal:DoModal },
    ...
})
</script>
```

## 与mixins/dragModal.js的区别

当前组件只支持a-modal的拖拽无法支持 Modal.info(xxx)的拖拽

## demo 

[在这里](../../src/views/modal/index.vue)