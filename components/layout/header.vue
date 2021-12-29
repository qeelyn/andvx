<template>
  <a-layout-header class="layoutHeader">
    <div class="flexBox">
      <template v-if="collapsed !== null">
        <MenuUnfoldOutlined v-if="collapsed" class="trigger" @click="onChangeCollapsed(false)" />
        <MenuFoldOutlined v-else class="trigger" @click="onChangeCollapsed(true)" />
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
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
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
