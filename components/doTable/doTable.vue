<template>
  <div class="deoTable">
    <a class="deoTable-setting" v-if="setting" @click="visible = true">
      <SettingOutlined />
    </a>
    <slot></slot>

    <a-modal
      title="设置表头"
      :visible="visible"
      :mask="false"
      :maskClosable="false"
      okText="确定"
      cancelText="取消"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <ul class="ant-list-items ant-list-bordered">
        <draggable v-model="list" item-key="key" handle=".handle">
          <template #item="{ element }">
            <li class="ant-list-item">
              <a-checkbox v-model:checked="element.checked">{{ element.title }}</a-checkbox>
              <a v-if="element.isMove !== false" class="handle">
                <DragOutlined />
              </a>
            </li>
          </template>
        </draggable>
      </ul>
      <template #footer>
        <a-button v-if="isRecovery" @click="recovery()">复原</a-button>
        <a-button @click="handleCancel">取消</a-button>
        <a-button :disabled="isSave" type="primary" @click="handleOk()">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>
<style>
.deoTable {
  position: relative;
}

.deoTable-setting {
  display: none;
  position: absolute;
  right: 10px;
  top: -20px;
}
.deoTable:hover .deoTable-setting {
  display: block;
}
</style>
<script>
import { Table } from "ant-design-vue";
import draggable from "vuedraggable/src/vuedraggable";
import { defineComponent, toRefs, ref, nextTick, computed, watch } from "vue";
import { useStore } from "vuex";
import { SettingOutlined, DragOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { Table, SettingOutlined, DragOutlined, draggable },
  props: {
    setting: { type: Boolean },
    columns: { type: Array },
    vuexCode: { type: String },
  },
  setup(props) {
    const { columns, vuexCode } = toRefs(props),
      store = useStore(),
      curTableHeader = computed(() => {
        if (store.state.andvx.tableHeader) {
          return store.getters["andvx/getTableHeader"](vuexCode.value);
        } else {
          return null;
        }
      }),
      visible = ref(false),
      isSave = ref(true),
      isRecovery = ref(false),
      list = ref([]);

    const initData = () => {
      // 对fixed特殊处理 同时支持关键字 isMove === false
      let listAry = [];
      if (columns.value && columns.value.length) {
        // 可以参与设置的key
        let okKeys = columns.value.filter(item => !item.fixed).map(item => item.dataIndex),
          // vuex设置的数据的key
          curHeaderKeys = [];

        // 先处理旧数据
        if (curTableHeader.value && curTableHeader.value.length) {
          isRecovery.value = true;
          curHeaderKeys = curTableHeader.value.map((item) => item.key);

          curTableHeader.value.forEach((item) => {
            if (okKeys.includes(item.key)) {
              listAry.push({
                checked: item.checked,
                title: item.title,
                key: item.key,
                isMove: item.isMove
              });
            }
          });
        } else {
          isRecovery.value = false;
        }

        // 处理新数据
        columns.value.forEach(item => {
          if (okKeys.includes(item.dataIndex) && !curHeaderKeys.includes(item.dataIndex)) {
            listAry.push({
              checked: !curHeaderKeys.length,
              title: item.title,
              key: item.dataIndex,
              isMove: item.isMove
            })
          }
        })

      }

      list.value = listAry;
      nextTick(() => {
        isSave.value = true;
      })
    }, recovery = () => {
      store.dispatch("andvx/updateTableHeader", {
        code: vuexCode.value,
        value: null,
      });
      handleCancel();
    }, handleOk = () => {
      store.dispatch("andvx/updateTableHeader", {
        code: vuexCode.value,
        value: JSON.parse(JSON.stringify(list.value)),
      });
      handleCancel();
    }, handleCancel = () => {
      visible.value = false;
      initData();
    };

    initData();

    watch(list, () => {
      isSave.value = false;
    }, {
      deep: true
    });


    watch(columns, initData, {
      deep: true
    });

    watch(curTableHeader, initData, {
      deep: true
    });

    return {
      visible,
      list,
      isSave,
      isRecovery,
      recovery,
      handleOk,
      handleCancel,
    };
  },
});
</script>