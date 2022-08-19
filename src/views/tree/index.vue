<template>
  <div class="qlContent">
    <div class="qlContent-head">
      <Breadcrumb />
    </div>
    <div class="qlContent-body">
      <div>
        <a-space>
          <a-button @click="add">添加</a-button>
          <a-button @click="consoleLog">查看树数据</a-button>
          <a-button @click="positioning">滚动到选中位置</a-button>
        </a-space>
      </div>
      <br />
      <div ref="doTreeScrollRef" style="overflow: auto; height: 200px">
        <!-- sort="desc" -->
        <DoTree
          ref="doTreeRef"
          :treeData="treeData"
          :loading="loading"
          isSetting
          :scrollContainer="$refs.doTreeScrollRef"
        >
          <template #settingMenu="{ node }">
            <a-menu style="min-width: 100px">
              <a-menu-item key="editor" @click.native="onEditor(node)">
                编辑{{ node.id }}
              </a-menu-item>
              <a-sub-menu key="move" title="移动">
                <a-menu-item
                  style="min-width: 100px"
                  @click.native="onMove(node, 'up')"
                  key="up"
                  >上</a-menu-item
                >
                <a-menu-item
                  style="min-width: 100px"
                  @click.native="onMove(node, 'down')"
                  key="down"
                  >下</a-menu-item
                >
                <a-menu-item
                  style="min-width: 100px"
                  @click.native="onMove(node, 'left')"
                  key="left"
                  >左</a-menu-item
                >
                <a-menu-item
                  style="min-width: 100px"
                  @click.native="onMove(node, 'right')"
                  key="right"
                  >又</a-menu-item
                >
              </a-sub-menu>
              <a-menu-item key="del" @click.native="onDel(node)">删除</a-menu-item>
            </a-menu>
          </template>
        </DoTree>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
import Breadcrumb from "../../../components/breadcrumb";
import DoTree from "../../../components/doTree";
import tData from "./data";

export default defineComponent({
  components: { Breadcrumb, DoTree },
  setup() {
    const treeData = ref([]),
      doTreeRef = ref(),
      loading = ref(false);

    const getData = () => {
        loading.value = true;
        setTimeout(() => {
          treeData.value = tData.map((item) => {
            item.title = `${item.name}:${item.id}`;
            if (item.id == 9) {
              item.isSetting = false;
            }
            return item;
          });

          loading.value = false;
        }, 1000);
      },
      positioning = () => {
        doTreeRef.value.rapidPositioningNode();
      },
      consoleLog = () => {
        console.log(doTreeRef.value.list);
      },
      add = () => {
        const id = Date.now();
        doTreeRef.value.addNode({
          id: id,
          parentId: "3",
          title: `添加才子:${id}`,
          name: "添加才子",
          order: 1,
        });
      },
      onDel = (node) => {
        doTreeRef.value.delNode(node);
      },
      onEditor = (node) => {
        doTreeRef.value.updateNode({
          id: node.id,
          parentId: "3",
          title: `编辑:${node.id}`,
        });
      },
      onMove = (data, code) => {
        const { target, error } = doTreeRef.value.getMoveTarget(data, code);
        if (error) {
          alert(error);
        } else {
          if (["up", "down"].includes(code)) {
            doTreeRef.value.execMove(data, target, code);
          } else if (code === "left") {
            doTreeRef.value.execMove(data, target, "down");
          } else if (code === "right") {
            doTreeRef.value.execMove(data, target, "child");
          }
        }
      };

    onMounted(getData);

    return {
      doTreeRef,
      treeData,
      loading,
      onEditor,
      onMove,
      onDel,
      add,
      consoleLog,
      positioning,
    };
  },
});
</script>
