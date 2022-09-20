<template>
  <div class="qlContent">
    <div class="qlContent-head">
      <div class="flexBox">
        <div class="flexAuto">
          <Breadcrumb />
        </div>
        <div></div>
      </div>
    </div>
    <div class="qlContent-body">
      <a-space>
        <a-button @click="show = true">弹出</a-button>
        <!-- <a-button @click="onShowModal">事件弹出Modal</a-button> -->

        <a-button @click="show2 = true">可全屏</a-button>

        <a-button @click="show3 = true">destroyOnClose</a-button>
      </a-space>

      <a-modal
        v-model:visible="show"
        @cancel="eventConsole('t1:cancel')"
        @ok="eventConsole('t1:ok')"
      >
        <template #title>123</template>
        <a-button @click="show1 = true">弹出1</a-button>
      </a-modal>
      <a-modal v-model:visible="show1" title="show1">
        <template #title>title1</template>
        show1
      </a-modal>

      <do-modal
        v-model:visible="show2"
        title="title-show2"
        :useDrag="useDrag"
        @cancel="onShow2Cancel"
      >
        <template #title>#title可全屏</template>
        <a-button @click="useDrag = !useDrag">{{
          useDrag ? "禁止拖拽" : "启动拖拽"
        }}</a-button>
      </do-modal>

      <do-modal
        v-model:visible="show3"
        title="title-show3"
        :useDrag="useDrag"
        destroyOnClose
      >
        <div>destroyOnClose内容</div>
      </do-modal>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Button, Modal } from "ant-design-vue";
import Breadcrumb from "../../../components/breadcrumb";
import DoModal from "../../../components/doModal";
// import dragModal from "../../../mixins/dragModal";

export default defineComponent({
  components: { Breadcrumb, AButton: Button, AModal: DoModal, DoModal },
  // mixins: [dragModal],
  setup() {
    const show = ref(false),
      useDrag = ref(true),
      show1 = ref(false),
      show3 = ref(false),
      show2 = ref(false);

    const onShowModal = () => {
        Modal.confirm({
          title: "事件弹出Modal",
        });
      },
      eventConsole = (str) => {
        console.log(str);
      },
      onShow2Cancel = (e) => {
        console.log("onShow2Cancel:", e);
      };

    return {
      useDrag,
      show,
      show1,
      show2,
      show3,
      onShowModal,
      eventConsole,
      onShow2Cancel,
    };
  },
});
</script>
