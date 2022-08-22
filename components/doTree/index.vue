<template>
  <a-spin :spinning="loading" tip="Loading...">
    <a-tree
      ref="treeRef"
      v-if="list.length"
      v-model:selectedKeys="selectedKeys"
      :treeData="list"
      :fieldNames="field"
      defaultExpandAll
      @select="
        (_keys, { node }) => {
          selectedKeys = [node[field.key]];
          $emit('selectedNode', node);
        }
      "
    >
      <template #title="node">
        <span>{{ node[field.title] }}</span>

        <a-dropdown :trigger="['click']">
          <setting-outlined
            v-if="
              isSetting &&
              node.isSetting !== false &&
              selectedKeys.includes(node[field.key])
            "
            class="title-setting"
          />
          <template #overlay>
            <slot name="settingMenu" :node="node.data" />
          </template>
        </a-dropdown>
      </template>
    </a-tree>
    <a-empty v-else />
  </a-spin>
</template>
<style>
.ant-tree-node-content-wrapper .title-setting {
  position: absolute;
  left: 100%;
  top: 4px;
  padding-left: 4px;
}
</style>
<script>
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  watch,
  computed,
  onMounted,
  nextTick,
} from "vue";
import { Tree, Spin, Empty } from "ant-design-vue";
import { SettingOutlined } from "@ant-design/icons-vue";

/**
 * 默认读取路由 如果配置了datas则使用datas中的数据
 * props.datas 数据格式 [{
 *    name:''
 * }]
 */
