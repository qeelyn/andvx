#  doFcDesigner
vue3  ant版本 表单设计器 基于 [form-create](http://form-create.com/) 的 [form-create-designer](http://designer.form-create.com/guide/)官方升级而成 依然支持[官方方法](http://designer.form-create.com/guide/api.html#getrule)

## npm
```
npm i andvx
```

## 扩充

1. 表单组件
    - 隐藏域

2. 辅助组件
    - 进度条

3.  布局组件
    - 数组
    - 表格
    - 卡片
    - 标签页

*使用【数组、表格组件、自定义字典、隐藏域替换type属性配置】时需引入 initRules 解析

## 使用

使用建议: 全局注册 ant-design-vue 

毕竟表单设计器里的组件如果按需引入量也很大,同时避免非全局注册formCreate下也需要再引入才能正常解析使用的麻烦,因此给出如上使用建议

main.js
```
...
import { createApp } from 'vue'
const app = createApp(App)

import antd from 'ant-design-vue';
app.use(antd)
...
```

xxx.vue
```
<template>
    <div style="height: 80vh;">
    <do-fc-designer ref="fcDesignerRef">
        <template #btns>
            <a-space>
                <a-button type="primary" @click="viewer" >预览</a-button>
                <a-button >清空</a-button>
            </a-space>
        </template>
    </do-fc-designer>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import DoFcDesigner from "andvx/components/doFcDesigner";
import { initRules } from "andvx/components/doFcDesigner/utils/parse";

export default defineComponent({
    components: { DoFcDesigner },
    setup(){
        //字典格式
        const fcDesignerRef = ref()
            dictionary = ref({
            'XYG': [
                { name: 'XYG1', code: '1' },
                { name: 'XYG2', code: '2' },
                { name: 'XYG3', code: '3' },
            ]
        })

        const viewer = () => {            
            const rule = fcDesignerRef.getRule();
            initRules(rule, dictionary.value);
            console.log(rule)
        }

        return {
            fcDesignerRef,
        }
    }
})
</script>
```


## 字典格式说明
![字典格式](./assets/dictionary.png)

```
dictionary = {
    key:[
        {name,code},
        ......
    ]

}
```
图上填值与实际数据格式对应表

|  图值  | 格式  |
| ----  | ---- |
| code  | key   |
| key   | code  |
| label | name  |

## demo 

[在这里](../../src/views/form/fcDesigner.vue)