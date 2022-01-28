#  andvx
基于 [ant design vue](https://next.antdv.com/docs/vue/introduce-cn) 扩展一些组件

vue3 + antdv + vuex 


## npm
```
npm i andvx
```

目前只做按需引入
```
import xxx from "andvx/xxx";
```

如需把组件全局引入请自行在main.js处理
```
import { createApp } from 'vue'
import DoTable from "andvx/components/doTable";
...

const app = createApp(App)
app.component('a-table', DoTable);
...

```


## components

- breadcrumb 面包屑组件
    - 基于vuex 在菜单路由页面进行数据读取与浏览器选项卡title设置
    - 同时也支持自住设置数据展示

- doFCDesigner 动态表单ui编辑组件 [使用说明](./components/doFCDesigner/README.md)
    - 基于[form-create](http://www.form-create.com/v3/guide/)进行自主定制处理
    - 依然支持官方对图形界面操作的[文档](http://designer.form-create.com/guide/)
    - 通过图形界面编辑生成需要的JSON配置

- doTable 表格的表头设置组件   [使用说明](./components/doTable/doTable.md)
    - 基于vuex存储表头部设置结果
    - 可以进行表头列的移动、显隐

- doTable/tableFormItem.vue 对表格内编辑的异常提示处理
    - 配合框架的表单规则验证进行处理
    - 更友好的展示异常

- layout 外壳布局相关组件
    - layout/menu.vue 左侧菜单
    - layout/header.vue 右侧头部
    - layout/header/org.vue 右侧头部 组织处理
    - layout/header/user.vue 右侧头部 用户处理
    - layout/header/system.vue 右侧头部 系统切换处理

## mixins

- leavePageDetection.js 编辑状态离开时处理
    - 在表单有编辑未保存时离开ui将会弹出拦截提醒
    - 使用时必须根据本功能判断规则设置好所需项  具体可以参考dome菜单“表单示例”

## store

本组件是基于vuex处理的因此需要引入 store/modules/andvx.js

## demo运行
```
npm i
npm run dev
```