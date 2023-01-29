<template>
  <a-layout-header class="layoutHeader">

    <div class="layoutHeader-more">
      <i class="iconfont icon-icon_gengduo1" @click="isHeadShow = !isHeadShow" />
    </div>

    <div class="layoutHeader-box flexBox" v-show="isHeadShow">
      <span v-if="collapsed !== null" class="trigger" @click="onChangeCollapsed(!collapsed)">
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
import { defineComponent, ref, onMounted } from "vue";
import { LayoutHeader as ALayoutHeader } from "ant-design-vue";
import { MenuOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: { MenuOutlined, ALayoutHeader },
  props: {
    collapsed: { type: Boolean, default: null },
  },
  emits: ["update:collapsed"],
  setup(props, { emit }) {
    const isHeadShow = ref(true);

    const onChangeCollapsed = (isBool) => {
      emit("update:collapsed", isBool);
    };

    onMounted(() => {
      isHeadShow.value = window.innerWidth >= 768;
      window.addEventListener(
        "resize",
        (e) => {
          isHeadShow.value = window.innerWidth >= 768;
        },
        false
      );
    })

    return {
      isHeadShow,
      onChangeCollapsed,
    };
  },
});
</script>