export default defineComponent({
  components: { ATree: Tree, ASpin: Spin, AEmpty: Empty, SettingOutlined },
  props: {
    // 此数据必须先根据排序值排序完成后设置
    treeData: { type: Array },
    // 可定位滚动位置
    scrollContainer: { type: Object },
    // asc 升序（小->大） 和 desc	降序（大->小）
    sort: { type: String, default: "asc" },
    // 排序是否有输入框编辑
    isInputEditorSort: { type: Boolean },
    // 顶部的parentId
    topParentId: { type: String, default: "0" },
    // 加载状态
    loading: { type: Boolean },
    // 固定字段 id,parentId,title,children,sort 可随时设置替换
    fieldNames: [Object],
    // 启用设置按钮
    isSetting: { type: Boolean },
  },
  setup(props) {
    const {
        treeData,
        scrollContainer,
        sort,
        isInputEditorSort,
        topParentId,
        fieldNames,
        isSetting,
      } = toRefs(props),
      field = reactive({
        key: "id",
        title: "title",
        parentId: "parentId",
        children: "children",
        sort: "sort",
        ...fieldNames.value,
      }),
      treeRef = ref(),
      selectedKeys = ref([]),
      list = ref([]);

    const init = () => {
        // 初始化构建树结构
        let topList = [],
          allList = [];
        if (treeData.value) {
          allList = treeData.value.map((item) => {
            const newItem = { ...item },
              isSortKey = Object.keys(newItem).includes(field.sort);

            if (newItem.parentId == topParentId.value) {
              if (!isSortKey) {
                newItem[field.sort] = topList.length + 1;
              }
              topList.push(newItem);
            }
            return newItem;
          });

          topList.sort(_sort);

          topList = _setTreeData(topList, allList);
        }
        list.value = topList;
      },
      _setTreeData = (parentList, allList) => {
        //设置tree结构数据
        parentList.forEach((item) => {
          const child = allList
            .filter((allItem) => allItem[field.parentId] == item[field.key])
            .map((cItem, cIndex) => {
              if (!Object.keys(cItem).includes(field.sort)) {
                cItem[field.sort] = cIndex + 1;
              }
              return cItem;
            })
            .sort(_sort);

          if (child.length) {
            item[field.children] = _setTreeData(child, allList);
          }
        });
        return parentList;
      },
      _sort = (d1, d2) => {
        // 排序方式
        if (sort.value === "desc") {
          if (d2[field.sort] == d1[field.sort]) {
            return d1[field.key] - d2[field.key];
          } else {
            return d2[field.sort] - d1[field.sort];
          }
        } else {
          if (d1[field.sort] == d2[field.sort]) {
            return d1[field.key] - d2[field.key];
          } else {
            return d1[field.sort] - d2[field.sort];
          }
        }
      },
      _sortData = (ary, sortValue) => {
        // 通过排序检测插入顺序序号和值
        let index = null,
          value = null;

        if (sortValue) {
          index = ary.findIndex((item) => {
            if (sort.value === "desc") {
              return item[field.sort] <= sortValue;
            } else {
              return item[field.sort] >= sortValue;
            }
          });

          if (index === -1) {
            sortValue = false;
          } else {
            value = sortValue;
          }
        }

        if (!sortValue) {
          index = ary.length;
          if (sort.value === "desc") {
            value = 1;
          } else {
            if (ary.length) {
              value = ary[ary.length - 1][field.sort] + 1;
            } else {
              value = 1;
            }
          }
        }

        return { index, value };
      },
      _arySortTidy = (ary, index, value) => {
        // 整理顺序
        if (sort.value === "desc") {
          for (let i = index; i >= 0; i--) {
            ary[i][field.sort] = value + (index - i) + 1;
          }
        } else {
          const alength = ary.length;
          for (let i = index; i < alength; i++) {
            ary[i][field.sort] = value + (i - index) + 1;
          }
        }
      },
      _loop = (ary, value, callback) => {
        // 循环检索
        if (Array.isArray(ary)) {
          ary.forEach((item, index) => {
            if (item[field.key] == value) {
              return callback({ item, index, ary });
            }
            if (Array.isArray(item[field.children])) {
              return _loop(item[field.children], value, callback);
            }
          });
        }
      },
      rapidPositioningNode = () => {
        // 快速定位选中节点
        if (scrollContainer.value) {
          nextTick(() => {
            if (treeRef.value?.$el) {
              const curDom = treeRef.value.$el.nextElementSibling.querySelector(
                ".ant-tree-node-selected"
              );
              if (curDom) {
                scrollContainer.value.scrollTop = curDom.offsetTop - curDom.clientHeight;
              }
            }
          });
        }
      },
      searchData = (id) => {
        //根据ID快速查找
        let data, dataIndex, dataAry;
        _loop(list.value, id, ({ item, index, ary }) => {
          data = item;
          dataIndex = index;
          dataAry = ary;
        });
        if (data) {
          return {
            item: data,
            index: dataIndex,
            ary: dataAry,
          };
        } else {
          return null;
        }
      },
      selectedNode = (id) => {
        // 选中
        const { item } = searchData(id);
        if (item) {
          selectedKeys.value = [item[field.key]];
          return item;
        } else {
          return null;
        }
      },
      getSelectedNode = () => {
        // 获取选中节点
        return searchData(selectedKeys.value[0]);
      },
      //清理所有选中节点
      clearSelectNode = () => {
        selectedKeys.value = [];
      },
      delNode = (data) => {
        // 删除节点
        if (data) {
          if (data[field.parentId] == topParentId.value) {
            const idx = list.value.findIndex(
              (item) => item[field.key] == data[field.key]
            );
            list.value.splice(idx, 1);
          } else {
            const { index, ary } = searchData(data[field.key]);
            ary.splice(index, 1);
          }
        }
      },
      addNode = (data, isSortAdd) => {
        // 添加节点
        clearSelectNode();
        if (data[field.parentId] == topParentId.value) {
          const { index: topIndex, value: topSortValue } = _sortData(
            list.value,
            isSortAdd ? data[field.sort] : null
          );

          list.value.splice(topIndex, 0, data);

          if (!isInputEditorSort.value) {
            _arySortTidy(list.value, topIndex, topSortValue);
          }
        } else {
          const { item } = searchData(data[field.parentId]);
          if (item) {
            if (!item[field.children]) {
              item[field.children] = [];
            }
            const { index, value: sortValue } = _sortData(
              item[field.children],
              isSortAdd ? data[field.sort] : null
            );

            item[field.children].splice(index, 0, data);

            if (!isInputEditorSort.value) {
              _arySortTidy(item[field.children], index, sortValue);
            }
          }
        }
        selectedNode(data[field.key]);
      },
      updateNode = (data) => {
        // 更新节点
        const { item, index, ary } = searchData(data[field.key]);
        if (item) {
          ary.splice(index, 1);
          for (const key in data) {
            // 不更新id
            if (![field.key].includes(key)) {
              item[key] = data[key];
            }
          }
          addNode(item, true);
        }
      },
      getMoveTarget = (data, code) => {
        // 获取移动数据
        const supportCode = ["up", "down", "left", "right"];
        if (supportCode.includes(code)) {
          let error = "",
            target;
          const { index, ary } = searchData(data[field.key]);
          switch (code) {
            case "up":
              if (index === 0) {
                error = "当前节点已无法往上移动！";
              } else {
                target = ary[index - 1];
              }
              break;
            case "down":
              if (index === ary.length - 1) {
                error = "当前节点已无法往下移动！";
              } else {
                target = ary[index + 1];
              }
              break;
            case "left":
              if (data[field.parentId] == topParentId.value) {
                error = "当前节点无法左移";
              } else {
                const { item } = searchData(data[field.parentId]);
                target = item;
              }
              break;
            case "right":
              if (index === 0) {
                error = "未找到可右移的节点！";
              } else {
                target = ary[index - 1];
              }
              break;
            default:
              break;
          }
          return { error, target };
        } else {
          console.error(`请使用如下code来调用：${supportCode.join("、")}`);
        }
      },
      execMove = (source, target, targetLocation) => {
        // 移动结果执行
        const targetLocationValue = ["up", "down", "child"];
        if (targetLocationValue.includes(targetLocation)) {
          const { index, ary } = searchData(target[field.key]);
          switch (targetLocation) {
            case "up":
              source[field.parentId] = target[field.parentId];
              let upSort = null;
              if (sort.value === "desc") {
                upSort = target[field.sort] + 1;
                for (let i = index - 1; i >= 0; i--) {
                  ary[i][field.sort] = index - i + upSort;
                }
              } else {
                upSort = target[field.sort];
                for (let i = index; i < ary.length; i++) {
                  ary[i][field.sort] = i - index + 1 + upSort;
                }
              }
              source[field.sort] = upSort;
              updateNode(source);
              break;
            case "down":
              source[field.parentId] = target[field.parentId];
              let downSort = null;
              if (sort.value === "desc") {
                downSort = target[field.sort];
                for (let i = index; i >= 0; i--) {
                  ary[i][field.sort] = index - i + 1 + downSort;
                }
              } else {
                downSort = target[field.sort] + 1;
                for (let i = index + 1; i < ary.length; i++) {
                  ary[i][field.sort] = i - index + 2 + downSort;
                }
              }
              source[field.sort] = downSort;
              updateNode(source);
              break;
            case "child":
              source[field.parentId] = target[field.key];
              source[field.sort] = null;
              updateNode(source);
              break;
            default:
              break;
          }
        } else {
          console.error(
            `请使用如下targetLocation来调用：${targetLocationValue.join("、")}`
          );
        }
      };

    onMounted(() => {
      init();
    });

    watch(treeData, () => {
      init();
    });

    return {
      selectedKeys,
      list,
      field,
      treeRef,
      // 暴露方法
      rapidPositioningNode,
      searchData,
      selectedNode,
      getSelectedNode,
      clearSelectNode,
      delNode,
      addNode,
      updateNode,
      getMoveTarget,
      execMove,
    };
  },
});
</script>
