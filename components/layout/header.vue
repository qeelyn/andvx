<template>
  <a-layout-header class="layoutHeader">
    <div class="flexBox">
      <template v-if="collapsed !== null">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="onChangeCollapsed(false)" />
        <menu-fold-outlined v-else class="trigger" @click="onChangeCollapsed(true)" />
      </template>
      <div class="flexAuto">
        <slot name="left"></slot>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </a-layout-header>
</template>
<script>
import { defineComponent } from "vue";
import { LayoutHeader as ALayoutHeader } from "ant-design-vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { MenuUnfoldOutlined, MenuFoldOutlined, ALayoutHeader },
  props: {
    collapsed: { type: Boolean, default: null }
  },
  emits: ['update:collapsed'],
  setup(props, { emit }) {

    const onChangeCollapsed = (isBool) => {
      emit('update:collapsed', isBool)
    };

    return {
      onChangeCollapsed
    };
  },
});
</script>
