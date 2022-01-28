#  alertPop
vue3 ant版本 利用alert 处理全局提示功能，并附带关闭功能

## npm
```
npm i andvx
```

## 全局使用
main.js
```
import { createApp } from 'vue'
import AlertPop from "andvx/components/alertPop";

const app = createApp(App)
app.config.globalProperties.$alertPop = alertPop;

```


xxx.vue
```
import { defineComponent } from 'vue'
export default defineComponent({
    methods:{
        alert(){
            this.$alertPop.info('xxx');
        }
    }
});
```
ps：必须在可以使用 vue this 的地方才能使用

## 按需使用
xxx.vue
```
import { defineComponent } from 'vue'
import AlertPop from "andvx/components/alertPop";

export default defineComponent({
    components: { AlertPop },
    setup() {
        AlertPop.info('xxx');
    }
});
```

## 支持TYPE
- AlertPop.success(message,duration,onClose)
- AlertPop.info(message,duration,onClose)
- AlertPop.warning(message,duration,onClose)
- AlertPop.error(message,duration,onClose)

## 参数说明

| 参数 | 类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| message | String、Object | - | 弹出内容或者配置Config  |
| duration | Number | - | 弹出时间，默认不自动关闭  |
| onClose | Function | - | 关闭事件  |

ps： 配置了message是Config对象后 duration和onClose 参数将无效

## Config
| 参数 | 类型 | 默认值 | 说明 |
| -- | -- | -- | -- |
| type | String | - | success、info、warning、error  |
| message | String | - | 弹出内容  |
| duration | Number | - | 弹出时间，默认不自动关闭  |
| showIcon | Boolean | true | 左侧小图标  |
| closable | Boolean | true | 关闭按钮  |
| onClose | Function | - | 关闭事件  |
