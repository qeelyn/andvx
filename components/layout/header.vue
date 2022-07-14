<template>
  <a-layout-header class="layoutHeader">
    <div class="flexBox">
      <span
        v-if="collapsed !== null"
        class="trigger"
        @click="onChangeCollapsed(!collapsed)"
      >
        <i class="iconfont icon-icon_liebiao3" v-if="collapsed" />
        <i class="iconfont icon-icon_liebiao2" v-else />
      </span>
      <div class="flexAuto layoutHeader-left">
        <slot name="left"></slot>
      </div>
      <div class="layoutHeader-right">
        <slot name="right"></slot>
      </div>
    </div>
  </a-layout-header>
</template>
<script>
import { defineComponent } from "vue";
import { LayoutHeader as ALayoutHeader } from "ant-design-vue";
import { MenuOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { MenuOutlined, ALayoutHeader },
  props: {
    collapsed: { type: Boolean, default: null },
  },
  emits: ["update:collapsed"],
  setup(props, { emit }) {
    const onChangeCollapsed = (isBool) => {
      emit("update:collapsed", isBool);
    };

    return {
      onChangeCollapsed,
    };
  },
});
</script>
