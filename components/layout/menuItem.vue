<template v-if="value">
  <a-sub-menu v-if="value.children && value.children.length" :key="keyValue">
    <template #icon>
      <i :class="value.icon" v-if="value && value.icon" />
    </template>
    <template #title>
      <span>{{ value.name }}</span>
    </template>
    <menu-item
      v-for="(item, index) in value.children"
      :value="item"
      :key="`${keyValue}-${index}`"
      :keyValue="`${keyValue}-${index}`"
      @onMoreIconClick="(key) => { $emit('onMoreIconClick', key) }"
    />
  </a-sub-menu>
  <template v-else>
    <a-menu-item :key="keyValue" class="menuItem">
      <template #icon v-if="value.icon">
        <i :class="value.icon" />
      </template>
      <span>{{ value.name }}</span>
      <i
        class="iconfont icon-icon_xinchuangkoudakai"
        style="position: absolute; right: 16px"
        @click.stop="$emit('onMoreIconClick', keyValue)"
      />
    </a-menu-item>
  </template>
</template>
<script >
import { defineComponent } from "vue";
import { SubMenu as ASubMenu, MenuItem as AMenuItem } from "ant-design-vue";

export default defineComponent({
  name: "menuItem",
  components: { ASubMenu, AMenuItem },
  props: {
    value: { type: Object },
    keyValue: { type: String },
  },
});
</script>