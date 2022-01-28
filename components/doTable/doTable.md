#  doTable
vue3  ant版本 table 组件扩展的表头设置功能 

## npm
```
npm i andvx
```

## 全局引入
main.js
```
import { createApp } from 'vue'
import DoTable from "andvx/components/doTable";


const app = createApp(App)
app.component('a-table', DoTable);

```

## 按需引入
xxx.vue
```
<templage>
    <DoTable />
</templage>
<script>
import DoTable from "andvx/components/doTable";
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  components: { DoTable },
})

</script>

```

## vuex引入
通过引入后使用[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)使vuex存储于浏览器localStorage中

store.js
```
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

import andvx from 'andvx/store/modules/andvx'


// 创建一个新的 store 实例
const store = createStore({
    modules: {
        andvx,
    },
    plugins: [
        createPersistedState({
            key: 'andvx-test',
            paths: [
                'andvx.tableHeader',
            ],
        })
    ],
})
export default store
```
## vuex 使用
vuex中共有两个方法
 1. andvx/setTableHeader
 2. andvx/updateTableHeader

在main.js中使用 方法1 初始化设置的值
```
store.dispatch("andvx/setTableHeader",data);
```

在组件中默认使用 方法2 来记录值
```
store.dispatch("andvx/updateTableHeader", {
    code: vuexCode,
    value: [],
});
```
## 自定义vuex 
如设置后的表头数据需要存储在后端数据库中时需要自定义vuex功能，主要是实现上面两个方法的api处理，并引入自己自定义后的vuex module 

基础vuex module内容如下,主要设置api的位置为actions中两个TODO位置
```
const state = {
    /**
     * 用于处理表格头部修改记录
     * tableHeader ：{
     *     "xxx":[
     *          { checked, title, key }
     *      ]
     * }
     */
    tableHeader: {},
}

const actions = {
    /**
    * 设置tableHeader
    */
    setTableHeader: function (event, data) {
        //TODO: 使用api方法后设置初始化值
        event.commit('setTableHeader', data)
    },
    /**
     * 更新tableHeader
     */
    updateTableHeader: function (event, data) {
        //TODO: 使用api记录每次表头设置的数据更新
        event.commit('updateTableHeader', data);
    }
}

const mutations = {
    /**
     * 设置tableHeader
     * @param {*} state
     * @param string value 
     */
    setTableHeader: function (state, data) {
        state.tableHeader = data ? data : {}
    },
    /**
     * 更新tableHeader
     * @param {*} state
     * @param string value {code:'',value:[]}
     */
    updateTableHeader: function (state, data) {
        if (data && data.code) {
            if (data.value && data.value.length) {
                state.tableHeader[data.code] = data.value;
            } else {
                delete state.tableHeader[data.code];
            }
        }
    }
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
}
```

## Props
在官方[Table](https://next.antdv.com/components/table-cn)文档基础上扩充

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| setting | Boolean | true |  是否启用表头设置 |
| vuexCode | String | location.pathname |  存储在vuex的code |

ps:注意开发的时候 **vuexCode** 在当前页面存在多个使用此组件的table的时候需要设置这个值，或者一直手动设置这个值

## table.Column

在支持[官方](https://next.antdv.com/components/table-cn#Column)提供之外增加
| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| isMove | Boolean | true |  此列是否参与设置 |

ps: 默认设置了fixed的也不参与设置


## demo 

测试用例在启动本项目后选择菜单 `测试用例->表格自定义头部` 可查看demo
 