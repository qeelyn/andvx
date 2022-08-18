#  doTree

为方便tree的开发和操作提供了此组件，主要解决

1. 列表结构转换成tree结构
2. 排序功能
3. 节点的数据操作 【增、删、改、查】
4. 节点的移动 【上、下、左、右】
5. 快速定位到选中节点

## npm
```
npm i andvx
```

## props

| 参数              | 类型    | 默认值                                                                                  | 说明                             |
| ----------------- | ------- | --------------------------------------------------------------------------------------- | -------------------------------- |
| treeData          | Array   | null                                                                                    | 形成树的列表数据                 |
| scrollContainer   | ref     | null                                                                                    | 定位滚动的时候对应的ref容器      |
| sort              | string  | asc                                                                                     | 排序asc或者desc                  |
| isInputEditorSort | Boolean | false                                                                                   | 排序是否由用户提供输入框输入控制 |
| topParentId       | string  | "0"                                                                                     | parentId的值是多少为树的顶层     |
| loading           | Boolean | false                                                                                   | 加载                             |
| fieldNames        | Object  | { key: "id", title: "title", parentId: "parentId",  children: "children", sort: "sort"} | 可自定义子字段明                 |
| isSetting         | Boolean | false                                                                                   | 开启设置按钮                     |

## 方法

| 方法名称                        | 参数                         | 说明                                                          | 结果             |
| ------------------------------- | ---------------------------- | ------------------------------------------------------------- | ---------------- |
| rapidPositioningNode            | -                            | 快速定位到选中节点，必须是有滚动条的容器且必填scrollContainer | void             |
| searchData                      | id                           | 通过唯一key快速查询对象                                       | {item,index,ary} |
| selectedNode                    | id                           | 通过唯一key快速选中                                           | void             |
| getSelectedNode                 | -                            | 获取选中节点数据                                              | {item,index,ary} |
| clearSelectNode                 | -                            | 清理所有选中                                                  | void             |
| delNode                         | data                         | 通过传入节点数据删除节点                                      | void             |
| addNode                         | data                         | 通过传入节点数据添加节点                                      | void             |
| updateNode                      | data                         | 通过传入节点数据更新节点                                      | void             |
| [getMoveTarget](#getmovetarget) | data,code                    | 通过传入节点数据和操作方向获取目标节点数据                    | {error,target}   |
| [execMove](#execmove)           | source,target,targetLocation | 执行操作节点对目标节点的位置移动                              | void             |

 
   
**getMoveTarget**

参数code值:【up、down、left、right】


**execMove**

参数targetLocation值:【up、down、child】


## Slot 

设置的菜单使用插槽方式引入可自定义操作名称和事件

```
<template #settingMenu="{ node }">
    <a-menu style="min-width: 100px">
        <a-menu-item @click.native="onEditor(node)">编辑</a-menu-item>
        .....
    </a-menu>
</template>
```


## 使用

xxx.vue

```

<template>
    <do-tree ....>
</template>

<script>
import { defineComponent, ref } from "vue";
import DoTree from "andvx/components/doTree";

export default defineComponent({
    components: { DoTree },
    ...
})
</script>
```

## demo 

[在这里](../../src/views/tree/index.vue)