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
      _sortIndex = (ary, value) => {
        // 通过排序检测插入顺序序号
        let index = ary.findIndex((item) => item[field.sort] == value),
          isEqual = true;
        if (!(value === null || value === undefined)) {
          if (index === -1) {
            isEqual = false;
            if (sort.value === "desc") {
              index = ary.findIndex((item) => item[field.sort] < value);
            } else {
              index = ary.findIndex((item) => item[field.sort] > value);
            }
          }

          if (index === -1) {
            isEqual = false;
            index = ary.length;
          }
        } else {
          isEqual = false;
          index = ary.length;
        }

        return { index, isEqual };
      },
      _sortEndIndex = (ary) => {
        // 根据排序获取最大值
        if (sort.value === "desc") {
          return 1;
        } else {
          return ary.length + 1;
        }
      },
      _arySortTidy = (ary, index, value) => {
        // 整理顺序
        ary.forEach((item, itemIndex) => {
          if (itemIndex >= index) {
            item[field.sort] = value + (itemIndex - index) + 1;
          }
        });
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
      addNode = (data) => {
        // 添加节点
        clearSelectNode();
        if (data[field.parentId] == topParentId.value) {
          if (!Object.keys(data).includes(field.sort)) {
            // 如果无值默认添加到最后
            data[field.sort] = _sortEndIndex(list.value);
          }
          const { index, isEqual } = _sortIndex(list.value, data[field.sort]);
          if (!isInputEditorSort.value) {
            _arySortTidy(list.value, index, data[field.sort]);
          }
          list.value.splice(index, 0, data);
        } else {
          const { item } = searchData(data[field.parentId]);
          if (item) {
            if (!item[field.children]) {
              item[field.children] = [];
            }

            if (!Object.keys(data).includes(field.sort)) {
              // 如果无值默认添加到最后
              data[field.sort] = _sortEndIndex(item[field.children]);
            }
            const { index, isEqual } = _sortIndex(item[field.children], data[field.sort]);
            if (!isInputEditorSort.value) {
              _arySortTidy(item[field.children], index, data[field.sort]);
            }
            item[field.children].splice(index, 0, data);
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
          addNode(item);
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
              const upSort = target[field.sort];
              source[field.parentId] = target[field.parentId];

              for (let i = index; i < ary.length; i++) {
                ary[i][field.sort] = i - index + 1 + upSort;
              }

              source[field.sort] = upSort;
              updateNode(source);
              break;
            case "down":
              const downSort = target[field.sort] + 1;

              source[field.parentId] = target[field.parentId];

              for (let i = index + 1; i < ary.length; i++) {
                ary[i][field.sort] = i - index + 2 + downSort;
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
